#!/bin/bash

PM2_APP_NAME='lumodine-qr-api'

if pm2 list | grep "online" | grep $PM2_APP_NAME; then
    PM2_EXIST="Yes"
else
    PM2_EXIST="No"
fi

if [ "$PM2_EXIST" = "Yes" ]; then
    pm2 restart $PM2_APP_NAME
else
    pm2 start npm --name $PM2_APP_NAME -- start
fi