const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://jungmin86:jungmin86@youtubeclone.qlbjgzm.mongodb.net/?retryWrites=true&w=majority').
then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));





app.get('/', (req, res) => {
  res.send('This is Jungmin!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})