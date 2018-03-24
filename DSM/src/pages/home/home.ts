import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {  AlertController,LoadingController } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ListPage } from '../list/list';
import { AdminPage } from "../admin/admin-panel";
import { SuggestPage } from "../suggestProduct/suggest";
import { ViewusersPage} from "../viewusers/viewusers";
import { InAppBrowser } from 'ionic-native';
import { Http,RequestOptions,Headers} from "@angular/http";
import { LoginPage } from "../login/login";

import { BASE_SERVER_URL } from '../../app/constants.ts';

@Component({
  selector:"page-home",
  templateUrl: 'home.html'
})

export class HomePage {
 
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  component:any;
important:boolean=false;
notImportant:boolean=false;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public loadingController:LoadingController ,
    public http:Http
    ,public RequestOptions:RequestOptions
  
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      {title: 'Admin',component:AdminPage},
       { title: 'Contacts', component: ViewusersPage }
    ];
  }
  toggleImportant(){
    this.important=!this.important;
  }
  toggleNotImportant(){
    this.notImportant=!this.notImportant;
  }
 launch(url) {
        this.platform.ready().then(() => {
          
             new InAppBrowser(url,'_system');
           
        });
    }
  initializeApp() {

    this.platform.ready().then(() => {
    
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openHomePage() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    
  }

  openAdminPanel(){
    this.menu.close();
    this.nav.push(AdminPage);
  }

  openUrlPage(){
    this.menu.close();

  }

  openSuggestedProduct(){
       this.menu.close();
    this.nav.push(SuggestPage);

  }

  openEditPage(){
       this.menu.close();
    this.nav.push(ViewusersPage);

  }
  
  SignOut(){
   localStorage.clear();
    this.menu.close();


    this.nav.push(LoginPage);
  }
  setting(){
    
    
  }
  
  presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'שינו סיסמה',
    inputs: [
     {
        name: 'email',
        placeholder: 'איימיל',
         type: 'text'
      },
      {
        name: 'newpass',
        placeholder: 'סיסמה חדשה',
        type: 'password'
      },
        {
        name: 'confirm',
        placeholder:  'אישור סיסמה',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'חזרה',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'שנה',
        handler: data => {
       if( localStorage.getItem("myUser")!==null )
         if(data.newpass===data.confirm && data.newpass.length>3 ){
          var user =   JSON.parse( localStorage.getItem("myUser"));
          if(data.email===user.email){
              this.resetP(data.newpass);
          }
          else
              this.Alert("הסימה לא עודכנה");
          }
          else 
           this.Alert("הסימה לא עודכנה");

          console.log(data);
        }
      }
    ]
  });
  alert.present();
}
AuthReglr(){
  var auth;
  if( localStorage.getItem("authType")!==null)
 auth =  localStorage.getItem("authType").replace(/[@.,\/#!$%\^&\*" ;:{}=\_`~()]/g,"") ;
else
auth="R";

  if(auth.toString()==="R")
     return false;
     else 
return true;
}
 Alert(type){
             let alert = this.alertCtrl.create({
            title: 'תקלה',
            subTitle: type,
            buttons: ['OK']
          });
  alert.present();
        }
 Alert2(type){
             let alert = this.alertCtrl.create({
            title: 'הצלחה',
          subTitle: type,
            buttons: ['OK']
          });
  alert.present();
        }

resetP(pass){  


var tmpusr =  JSON.parse(localStorage.getItem("myUser")) ;
/*console.log("id "+
 tmpusr.idd +"  una "+ tmpusr.uname+" fna  "+ tmpusr.fname+"   "+ tmpusr.auth
+" end of"
  );*/
if(tmpusr===""||tmpusr===null)
   { this.Alert("נסה מאוחר יותר לעדכן ");
      return;}
  let loader = this.loadingController.create({
              content: "...מעדכן סיסמה"
        });

        loader.present();
   let headers = new Headers();
       headers.append('content-Type','application/json');

  let body = {
    id : tmpusr.idd,
  //  uname : tmpusr.uname,
    fName : tmpusr.fname,
    email : tmpusr.email,
    PhoneNo: tmpusr.phoneN,
    Gender: tmpusr.gender,
    password : pass,
    authen:tmpusr.auth
    };
  let options = new RequestOptions({ headers: headers });
  this.http
        .post(BASE_SERVER_URL + '/users/rstPas', body, options)
        .map(res => res.json())
       .subscribe(
            data => {   console.log("rested password" )   ;
              this.Alert2('עודכן בהצלחה ');     
              localStorage.setItem("pass",JSON.stringify(pass));//date    ;
            },
            err => {
  this.Alert('בזמן עדכון הסיסמה ');     
              console.log("ERROR!: ", err);
            }
        );
  
    
      loader.dismiss();


 }
}