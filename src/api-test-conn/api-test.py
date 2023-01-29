import requests

r = requests.get("http://python-api:3000")
print(r.status_code)
print(r.content)