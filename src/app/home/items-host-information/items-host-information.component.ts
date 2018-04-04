import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router";

import { ZabbixService } from './../../shared/services/zabbix.service';

@Component({
  selector: 'app-items-host-information',
  templateUrl: './items-host-information.component.html',
  styleUrls: ['./items-host-information.component.css']
})
export class ItemsHostInformationComponent implements OnInit {
  itemsList: any;
  hostId: any;

  constructor(private zabbixService: ZabbixService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => this.hostId = params.hostid );
   }

  ngOnInit() {
    this.zabbixService.getItensFromHost(this.hostId).subscribe( (data: any) => {
      this.itemsList = data.result;
    })
  }
  
  showItemHistory(itemId){
    this.router.navigate(['/home/item-history/' + itemId + "/" + this.hostId]);
  }

  showItemGraphic(itemId) {
    this.router.navigate(['/home/item-graphic/' + itemId + "/" + this.hostId]);
  }
  
  back() {
    this.router.navigate(['/home/host-information']);
  }
}
