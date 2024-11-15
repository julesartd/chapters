const express = require('express');
const { MONGO_URI } = require('./config/database');
const mongoose = require('mongoose');
const chapterRoutes = require('./routes/chapter_routes');
const path = require('path');
const cors = require('cors');
const {responseMiddleware} = require("./middlewares/response");
const {errorHandlerMiddleware} = require("./middlewares/error_handler");

const app = express();

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(responseMiddleware);
app.use('/api', chapterRoutes);

app.use(errorHandlerMiddleware);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});