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

## Supports PKI for authentication and 2FA
If need help configuring a proxy, mounting certs, etc. You can reach out.
