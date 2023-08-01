const { Events, EmbedBuilder } = require('discord.js');

const { translateToLanguage } = require('../utils/translate.js');
const emojiToLanguage = {
  '🇦🇫': 'Pashto',
  '🇦🇽': 'Faroese',
  '🇦🇱': 'Albanian',
  '🇩🇿': 'Arabic',
  '🇦🇸': 'Samoan',
  '🇦🇩': 'Catalan',
  '🇦🇴': 'Portuguese',
  '🇦🇮': 'English',
  '🇦🇶': 'Norwegian',
  '🇦🇬': 'English',
  '🇦🇷': 'Spanish',
  '🇦🇲': 'Armenian',
  '🇦🇼': 'Dutch',
  '🇦🇺': 'English',
  '🇦🇹': 'German',
  '🇦🇿': 'Azerbaijani',
  '🇧🇸': 'English',
  '🇧🇭': 'Arabic',
  '🇧🇩': 'Bengali',
  '🇧🇧': 'English',
  '🇧🇾': 'Belarusian',
  '🇧🇪': 'Dutch',
  '🇧🇿': 'English',
  '🇧🇯': 'French',
  '🇧🇲': 'English',
  '🇧🇹': 'Dzongkha',
  '🇧🇴': 'Spanish',
  '🇧🇦': 'Bosnian',
  '🇧🇼': 'English',
  '🇧🇷': 'Portuguese',
  '🇮🇴': 'English',
  '🇻🇬': 'English',
  '🇧🇳': 'Malay',
  '🇧🇬': 'Bulgarian',
  '🇧🇫': 'French',
  '🇧🇮': 'Kirundi',
  '🇰🇭': 'Khmer',
  '🇨🇲': 'French',
  '🇨🇦': 'English',
  '🇮🇨': 'French',
  '🇨🇻': 'Portuguese',
  '🇧🇶': 'Dutch',
  '🇰🇾': 'English',
  '🇨🇫': 'French',
  '🇹🇩': 'French',
  '🇨🇱': 'Spanish',
  '🇨🇳': 'Chinese',
  '🇨🇽': 'English',
  '🇨🇨': 'French',
  '🇨🇴': 'Spanish',
  '🇰🇲': 'French',
  '🇨🇬': 'French',
  '🇨🇩': 'French',
  '🇨🇰': 'Cook Islands Māori',
  '🇨🇷': 'Spanish',
  '🇨🇮': 'French',
  '🇭🇷': 'Croatian',
  '🇨🇺': 'Spanish',
  '🇨🇼': 'Dutch',
  '🇨🇾': 'Greek',
  '🇨🇿': 'Czech',
  '🇩🇰': 'Danish',
  '🇩🇯': 'Arabic',
  '🇩🇲': 'English',
  '🇩🇴': 'Spanish',
  '🇪🇨': 'Spanish',
  '🇪🇬': 'Arabic',
  '🇸🇻': 'Spanish',
  '🇬🇶': 'Spanish',
  '🇪🇷': 'Tigrinya',
  '🇪🇪': 'Estonian',
  '🇪🇹': 'Amharic',
  '🇪🇺': 'Multilingual',
  '🇫🇰': 'Fijian',
  '🇫🇴': 'Faroese',
  '🇫🇯': 'Fijian',
  '🇫🇮': 'Finnish',
  '🇫🇷': 'French',
  '🇬🇫': 'French',
  '🇵🇫': 'French',
  '🇹🇫': 'French',
  '🇬🇦': 'French',
  '🇬🇲': 'English',
  '🇬🇪': 'Georgian',
  '🇩🇪': 'German',
  '🇬🇭': 'English',
  '🇬🇮': 'English',
  '🇬🇷': 'Greek',
  '🇬🇱': 'Danish',
  '🇬🇩': 'English',
  '🇬🇵': 'French',
  '🇬🇺': 'English',
  '🇬🇹': 'Spanish',
  '🇬🇬': 'English',
  '🇬🇳': 'French',
  '🇬🇼': 'Portuguese',
  '🇬🇾': 'English',
  '🇭🇹': 'Haitian Creole',
  '🇭🇳': 'Spanish',
  '🇭🇰': 'Chinese',
  '🇭🇺': 'Hungarian',
  '🇮🇸': 'Icelandic',
  '🇮🇳': 'Hindi',
  '🇮🇩': 'Indonesian',
  '🇮🇷': 'Persian',
  '🇮🇶': 'Arabic',
  '🇮🇪': 'English',
  '🇮🇲': 'English',
  '🇮🇱': 'Hebrew',
  '🇮🇹': 'Italian',
  '🇯🇲': 'English',
  '🇯🇵': 'Japanese',
  '🎌': 'Japanese',
  '🇯🇪': 'English',
  '🇯🇴': 'Arabic',
  '🇰🇿': 'Kazakh',
  '🇰🇪': 'Swahili',
  '🇰🇮': 'Kiribati',
  '🇽🇰': 'Albanian',
  '🇰🇼': 'Arabic',
  '🇰🇬': 'Kyrgyz',
  '🇱🇦': 'Lao',
  '🇱🇻': 'Latvian',
  '🇱🇧': 'Arabic',
  '🇱🇸': 'English',
  '🇱🇷': 'English',
  '🇱🇾': 'Arabic',
  '🇱🇮': 'German',
  '🇱🇹': 'Lithuanian',
  '🇱🇺': 'Luxembourgish',
  '🇲🇴': 'Chinese',
  '🇲🇰': 'Macedonian',
  '🇲🇬': 'Malagasy',
  '🇲🇼': 'English',
  '🇲🇾': 'Malay',
  '🇲🇻': 'Dhivehi',
  '🇲🇱': 'French',
  '🇲🇹': 'Maltese',
  '🇲🇭': 'Marshallese',
  '🇲🇶': 'French',
  '🇲🇷': 'Arabic',
  '🇲🇺': 'English',
  '🇾🇹': 'French',
  '🇲🇽': 'Spanish',
  '🇫🇲': 'English',
  '🇲🇩': 'Moldovan',
  '🇲🇨': 'French',
  '🇲🇳': 'Mongolian',
  '🇲🇪': 'Montenegrin',
  '🇲🇸': 'English',
  '🇲🇦': 'Arabic',
  '🇲🇿': 'Portuguese',
  '🇲🇲': 'Burmese',
  '🇳🇦': 'English',
  '🇳🇷': 'Nauruan',
  '🇳🇵': 'Nepali',
  '🇳🇱': 'Dutch',
  '🇳🇨': 'French',
  '🇳🇿': 'English',
  '🇳🇮': 'Spanish',
  '🇳🇪': 'French',
  '🇳🇬': 'English',
  '🇳🇺': 'Bislama',
  '🇳🇫': 'French',
  '🇰🇵': 'Korean',
  '🇲🇵': 'Chamorro',
  '🇳🇴': 'Norwegian',
  '🇴🇲': 'Arabic',
  '🇵🇰': 'Urdu',
  '🇵🇼': 'Palauan',
  '🇵🇸': 'Arabic',
  '🇵🇦': 'Spanish',
  '🇵🇬': 'English',
  '🇵🇾': 'Spanish',
  '🇵🇪': 'Spanish',
  '🇵🇭': 'Filipino',
  '🇵🇳': 'French',
  '🇵🇱': 'Polish',
  '🇵🇹': 'Portuguese',
  '🇵🇷': 'Spanish',
  '🇶🇦': 'Arabic',
  '🇷🇪': 'French',
  '🇷🇴': 'Romanian',
  '🇷🇺': 'Russian',
  '🇷🇼': 'Kinyarwanda',
  '🇸🇭': 'English',
  '🇰🇳': 'English',
  '🇱🇨': 'English',
  '🇵🇲': 'French',
  '🇻🇨': 'English',
  '🇼🇸': 'Samoan',
  '🇸🇲': 'Italian',
  '🇸🇹': 'Portuguese',
  '🇸🇦': 'Arabic',
  '🇸🇳': 'French',
  '🇷🇸': 'Serbian',
  '🇸🇨': 'French',
  '🇸🇱': 'English',
  '🇸🇬': 'Malay',
  '🇸🇽': 'English',
  '🇸🇰': 'Slovak',
  '🇸🇮': 'Slovenian',
  '🇸🇧': 'English',
  '🇸🇴': 'Somali',
  '🇿🇦': 'Zulu',
  '🇰🇷': 'Korean',
  '🇸🇸': 'English',
  '🇪🇸': 'Spanish',
  '🇱🇰': 'Sinhala',
  '🇸🇩': 'Arabic',
  '🇸🇷': 'Dutch',
  '🇸🇿': 'Swazi',
  '🇸🇪': 'Swedish',
  '🇨🇭': 'German',
  '🇸🇾': 'Arabic',
  '🇹🇼': 'Chinese',
  '🇹🇯': 'Tajik',
  '🇹🇿': 'Swahili',
  '🇹🇭': 'Thai',
  '🇹🇱': 'Portuguese',
  '🇹🇬': 'French',
  '🇹🇰': 'Tongan',
  '🇹🇴': 'Tongan',
  '🇹🇹': 'English',
  '🇹🇳': 'Arabic',
  '🇹🇷': 'Turkish',
  '🇹🇲': 'Turkmen',
  '🇹🇨': 'French',
  '🇹🇻': 'Tuvaluan',
  '🇺🇬': 'English',
  '🇺🇦': 'Ukrainian',
  '🇦🇪': 'Arabic',
  '🇬🇧': 'English',
  '🏴󠁧󠁢󠁥󠁮󠁧󠁿': 'English',
  '🏴󠁧󠁢󠁳󠁣󠁴󠁿': 'English',
  '🏴󠁧󠁢󠁷󠁬󠁳󠁿': 'English',
  '🇺🇾': 'Spanish',
  '🇺🇿': 'Uzbek',
  '🇻🇺': 'Bislama',
  '🇻🇦': 'Latin',
  '🇻🇪': 'Spanish',
  '🇻🇳': 'Vietnamese',
  '🇼🇫': 'French',
  '🇪🇭': 'Arabic',
  '🇾🇪': 'Arabic',
  '🇿🇲': 'English',
  '🇿🇼': 'English',
};

function getLanguageFromEmoji(emoji) {
  if (emoji in emojiToLanguage) {
    return emojiToLanguage[emoji];
  } else {
    return null; // Return null if the emoji is not a language
  }
}

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    if (reaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Something went wrong when fetching the message:', error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }

    let language;

    if (!reaction._emoji.name.includes("🦖")) {
      console.log(`${reaction._emoji.name} is not a trex`);
      const emoji_language = getLanguageFromEmoji(reaction._emoji.name);
      if (emoji_language) {
        language = emoji_language;
      } else {
        return;
      }
    } else {
      language = "english";
    }

    const textToTranslate = reaction.message.content;
    if (!textToTranslate) return;
    let translatedText = "translated text goes here";
    try {
      translatedText = await translateToLanguage(textToTranslate, language);
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

    reaction.message.reply({ embeds: [translationEmbed], allowedMentions: { parse: [] } });

  },
};