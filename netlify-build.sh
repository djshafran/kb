#!/bin/bash
# echo "[ENV VAR] GOROOT is: $GOROOT"
printenv | grep -i GO

apk add --no-cache go hugo git make perl
#git config --global --add safe.directory '/quartz'

go env
go install github.com/jackyzha0/hugo-obsidian@latest

#PATH="/root/go/bin:$PATH"
#git clone https://github.com/djshafran/kb /quartz

#WORKDIR /quartz

make help 
# make update-force
make serve