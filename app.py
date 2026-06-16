from html import escape
from pathlib import Path
import logging
import os
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

try:
    import psycopg
except ImportError:
    psycopg = None


BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR / "Frontend"
SUPABASE_TABLE = "users_new"

load_dotenv(BASE_DIR / ".env")

app = Flask(__name__, static_folder=None)
CORS(app, supports_credentials=True)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


def supabase_config():
    return {
        "url": (os.getenv("SUPABASE_URL") or "").rstrip("/"),
        "key": os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY") or "",
        "db_url": os.getenv("SUPABASE_DB_URL") or "",
    }


def supabase_headers(prefer=None):
    config = supabase_config()
    headers = {
        "apikey": config["key"],
        "Authorization": f"Bearer {config['key']}",
        "Content-Type": "application/json",
    }
    if prefer:
        headers["Prefer"] = prefer
    return headers


def require_supabase():
    config = supabase_config()
    missing = [name for name, value in {
        "SUPABASE_URL": config["url"],
        "SUPABASE_KEY": config["key"],
    }.items() if not value]
    if config["url"] and "your-project-ref" in config["url"]:
        missing.append("SUPABASE_URL real project URL")
    if config["key"] and config["key"].startswith("your-"):
        missing.append("SUPABASE_KEY real API key")
    if missing:
        message = f"Missing Supabase environment variable(s): {', '.join(missing)}"
        app.logger.error(message)
        return None, (jsonify({"success": False, "message": message}), 500)
    return config, None


def supabase_rest_url(path=""):
    config = supabase_config()
    return f"{config['url']}/rest/v1/{SUPABASE_TABLE}{path}"


def supabase_request(method, *args, **kwargs):
    try:
        return requests.request(method, *args, timeout=10, **kwargs), None
    except requests.RequestException as exc:
        app.logger.error("Supabase request failed: %s", exc)
        return None, (jsonify({"success": False, "message": "Could not connect to Supabase."}), 502)


def clean_postgres_url(db_url):
    parts = urlsplit(db_url)
    allowed_query = {
        key: value
        for key, value in parse_qsl(parts.query, keep_blank_values=True)
        if key not in {"pgbouncer", "connection_limit"}
    }
    return urlunsplit(
        (parts.scheme, parts.netloc, parts.path, urlencode(allowed_query), parts.fragment)
    )


def init_db():
    config = supabase_config()
    if not config["url"] or not config["key"]:
        app.logger.warning(
            "Supabase is not configured yet. Set SUPABASE_URL and SUPABASE_KEY in .env."
        )
        return

    if not config["db_url"]:
        app.logger.info(
            "SUPABASE_DB_URL is not set, so Flask cannot create tables automatically. "
            "Run supabase_schema.sql in the Supabase SQL Editor."
        )
        return

    if psycopg is None:
        app.logger.warning(
            "psycopg is not installed, so automatic Supabase table creation is disabled."
        )
        return

    create_sql = (BASE_DIR / "supabase_schema.sql").read_text(encoding="utf-8")
    try:
        with psycopg.connect(clean_postgres_url(config["db_url"])) as conn:
            with conn.cursor() as cur:
                cur.execute(create_sql)
            conn.commit()
        app.logger.info("Supabase users table initialized through SUPABASE_DB_URL.")
    except Exception as exc:
        app.logger.warning(
            "Could not auto-create Supabase table from SUPABASE_DB_URL: %s. "
            "Run supabase_schema.sql manually in the Supabase SQL Editor.",
            exc,
        )


def public_user(row):
    return {
        "id": row["id"],
        "fullName": row["full_name"],
        "email": row["email"],
        "phone": row["phone"],
        "gender": row["gender"],
        "address": row["address"],
        "photo": row.get("photo"),
        "orders": [],
    }


def find_user_by_email_phone(email, phone):
    config, error = require_supabase()
    if error:
        return None, error

    response, error = supabase_request(
        "GET",
        supabase_rest_url(),
        headers=supabase_headers(),
        params={
            "select": "id,full_name,email,phone,gender,address,photo,password_hash",
            "email": f"eq.{email}",
            "phone": f"eq.{phone}",
            "limit": "1",
        },
    )
    if error:
        return None, error
    if response.status_code >= 400:
        app.logger.error("Supabase user lookup failed: %s", response.text)
        return None, (jsonify({"success": False, "message": "Supabase lookup failed."}), 500)

    rows = response.json()
    return (rows[0] if rows else None), None


@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.get("/health")
def health():
    config = supabase_config()
    return {
        "ok": bool(config["url"] and config["key"]),
        "database": "supabase",
        "supabaseUrl": config["url"],
        "table": SUPABASE_TABLE,
        "canAutoCreateTables": bool(config["db_url"] and psycopg is not None),
    }


