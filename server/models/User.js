const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //생성할 salt의 글자수를 설정한다.
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
      type: String,
      maxlength: 50
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
  },
  oAuthId: {
    type: String
  }
})

userSchema.pre('save', function(next) { //유저스키마에 정보를 저장하기 전에 함수를 수행한다.
  var user = this;
  if(user.isModified('password')) {
      //비밀번호를 암호화 시킨다.
      bcrypt.genSalt(saltRounds, function(err, salt){
          if(err) return next(err)

          bcrypt.hash(user.password, salt, function(err, hash){
              if(err) return next(err)
              user.password = hash;
              next();
          }) //에러가 나면 다음 미들웨어로 보내고, salt를 제대로 생성하면 비밀번호 암호화를 진행한다.
      })
  }   else { //비밀번호를 제외한 사용자 정보를 변경한 경우에는 바로 다음 미들웨어로 넘어간다.
      next()
  } 
}) 

userSchema.methods.comparePassword = function(plainPassword, cb) {

  //plainPassword 1234567  암호화된 비밀번호
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) { //입략값과 db에 저장된 값을 비교하여 콜백함수를 호출한다.
      if(err) return cb(err); //에러가 발생한다면,
      cb(null, isMatch) //에러가 없다면, 비밀번호가 같다는 true값을 반환한다.(isMatch는 불린값을 반환한다.)
  })

}

userSchema.methods.generateToken = function(cb) {

  var user = this;
  //jsonwebtoken을 이용해서 token을 생성하기
  
  var token = jwt.sign(user._id.toHexString(), 'secretToken') //jwt의 sign함수를 사용하여 토큰을 생성한다.

  user.token = token //생성한 토큰을 db유저정보에 저장한다.
  user.save(function(err, user) {
      if(err) return cb(err) //에러가 있다면 콜백함수에 에러인자를,
      cb(null, user) //저장이 잘 되었다면 콜백함수에 유저정보 인자를 넣어 전달한다.
  })
}

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  //토큰을 decode한다.
  jwt.verify(token, 'secretToken', function(err, decoded){ //첫번째 인자로 전달된 토큰 정보에서 두번째 정보로 전달된 부분을 제외한 부분, 즉 user._id부분이 디코드되어 콜백함수의 인자로 전달된다.
      // 유저 아이디를 이용해서 유저를 찾은 다음에
      // 클라이언트에서 가져운 token과 DB에 보관된 토큰이 일치하는지 확인

      user.findOne({"_id": decoded, "token": token}, function(err, user){
          if(err) return cb(err); //에러가 있다면 에러정보를
          cb(null, user) //에러가 없다면 유저정보를 콜백함수의 인자로 전달한다.
      })
  })
}

const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸준다. 첫번째 인자는 모델의 이름, 두번째 인자는 스키마이다.

module.exports = { User } // 생성한 모델을 다른 파일에서도 사용할 수 있게 한다.

