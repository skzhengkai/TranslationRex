const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, hyperlink } = require('discord.js');

const client_id = process.env['CLIENT_ID'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('invite translation-rex to your own server!'),
  async execute(interaction) {
    const inviteButton = new ButtonBuilder()
      .setLabel('invite t-rex')
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=92224&scope=applications.commands%20bot`)
      .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
      .addComponents(inviteButton);
    
    const inviteDescription = 
`Invite TranslationRex to your server by [clicking here](https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=84032&scope=bot%20applications.commands) or the button below! Thanks!`
    const inviteEmbed = new EmbedBuilder()
      .setColor('B5DA8B')
      .setTitle(`Invite TranslationRex`)
      .setDescription(inviteDescription)

    await interaction.reply({ embeds: [inviteEmbed], components: [row] });
  }
}