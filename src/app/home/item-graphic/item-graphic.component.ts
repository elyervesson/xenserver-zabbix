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
  
  ngOnInit() {
    this.itemInformation = {};
    this.zabbixService.getItemInformation(this.itemId).subscribe( (information: any) => {
      this.itemInformation = {name: information.result[0].name, units: information.result[0].units, description: information.result[0].description};
      
      this.zabbixService.getItemHistory(this.itemId, this.hostId, this.range).subscribe( (data: any) => {
        data.result.reverse();
        this.itemList = [{key: "Item: " + this.itemInformation.name, values: []}];
  
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
        tooltips: false,
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
