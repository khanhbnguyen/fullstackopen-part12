FROM node:16
  
WORKDIR /usr/src/app/backend

COPY --chown=node:node . .
RUN npm install 

ENV DEBUG=playground:*

USER node
CMD ["npm", "run", "dev", "--", "--host"]