// const mongoose = require('mongoose');
// const bcrypt = require("bcryptjs");

// let mongoDBConnectionString = "mongodb+srv://dbUser:1234@cluster0.udirkm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// let Schema = mongoose.Schema;

// let userSchema = new Schema({
//   userName: {
//     type: String,
//     unique: true
//   },
//   password: String,
//   fullName: String,
 
// });

// let User;

// module.exports.connect = function () {
//     return new Promise(function (resolve, reject) {
//         let db = mongoose.createConnection(mongoDBConnectionString, {useNewUrlParser: true});

//         db.on('error', (err) => {
//             reject(err); // reject the promise with the provided error
//         });

//         db.once('open', () => {
//             User = db.model("users", userSchema);
//             resolve();
//         });
//     });
// };

// module.exports.registerUser =  function (userData) {
//     return new Promise(function (resolve, reject) {

//         if (userData.password != userData.password2) {
//             reject("Passwords do not match");
//         } else {

//             bcrypt.hash(userData.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
                
//                 userData.password = hash;

//                 let newUser = new User(userData);

//                 newUser.save().then(() => {
//                     resolve("User " + userData.userName + " successfully registered");
//                 }).catch(err => {
//                     if (err.code == 11000) {
//                         reject("User Name already taken");
//                     } else {
//                         reject("There was an error creating the user: " + err);
//                     }
//                 });
//             }).catch(err=>reject(err));
//         }
//     });      
// };

// module.exports.checkUser = function (userData) {
//     return new Promise(function (resolve, reject) {

//         User.find({ userName: userData.userName })
//         .limit(1)
//         .exec()
//         .then((users) => {

//             if (users.length == 0) {
//                 reject("Unable to find user " + userData.userName);
//             } else {
//                 bcrypt.compare(userData.password, users[0].password).then((res) => {
//                     if (res === true) {
//                         resolve(users[0]);
//                     } else {
//                         reject("Incorrect password for user " + userData.userName);
//                     }
//                 });
//             }
//         }).catch((err) => {
//             reject("Unable to find user " + userData.userName);
//         });
//     });
// };

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//let mongoDBConnectionString = process.env.MONGO_URL;
let mongoDBConnectionString = "mongodb+srv://dbUser:1234@cluster0.udirkm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

let Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favorite',
    },
  ],
});

let User;

let favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, required: true },
  // Add any other product-related fields you need
});

let Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports.connect = function () {
  return new Promise((resolve, reject) => {
    let db = mongoose.createConnection(mongoDBConnectionString, { useNewUrlParser: true });

    db.on('error', err => {
      reject(err);
    });

    db.once('open', () => {
      User = db.model('users', userSchema);
      resolve();
    });
  });
};

module.exports.registerUser = function (userData) {
  return new Promise((resolve, reject) => {
    if (userData.password !== userData.password2) {
      reject('Passwords do not match');
    } else {
      bcrypt.hash(userData.password, 10).then(hash => {
        userData.password = hash;

        let newUser = new User(userData);

        newUser.save().then(() => {
          resolve('User ' + userData.userName + ' successfully registered');
        }).catch(err => {
          if (err.code === 11000) {
            reject('User Name already taken');
          } else {
            reject('There was an error creating the user: ' + err);
          }
        });
      }).catch(err => reject(err));
    }
  });
};

module.exports.checkUser = function (userData) {
  return new Promise((resolve, reject) => {
    User.find({ userName: userData.userName })
      .limit(1)
      .exec()
      .then(users => {
        if (users.length === 0) {
          reject('Unable to find user ' + userData.userName);
        } else {
          bcrypt.compare(userData.password, users[0].password).then(res => {
            if (res === true) {
              resolve(users[0]);
            } else {
              reject('Incorrect password for user ' + userData.userName);
            }
          });
        }
      })
      .catch(err => {
        reject('Unable to find user ' + userData.userName);
      });
  });
};

module.exports.getFavorites = function (userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .populate('favorites')
      .exec()
      .then(user => {
        resolve(user.favorites);
      })
      .catch(err => {
        reject('Error retrieving favorites for user ' + userId);
      });
  });
};

module.exports.addFavorite = function (userId, favorite) {
    return new Promise((resolve, reject) => {
      let newFavorite = new Favorite({
        userId,
        productId: favorite.productId,
        
      });
  
      newFavorite.save().then(savedFavorite => {
        User.findByIdAndUpdate(userId, { $push: { favorites: savedFavorite._id } })
          .then(() => {
            resolve(savedFavorite);
          })
          .catch(err => {
            reject('Error adding favorite for user ' + userId);
          });
      }).catch(err => {
        reject('Error creating favorite');
      });
    });
  };

module.exports.removeFavorite = function (userId, favoriteId) {
  return new Promise((resolve, reject) => {
    Favorite.findByIdAndDelete(favoriteId)
      .then(deletedFavorite => {
        if (!deletedFavorite) {
          return resolve(null);
        }
        User.findByIdAndUpdate(userId, { $pull: { favorites: favoriteId } })
          .then(() => {
            resolve(deletedFavorite);
          })
          .catch(err => {
            reject('Error removing favorite for user ' + userId);
          });
      })
      .catch(err => {
        reject('Error deleting favorite');
      });
  });
};