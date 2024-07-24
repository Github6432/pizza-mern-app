const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/config');
require('colors');
const morgan = require('morgan');


//config
dotenv.config();

//connction Mongodb
connectDB()

const app = express();


//middleware
app.use(express.json());
app.use(morgan('dev'));

//Route
app.use('/api/pizzas/', require('./routes/pizzaRoute'));
app.use('/api/users/', require('./routes/userRoutes'));
app.use('/api/orders/', require('./routes/orderRoute'));

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"))
})


//port
const port = process.env.PORT || 7000 ;
//listen
app.listen(port, () => {
    console.log(` Server Running on ${process.env.NODE_ENV} mode on Port no ${port} =>> http://localhost:${port}`.bgMagenta);
});