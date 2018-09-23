FROM arm32v6/node:alpine

RUN apk add --no-cache curl gcc g++ make python2 && \
 mkdir -p /usr/src && \
 curl -s http://www.airspayce.com/mikem/bcm2835/bcm2835-1.56.tar.gz | tar -C /usr/src -xvz && \
 cd /usr/src/bcm2835-1.56 && \
 ./configure --prefix=/usr && \
 make && \
 make install && \
 rm -rf /usr/src/bcm2835-1.56 && \
 apk del curl

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]