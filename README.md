# Rad Routes

Routes, but they're rad.

### Development Setup
```
git clone https://github.com/apc518/rad-routes.git
cd rad-routes
sudo chmod +rwx buildfront.bash
```

Open up two terminals, one for the front and one for the server.

WARNING: `buildfront.bash` IS NOT TO BE USED OFTEN. Its purpose is simply to autoomate part of the _deployment_ process, which should happen fairly infrequently.

Django and React both hot reload as you make changes, so during the thick of development there is no need to be calling `buildfront.bash`. Even as you make commits, there is no need to run `buildfront.bash`. It should ONLY be run after a new front-end feature or fix has been finished and tested.