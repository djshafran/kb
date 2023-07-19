#!/bin/bash
echo "[ENV VAR] GOROOT is: $GOROOT"
make help 
make update-force
make serve