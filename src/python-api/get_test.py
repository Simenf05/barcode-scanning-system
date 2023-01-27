import requests

res = requests.get("http://localhost:8080")

print(res.status_code)
print(res.text)