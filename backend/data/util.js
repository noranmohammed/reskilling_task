const fs = require('node:fs/promises');

async function readUsersData() {
  const data = await fs.readFile('users.json', 'utf8');
  return JSON.parse(data);
}

async function writeUserData(data) {
  await fs.writeFile('users.json', JSON.stringify(data));
}
async function readPostsData() {
    const data = await fs.readFile('posts.json', 'utf8');
    return JSON.parse(data);
  }
  
  async function writePostData(data) {
    await fs.writeFile('posts.json', JSON.stringify(data));
  }


exports.readUsersData = readUsersData;
exports.writeUserData = writeUserData;
exports.readPostsData = readPostsData;  
exports.writePostData = writePostData;