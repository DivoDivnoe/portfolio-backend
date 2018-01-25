const mongoose = require('mongoose');
const readline = require('readline');

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const config = require('./config/config.json');
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`)
  .catch(err => {
    console.error(err);
    throw err;
  });

let login = '';
let password = '';

r1.question('Логин: ', answer => {
  login = answer;

  r1.question('Пароль: ', answer => {
    password = answer;

    r1.close();
  });
});

r1.on('close', () => {
  require('./api/models/user');

  const User = mongoose.model('user');
  const adminUser = new User({login: login});
  adminUser.setPassword(password);

  User.findOne({login: login})
    .then(u => {
      if (u) {
        throw new Error('Такой пользователь уже существует!');
      }

      return adminUser.save();
    })
    .then(u => console.log('ok!'), e => console.error(e.message))
    .then(() =>
      mongoose.connection.close(function() {
        process.exit(0);
      })
    );
});
