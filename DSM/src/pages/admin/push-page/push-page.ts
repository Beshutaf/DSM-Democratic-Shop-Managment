import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http"
import { Nav } from "ionic-angular";
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
    this.http.post("https://obscure-reef-53169.herokuapp.com/push/sendPush",{message:form.value.msg}).subscribe(()=>{});
    this.msg = "";

  }
  OnGoCancel(){
    this.nav.pop();
  }
}