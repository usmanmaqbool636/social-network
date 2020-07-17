var bcrypt = require('bcryptjs');
// var hash = bcrypt.hashSync('bacon', 8);
const result= bcrypt.compareSync("123456", '$2a$10$Ox1Y7812CVVU.YpqwJ.jUeMZDwNa./jynkbwwZQtxPYWDGJ9THqPW');
console.log(result)
console.log(bcrypt.compareSync("123456", "$2a$10$N5Nm74n/wN0bDlY/2nF/MuOTY/7dy3EJ9jesj9QHeClHHPLdQaOcG"));

// mubeen 
console.log(bcrypt.compareSync("123456", "$2a$10$yDW5gcpIOYUPgkmXgR/zlOatqQU.wqhi.y1c6tplX8vlWxPoasOUW"));
