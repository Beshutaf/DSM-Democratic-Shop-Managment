import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http"
import { Nav } from "ionic-angular";

import { BASE_SERVER_URL } from '../../../app/constants.ts';

@Component({
  selector: 'page-Push',
  templateUrl: 'push-page.html',
  providers:[]
})
export class PushPage {
    alertCtrl: any;
 msg:String;
  constructor(private http:Http,private nav:Nav) {

  }
  submit(form:NgForm){
    this.http.post(BASE_SERVER_URL + "/push/sendPush",{message:form.value.msg}).subscribe(()=>{});
    this.msg = "";

  }
  OnGoCancel(){
    this.nav.pop();
  }
}