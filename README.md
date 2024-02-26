# axe-audit-reporting
containerized solution where you can create

## Run npm install because Dockerfile copy package*.json and node_modules
This was done so don't have to configure NPM differently between networks.
This will allow easy to upgrade and use the latest npm modules, and if not be able to troubleshoot easier without having to step into container.
``` bash
npm i
```

## Define all the applications and routes want to audit
``` bash
touch urls.txt
```
Don't put urls or seperate by commas, as it will be parsed by linebreaks

## This assumes you have podman or docker running locally
replace uname with your username or alternate path.
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

## Supports PKI for HS authentication that doesn't require 2FA
Dockerfile does allow you to mount user.json file which can be a JSONified pem file, which allow you to seperate context
There are seperate steps where you comment out lines and run a command against your pem file.

## yubikey authentication not solved
But this should not br run against prod! instead dev or test

