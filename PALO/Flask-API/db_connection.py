import sqlite3 as sq
import sys

# Important links
# https://www.sqlite.org/lang.html
# https://app.sqldbm.com/SQLServer/Edit/p51357/
      
def BuildSchema(curr):
  # Let's start by creating a users table, dropping it if it already exists
  curr.execute('''DROP TABLE IF EXISTS Users ''')
  curr.execute('''CREATE TABLE Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                                    Name text NOT NULL, 
                                    DeviceID int NOT NULL)''')
                                    
  # Let's continue by creating a sensordata table, dropping it if it already exists
  # TODO: Change this to match an actual sensor data format
  curr.execute('''DROP TABLE IF EXISTS SensorData ''')
  curr.execute('''CREATE TABLE SensorData(TimeStamp datetime2(7) NOT NULL, 
                                          DeviceID int NOT NULL, 
                                          Lat real NOT NULL, 
                                          Long real NOT NULL, 
                                          CONSTRAINT SensorData PRIMARY KEY (TimeStamp ASC))''')    
def PopulateTables(curr):
    # Make a bunch of users
    Names = ["Thomas", "Adam", "Nightmare", "Tron", "Was", "A", "Mistake"]
    for i in range(len(Names)):
        curr.execute('''INSERT INTO Users (ID, Name, DeviceID) VALUES (?,?,?)''', [i, Names[i%len(Names)], i])  
        
if __name__ == "__main__":
    # Running this script means you are trying to set up the database
    if(len(sys.argv) == 1):
        # No database name was given, just run the test.db
        conn = sq.connect('test.db')
    elif(len(sys.argv) == 2):
        # Assume the name they gave us is a database name, and run that
        conn = sq.connect(sys.argv[1])
    else:
        # A mistake was made
        print("Usage: db_connection.py <DatabaseName>")
        exit
    
    BuildSchema(conn.cursor())
    conn.commit()
    PopulateTables(conn.cursor())
    conn.commit()
    conn.close()