#!/bin/zsh

# PRODUCTION
git reset --hard
git checkout master
git pull origin master

docker compose up -d