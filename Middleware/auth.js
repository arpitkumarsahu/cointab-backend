const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    if(!req.headers.authorization){
        return res.send("please login again")
    }
    const token = req.headers.authorization.split(" ")[1]
    
    jwt.verify(token,"secret",function(err,decoded){
        if(err){
            return res.send("Login Again")
        }
        console.log(decoded)
        req.body.email = decoded.email
        req.body.userId = decoded.userId
        next()
    });
}
module.exports = authentication