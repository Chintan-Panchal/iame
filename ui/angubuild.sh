#!/bin/bash
# exit 0

mkdir dist 2> /dev/null
date > ./dist/build.html

H=`hostname`

echo "Retrieving model typeScript definitions"



if [ -e ./src/main.ts ]; then 

    echo "Found Angular stuff to build"
    export PATH=$PATH:/home/paul/Programs/node-v8.11.1-linux-x64/bin/
    rm -r ./node_modules 2> /dev/null
    rm -r ./dist/ 2> /dev/null
    npm install
    if [ $? -ne 0 ]; then
        exit 1
    fi
    ng build $1 $2 $3 $4 $5
    if [ $? -ne 0 ]; then
        exit 1
    fi

else

    echo "No src directory to build. Placing dummy index.html"
    echo "$(date) : Angular would go here" > ./dist/index.html

fi
