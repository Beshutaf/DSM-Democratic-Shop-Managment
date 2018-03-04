import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  AlertController ,LoadingController } from 'ionic-angular';
import { Http} from "@angular/http";
import { User } from "../user.model";

import { BASE_SERVER_URL } from '../../app/constants.ts';

@Component({
  selector: 'page-viewusers',
  templateUrl: 'viewusers.html'
})
export class ViewusersPage {
  shownGroup = null;
  usersL : User[] = [];
  nuser :User;
  Search=false;
  chkVlue="fname";
  srchStr="";
  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams,public loadingController :LoadingController,public alertCtrl: AlertController) {}
  ionViewDidLoad() {
    this.save();
    console.log('ionViewDidLoad EditPage');
  }
                Alert2(){
             let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: ' an error has occured ',
            buttons: ['OK']
          });
  alert.present();
        }

  save(){
     let loader = this.loadingController.create({
              content: "fetching users..."
        });
       loader.present();
this.http.get(BASE_SERVER_URL + '/users').map(res =>{

return res.json();
}).subscribe(data => {
         const temp =[];
for(let user of data.user){

  const useradding=new User(user.email,user.password ,user.PhoneNo ,user.Gender ,user.authen,user.fName,user.lName );
  temp.push(useradding);   
}
this.usersL = temp;
return this.usersL;

},
err => {
  this.Alert2();
 });
 loader.dismiss();

  }
    toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup === group;
};  
  toggleSearch() {
    if(this.Search===false)
      this.Search=true;
      else
      this.Search=false;
};
isSearchShown() {
    return  this.Search;
};
startSearch(pos){ 


   if(this.srchStr=='')
       return true;
   var str = this.srchStr;
   var arr = this.usersL;
switch(this.chkVlue){
  case  'fname':
             if(arr[pos].fname.toLowerCase().startsWith(str.toLowerCase()))
               return true;
               break;
  case 'email' :
        if(arr[pos].email.toLowerCase().startsWith(str.toLowerCase()))
               return true;
  case 'gender':

  if(arr[pos].gender.toLowerCase().startsWith(str.toLowerCase()))
               return true;
                 case 'auth':

  if(arr[pos].auth.toLowerCase().startsWith(str.toLowerCase()))
               return true;


 }
        return false;
 
    }
    helpBar(){
      var str="";
      switch(this.chkVlue){
                   case 'auth':
  str= 
  "לרשימת אדמינים  "+ " [A/א] "+ "<br\>"+
  "לרשימת ספקים  "+" [S/ס]"+ "<br\>" +
 "לרשימת תורנים  "+" [M/מ] "+ "<br\>" +
 "לרשימת הרשאה רגילה  "+" [R/ר]" + "<br\>";
          break;
          case 'gender':
           str=   "לרשימת גברים "+ " [M/ז] "+ "<br\>"+
  "לרשימת ספקים  "+" [F/נ]"+ "<br\>";
break;
case 'fname':
    str="התחל בהקלדת השם הרשימה תתעדכן אוטומטית";
break;
case 'email':
    str="התחל בהקלדת האיימיל הרשימה תתעדכן אוטומטית";
break;

      }

                       let alert = this.alertCtrl.create({
      title: "עזרה בחיפוש",
       subTitle:  str,
      buttons: ['חזרה']
    });
      alert.present();
    }
}
