'use strict';

var express = require('express'),
    router = express.Router(),
    request = require('superagent');
  

var auth = "da56d80c34c9a1c121c5c5442e490220";
var zabbix_api = "http://localhost/zabbix/api_jsonrpc.php"

function item_information_request(itemId) {
    var request_body = {
        "jsonrpc": "2.0",
        "method": "item.get",
        "params": {
            "output": "extend",
            "itemids": itemId,
            "sortorder": "DESC"
        },
        "auth": auth,
        "id": 1
    }

    return request
            .post(zabbix_api)
            .send(request_body)
}

/* GET informações sobre um item. */
exports.item_information = function(req, res) {
    item_information_request(req.query.itemid)
        .then(response => {
            res.json(response.body);
        })
        .catch(error => {
            res.send(error);
    }); 
}


/* GET ultimos 10 valores de um item. */
exports.item_history = function(req, res) {
    item_information_request(req.query.itemid).then(response => {
        var request_body = {
            "jsonrpc": "2.0",
            "method": "history.get",
            "params": {
                "output": "extend",
                "history": response.body.result[0].value_type, 
                "itemids": req.query.itemid,
                "hostids": req.query.hostid,
                "sortfield": "clock",
                "sortorder": "DESC",
                "limit": parseInt(req.query.limit)
            },
            "auth": auth,
            "id": 1
        }
    
        request
            .post(zabbix_api)
            .send(request_body)
            .then(response => {
                res.json(response.body);
            })
            .catch(error => {
                res.send(error);
        }); 
    })
}

exports.itens_host = function(req, res) {
	var request_body = {
        "jsonrpc": "2.0",
        "method": "item.get",
        "params": {
            "output": "extend",
            "sortfield": "name",
            "filter": {"type": "0"}, // Retorna apenas os itens que eu criei
            "hostids": req.query.hostid,
        },
        "auth": auth,
        "id": 1
    }

  request
    .post(zabbix_api)
    .send(request_body)
    .then(response => {
        res.json(response.body);
    })
    .catch(error => {
        res.send(error);
    }); 
}

exports.host_list = function(req, res) {
	var request_body = {
    "jsonrpc": "2.0",
    "method": "host.get",
    "params": {
          "output": [
              "hostid",
              "host"
          ],
          "selectInterfaces": [
              "interfaceid",
              "ip"
          ]
      },
    "auth": auth,
    "id": 1
  }

  request
		.post(zabbix_api)
		.send(request_body)
		.then(response => {
			res.json(response.body);
		})
		.catch(error => {
            res.send(error);
		}); 
}

exports.group_list = function(req, res) {
	var request_body = {
    "jsonrpc": "2.0",
    "method": "hostgroup.get",
    "params": {
      "output": "extend"
    },
    "auth": auth,
    "id": 1
  }

  request
		.post(zabbix_api)
		.send(request_body)
		.then(response => {
			res.json(response.body);
		})
		.catch(error => {
            res.send(error);
		}); 
}