#!/bin/bash
# echo "[ENV VAR] GOROOT is: $GOROOT"
printenv | grep -i GO

apk add --no-cache go hugo git make perl
#git config --global --add safe.directory '/quartz'
go install --tags extended
go env
go install github.com/jackyzha0/hugo-obsidian@latest

PATH="$GOPATH/bin:$PATH"
exit 0
#git clone https://github.com/djshafran/kb /quartz

#WORKDIR /quartz

# make help 
# make update-force