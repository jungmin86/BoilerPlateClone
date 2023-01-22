const express = require('express');
const app = express();
const port = 5000;

const { User } = require('./models/User');
const bodyParser = require('body-parser'); //req.body로 정보를 받아옴
const cookieParser = require('cookie-parser');

const config = require('./config/key.js');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());
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

app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일의 해당하는 유저가 없습니다."
      })
    }
    //요청된 이메일이 데이터베이스에 있으면, 맞는지 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json( { loginSuccess: false, message: "비밀번호가 틀렸습니다."});
    //비밀번호가 맞다면 해당 유저를 위한 Token 생성 
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        //토큰을 저장한다. 어디에? 쿠키? 로컬스토리지? -> 쿠키
        res.cookie("x_auth", user.token)
        .status(200).json({ loginSuccess: true, userId: user._id }) 
      })
    })
  })
  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})