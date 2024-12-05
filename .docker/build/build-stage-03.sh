#!/bin/sh
RUN_DIR=`pwd`
cd ../..
BASE_DIR=`pwd`

echo "[filipizen-main] build stage-03..."
docker rmi -f ramesesinc/filipizen-main:1.01
echo ""
docker build --no-cache -f $RUN_DIR/Dockerfile-stage-03 -t ramesesinc/filipizen-main:1.01 .
echo ""
echo "[filipizen-main] done..."

cd $RUN_DIR
