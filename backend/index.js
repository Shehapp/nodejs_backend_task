const express = require('express');
const db = require('./config_db/database.js');
const productRouter = require('./routers/product_router');
const categoryRouter = require('./routers/category_router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
app.use('/api/v0.1/products', productRouter);
app.use('/api/v0.1/categories', categoryRouter);



app.listen(8800, () => {
    console.log('Server started at http://localhost:8800');
});

