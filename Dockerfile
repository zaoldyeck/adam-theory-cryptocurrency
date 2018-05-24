FROM node
ADD .deploy/adam-theory-cryptocurrency.tar.gz /home/meteor/
WORKDIR /home/meteor/bundle/programs/server
RUN npm install

ENV ROOT_URL http://127.0.0.1
ENV PORT 3000
EXPOSE 3000

WORKDIR /home/meteor/bundle
CMD node ./main.js