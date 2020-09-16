require('./system/env');
require('./server');
const Discord = require('discord.js');
const bot = new Discord.Client();
const { v4: uuidv4 } = require('uuid');
const inChannel = {};

bot.on('ready', () => {
  console.info('Successfully logged in!');
});

bot.on('message', async (msg) => {
  try {
    if (msg.author.bot) return;
    if (!msg.content.includes('咩噗')) return;
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) return;

    const guildId = msg.guild.id;
    const playeId = uuidv4();
    inChannel[guildId] = playeId;

    voiceChannel.join()
      .then((connection) => {
        const dispatcher = connection.play('./mp3/mepu.mp3', { volume: 0.3 });
        dispatcher.on('finish', () => {
          setTimeout(() => {
            if (inChannel[guildId] === playeId) {
              delete inChannel[guildId];
              voiceChannel.leave();
            }
          }, 4000);
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log('onMessageError', error);
  }
});

bot.login(process.env.DISCORD_BOT_TOKEN);
