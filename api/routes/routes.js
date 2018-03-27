'use strict';

module.exports = function(app) {
	var zabbixDataHandlers = require('../controllers/zabbixDataController.js'),
		userHandlers = require('../controllers/userController.js');

	// 	Zabbix
	app.route('/api/item-information')
		.get(userHandlers.loginRequired, zabbixDataHandlers.item_information);

	app.route('/api/item-history')
		.get(userHandlers.loginRequired, zabbixDataHandlers.item_history);

	app.route('/api/itens-host')
		.get(userHandlers.loginRequired, zabbixDataHandlers.itens_host);

	app.route('/api/host-list')
		.get(userHandlers.loginRequired, zabbixDataHandlers.host_list);

	app.route('/api/group-list')
		.get(userHandlers.loginRequired, zabbixDataHandlers.group_list);

	// Cadastro e login
	app.route('/auth/register')
		.post(userHandlers.register);

	app.route('/auth/sign-in')
		.post(userHandlers.sign_in);

	// Reculpera informações do usuario logado
	app.route('/user/get-user-claims')
		.get(userHandlers.loginRequired, userHandlers.get_user_claims);
};
