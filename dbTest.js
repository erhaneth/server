const db = require('./models');

// testing user creation
db.User.create({
    name: 'Chapo',
    email: 'chapo@dogs.com',
    password: '123456',
})
.then((user) => {
    console.log(user);
    process.exit();
}
)
.catch((err) => {
    console.log(err);
    process.exit();
}
);
