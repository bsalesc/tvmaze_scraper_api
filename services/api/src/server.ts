import app from './app';
import config from './config/config.env';
import { mongooseConnect } from './config/mongoose';

mongooseConnect()
  .then(async () => {
    const application = await app();

    application.listen(config.get('PORT'), () =>
      console.log('Express server listening on port ' + config.get('PORT')),
    );
  })
  .catch(error => console.error(error.message));
