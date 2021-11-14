#!/bin/bash

# build front-end
cd front
npm run build

# put built front-end into the django app
cd ..
rm -rf ./server/front-build
mv ./front/build ./server/front-build

# push changes to the repo
git add .
git commit -m "updated build"
git push origin master