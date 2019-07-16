# Standard Libraries Imports
from flask import Flask
from flask_restful import Api, Resource, reqparse

# Our Libraries 
from Users import *

app = Flask(__name__)
api = Api(app)

db_name = "example.db"
    
#api.add_resource(User, "/user/<string:name>", resource_class_kwargs={'db_name': db_name})
api.add_resource(Users, "/users/", "/users", "/users/<string:name>", resource_class_kwargs={'db_name': db_name})

app.run(host='0.0.0.0')
