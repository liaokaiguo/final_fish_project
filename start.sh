#!/bin/bash
npm install chalk

rm -rf dist/

npm run build

APPNAME=myApp
mkdir /home/ubuntu/tools/apache-tomcat-8.5.47/webapps/$APPNAME
rm -rf /home/ubuntu/tools/apache-tomcat-8.5.47/webapps/$APPNAME/*
scp -r dist/. /home/ubuntu/tools/apache-tomcat-8.5.47/webapps/$APPNAME/

echo 'finished...'
