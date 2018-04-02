import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { ZabbixService } from './../../shared/zabbix.service';

declare let d3: any;

@Component({
  selector: 'app-item-graphic',
  templateUrl: './item-graphic.component.html',
  styleUrls: ['./item-graphic.component.css']
})
export class ItemGraphicComponent implements OnInit {
  options: any;
  
  hostId: any;
  itemId: any;

  itemList: any;
  itemInformation: any;

  range: any;

  @ViewChild('nvd3') nvd3;

  constructor(private zabbixService: ZabbixService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      this.hostId = params.hostid;
      this.itemId = params.itemid;
    });

    this.range = 15;
  }
  
  // OBS: Alterar o codigo do onInit para executar as atividades pesadas no backend
  ngOnInit() {
    this.itemInformation = {};

    // Recuperação dos dados basicos de um item
    this.zabbixService.getItemInformation(this.itemId).subscribe( (information: any) => {
      this.itemInformation = {
        name: information.result[0].name, 
        units: information.result[0].units, 
        description: information.result[0].description, 
        value_type: information.result[0].value_type
      };
      
      // Recuperação dos ultimos x valores de um item
      this.zabbixService.getItemHistory(this.itemId, this.hostId, this.range).subscribe( (data: any) => {
        data.result.reverse();
        this.itemList = [{
          key: "Item: " + this.itemInformation.name, 
          values: []
        }];
  
        data.result.forEach(medicao => {
          let time = new Date(medicao.clock*1000);
  
          this.itemList[0].values.push({
            label: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
            value: medicao.value
          })
        });
        this.geraGrafico();
      });
    })
  }

  geraGrafico() {
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 100,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        staggerLabels: true,
        tooltip: {
          contentGenerator: function (e) {

            var series = e.series[0];
            if (series.value === null) return;
            
            var rows = 
              "<tr>" +
                "<td class='key'>" + 'Horário da coleta: ' + "</td>" +
                "<td class='x-value'>" + series.key + "</td>" + 
              "</tr>" +
              "<tr>" +
                "<td class='key'>" + 'Valor coletado: ' + "</td>" +
                "<td class='x-value'><strong>" + series.value + "</strong></td>" +
              "</tr>";

            var header = 
              "<thead>" + 
                "<tr>" +
                  "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
                  "<td class='key'><strong>Valor atual</strong></td>" +
                "</tr>" + 
              "</thead>";
              
            return "<table>" +
                header +
                "<tbody>" + 
                  rows + 
                "</tbody>" +
              "</table>";
          } 
        },
        showValues: true,
        duration: 500,
        xAxis: {
          axisLabel: 'HORÁRIO DA MEDIÇÃO',
          axisLabelDistance: -5
        },
        yAxis: {
          axisLabel: "VALOR COLETADO",
          axisLabelDistance: -20
        }
      }
    }
  }

  valueChanged(value) {
    this.range = value;
  }

  reloadGraphic() {
    this.zabbixService.getItemHistory(this.itemId, this.hostId, parseInt(this.range)).subscribe( (data: any) => {
      data.result.reverse();
      this.itemList = [{key: "Item: " + this.itemInformation.name, values: []}];

      data.result.forEach(medicao => {
        let time = new Date(medicao.clock*1000);

        this.itemList[0].values.push({
          label: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
          value: medicao.value
        })
      });
      this.nvd3.chart.update();
    });
  }

  back() {
    this.router.navigate(['/home/items-host-information/'+ this.hostId]);
  }
}
