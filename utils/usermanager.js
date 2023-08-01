const fs = require('fs');

const votesFilePath = './data/votes.json';

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch(err) {
          console.error(err);
        }
      }
    });
  });
}

function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function checkIfUserVoted(userId) {
  try {
    const votesData = await readFile(votesFilePath);

    const twelveHoursInMs = 12 * 60 * 60 * 1000;
    const userVote = votesData[userId];
    if (userVote && userVote.lastVoteTimestamp >= Date.now() - twelveHoursInMs) {
      console.log('User has voted');
      return true;
    } else {
      console.log('User has not voted');
      return false;
    }
  } catch (err) {
    console.error('Error checking user vote:', err);
    return false;
  }
}

module.exports = {
  checkIfUserVoted,
};
