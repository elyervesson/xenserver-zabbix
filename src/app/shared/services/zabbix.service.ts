import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";

@Injectable()
export class ZabbixService {
  readonly rootUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getHostList(){
    return this.http.get(this.rootUrl + '/api/host-list');
  }

  getGroupList(){
    return this.http.get(this.rootUrl + '/api/group-list');
  }

  getItensFromHost(hostId){
    return this.http.get(this.rootUrl + '/api/itens-host?hostid='+ hostId);
  }

  getItemHistory(itemId, hostId, limit){
    return this.http.get(this.rootUrl + '/api/item-history?itemid='+ itemId +'&hostid='+ hostId + '&limit=' + limit);
  }

  getItemInformation(itemId){
    return this.http.get(this.rootUrl + '/api/item-information?itemid=' + itemId);
  }

}