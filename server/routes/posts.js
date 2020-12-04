const express = require('express')
const router = express.Router();

const { Post } = require('../models/Post');


  router.post('/', (req, res) => {
      
    //정보들을 client에서 가져오면 
    //그것들을 데이터 베이스에 넣어준다.
  
    const post = new Post(req.body);
    console.log(req.body);
    
    post.save((err, postInfo) => { //mongoose의 메서드이다.
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
  })

  module.exports = router ;