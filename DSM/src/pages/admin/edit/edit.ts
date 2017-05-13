import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  AlertController ,LoadingController } from 'ionic-angular';
import { Http} from "@angular/http";
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
  const useradding=new User(user.uname,user.password,user.email ,user.PhoneNo ,user.Gender ,user.authen,user.fName );
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
 trash(){
   this.Alert("are u sure want to delete user? ");
 }
  sync(){
   this.Alert("Confirm user's changes");
 }
   resetP(){
   this.Alert("Are you sure want to reset user's password?");
 }
}
