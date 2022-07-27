from flask import Flask, render_template, url_for, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client= MongoClient("mongodb+srv://randomvisitor:visitorcopy@cluster0.dl5c8.mongodb.net/?retryWrites=true&w=majority")
db = client.sparta

@app.route("/", methods = ["GET", "POST"])
def home():
    return render_template("index.html")

@app.route("/bucket", methods=["POST"])
def bucket_post():
    bucket_receive = request.form['bucket_give']
    bucket_list = list(db.bucket.find({},{'_id': False}))
    count = len(bucket_list) + 1
    doc = {
            'num': count,
            'bucket': bucket_receive,
            'done': 0
    }
    db.bucket.insert_one(doc)
    return jsonify({'msg':'Finished submitting!'})

@app.route("/bucket", methods=["GET"])
def bucket_get():
    bucket_list = list(db.bucket.find({},{'_id': False}))
    return jsonify({'bucket': bucket_list})

@app.route("/bucket/done", methods=["POST"])
def bucket_done():
    num_receive = request.form['num_give']
    db.bucket.update_one({'num': int(num_receive)}, {'$set': {'done': 1}})
    return jsonify({'msg': 'Completed!'})

@app.route("/bucket/notdone", methods=["POST"])
def bucket_not_done():
    num_receive = request.form['num_give']
    db.bucket.update_one({'num': int(num_receive)}, {'$set': {'done': 0}})
    return jsonify({'msg': 'Cancel success!'})

if __name__ == "__main__":
    app.run('0.0.0.0', port = 5000, debug = "True")
