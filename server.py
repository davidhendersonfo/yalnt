from flask import Flask, send_from_directory

app = Flask(__name__)

BASE_DIR = r"C:\Users\DavidHenderson\Documents\gitYalnt\yalnt"


@app.get("/")
def index():
    return "YALnT local server is running."


@app.get("/<path:filename>")
def serve_file(filename):
    return send_from_directory(BASE_DIR, filename)


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5555,
        debug=False
    )
