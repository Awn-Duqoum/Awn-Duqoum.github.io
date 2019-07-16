from flask import Flask
from flask_restful import Api, Resource, reqparse
import sqlite3 as sq

class Users(Resource):
  def __init__(self, **kwargs):
    # Read the relevant parameters 
    self.conn = sq.connect(kwargs['db_name'])
    self.curr = self.conn.cursor()
    
  def get(self, name=None):
    # Get information about all users
    if name == None:
        self.curr.execute('''Select * from Users''')
    else:
        self.curr.execute('''Select * from Users where name = ?''', (name,))
    return self.curr.fetchall(), 202
    
  def post(self):
    # Add a new user
    parser = reqparse.RequestParser()
    parser.add_argument('deviceID', type=int, help='The Device number being assigned')
    parser.add_argument('name', type=str, help='The name of the new user')
    args = parser.parse_args()
    print(args)
    try:
        self.curr.execute('''INSERT INTO Users (Name, DeviceID) VALUES (?,?)''', (args["name"], args["deviceID"]))
        self.conn.commit()
    except:
        return "Invalid Parameters passed"
    
    return "Success", 202 

  def put(self):
    # Block this function
    return None, 405

  def delete(self, Name=None):
    # TODO Write this
    return None, 405