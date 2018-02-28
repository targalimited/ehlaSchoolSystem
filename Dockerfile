FROM maat8/php7-composer
MAINTAINER Kyo
RUN mkdir -p /opt/school_system
COPY . .
WORKDIR /opt/school_system/backend

RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
RUN export NVM_DIR="$HOME/.nvm"
RUN [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
RUN nvm install 8.6
RUN npm i -g bower
RUN npm i -g gulp
RUN cd ../fuse
RUN bower i
RUN npm i
RUN gulp clean
RUN gulp build
RUN cd ../backend
RUN composer install
RUN cp .env.development .env
RUN iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8000
RUN iptables -t nat -I OUTPUT -p tcp -o lo --dport 80 -j REDIRECT --to-ports 8000
EXPOSE 80 13310
CMD ["php", "artisan", "serve"]