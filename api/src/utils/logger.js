const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const fs = require('fs');
const {LOGGER_FILE} = require('../constants/index')
const {
  createLogger,
  transports,
  format
} = require('winston')
const { MongoDB } = require('winston-mongodb');
const util = require('util');

//const DailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, label, printf } = format;

//Custom format to include method name and arguments
const customFormat = format.printf(({ level, message, label, timestamp, methodName}) => {
    return `${timestamp} [${label}] ${level}: ${message} (method: ${methodName})`;
  });
  
const infoLog = path.join(__dirname, '..', '..','log',LOGGER_FILE.INFO);
const errorLog = path.join(__dirname, '..', '..','log',LOGGER_FILE.ERROR);
const warningLog = path.join(__dirname, '..', '..','log',LOGGER_FILE.WARNING);
const exceptionLog = path.join(__dirname, '..', '..','log',LOGGER_FILE.EXCEPTION);

if(!fs.existsSync(infoLog)) {
    fs.mkdirSync(infoLog);
  }
if(!fs.existsSync(errorLog)) {
    fs.mkdirSync(errorLog);
  }
if(!fs.existsSync(warningLog)) {
    fs.mkdirSync(warningLog);
  }
 if(!fs.existsSync(exceptionLog)) {
    fs.mkdirSync(exceptionLog);
  }

const logger = createLogger({
    format: combine(
        label({ label: 'pos-app' }),
        timestamp(),
        customFormat
      ),
    transports: [
        new transports.File({
            filename:infoLog,
            level:'info',
        }),
        new transports.File({
            filename:errorLog,
            level:'error',
        }),
         new transports.File({
            filename:warningLog,
            level:'warning',
        }),
        // new MongoDB({
        //     db:process.env.DATABASE_URL,
        //     level:'error',
        //     collection: 'log',
        //     customFormat
        // })
    ],
    exceptionHandlers: [
        new transports.File({ filename: exceptionLog })
      ],
      exitOnError: false
});

  // Function to log method calls with extra information
  const logInfo = (methodName,message)=> {
    logger.info(message, {
      methodName: methodName,
    });
  }

  const logError = (methodName, error) =>{
    logger.error(`Error in ${methodName}: ${error.message}`, {
      methodName: methodName,
      stack: error.stack
    });
  }
  
module.exports = {
    logError,
    logInfo,
};