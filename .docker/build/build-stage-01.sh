#!/bin/sh
RUN_DIR=`pwd`
cd ../..
BASE_DIR=`pwd`

echo "[filipizen-main] build stage-01..."
docker rmi -f filipizen-main:stage-01
docker build --no-cache -f $RUN_DIR/Dockerfile-stage-01 -t filipizen-main:stage-01 .
echo ""
echo "[filipizen-main] done..."

cd $RUN_DIR
