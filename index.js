import dotenv from 'dotenv';
import makeRequest from './request.js';
import settings from './settings.js';

dotenv.config();
const baseURL = 'https://discord.com/api/v9';

let currentWord = 0;

async function applyInfo() {
  const updatedData = {
    custom_status: {
      text: settings.text[currentWord],
      emoji_name: settings.emoji,
      expires_at: new Date(Date.now() + (settings.interval + 5) * 1000).toISOString()
    }
  };

  try {
    await makeRequest(baseURL, process.env.ACCESS_TOKEN, updatedData);
    currentWord++;
    if (currentWord >= settings.text.length) currentWord = 0;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

console.log('\x1b[36m%s\x1b[0m', 'The script has started!');
setInterval(applyInfo, settings.interval * 1000);
