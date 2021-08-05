# develop-your-own-app

# A social Network MERN APP
Tunisian Developers Community

#Technologies used : REACTJS , REDUX , NODEJS , EXPRESSJS , Passport Js auth , MongoDB

#ADMIN BRO for the admin utilities

#config folder : 
make sure to add config folder containing :

- DB_URI : wich stands for the database
- the secret key
- the file containing passport js authentification, remember to include it in the config file :


- const JwtStrategy = require('passport-jwt').Strategy,
 ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose')
const User=mongoose.model('user')

const key=require('./Key')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.SECRETORKEY;

module.exports=passport=>{

passport.use(new JwtStrategy(opts,(jwt_payload, done) =>{
    User.findById(jwt_payload.id)
    .then(user=>{
        if(user){
            return done(null,user)
        }
        return done(null,false)
    })
    .catch(err=>console.log(err))
}));
}

