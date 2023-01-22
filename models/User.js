const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = Schema({
    name: {
        type: String,
        maxlength: 40
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) { //next 하면 index.js의 user.save 구문으로 들어감

    var user = this;
    //비밀번호를 암호화시킨다.
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash) { //hash -> 암호화된 비밀번호
                if(err) return next(err);
                user.password = hash; //교체
                next(); //넥스트로 돌아가기
            })
        })
    }
})

const User = mongoose.model('User', userSchema);

module.exports = { User };
// export default User;