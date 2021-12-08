import requests

url_base = 'http://localhost:8000'

if (url_base.endswith("/")):
    url_base = url_base[:-1]

# basic GETs with no authentication

def test_get_climbs_noauth_200():
    res = requests.get(f"{url_base}/api/climbs")
    assert res.status_code == 200

def test_get_faces_noauth_200():
    res = requests.get(f"{url_base}/api/faces")
    assert res.status_code == 200

def test_get_features_noauth_200():
    res = requests.get(f"{url_base}/api/features")
    assert res.status_code == 200

def test_get_areas_noauth_200():
    res = requests.get(f"{url_base}/api/areas")
    assert res.status_code == 200

def test_get_books_noauth_200():
    res = requests.get(f"{url_base}/api/books")
    assert res.status_code == 200

# basic requests with superuser authentication

def test_get_climbs_superuserauth_200():
    res = requests.get(f"{url_base}/api/climbs", headers={'Authorization': 'Token 50ec2d16ea8764325f228b9177b3e86d45ea81be'})
    assert res.status_code == 200

def test_get_faces_superuserauth_200():
    res = requests.get(f"{url_base}/api/faces", headers={'Authorization': 'Token 50ec2d16ea8764325f228b9177b3e86d45ea81be'})
    assert res.status_code == 200

def test_get_features_superuserauth_200():
    res = requests.get(f"{url_base}/api/features", headers={'Authorization': 'Token 50ec2d16ea8764325f228b9177b3e86d45ea81be'})
    assert res.status_code == 200

def test_get_areas_superuserauth_200():
    res = requests.get(f"{url_base}/api/areas", headers={'Authorization': 'Token 50ec2d16ea8764325f228b9177b3e86d45ea81be'})
    assert res.status_code == 200

def test_get_books_superuserauth_200():
    res = requests.get(f"{url_base}/api/books", headers={'Authorization': 'Token 50ec2d16ea8764325f228b9177b3e86d45ea81be'})
    assert res.status_code == 200

# basic GETs with user authentication

def test_get_climbs_userauth_200():
    res = requests.get(f"{url_base}/api/climbs", headers={'Authorization': 'Token f8242780fc266550489d57c69a6e366be78d289d'})
    assert res.status_code == 200

def test_get_faces_userauth_200():
    res = requests.get(f"{url_base}/api/faces", headers={'Authorization': 'Token f8242780fc266550489d57c69a6e366be78d289d'})
    assert res.status_code == 200

def test_get_features_userauth_200():
    res = requests.get(f"{url_base}/api/features", headers={'Authorization': 'Token f8242780fc266550489d57c69a6e366be78d289d'})
    assert res.status_code == 200

def test_get_areas_userauth_200():
    res = requests.get(f"{url_base}/api/areas", headers={'Authorization': 'Token f8242780fc266550489d57c69a6e366be78d289d'})
    assert res.status_code == 200

def test_get_books_userauth_200():
    res = requests.get(f"{url_base}/api/books", headers={'Authorization': 'Token f8242780fc266550489d57c69a6e366be78d289d'})
    assert res.status_code == 200
