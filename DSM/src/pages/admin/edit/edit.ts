import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  AlertController ,LoadingController } from 'ionic-angular';
import { Http,RequestOptions,Headers} from "@angular/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../user.model";
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {
 x = "";
  usersL : User[] = [];
  nuser :User;
  shownGroup = null;
      slideOneForm: FormGroup;
     
  constructor(public  formBuilder:FormBuilder,public navCtrl: NavController,public http: Http, public navParams: NavParams,public loadingController :LoadingController,public alertCtrl: AlertController) {

         this.slideOneForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        fName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        gen: ['',Validators.required],
         authen: ['',Validators.required],
         number: ['',Validators.required]
   
    });

  }
  ionViewDidLoad() {
    this.save();
    console.log('ionViewDidLoad EditPage');
  }
  
  
                  Alert(type){
             let alert = this.alertCtrl.create({
            title: 'תקלה',
            subTitle: type,
            buttons: ['OK']
          });
  alert.present();
        }

                Alert2(){
             let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: ' an error has occured ',
            buttons: ['OK']
          });
  alert.present();
        }

  save(){
        let loader = this.loadingController.create({
              content: "getting Contacts"
        });
       loader.present();
this.http.get('https://obscure-reef-53169.herokuapp.com/users').map(res =>{

return res.json();
}).subscribe(data => {
         const temp =[];
for(let user of data.user){
  const useradding=new User(user.uname,user.password,user.email ,user.PhoneNo
                                              ,user.Gender ,user.authen,user.fName,user._id );
  temp.push(useradding);   
}
this.usersL = temp;
return this.usersL;

},
err => {
  this.Alert2();
 });
 loader.dismiss();

  }
   toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup === group;
};
 trash(pos){
  let loader = this.loadingController.create({
              content: "deleting user..."
        });
        loader.present();
   let headers = new Headers();
       headers.append('content-Type','application/json');

       let body = {
      id : this.usersL[pos].idd
    };
  let options = new RequestOptions({ headers: headers });

  this.http
        .post('https://obscure-reef-53169.herokuapp.com/users/delete', body, options)
        .map(res => res.json())
       .subscribe(
            data => {            
            },
            err => {

  this.Alert('בעת מחיקה נתקלנו בבעיה נסה שנית ');
      
              console.log("ERROR!: ", err);
            }
        );
        this.usersL.splice(pos,1);
      loader.dismiss();
     //this.save();
   }





  sync(i){


 let headers = new Headers();
       headers.append('content-Type','application/json');

if(this.slideOneForm.value.name!='')
 i.uname =  this.slideOneForm.value.name;
if(this.slideOneForm.value.fName!='')
i.fname=  this.slideOneForm.value.fName;
if(this.slideOneForm.value.email!='')
i.email =  this.slideOneForm.value.email;
if(this.slideOneForm.value.number!='')
i.phoneN=  this.slideOneForm.value.number;
if(this.slideOneForm.value.gen!='')
i.gender =  this.slideOneForm.value.gen;
if(this.slideOneForm.value.authen!='')
i.auth =  this.slideOneForm.value.authen;
       let body = {
    id : i.idd,
    uname : this.slideOneForm.value.name,
    fName : this.slideOneForm.value.fName,
    email : this.slideOneForm.value.email,
    PhoneNo:this.slideOneForm.value.number,
    Gender:this.slideOneForm.value.gen,   
    authen:this.slideOneForm.value.authen
  };
  
let options = new RequestOptions({ headers: headers });


this.http
        .post('https://obscure-reef-53169.herokuapp.com/users/update', body, options)
        .map(res => res.json())
       .subscribe(
            data => {
                let alert = this.alertCtrl.create({
      title: "המשתמש עודכן בהצלחה",
      subTitle:
        this.slideOneForm.value.name+"  המשתמש עודכן ",
      buttons: ['חזרה']
    });
      alert.present();
              console.log(data);
          //      this.navCtrl.push(HomePage);
            },
            
            err => {
  let alert = this.alertCtrl.create({
      title: 'הרשמת משתמש נכשלה!  '+this.slideOneForm.value.name,
      subTitle:
        'המשתמש המבוקש לא נוצר :יכול להיות כבר קיים בדוק את הנתונים',
      buttons: ['חזרה']
    });
       alert.present();
              console.log("ERROR!: ", err);

            }
        );
  }


   resetP(){
   this.Alert("Are you sure want to reset user's password?");
 }

}
