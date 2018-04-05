import { Component, OnInit } from '@angular/core';

import { ZabbixService } from './../../shared/services/zabbix.service';

@Component({
  selector: 'app-group-information',
  templateUrl: './group-information.component.html',
  styleUrls: ['./group-information.component.css']
})
export class GroupInformationComponent implements OnInit {
  groupList: any;

  constructor(private zabbixService: ZabbixService) { }

  ngOnInit() {
    this.zabbixService.getGroupList().subscribe( (data: any) => {
      this.groupList = data.result;
    });
  }

}
