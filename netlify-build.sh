#!/bin/bash
# echo "[ENV VAR] GOROOT is: $GOROOT"
printenv | grep -i GO
make help 
make update-force
make serve