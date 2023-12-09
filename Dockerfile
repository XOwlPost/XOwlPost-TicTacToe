FROM node:16  # Or whichever version you need
WORKDIR /app
COPY ./TicTacToe/package*.json ./
RUN yarn install
COPY ./TicTacToe ./
EXPOSE 3000
CMD yarn install && yarn start
```
Then, you can build the image with `docker build -t tictactoe .` and run it with `docker run -p 3000:3000 tictactoe`.   