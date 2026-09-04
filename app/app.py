#this is the flask backend
import time
from flask import Flask, jsonify
import redis

app = Flask(__name__)

# redis name on the docker comopse service is redis-db, the default port is 6379
cache = redis.Redis(host='redis-db', port=6379, decode_responses=True)

def get_hit_count():
    retries = 5
    while True:
        try:
            return int(cache.get('hits'))
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

def increment_hit_count():
    retries = 5
    while True:
        try:
            return int(cache.incr('hits'))
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.get("/clicks")
def get_clicks():
    return jsonify({"clicks": get_hit_count()})


@app.post("/clicks")
def add_click():
    return jsonify({"clicks": increment_hit_count()})