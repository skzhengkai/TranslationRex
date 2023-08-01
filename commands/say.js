const { SlashCommandBuilder, EmbedBuilder, hyperlink, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');

const path = require('path');

const { downloadAudio } = require('../utils/createAudio.js');
const { checkIfUserVoted } = require('../utils/usermanager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('say something in vc')
    .addStringOption(option =>
      option.setName('what')
        .setDescription('what to say')
        .setRequired(true)),
  async execute(interaction) {
    if (!await checkIfUserVoted(interaction.user.id)) {
      const needToVoteEmbed = new EmbedBuilder()
        .setColor('303434')
        .setTitle(`Please Vote!`)
        .setDescription(`To unlock access this command for free, please upvote the bot on top.gg to unlock it for the day!\n\n${hyperlink('vote for TranslationRex on top.gg!', 'https://top.gg/bot/1116129516327284928/vote')}\n\nafter voting, you'll have completely free access to this command, with no costs! Thank you!`)

        .setTimestamp();

      const voteButton = new ButtonBuilder()
        .setLabel('vote on top.gg')
        .setURL('https://top.gg/bot/1116129516327284928/vote')
        .setStyle(ButtonStyle.Link);

      const supportButton = new ButtonBuilder()
        .setLabel('get support')
        .setURL(`https://discord.gg/yxNaUYRKxs`)
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder();
      row.addComponents(voteButton, supportButton);

      await interaction.reply({ embeds: [needToVoteEmbed], components: [row], ephemeral: true });

      return;
    }
    const connection = getVoiceConnection(interaction.guild.id);
    if (!connection) {
      const cannotJoinEmbed = new EmbedBuilder()
        .setColor('303434')
        .setDescription(`i am not in a vc.`)
        .setFooter({ text: 'vc test 1.0' })

      await interaction.reply({ embeds: [cannotJoinEmbed] });
      // connection.destroy();
      return;
    }

    const textToSay = interaction.options.getString('what');
    await downloadAudio(textToSay);

    const player = createAudioPlayer();

    const audioFilePath = path.join(__dirname, '..', 'data', 'audio.mp3');

    const resource = createAudioResource(audioFilePath);
    player.play(resource);

    connection.subscribe(player);

    const saidEmbed = new EmbedBuilder()
      .setColor('303434')
      .setDescription(`said in the vc \`${textToSay}\``)
      .setFooter({ text: 'vc test 1.0' })

    await interaction.reply({ embeds: [saidEmbed] });
  }
}