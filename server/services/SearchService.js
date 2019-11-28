const { db } = require("../config/databaseConfig");
const CustomError = require("../common/CustomError");

const findByNickname = (nickname) => {
  return new Promise((resolve, reject) => {
    const userRef = db.collection("users");
    userRef
      .where("keywords", "array-contains", nickname.toLowerCase())
      .get()
      .then(( snapshot ) => {
        if (snapshot.empty) {
          reject(
            new CustomError({
              name: "DatabaseError",
              message: "No user has been found",
              status: 404
            })
          )
        } else {
          const users = [];
          snapshot.forEach(doc => {
            users.push(doc.data())
          })
        resolve(users)
        }
      })
      .catch(err => reject(err))
  })
};

module.exports = {
  findByNickname
};
