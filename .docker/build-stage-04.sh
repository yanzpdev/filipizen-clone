#!/bin/sh

echo "[filipizen-main] exec stage-04... cleanup"
docker rmi -f filipizen-main:stage-01
docker rmi -f filipizen-main:stage-02
echo "[filipizen-main] list filipizen-main images..."
docker images | grep filipizen-main
echo ""
echo "[filipizen-main] done..."
