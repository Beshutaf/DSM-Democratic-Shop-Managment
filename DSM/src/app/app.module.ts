import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CreateUserPage } from '../pages/admin/create-user/create-user';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { AdminPage } from "../pages/admin/admin-panel";
import { EditPage } from '../pages/admin/edit/edit';
import { ViewusersPage } from '../pages/viewusers/viewusers';
import { PushPage } from "../pages/admin/push-page/push-page";
import { HelloIonicPage } from "../pages/hello-ionic/hello-ionic";
import { ListDetailsComponent } from "../pages/suggestProduct/list-component/list-details-component/list.details.component";
import { listComponent } from "../pages/suggestProduct/list-component/list.component";
import { formPage } from "../pages/suggestProduct/formPage/formPage";
import { SuggestPage } from "../pages/suggestProduct/suggest";
import { ListService } from "../pages/suggestProduct/list.service";
import { FacebookPostPage } from "../pages/admin/facebook-page/facebook-post-page";
import { FacebookListComponent } from "../pages/admin/facebook-page/facebook-list-component/facebook-list.component";
import { ModalcommentPage } from "../pages/suggestProduct/list-component/modalcomment/modalcomment";
import { ParallaxHeader } from "../components/parallax-header/parallax-header";
import { FacebookService } from "../pages/admin/facebook-page/facebook.service";
import {OneSignal} from "@ionic-native/onesignal"
import { OrderByPipe } from "../pipes/sortopipe.pipe";
import { FacebookHomeItem } from "../pages/hello-ionic/facebook-home-item/facebook-home-item";
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
           EditPage,
             ViewusersPage ,
    CreateUserPage,
         HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    AdminPage,
    PushPage,
    ListDetailsComponent,
     listComponent,
    formPage,
    SuggestPage,
    FacebookPostPage,
    FacebookListComponent,
    ModalcommentPage,
    ParallaxHeader,
    OrderByPipe,
    FacebookHomeItem
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      EditPage,
    LoginPage,
    HomePage,
    ViewusersPage ,
    CreateUserPage,
       HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    AdminPage,
    PushPage,
     formPage,
     SuggestPage,
    ListDetailsComponent,
    FacebookPostPage,
    ModalcommentPage,
    FacebookHomeItem
  ],
  providers: [ FacebookService, OneSignal,  ListService,{provide: ErrorHandler,
    
     useClass: IonicErrorHandler}]
})
export class AppModule {}
