#this is the flask backend

from flask import Flask, jsonify

app = Flask(__name__)

clicks = 0


@app.get("/")
def get_clicks():
    return jsonify({"clicks": clicks})


@app.post("/")
def add_click():
    global clicks
    clicks += 1
    return jsonify({"clicks": clicks})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
