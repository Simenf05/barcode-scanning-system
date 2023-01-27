import requests

res = requests.get("http://localhost:8000")

print(res.status_code)
print(res.text)