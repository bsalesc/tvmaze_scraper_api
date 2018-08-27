import * as mongoose from 'mongoose';
import config from './config.env';

export const mongooseConnect = async () => {
  try {
    let authConfig = {};
    if (config.get('MONGO_USER')) {
      authConfig = {
        user: config.get('MONGO_USER'),
        pass: config.get('MONGO_PASS'),
      };
    }

    await mongoose.connect(
      config.get('MONGO_CONNECTION_STRING'),
      authConfig,
    );
  } catch (e) {
    throw e;
  }
};
