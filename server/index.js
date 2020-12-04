// 기본 설정 ( 모듈 불러오기 + 기타 등등 )
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const { auth } = require('./middleware/auth') //미들웨어 역할을 하는 모듈을 직접 만들어 임포트한다.
const { User } = require('./models/User');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// var NaverStrategy = require('passport-naver').Strategy;
// var KakaoStrategy = require('passport-kakao').Strategy;

//application/json
app.use(bodyParser.json());
//application/X-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

// 데이터베이스 설정
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thswlsqls:test1234mongodb@cluster0.ha0bc.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// // 데이터베이스 불러오기
// const { UserSchema } = require('./models');

const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('메인 페이지입니다.')
})

// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//   clientID: '382072446400936', //process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: 'f0bf8bd7a9eb48a102646445af7f7823', //process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


// 클라이언트 -> 서버 -> 데이터 베이스

// app.post('/api/customers', async  (req, res, next) => {
//      await Post.create({  
//       name: req.body.name,  
//       birthday: req.body.birthday, 
//       Num: 1,
//       image : 'https://placeimg.com/64/64/any'
//     });
// })

// // 데이터 베이스 -> 서버 -> 클라이언트

// app.get('/api/customers' , async  (req, res, next) => {
//     const post = await Post.findAll();
//     res.send(post);
// });

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.use((req, res, next) => {
  next('Not found error!')
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});

