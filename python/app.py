from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@mysql/mydb'
db = SQLAlchemy(app)

CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    birthDate = db.Column(db.String(10), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    postalCode = db.Column(db.String(10), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(
        name=data['name'],
        surname=data['surname'],
        email=data['email'],
        birthDate=data['birthDate'],
        city=data['city'],
        postalCode=data['postalCode']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({
        'id': user.id,
        'name': user.name,
        'surname': user.surname,
        'email': user.email,
        'birthDate': user.birthDate,
        'city': user.city,
        'postalCode': user.postalCode
    })

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'name': user.name,
        'surname': user.surname,
        'email': user.email,
        'birthDate': user.birthDate,
        'city': user.city,
        'postalCode': user.postalCode
    } for user in users])

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    password = request.json.get('password')
    if password == os.getenv('DELETE_PASSWORD'):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return '', 204
        else:
            return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify({'error': 'Invalid password'}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3002)