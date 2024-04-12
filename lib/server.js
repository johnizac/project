const express = require("express");
const cors = require("cors");
//const dataService = require("./data-service.js");
const userService = require("./user-service.js");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// JSON Web Token Setup
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

// Configure its options
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: '&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH',
};

// IMPORTANT - this secret should be a long, unguessable string
// (ideally stored in a "protected storage" area on the web server).
// We suggest that you generate a random 50-character string
// using the following online tool:
// https://lastpass.com/generatepassword.php

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values 
        // that matches the request payload data
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.userName, 
            fullName: jwt_payload.fullName, 
            
         }
        ); 
    } else {
        next(null, false);
    }
});

// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());

app.use(cors());
app.use(express.json());



app.post("/api/register", (req,res)=>{
    userService.registerUser(req.body).then(msg=>{
        res.json({message: msg});
    }).catch(msg=>{
        res.status(422).json({message: msg});
    });
});

app.post("/api/login", (req, res) => {
    userService.checkUser(req.body)
        .then((user) => {

            let payload = { 
                _id: user._id,
                userName: user.userName,
                fullName: user.fullName,
                
            };
            
            let token = jwt.sign(payload, jwtOptions.secretOrKey);

            res.json({ "message": "login successful", "token": token });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});


  
  // Add a favorite for authenticated user
  app.post('/api/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const newFavorite = await userService.addFavorite(req.user._id, req.body);
      res.status(201).json(newFavorite);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// Remove a favorite for authenticated user
app.delete('/api/favorites/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const favorite = await userService.removeFavorite(req.user._id, req.params.id);
      if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found' });
      }
      res.json({ message: 'Favorite removed' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
app.use((req, res) => {
    res.status(404).end();
});

userService.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log("API listening on: " + HTTP_PORT);
    });
}).catch(err=>console.log(err))

