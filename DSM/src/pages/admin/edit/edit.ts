import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  AlertController ,LoadingController } from 'ionic-angular';
import { Http,RequestOptions,Headers} from "@angular/http";
import { User } from "../user.model";

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {
  //public usersL: any[];
  usersL : User[] = [];
  nuser :User;
  shownGroup = null;
  
  constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams,public loadingController :LoadingController,public alertCtrl: AlertController) {}
  ionViewDidLoad() {
    this.save();
    console.log('ionViewDidLoad EditPage');
  }
  
  
                  Alert(type){
             let alert = this.alertCtrl.create({
            title: 'You pressed',
            subTitle: type,
            buttons: ['OK']
          });
  alert.present();
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
              content: "getting Contacts"
        });
       loader.present();
this.http.get('https://obscure-reef-53169.herokuapp.com/users').map(res =>{

return res.json();
}).subscribe(data => {
         const temp =[];
for(let user of data.user){
  const useradding=new User(user.uname,user.password,user.email ,user.PhoneNo ,user.Gender ,user.authen,user.fName,user._id );
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
 trash(pos){
   let loader = this.loadingController.create({
              content: "Deleting user"
        });
       loader.present();
   let headers = new Headers();
       headers.append('content-Type','application/json');

       let body = {
      id : this.usersL[pos].idd
    };
  let options = new RequestOptions({ headers: headers });

  this.http
        .post('https://obscure-reef-53169.herokuapp.com/users/test', body, options)
        .map(res => res.json())
       .subscribe(
            data => {            
            },
            err => {
                loader.dismiss();
  let alert = this.alertCtrl.create({
      title:   'מחיקת משתמש נכשלה',
      subTitle: 
 
        '     בדוק את החיבור לאינטרנט, ונסה שינת ',
      buttons: ['חזרה']
    });
       alert.present();
              console.log("ERROR!: ", err);
            }
        );
        this.usersL.slice(pos,1);
        loader.dismiss();
        this.navCtrl.push(EditPage);
  
          

   }
  sync(){
   this.Alert("Confirm user's changes");
 }
   resetP(){
   this.Alert("Are you sure want to reset user's password?");
 }
}
