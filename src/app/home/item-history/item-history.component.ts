import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { ZabbixService } from './../../shared/zabbix.service';

@Component({
  selector: 'app-item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.css']
})
export class ItemHistoryComponent implements OnInit {
  hostId: any;
  itemId: any;

  itemList: any;

  constructor(private zabbixService: ZabbixService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      this.hostId = params.hostid;
      this.itemId = params.itemid;
    });
  }

  ngOnInit() {
      this.zabbixService.getItemHistory(this.itemId, this.hostId).subscribe( (data: any) => {
        this.itemList = data.result;

        this.itemList.forEach(medicao => {
          medicao.time = new Date(parseInt(medicao.clock)*1000) 
        });
    })
  }

  back() {
    this.router.navigate(['/home/items-host-information/'+ this.hostId]);
  }
}