const {User} = require("../models/User");


let auth = (req, res, next) => {

    //인증 처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err; //에러가 있다면,
        if(!user) return res.json({ isAuth: false, error: true }) //유저가 없다면,
    
        req.token = token;
        req.user = user; //미들웨어에서 이와같은 처리를 해줌으로서 이 미들웨어를 임포트한 다른 파일에서도 저장된 토큰정보와 유저정보를 사용할 수 있다.
        next();
    });
    //유저가 있으면 인증 okay

    //유저가 없으면 인증 no
}

module.exports = { auth };
