 #!/bin/bash

set -x

docker rmi google-vps-web-project-backend:prev
docker tag google-vps-web-project-backend:latest google-vps-web-project-backend:prev
docker build -t google-vps-web-project-backend:latest .

set +x
