import * as nconf from 'nconf';
import * as path from 'path';

export default nconf.env().file(path.join('./', 'config.json'));
