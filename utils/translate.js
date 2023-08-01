// If you've installed from npm, do:
const translate = require('@iamtraction/google-translate');
const Fuse = require('fuse.js');

const languageCodes = {
  afrikaans: 'af',
  albanian: 'sq',
  amharic: 'am',
  arabic: 'ar',
  armenian: 'hy',
  azerbaijani: 'az',
  basque: 'eu',
  belarusian: 'be',
  bengali: 'bn',
  bosnian: 'bs',
  bulgarian: 'bg',
  catalan: 'ca',
  cebuano: 'ceb',
  chinese_simplified: 'zh-CN',
  chinese_traditional: 'zh-TW',
  corsican: 'co',
  croatian: 'hr',
  czech: 'cs',
  danish: 'da',
  dutch: 'nl',
  english: 'en',
  esperanto: 'eo',
  estonian: 'et',
  finnish: 'fi',
  french: 'fr',
  frisian: 'fy',
  galician: 'gl',
  georgian: 'ka',
  german: 'de',
  greek: 'el',
  gujarati: 'gu',
  haitian_creole: 'ht',
  hausa: 'ha',
  hawaiian: 'haw',
  hebrew: 'he',
  hindi: 'hi',
  hmong: 'hmn',
  hungarian: 'hu',
  icelandic: 'is',
  igbo: 'ig',
  indonesian: 'id',
  irish: 'ga',
  italian: 'it',
  japanese: 'ja',
  javanese: 'jv',
  kannada: 'kn',
  kazakh: 'kk',
  khmer: 'km',
  kinyarwanda: 'rw',
  korean: 'ko',
  kurdish: 'ku',
  kyrgyz: 'ky',
  lao: 'lo',
  latin: 'la',
  latvian: 'lv',
  lithuanian: 'lt',
  luxembourgish: 'lb',
  macedonian: 'mk',
  malagasy: 'mg',
  malay: 'ms',
  malayalam: 'ml',
  maltese: 'mt',
  maori: 'mi',
  marathi: 'mr',
  mongolian: 'mn',
  myanmar_burmese: 'my',
  nepali: 'ne',
  norwegian: 'no',
  nyanja_chichewa: 'ny',
  pashto: 'ps',
  persian: 'fa',
  polish: 'pl',
  portuguese_portugal: 'pt',
  punjabi: 'pa',
  romanian: 'ro',
  russian: 'ru',
  samoan: 'sm',
  scots_gaelic: 'gd',
  serbian: 'sr',
  sesotho: 'st',
  shona: 'sn',
  sindhi: 'sd',
  sinhala_sinhalese: 'si',
  slovak: 'sk',
  slovenian: 'sl',
  somali: 'so',
  spanish: 'es',
  sundanese: 'su',
  swahili: 'sw',
  swedish: 'sv',
  tajik: 'tg',
  tamil: 'ta',
  telugu: 'te',
  thai: 'th',
  turkish: 'tr',
  ukrainian: 'uk',
  urdu: 'ur',
  uzbek: 'uz',
  vietnamese: 'vi',
  welsh: 'cy',
  xhosa: 'xh',
  yiddish: 'yi',
  yoruba: 'yo',
  zulu: 'zu',
};

const options = {
  includeScore: true,
  threshold: 0.4, // Adjust the threshold to control the matching sensitivity
  keys: ['key'],
};

const fuse = new Fuse(Object.keys(languageCodes).map((key) => ({ key })), options);

async function translateToLanguage(textToTranslate, language) {
  console.log(textToTranslate);
  try {
    // Map common language names to language codes
    const targetLanguage = findClosestLanguage(language.toLowerCase());

    if (targetLanguage) {
      const res = await translate(textToTranslate, { to: targetLanguage });
      return res.text;
    } else {
      return 'invalid language!!';
    }
  } catch (err) {
    console.error(`error utils/translate.js: ${err}`);
    return err;
  }
}

function findClosestLanguage(input) {
  const result = fuse.search(input);
  if (result.length > 0) {
    const closestMatch = result[0].item.key;
    return languageCodes[closestMatch];
  }
  return null; // or any other appropriate value when no match is found
}

module.exports = {
  translateToLanguage
};