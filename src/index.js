const express = require('express');
const mainRouter = require('./routers');
const app = express();
const port = 3000;

app.use(express.json());

app.use(mainRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));