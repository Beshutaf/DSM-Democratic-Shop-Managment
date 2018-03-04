import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http";
import { AlertController, LoadingController } from "ionic-angular";

import { BASE_SERVER_URL } from '../../../app/constants.ts';

@Component({
    selector:'app-users',
    templateUrl:'create-users.html'
})
export class CreateUsers{

    constructor(private http:Http,private alertCtrl:AlertController,private loadctrl:LoadingController){}
 createUsers(form:NgForm){
     var usersArray;
     

      
     try{
    usersArray= JSON.parse( form.value.msg);

     }
     catch(err){
        console.log("wrong JSON");
        return;
     }
     let loader = this.loadctrl.create({
           content: "getting items"
     })
   
     try{
     usersArray.forEach(user => {
           loader.present();
         console.log(user)
       this.http
        .post(BASE_SERVER_URL + '/users', user)
        .map(res => res.json())
       .subscribe(data=>{loader.dismiss();},err=>{
           let alert = this.alertCtrl.create({
      title: 'הרשמת משתמש נכשלה!  '+user.fName,
      subTitle:
        ' המשתמש לא נוצר : וודא כי זהו איימיל תקין. ואינו קיים ',
      buttons: ['חזרה']
    });
        loader.dismiss();
       alert.present();
       return;
    }
    
    );


     });
    }
    catch(err){
    console.log(err);
     let alert = this.alertCtrl.create({
      title: 'JSON ATTRIBUTES are wrong',
      buttons: ['חזרה']
    });
    alert.present();

}
     
 }
 alerting(){
     let alert= this.alertCtrl.create({
         title:"information",
         subTitle:'you have to add here{fName,lName,email,password,authen}\n\n\n<br/> <b>example of using [{"fName":"test","lName":"test","password":"1234","email":"test@test.com","authen":"A"},{"fName":"test2","lName":"test2","password":"1234","email":"test2@test.com","authen":"S"}]</br>'
        ,  buttons: ['חזרה']
  })
     alert.present();
 }
}