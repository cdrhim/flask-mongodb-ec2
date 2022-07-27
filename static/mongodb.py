from pymongo import MongoClient

client = MongoClient('mongodb+srv://randomvisitor:visitorcopy@cluster0.dl5c8.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

doc = {
    'name':'bob',
    'age':27
}

db.users.insert_one(doc)

