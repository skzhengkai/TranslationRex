const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help! How do I use TranslationRex?'),
  async execute(interaction) {
    const description = `**Commands**
- \`/translate [text] [language]\`: use this command to translate text to over 300+ languages!
- \`/vc join\` or \`/vc leave\` have TranslationRex join/leave your voice channel! 
 - when TranslationRex's in the VC, you may use the \`/say [text]\` command to have the bot speak the text straight into the Voice Channel.

Additionally, you may react to any message with the :t_rex: emoji, or the flag of the language (e.g. :flag_cn:).`
    const helpEmbed = new EmbedBuilder()
      .setColor('B5DA8B')
      .setTitle(`TranslationRex Help`)
      .setDescription(description)

    const supportButton = new ButtonBuilder()
      .setLabel('get support')
      .setURL('https://discord.com/invite/yxNaUYRKxs')
      .setStyle(ButtonStyle.Link);
    
    const inviteButton = new ButtonBuilder()
      .setLabel('invite t-rex')
      .setURL('https://discord.com/api/oauth2/authorize?client_id=1116129516327284928&permissions=92224&scope=applications.commands%20bot')
      .setStyle(ButtonStyle.Link);

    const voteButton = new ButtonBuilder()
      .setLabel('vote on top.gg')
      .setURL('https://top.gg/bot/1116129516327284928/vote')
      .setStyle(ButtonStyle.Link);
    
    const row = new ActionRowBuilder()
      .addComponents(supportButton, voteButton, inviteButton);

    await interaction.reply({ embeds: [helpEmbed], components: [row] });
  }
} 