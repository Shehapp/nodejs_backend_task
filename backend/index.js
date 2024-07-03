const express = require('express');
const passport = require('passport');
const productRouter = require('./routers/product_router');
const categoryRouter = require('./routers/category_router');
const authRouter = require('./routers/auth_router');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(session({
  secret: '2a3b7f89c1e53d9a6e2b9aee909db7f7',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.session());
app.use(passport.initialize());
app.use(flash());

require('./utils/passport-config')(passport);


//routes
app.use('/api/v0.1/products', productRouter);
app.use('/api/v0.1/categories', categoryRouter);
app.use('/api/v0.1/auth', authRouter);


const db  = require('./models');

db.sequelize.sync().then(() => {
  app.listen(8800, () => {
    console.log('Server is running on port 8800');
  });
});
