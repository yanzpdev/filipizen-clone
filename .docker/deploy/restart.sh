#!/bin/sh
RUN_DIR=`pwd`
BASE_DIR=`pwd`

cd $BASE_DIR && docker-compose --project-name filipizenMain  down

cd $BASE_DIR && docker-compose --project-name filipizenMain  up -d

cd $BASE_DIR && docker-compose --project-name filipizenMain  logs -f

cd $RUN_DIR
