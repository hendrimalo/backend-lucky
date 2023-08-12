const commander = require('commander');
const { Member } = require('../models');
require('../config/db');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-u, --username <value>', 'overwriting value username.', '')
  .option('-p, --password <value>', 'overwriting value password.', '')
  .parse(process.argv);

const options = commander.opts();
const { username, password } = options;
const role = 'Master';

(async () => {
  const member = new Member({ username, password, role });
  try {
    await member.save();
  } catch (error) {
    console.log('ERROR:', error.message);
  }
})();
