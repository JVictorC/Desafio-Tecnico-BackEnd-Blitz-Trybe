const express = require('express');
const mainRouter = require('./routers');
const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost']
}));

app.use(express.json());

app.use(mainRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));