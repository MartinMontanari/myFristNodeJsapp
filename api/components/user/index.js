//Para hacer toda la exportación de los controllers
const store = require('../../../store/dummy');
const controller = require('./controller');

module.exports = controller(store);
