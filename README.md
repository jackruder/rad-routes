# Rad Routes

Routes, but they're rad.

### Development Setup
```
git clone https://github.com/apc518/rad-routes.git
cd rad-routes
sudo chmod +rwx deploy.bash
```

Open up two terminals, one for the front and one for the server.

WARNING: `deploy.bash` IS NOT TO BE USED OFTEN. Its purpose is simply to autoomate part of the _deployment_ process, which should happen fairly infrequently. It should be preceeded by extensive testing.

Django and React with both hot reload as you make changes, so during the thick of development there is no need to be calling `deploy.bash`. Even as you make commits, there is no need to run `deploy.bash` for every commit. Instead, it should be run for every major feature (or critical fix) that is finished and tested.