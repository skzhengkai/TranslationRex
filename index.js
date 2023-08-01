require('dotenv').config();
const InitCrashHandler = require('./crashHandler.js');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

const token = process.env.TOKEN;

// Initialize the crash handler
InitCrashHandler('Unhandled Rejection');
InitCrashHandler('Multiple Resolves');
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageTyping,
  ],
  partials: [Partials.Channel],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', (req, res) => {
  const votesFilePath = './data/votes.json';
  const { user, bot, type } = req.body;

  if (type !== 'upvote') {
    console.log(`Ignoring vote of type "${type}" for bot ${bot} from user ${user}`);
    res.sendStatus(200);
    return;
  }

  const userId = user;
  const botId = bot;
  const voteType = type;
  const voteTimestamp = Date.now();

  let votesData = {};
  try {
    const votesFileContent = fs.readFileSync(votesFilePath, 'utf-8');
    votesData = JSON.parse(votesFileContent);
  } catch (err) {
    handleError(err);
  }

  votesData[userId] = { lastVoteTimestamp: voteTimestamp };

  try {
    const votesJson = JSON.stringify(votesData, null, 2);
    fs.writeFileSync(votesFilePath, votesJson);
    console.log('Votes data updated and saved successfully.');
  } catch (err) {
    handleError(err);
  }

  res.sendStatus(200);
});

const axios = require('axios');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

  axios.get('https://api.ipify.org/?format=json')
    .then(response => {
      const ip = response.data.ip;
      console.log(`Visit http://${ip}:${PORT} to access the server.`);
    })
    .catch(err => {
      console.error('Error retrieving public IP address:', err);
    });
});