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
import { ListDetailsComponent } from "../pages/suggestProduct/list-component/list-details-component/list.details.component";
import { listComponent } from "../pages/suggestProduct/list-component/list.component";
import { formPage } from "../pages/suggestProduct/formPage/formPage";
import { SuggestPage } from "../pages/suggestProduct/suggest";
import { ListService } from "../pages/suggestProduct/list.service";
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
    PushPage,
    ListDetailsComponent,
     listComponent,
    formPage,
    SuggestPage
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
    PushPage,
     formPage,
     SuggestPage,
    ListDetailsComponent
  ],
  providers: [    ListService,{provide: ErrorHandler,
    
     useClass: IonicErrorHandler}]
})
export class AppModule {}
