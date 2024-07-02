import express from 'express';
const app = express();




app.get('/', (req, res) => {
    res.json('ok_computer');
});


app.listen(8800, () => {
  console.log('http://localhost:8800 hit me');
});