#!/bin/bash

# confirm that user really means to do this
echo "Do you really mean to build the front end? This shouldn't be done often. Enter \"yes\" to confirm."
read CONFIRMATION
if [ $CONFIRMATION == "yes" ]
then
    # build front-end
    cd front
    npm run build

    # put built front-end into the django app
    cd ..
    rm -rf ./backend/front-build
    mv ./front/build ./backend/front-build
fi