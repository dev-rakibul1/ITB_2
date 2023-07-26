import colors from 'colors';
import { Server } from 'http';
import mongoose from 'mongoose';
import config from '../config/config';
import app from '../index';

process.on('uncaughtException', err => {
  console.log('Uncaught exception is detected.', err);
  process.exit(1);
});

let server: Server;
const databaseConnected = async () => {
  try {
    await mongoose.connect(config.database_urls as string);
    console.log(colors.black.bgGreen('Database connected is success!'));

    server = app.listen(config.port, () => {
      console.log(
        colors.black.bgYellow(`OUR DCHB LISTEN PORT IS: ${config.port}`)
      );
    });
  } catch (error) {
    console.log(colors.black.bgCyan(error as string));
    console.log(colors.black.bgRed('Fail to DB connected!'));
  }
};

process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      console.log(error);
      process.exit(1);
    });
  } else {
    process.exit(2);
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM is received!');
  if (server) {
    server.close();
  }
});

export default databaseConnected;
