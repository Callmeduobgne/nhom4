FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333
ENV PORT=3333

ENV REACT_APP_API_URL=http://localhost:8000/api

CMD ["npm", "start"]
