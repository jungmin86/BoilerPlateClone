const express = require('express');
const app = express();
const port = 5000;


const { User } = require('./models/User');
const bodyParser = require('body-parser'); //req.body로 정보를 받아옴

const config = require('./config/key.js');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(config.mongoURI)
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));





app.get('/', (req, res) => {
  res.send('This is Nodemon!');
})

app.post('/register', (req, res) => {
  //회원가입할 때 필요한 정보들을 client에서 가져오고, 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body); //req.body -> { id: Hello, password: 123}
  user.save((err, userInfo) => {
    if(err) return res.status(400).json({success: false, err});
    res.status(200).json({success: true, userInfo});
  })

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})