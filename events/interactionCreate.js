const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);

        interaction.reply({ content: `error~ no command matching /${interaction.commandName} was found >-<`, ephemeral: true })

        // await interaction.editReply({ content: `error~ no command matching \`/${interaction.commandName}\` was found >-<\n\nsupport server: discord.gg/w3G4bkru6D`, ephemeral: true });

        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        interaction.reply({ content: `error~ something broke when running /${interaction.commandName} \:(`, ephemeral: true })
        console.error(error);
      }
    } else if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};