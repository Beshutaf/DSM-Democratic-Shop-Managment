import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http"
import { Nav, AlertController } from "ionic-angular";

import { BASE_SERVER_URL } from '../../../app/constants.ts';

@Component({
  selector: 'page-Push',
  templateUrl: 'push-page.html',
  providers:[]
})
export class PushPage {
 msg:String;
  constructor(private http:Http,private nav:Nav,private alertCtrl: AlertController) {

  }
  submit(form:NgForm){
    this.http.post(BASE_SERVER_URL + "/push/sendPush",{message:form.value.msg}).subscribe(()=>{
      let alert = this.alertCtrl.create({
            title: 'ההודעה נשלחה',
            subTitle: 'ההודעה נשלחה בהצלחה!',
            buttons: ['אישור']
          });
          alert.present();
    },(err)=>{
         let alert = this.alertCtrl.create({
            title: 'שגיאה',
            subTitle: 'ההודעה לא נשלחה, נסה שוב',
            buttons: ['אישור']
          });
          alert.present();
      });
    this.msg = "";

  }
  OnGoCancel(){
    this.nav.pop();
  }
}