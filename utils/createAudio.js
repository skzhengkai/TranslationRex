const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = 'https://tiktok-tts.weilnet.workers.dev/api/generation';

async function downloadAudio(TTSText) {
  const payload = {
    text: TTSText,
    voice: 'en_us_006',
  };

  const headers = {
    'Content-Type': 'application/json',
    'Origin': 'https://weilbyte.github.io',
    'Referer': 'https://weilbyte.github.io/',
    'Sec-Ch-Ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43',
  };

  try {
    const response = await axios.post(url, payload, { headers });
    const audioData = response.data.data;

    if (audioData) {
      const audioBuffer = Buffer.from(audioData, 'base64');
      const filePath = path.join(__dirname, '..', 'data', 'audio.mp3');

      fs.writeFileSync(filePath, audioBuffer);
      console.log(`Audio saved to ${filePath}`);
    } else {
      console.error('Error: Audio data not received in the response');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {
  downloadAudio
};