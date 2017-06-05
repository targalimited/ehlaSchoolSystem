#!/bin/bash

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 7
nvm use 7
cd fuse
npm i -g bower
bower i
npm i -g gulp
npm i gulp
npm i
gulp clean
gulp build
cd ../backend
composer install
cp .env.development .env
