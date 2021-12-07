import requests
import requests
import sys

url_base = 'http://localhost:8000'

if (url_base.endswith("/")):
    url_base = url_base[:-1]

def test_get_climbs_noauth_200():
    res = requests.get(f"{url_base}/api/climbs")
    assert res.status_code == 200

def test_get_climbs_superuserauth_200():
    res = requests.get(f"{url_base}/api/climbs", headers={'Authorization': 'Token 50ec2d16ea8764325f228b9177b3e86d45ea81be'})
    assert res.status_code == 200

def test_get_climbs_userauth_200():
    res = requests.get(f"{url_base}/api/climbs", headers={'Authorization': 'Token f8242780fc266550489d57c69a6e366be78d289d'})
    assert res.status_code == 200