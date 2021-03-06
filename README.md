# Rad Routes

Routes, but they're rad.

![image](https://user-images.githubusercontent.com/56745633/149147551-2feee368-c75e-4f34-8a99-3dcd86cc86de.png)

### Development Setup
```sh
git clone https://github.com/apc518/rad-routes.git
cd rad-routes
sudo chmod +rwx buildfront.bash

# install python dependencies
python -m venv env
pip install -r requirements.txt

# install node dependencies
cd front
npm ci
```

Open up two terminals, one for the front and one for the server.

You will need a `.env` file inside `backend/`. This file should have a `SECRET_KEY` variable defined:

```
SECRET_KEY=foo-bar-123!@#
```

Start the development server:
```sh
cd backend
python manage.py runserver
```

Start the development client:
```sh
cd front
npm start
```

WARNING: `buildfront.bash` IS NOT TO BE USED OFTEN. Its purpose is simply to automate part of the _deployment_ process, which should happen fairly infrequently.

Django and React both hot reload as you make changes, so during the thick of development there is no need to be calling `buildfront.bash`. Even as you make commits, there is no need to run `buildfront.bash`. It should ONLY be run after a new front-end feature or fix has been finished and tested.
