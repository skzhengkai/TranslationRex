const { SlashCommandBuilder, EmbedBuilder, hyperlink, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const { translateToLanguage } = require('../utils/translate.js');
const { checkIfUserVoted } = require('../utils/usermanager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('translate a text to english')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('text to translate')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('language')
        .setDescription('what language do you want to translate to (default english)')
        .setAutocomplete(true)),
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["afrikaans", "albanian", "amharic", "arabic", "armenian", "azerbaijani", "basque", "belarusian", "bengali", "bosnian", "bulgarian", "catalan", "cebuano", "chinese_simplified", "chinese_traditional", "corsican", "croatian", "czech", "danish", "dutch", "english", "esperanto", "estonian", "finnish", "french", "frisian", "galician", "georgian", "german", "greek", "gujarati", "haitian_creole", "hausa", "hawaiian", "hebrew", "hindi", "hmong", "hungarian", "icelandic", "igbo", "indonesian", "irish", "italian", "japanese", "javanese", "kannada", "kazakh", "khmer", "kinyarwanda", "korean", "kurdish", "kyrgyz", "lao", "latin", "latvian", "lithuanian", "luxembourgish", "macedonian", "malagasy", "malay", "malayalam", "maltese", "maori", "marathi", "mongolian", "myanmar_burmese", "nepali", "norwegian", "nyanja_chichewa", "pashto", "persian", "polish", "portuguese_portugal", "portuguese_brazil", "punjabi", "romanian", "russian", "samoan", "scots_gaelic", "serbian", "sesotho", "shona", "sindhi", "sinhala_sinhalese", "slovak", "slovenian", "somali", "spanish", "sundanese", "swahili", "swedish", "tajik", "tamil", "telugu", "thai", "turkish", "ukrainian", "urdu", "uzbek", "vietnamese", "welsh", "xhosa", "yiddish", "yoruba", "zulu"];
    const filtered = choices.filter(choice =>
      choice.toLowerCase().includes(focusedValue.toLowerCase())
    ).slice(0, 20); // Limit the results to 20 values
    await interaction.respond(
      filtered.map(choice => ({ name: choice, value: choice })),
    );
  },
  async execute(interaction) {
    const textToTranslate = interaction.options.getString('text');
    const languageToTranslateTo = interaction.options.getString('language') || 'english';

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

    let translatedText = "translated text goes here";
    try {
      translatedText = await translateToLanguage(textToTranslate, languageToTranslateTo);
    } catch (err) {
      translatedText = "an internal error occured.";
      console.error(`error on /translate:\n${err}`);
    }

    translatedText = translatedText.toString();
    const translationDescription =
      `## "${translatedText.toString()}"

translated from \`${textToTranslate}\``
    const translationEmbed = new EmbedBuilder()
      .setColor('303434')
      .setDescription(translationDescription)
      .setFooter({ text: '🦖 TranslationRex V1.0' })

    await interaction.reply({ embeds: [translationEmbed] });
  }
}