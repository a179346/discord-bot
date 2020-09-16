require('./system/env');
require('./server');
const Discord = require('discord.js');
const bot = new Discord.Client();
// const Music = require('./utils/Music');
// const music = new Music();

bot.on('ready', () => {
  console.info('Successfully logged in!');
});

bot.on('message', async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.includes('咩噗')) return;
  const voiceChannel = msg.member.voice.channel;
  if (!voiceChannel) {
    msg.reply('咩噗');
    return;
  }

  voiceChannel.join()
    .then((connection) => {
      const dispatcher = connection.play('./mp3/mepu.mp3', { volume: 0.3 });
      dispatcher.on('finish', () => {
        setTimeout(() => {
          voiceChannel.leave();
        }, 4000);
      });
    })
    .catch((err) => console.log(err));
});

bot.login(process.env.DISCORD_BOT_TOKEN);