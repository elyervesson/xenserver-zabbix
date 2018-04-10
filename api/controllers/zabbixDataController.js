const request = require('superagent');

const auth = 'da56d80c34c9a1c121c5c5442e490220';
const zabbixApi = 'http://localhost/zabbix/api_jsonrpc.php';

function itemInformationRequest(itemId) {
  const requestBody = {
    jsonrpc: '2.0',
    method: 'item.get',
    params: {
      output: 'extend',
      itemids: itemId,
      sortorder: 'DESC',
    },
    auth,
    id: 1,
  };

  return request
    .post(zabbixApi)
    .send(requestBody);
}

/* GET informações sobre um item. */
function itemInformation(req, res) {
  itemInformationRequest(req.query.itemid)
    .then((response) => {
      res.json(response.body);
    })
    .catch((error) => {
      res.send(error);
    });
}


/* GET ultimos 10 valores de um item. */
function itemHistory(req, res) {
  itemInformationRequest(req.query.itemid).then((queryResponse) => {
    const requestBody = {
      jsonrpc: '2.0',
      method: 'history.get',
      params: {
        output: 'extend',
        history: queryResponse.body.result[0].value_type,
        itemids: req.query.itemid,
        hostids: req.query.hostid,
        sortfield: 'clock',
        sortorder: 'DESC',
        limit: parseInt(req.query.limit, 10),
      },
      auth,
      id: 1,
    };

    request
      .post(zabbixApi)
      .send(requestBody)
      .then((response) => {
        res.json(response.body);
      })
      .catch((error) => {
        res.send(error);
      });
  });
}

function itensHost(req, res) {
  const requestBody = {
    jsonrpc: '2.0',
    method: 'item.get',
    params: {
      output: 'extend',
      sortfield: 'name',
      filter: { type: '0' }, // Retorna apenas os itens que eu criei
      hostids: req.query.hostid,
    },
    auth,
    id: 1,
  };

  request
    .post(zabbixApi)
    .send(requestBody)
    .then((response) => {
      res.json(response.body);
    })
    .catch((error) => {
      res.send(error);
    });
}

function hostList(req, res) {
  const requestBody = {
    jsonrpc: '2.0',
    method: 'host.get',
    params: {
      output: [
        'hostid',
        'host',
      ],
      selectInterfaces: [
        'interfaceid',
        'ip',
      ],
    },
    auth,
    id: 1,
  };

  request
    .post(zabbixApi)
    .send(requestBody)
    .then((response) => {
      res.json(response.body);
    })
    .catch((error) => {
      res.send(error);
    });
}

function groupList(req, res) {
  const requestBody = {
    jsonrpc: '2.0',
    method: 'hostgroup.get',
    params: {
      output: 'extend',
    },
    auth,
    id: 1,
  };

  request
    .post(zabbixApi)
    .send(requestBody)
    .then((response) => {
      res.json(response.body);
    })
    .catch((error) => {
      res.send(error);
    });
}

module.exports = {
  itemInformation,
  itemHistory,
  itensHost,
  hostList,
  groupList,
};
