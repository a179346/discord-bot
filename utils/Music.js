class Music {
  constructor () {
    this.connection = {};
    this.connectionStatus = {};
    this.dispatcher = {};
  }

  // Bot 加入語音頻道
  async join (msg) {
    try {
      this.connection[msg.guild.id] = await msg.member.voice.channel.join();
    } catch (error) {
      console.log(error);
    }
  }

  play (msg) {
    // 語音群的 ID
    const guildId = msg.guild.id;

    // 如果 Bot 還沒加入該語音群的語音頻道
    if (!this.connection[guildId]) return;
    if (this.connectionStatus[guildId] && this.connectionStatus[guildId].isPlaying) return;
    this.connectionStatus[guildId] = { isPlaying:true };

    this.playMusic(msg, guildId);
  }

  playMusic (msg, guildId) {
    // 播放音樂
    this.dispatcher[guildId] = this.connection[guildId].play('../mp3/ball.mp3', { volume: 0.5 });

    console.log('music start');
    // 歌曲播放結束時的事件
    const self = this;
    this.dispatcher[guildId].on('finish', () => {
      console.log('music end');
      self.leave(guildId);
    });
  }

  leave (guildId) {
    this.connection[guildId].disconnect();
    delete this.connectionStatus[guildId];
    delete this.dispatcher[guildId];
  }
}

module.exports = Music;