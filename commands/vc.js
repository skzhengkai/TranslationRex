const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');
const { checkIfUserVoted } = require('../utils/usermanager.js');
const path = require('path');
const fs = require('node:fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vc')
    .setDescription('manage vc thing')
    .addSubcommand(subcommand =>
      subcommand
        .setName('join')
        .setDescription('t-rex joins a vc')
        .addChannelOption(option =>
          option.setName('vc')
            .setDescription('what vc')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('leave')
        .setDescription('have t-rex leave the vc')),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "join") {
      if (getVoiceConnection(interaction.guild.id)) {
        const cannotJoinEmbed = new EmbedBuilder()
          .setColor('303434')
          .setDescription(`The TranslationRex is already in a Voice Channel!`)
          .setFooter({ text: '🦖 TranslationRex V1.0' })

        await interaction.reply({ embeds: [cannotJoinEmbed] });
        // connection.destroy();
        return;
      }
      const channelToJoin = interaction.options.getChannel('vc');

      const connection = joinVoiceChannel({
        channelId: channelToJoin.id,
        guildId: channelToJoin.guild.id,
        adapterCreator: channelToJoin.guild.voiceAdapterCreator,
      });

      const joinedEmbed = new EmbedBuilder()
        .setColor('303434')
        .setDescription(`Translation-Rex has joined the vc <#${channelToJoin.id}>`)
        .setFooter({ text: '🦖 TranslationRex V1.0' })

      await interaction.reply({ embeds: [joinedEmbed] });
      
      const botData = JSON.parse(fs.readFileSync('./data/botstats.json'));
      botData.slash_commands.vc_join++;
      fs.writeFileSync('./data/botstats.json', JSON.stringify(botData, null, 2));
      return;
    }
    if (interaction.options.getSubcommand() === "leave") {
      const connection = getVoiceConnection(interaction.guild.id);
      if (!connection) {
        const cannotJoinEmbed = new EmbedBuilder()
          .setColor('303434')
          .setDescription(`Translation Rex is not yet in a Voice Chat!`)
          .setFooter({ text: '🦖 TranslationRex V1.0' })

        await interaction.reply({ embeds: [cannotJoinEmbed] });
        return;
      } else {
        connection.destroy();
        const leftEmbed = new EmbedBuilder()
          .setColor('303434')
          .setDescription(`Successfully left the Voice Channel!`)
          .setFooter({ text: '🦖 TranslationRex V1.0' })

        await interaction.reply({ embeds: [leftEmbed] });
        return;
      }
    }
  }
}