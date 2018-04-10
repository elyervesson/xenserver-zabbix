const zabbixDataHandlers = require('../controllers/zabbixDataController.js');
const userHandlers = require('../controllers/userController.js');

function appRoutes(app) {
  // Zabbix
  app.route('/api/item-information')
    .get(userHandlers.loginRequired, zabbixDataHandlers.itemInformation);

  app.route('/api/item-history')
    .get(userHandlers.loginRequired, zabbixDataHandlers.itemHistory);

  app.route('/api/itens-host')
    .get(userHandlers.loginRequired, zabbixDataHandlers.itensHost);

  app.route('/api/host-list')
    .get(userHandlers.loginRequired, zabbixDataHandlers.hostList);

  app.route('/api/group-list')
    .get(userHandlers.loginRequired, zabbixDataHandlers.groupList);

  // Cadastro e login
  app.route('/auth/register')
    .post(userHandlers.register);

  app.route('/auth/sign-in')
    .post(userHandlers.signIn);

  // Reculpera informações do usuario logado
  app.route('/user/get-user-claims')
    .get(userHandlers.loginRequired, userHandlers.getUserClaims);

  // Altera dados basicos do usuario
  app.route('/user/update')
    .put(userHandlers.loginRequired, userHandlers.updateUser);
}

module.exports = {
  appRoutes,
};
