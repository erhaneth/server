const bcrypt = require('bcrypt');

const hashTest = async () => {
    const password = '1hjguijkno';
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(password);
    console.log("this is hashed password",hashedPassword);
   
    const isMatch = await bcrypt.compare('1hjguijno', hashedPassword);
    console.log("do they matched", isMatch);
}
hashTest();
// Output:
// 123456
