const jwt = require('jsonwebtoken');


module.exports= {
    generateAccessToken(id){
       let accessToken = jwt.sign({userId:id},process.env.AccessTokenSecret)
        return accessToken;
    },
    verifyAccessToken(header){
        let token = header.split(' ')[1]
        let result = jwt.verify(token,process.env.AccessTokenSecret)
        return result.userId ? {success :true,userId:result.userId} : {sucsess :false};
    },
    refreshAcessToken(id){
        let accessToken = jwt.sign({userId:id},process.env.RefreshTokenSecret)
        return accessToken;
    },
    verifyRefreshAccessToken(header){
        let token = header.split(' ')[1]
        let result = jwt.verify(token,process.env.AccessTokenSecret)
        return result.userId ? result.userId : false;
    }
}