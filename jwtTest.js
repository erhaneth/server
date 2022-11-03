const jwt = require("jsonwebtoken");
const myFunction = async () => {
  // tokens that are not verified will throw an error
  try {
    //create a token that you encode with a secret key
    // user data from the database is passed in as the payload
    const payload = {
      name: "Chapo",

      password: "123456",
      id: "HI I AM ID",
    };
    // this is how jwt is created
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    // this is payload data that has user data
    // .eyJuYW1lIjoiQ2hhcG8iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlkIjoiSEkgSSBBTSBJRCIsImlhdCI6MTY2MjUyODI5NCwiZXhwIjoxNjYyNTMxODk0fQ
    // this is the secret key that is used to verify the token
    // .uZ2IB-nAwn2NnXkDfZLyYyfbiTueCfCgupVCixrHBIM
    //sign and encode the token
    const token = jwt.sign(payload, "thisissecretkey", { expiresIn: 60 * 60 });
    console.log(token);
  } catch (e) {
    console.log("this is errorr", e);
  }
};
myFunction();


// from jst:
// https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2hhcG8iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlkIjoiSEkgSSBBTSBJRCIsImlhdCI6MTY2MjUyODI5NCwiZXhwIjoxNjYyNTMxODk0fQ.MLgfPCEPBN9_kuFxT6tDv-ESTWAzON4-QUH31T75r_o