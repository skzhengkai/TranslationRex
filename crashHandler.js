const InitCrashHandler = reason => () => console.log('\x20\x1b[31m* Crash prevented.\n\x20* Reason:', reason, '\x1b[0m');

process.on('unhandledRejection', InitCrashHandler('Unhandled Rejection'));
process.on('multipleResolves', InitCrashHandler('Multiple Resolves'));

module.exports = InitCrashHandler;