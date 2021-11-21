# Rad Routes

Routes, but they're rad.

### Development Setup
You must have django installed. Do so with `pip install django`

```
git clone https://github.com/apc518/rad-routes.git
cd rad-routes
sudo chmod +rwx buildfront.bash
cd front
npm ci
```

Open up two terminals, one for the front and one for the server.

Start the development server:
```
cd server
python manage.py runserver
```

Start the development client:
```
cd front
npm start
```

WARNING: `buildfront.bash` IS NOT TO BE USED OFTEN. Its purpose is simply to automate part of the _deployment_ process, which should happen fairly infrequently.

Django and React both hot reload as you make changes, so during the thick of development there is no need to be calling `buildfront.bash`. Even as you make commits, there is no need to run `buildfront.bash`. It should ONLY be run after a new front-end feature or fix has been finished and tested.