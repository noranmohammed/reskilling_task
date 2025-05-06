const { hash } = require('bcryptjs');
const { NotFoundError } = require('../utils/errors');
const { readUsersData, writeUserData } = require('./util');

async function add(data) {
    const storedData = await readUsersData();
    const userId = storedData.length > 0
      ? Math.max(...storedData.map(user => user.id)) + 1
      : 1;
  
    const hashedPw = await hash(data.password, 12);
    if (!storedData) {
      storedData = [];
    }
    storedData.push({ ...data, password: hashedPw, id: userId });
    await writeUserData(storedData);
    return { id: userId, email: data.email };
  }

async function get(email) {
  const storedData = await readUsersData();
  if (!storedData || storedData.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = storedData.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  return user;
}

exports.add = add;
exports.get = get;