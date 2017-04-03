import { Component } from '@angular/core';

import { Nav } from "ionic-angular";
import { PushPage } from "./push-page/push-page";
import { CreateUserPage } from "./create-user/create-user";

@Component({
  selector: 'page-admin',
  templateUrl: 'admin-page.html'
})
export class AdminPage {

  constructor(private nav:Nav) {

  }
  sendPushPage(){
      this.nav.push(PushPage);
  }
  newUser(){
    this.nav.push(CreateUserPage)
  }
}