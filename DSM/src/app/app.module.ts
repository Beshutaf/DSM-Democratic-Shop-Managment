import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CreateUserPage } from '../pages/admin/create-user/create-user';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { AdminPage } from "../pages/admin/admin-panel";
import { PushPage } from "../pages/admin/push-page/push-page";
import { HelloIonicPage } from "../pages/hello-ionic/hello-ionic";
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    CreateUserPage,
         HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    AdminPage,
    PushPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    CreateUserPage,
       HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    AdminPage,
    PushPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
