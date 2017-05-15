import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ListPage } from '../list/list';
import { AdminPage } from "../admin/admin-panel";
import { SuggestPage } from "../suggestProduct/suggest";
import { ViewusersPage} from "../viewusers/viewusers";
import { InAppBrowser } from 'ionic-native';
import { LoginPage } from "../login/login";
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

  constructor(
    public platform: Platform,
    public menu: MenuController
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
    this.nav.setRoot(HelloIonicPage);
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
    this.menu.close();
    this.nav.push(LoginPage);
  }
  setting(){
    
  }
}