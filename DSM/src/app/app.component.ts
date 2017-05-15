import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import {OneSignal} from '@ionic-native/onesignal'
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  //rootPage = LoginPage;
 rootPage = HomePage;
  constructor(platform: Platform,private oneSignal:OneSignal, private _platform: Platform) {
    platform.ready().then(() => {
        if (platform.is('cordova')) {
      this.oneSignal.startInit("aee9826e-2e23-4762-8059-758f6f87a042","121968198945");
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.setSubscription(true);
     
       
      this.oneSignal.handleNotificationReceived().subscribe(()=>{
        
      })
         this.oneSignal.handleNotificationOpened().subscribe(() => {
        // handle opened here how you wish.
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     // StatusBagr.styleDefault();
       this.oneSignal.endInit(); 
        }     
      Splashscreen.hide();

    });
   
  }
}
