import { Component } from '@angular/core';

import { Nav } from "ionic-angular";
import { PushPage } from "./push-page/push-page";
import { CreateUserPage } from "./create-user/create-user";
import { FacebookPostPage } from "./facebook-page/facebook-post-page";
import { EditPage } from "./edit/edit";
import { PendingProductPage } from "./pendingproduct-page/pending-product";
import { CreateUsers } from "./create-users/create-users";

@Component({
  selector: 'page-admin',
  templateUrl: 'admin-page.html'
})
export class AdminPage {
auth =  localStorage.getItem("authType").replace(/[@.,\/#!$%\^&\*" ;:{}=\_`~()]/g,"");
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
AuthAdmin(){

  if(this.auth==='A')
     return true;
     else
     return false;
}
AuthSup(){
    if(this.auth==="S" || this.auth==="A"  )
     return true;
     else 
return false;
}
AuthMan(){
  if(this.auth==="M" || this.auth==="A" )
     return true;
     else 
return false;
}
newUsers(){
  this.nav.push(CreateUsers)
}
}