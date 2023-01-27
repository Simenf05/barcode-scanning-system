import requests

res = requests.get("http://localhost:3000")

print(res.text)