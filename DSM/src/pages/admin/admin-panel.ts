import { Component } from '@angular/core';

import { Nav } from "ionic-angular";
import { PushPage } from "./push-page/push-page";
import { CreateUserPage } from "./create-user/create-user";
import { FacebookPostPage } from "./facebook-page/facebook-post-page";
import { EditPage } from "./edit/edit";
import { PendingProductPage } from "./pendingproduct-page/pending-product";

@Component({
  selector: 'page-admin',
  templateUrl: 'admin-page.html'
})
export class AdminPage {

  constructor(private nav:Nav) {

  }
  pendingProductPage(){
    this.nav.push(PendingProductPage);
  }
  sendPushPage(){
      this.nav.push(PushPage);
  }
  newUser(){
    this.nav.push(CreateUserPage)
  }
  facebookPostPage(){
    
    this.nav.push(FacebookPostPage);

  }
    editPostPage(){
    
 this.nav.push(EditPage);
  }
}