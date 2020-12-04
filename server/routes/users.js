const express = require('express')

const router = express.Router();

const { auth } = require('../middleware/auth') //미들웨어 역할을 하는 모듈을 직접 만들어 임포트한다.
const { User } = require('../models/User');

router.post('/login', (req, res) => {

  //  소셜 로그인 시
if (req.body.oAuthId) { //요청 body에 oAuthId 키가 존재하는지 체크한다.
  //만일 존재한다면, DB에 해당 oAuthId를 갖고있는 유저를 탐색한다.
  User.findOne({ oAuthId: req.body.oAuthId }, (err, user) => {
    if (!user) {
      const userSchema = new User(req.body);
      // 계정 생성
      userSchema.save((err, _) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          registerSuccess: true,
        });
      });
    }

    //JWT 토큰 발급
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      // save Token at Cookie
      res
        .cookie("x_auth", user.token) //쿠키에 JWT토큰을 넣어준다.
        .status(200)
        .json({ loginSuccess: true, userId: user._Id, token: user.token });
    });
  });
  return;
} else { //일반 로그인 시
      console.log(req.body)
      //요청된 이메일을 데이터베이스에서 있는지 찾는다.
      User.findOne({ email: req.body.email }, (err, user) => {
          if(!user) {
              console.log("등록되지 않은 이메일입니다.");
              //alert("제공된 이메일에 해당하는 유저가 없습니다.");
              return res.json({
              loginSuccess: false,
              message: "등록되지 않은 이메일입니다."
              });
          }
      //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
          user.comparePassword(req.body.password, (err, isMatch) => {
              if(!isMatch) //만약 비밀번호가 맞지 않다면,
                  return res.json({ 
                  loginSuccess: false, 
                  message: "비밀번호가 틀렸습니다.",
              });  
          //비밀번호까지 맞다면 토큰을 생성하기.
          user.generateToken((err, user) => {
              if(err) return res.status(400).send(err); 
              console.log("로그인에 성공했습니다.")
              //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 여러가지 방법이 있고 각각 장단점이 존재한다.
              res
                  .cookie("x_auth", user.token) //첫번째 인자로 쿠키의 이름, 두번째 인자로 쿠키의 값이 전달된다.
                  .status(200)
                  .json({ loginSuccess: true, userId: user._id, token: user.token });
              })
          });
      });
      //비밀번호까지 맞다면 토큰을 생성하기.
  }
});

  router.post('/signup', (req, res) => {
      
    //회원가입할 때 필요한 정보들을 client에서 가져오면 
    //그것들을 데이터 베이스에 넣어준다.
  
    const user = new User(req.body);
    console.log(req.body);
    
    user.save((err, userInfo) => { //mongoose의 메서드이다.
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
  })
  
  
  // ex) role 1 어드민 role 2 특정 부서 어드민 ...
  // 이 경우에는, role 0 -> 일반유저 role 0이 아니면 관리자
  router.get('/auth', auth , (req, res) => {
  
    //여기까지 미들웨어를 통과해 왔다는 이야기는 Authentication이 true라는 말이다.
    res.status(200).json({
      _id: req.user._id, //auth미들웨어에서 user정보를 req.user에 저장하였기 때문에 이와 같이 _id값을 가져올 수 있다.
      isAdmin: req.user.role === 0 ? false : true,
       //role 0 -> 일반유저 role 0이 아니면 관리자이다.
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    })
  })
  
  router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, 
      { token: "" } //토큰을 지워준다.
      , (err, user) => {
        if(err) return res.json({ success: false, err }); //에러가 발생하면,
        console.log("로그아웃에 성공했습니다.");
        return res.status(200).json({ success: true, isAuth: false }); 
        // return res.status(200).send({ // 에러가 발생하지 않는다면,
        //        success: true,
        // // })
      })
  })

module.exports = router; 