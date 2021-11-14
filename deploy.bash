#!/bin/bash

# confirm that user really means to do this
echo "Do you really mean to deploy the front end? This shouldn't be done often. Enter \"yes\" to confirm."
read CONFIRMATION
if [ $CONFIRMATION == "yes" ]
then
    echo "Enter a message:"
    read COMMIT_MESSAGE

    # build front-end
    cd front
    npm run build

    # put built front-end into the django app
    cd ..
    rm -rf ./server/front-build
    mv ./front/build ./server/front-build

    MESSAGE="Updated front-build: "
    MESSSAGE+=$COMMIT_MESSAGE

    # push changes to the repo
    git add .
    git commit -m MESSAGE
    git push origin master
fi