@app.post("/api/register")
def register():
    config, error = require_supabase()
    if error:
        return error

    data = request.get_json(silent=True) or {}
    full_name = (data.get("fullName") or "").strip()
    email = (data.get("email") or "").strip().lower()
    phone = (data.get("phone") or "").strip()
    gender = (data.get("gender") or "").strip()
    address = (data.get("address") or "").strip()
    photo = (data.get("photo") or "").strip() or None
    password = data.get("password") or ""

    if not all([full_name, email, phone, gender, address, password]):
        app.logger.warning("Registration rejected for email=%s phone=%s: missing fields", email, phone)
        return jsonify({"success": False, "message": "Missing required fields."}), 400

    payload = {
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "gender": gender,
        "address": address,
        "photo": photo,
        "password_hash": generate_password_hash(password),
    }

    response, request_error = supabase_request(
        "POST",
        supabase_rest_url(),
        headers=supabase_headers("return=representation"),
        params={"select": "id,full_name,email,phone,gender,address,photo"},
        json=payload,
    )
    if request_error:
        return request_error

    if response.status_code == 409 or "duplicate key" in response.text.lower():
        app.logger.warning("Registration rejected for email=%s phone=%s: duplicate", email, phone)
        return jsonify({"success": False, "message": "Email or phone already exists."}), 409

    if response.status_code >= 400:
        app.logger.error("Supabase registration failed: %s", response.text)
        return jsonify({"success": False, "message": "Supabase registration failed."}), 500

    row = response.json()[0]
    app.logger.info("Registered Supabase user id=%s email=%s", row["id"], email)
    return jsonify(
        {
            "success": True,
            "message": "Account created successfully.",
            "token": f"ssd-{row['id']}",
            "user": public_user(row),
        }
    ), 201


@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    phone = (data.get("phone") or "").strip()
    password = data.get("password") or ""

    if not all([email, phone, password]):
        app.logger.warning("Login rejected for email=%s phone=%s: missing fields", email, phone)
        return jsonify({"success": False, "message": "Missing required fields."}), 400

    row, error = find_user_by_email_phone(email, phone)
    if error:
        return error

    if not row:
        app.logger.warning("Login failed for email=%s phone=%s: no matching user", email, phone)
        return jsonify({"success": False, "message": "Invalid email, phone, or password."}), 401

    if not check_password_hash(row["password_hash"], password):
        app.logger.warning("Login failed for user id=%s email=%s: invalid password", row["id"], email)
        return jsonify({"success": False, "message": "Invalid email, phone, or password."}), 401

    app.logger.info("Login succeeded for Supabase user id=%s email=%s", row["id"], email)
    return jsonify({"success": True, "token": f"ssd-{row['id']}", "user": public_user(row)})


@app.get("/api/users")
def get_users():
    config, error = require_supabase()
    if error:
        return error

    response, request_error = supabase_request(
        "GET",
        supabase_rest_url(),
        headers=supabase_headers(),
        params={
            "select": "id,full_name,email,phone,gender,address,photo",
            "order": "id.desc",
        },
    )
    if request_error:
        return request_error
    if response.status_code >= 400:
        app.logger.error("Supabase users fetch failed: %s", response.text)
        return jsonify({"success": False, "message": "Supabase users fetch failed."}), 500

    rows = response.json()
    app.logger.info("Returning %s users from Supabase.", len(rows))
    return jsonify([public_user(row) for row in rows])


@app.get("/api/users/<int:user_id>")
def get_user(user_id):
    config, error = require_supabase()
    if error:
        return error

    response, request_error = supabase_request(
        "GET",
        supabase_rest_url(),
        headers=supabase_headers(),
        params={
            "select": "id,full_name,email,phone,gender,address,photo",
            "id": f"eq.{user_id}",
            "limit": "1",
        },
    )
    if request_error:
        return request_error
    if response.status_code >= 400:
        app.logger.error("Supabase user fetch failed: %s", response.text)
        return jsonify({"success": False, "message": "Supabase user fetch failed."}), 500

    rows = response.json()
    if not rows:
        return jsonify({"success": False, "message": "User not found."}), 404

    return jsonify({"success": True, "user": public_user(rows[0])})


@app.get("/api/debug/db")
def debug_db():
    config, error = require_supabase()
    if error:
        return error

    response, request_error = supabase_request(
        "GET",
        supabase_rest_url(),
        headers=supabase_headers(),
        params={"select": "id", "limit": "1"},
    )
    if request_error:
        return request_error

    return jsonify(
        {
            "database": "supabase",
            "supabaseUrl": config["url"],
            "table": SUPABASE_TABLE,
            "tableReachable": response.status_code < 400,
            "statusCode": response.status_code,
            "message": response.text if response.status_code >= 400 else "OK",
            "canAutoCreateTables": bool(config["db_url"] and psycopg is not None),
        }
    )


@app.get("/users")
def users_page():
    response = get_users()
    if isinstance(response, tuple):
        return response

    rows = response.get_json()
    table_rows = "\n".join(
        f"""
        <tr>
            <td>{row["id"]}</td>
            <td>{escape(row["fullName"])}</td>
            <td>{escape(row["email"])}</td>
            <td>{escape(row["phone"])}</td>
            <td>{escape(row["gender"])}</td>
            <td>{escape(row["address"])}</td>
        </tr>
        """
        for row in rows
    )
    if not table_rows:
        table_rows = '<tr><td colspan="6">No registered users found.</td></tr>'

    return f"""
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Registered Users</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 32px; color: #2d2118; }}
            table {{ border-collapse: collapse; width: 100%; margin-top: 16px; }}
            th, td {{ border: 1px solid #ddd; padding: 10px; text-align: left; }}
            th {{ background: #f5eadf; }}
        </style>
    </head>
    <body>
        <h1>Registered Users</h1>
        <p>Database: Supabase</p>
        <p>Total users: {len(rows)}</p>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>{table_rows}</tbody>
        </table>
    </body>
    </html>
    """


@app.route("/<path:path>")
def serve_frontend(path):
    return send_from_directory(FRONTEND_DIR, path)


init_db()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
