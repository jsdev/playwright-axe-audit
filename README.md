# axe-audit-reporting
containerized solution where you can create audits keyed off domain and routes.

## Run npm install because Dockerfile copy package*.json and node_modules
This was done so don't have to configure NPM differently between open or closed networks.
This will allow easy to upgrade and use the latest npm modules, and if not be able to troubleshoot easier without having to step into container.
``` bash
npm i

mkdir reports
```

## Define all the applications and routes want to audit
``` bash
touch urls.txt
```
Don't put urls in quotes or seperate by commas, it simply will be parsed by linebreaks

## This assumes you have docker running locally, or something that mimics docker CLI like podman
Replace /Users/uname with your absolute path which you can run pwd to get.

``` bash
podman build -t axe-audit-reporting .

podman run \
  -v /Users/uname/reports:/app/reports \
  -v /Users/uname/urls.txt:/app/urls.txt \
  axe-audit-reporting
```

``` bash
docker build -t axe-audit-reporting .

docker run \
  -v /Users/uname/reports:/app/reports \
  -v /Users/uname/urls.txt:/app/urls.txt \
  axe-audit-reporting
```

## Supports PKI for authentication that doesn't require 2FA
Dockerfile does allow you to mount user.json file which can be a JSONified pem file. Playwright makes this easy to pass in using context.
There are seperate steps where you comment out lines and run a command against your pem file.
Which I'll be posting later this week.


