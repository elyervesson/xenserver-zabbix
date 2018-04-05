import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ZabbixService } from './../../shared/services/zabbix.service';

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
      this.zabbixService.getItemHistory(this.itemId, this.hostId, 10).subscribe( (data: any) => {
        this.itemList = data.result;

        this.itemList.forEach(medicao => {
          medicao.time = new Date(parseInt(medicao.clock, 10) * 1000);
        });
    });
  }

  back() {
    this.router.navigate(['/home/items-host-information/' + this.hostId]);
  }
}
