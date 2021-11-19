import fetch from 'node-fetch';
import dotenv from 'dotenv';
import dictionary from './dictionary.js';

const baseURL = 'https://discord.com/api/v9';
dotenv.config();

let currentWord = 0;

async function applyInfo() {
  const updatedParams = {
    custom_status: {
      text: dictionary[currentWord],
      emoji_name: '🚀',
      expires_at: new Date(Date.now() + 10 * 1000).toISOString()
    }
  };

  const requestParams = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: process.env.ACCESS_TOKEN
    },
    body: JSON.stringify(updatedParams)
  };

  try {
    const response = await fetch(`${baseURL}/users/@me/settings`, requestParams);
    const data = await response.json();
    console.log(data.custom_status);
    currentWord++;
    if (currentWord >= dictionary.length) currentWord = 0;
  } catch (err) {
    console.log(err);
  }
}

setInterval(applyInfo, 5 * 1000);
