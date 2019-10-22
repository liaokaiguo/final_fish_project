#!/bin/bash
npm run build

APPNAME=myApp
mkdir $APPNAME
rm -rf /home/ubuntu/tools/apache-tomcat-8.5.47/webapps/$APPNAME/*
scp -r scp -r dist/. /home/ubuntu/tools/apache-tomcat-8.5.47/webapps/$APPNAME/

echo 'finished...'
