const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });
const port = process.env.PORT;
const mongoDB = require('./config/db');
const userRouter = require('./routes/userRoute');

var cors = require('cors');

app.use(
    cors({
        origin: true,
    })
);

mongoDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', userRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})