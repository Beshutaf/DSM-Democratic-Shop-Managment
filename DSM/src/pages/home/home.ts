import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateUserPage } from '../create-user/create-user';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
name : string;
password:string;
  constructor(public navCtrl: NavController) {
     
  }
    NewUserP(){
   this.navCtrl.push(CreateUserPage);

    }

}
