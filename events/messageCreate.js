const { Events, EmbedBuilder } = require('discord.js');

const { translateToLanguage } = require('../utils/translate.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // do something with message
    if (message.author.bot) {
      return;
    }

    if (message.content.toLowerCase().startsWith("<@1116129516327284928>")) {
      message.reply("Hey there! I'm Translation-Rex, or T-Rex for short. Run `/help` for a list of commands!");
    }

    if (message.content.toLowerCase().startsWith('tr.')) {
      if (message.reference && message.reference.messageId) {
        try {
          const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
          const textToTranslate = referencedMessage.content;
          const languageToTranslateTo = message.content.toLowerCase().slice(3);
          if (!textToTranslate) return;
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

          referencedMessage.reply({ embeds: [translationEmbed], allowedMentions: { parse: [] } });
        } catch (error) {
          console.error('Error fetching referenced message:', error);
        }
      } else {
        console.log('Message does not reply to any other message');
      }
    }




    
    if (message.guild.id != '1017652759593496586') return;
    
    // random shit
    const prefix = ".";
    if (message.content.toLowerCase().startsWith(prefix + 'eval')) {
      try {
        const code = message.content.slice((prefix + 'eval').length).trim();
  
        let logs = '';
        const oldLog = console.log;
        console.log = (...args) => {
          logs += args.map(arg => String(arg)).join(' ') + '\n';
        };
  
        let result = eval(code);
  
        console.log = oldLog; // Restore original console.log
  
        if (logs) {
          result = logs;
        } else if (result === undefined) {
          result = '';
        }
  
        if (typeof result !== 'string') {
          result = require('util').inspect(result);
        }
  
        message.channel.send(`\`\`\`js\n${result}\n\`\`\``);
      } catch (error) {
        console.error(error);
        message.channel.send(`An error occurred:\n\`${error}\``);
      }
    }
  }
}