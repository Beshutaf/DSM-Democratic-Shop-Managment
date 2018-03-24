import csv
import json

csvfile = open('users.csv', 'r')
jsonfile = open('users.json', 'w')

fieldnames = ("fName","lName","email","password","authen")
reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')