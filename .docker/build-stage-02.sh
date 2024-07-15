#!/bin/sh
RUN_DIR=`pwd`
cd ..
BASE_DIR=`pwd`

echo "[filipizen-main] build stage-02..."
docker rmi -f filipizen-main:stage-02
docker build --no-cache -f $RUN_DIR/Dockerfile-stage-02 -t filipizen-main:stage-02 .
echo ""
echo "[filipizen-main] done..."

cd $RUN_DIR
