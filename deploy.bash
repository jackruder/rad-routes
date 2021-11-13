#!/bin/bash

# build front-end
cd front
npm run build

# put built front-end into the django app
cd ..
mv ./front/build ./server/radroutes/front-build/

# push changes to the repo
git add .
git commit -m "updated build"
git push origin master