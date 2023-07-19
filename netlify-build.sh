#!/bin/bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
docker build -t kb:0.9 . && docker run -dp 1313:1313 -t kb:0.9