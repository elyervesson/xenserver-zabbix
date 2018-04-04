import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ZabbixService } from './../../shared/services/zabbix.service';

@Component({
  selector: 'app-host-information',
  templateUrl: './host-information.component.html',
  styleUrls: ['./host-information.component.css']
})
export class HostInformationComponent implements OnInit {
  hostList: any;

  constructor(private router: Router, private zabbixService: ZabbixService) { }

  ngOnInit() {
    this.zabbixService.getHostList().subscribe( (data: any) => {
      this.hostList = data.result;
    })
  }

  showItems(hostId){
    this.router.navigate(['/home/items-host-information/' + hostId]);
  }
}
