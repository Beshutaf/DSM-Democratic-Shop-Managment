import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  AlertController ,LoadingController } from 'ionic-angular';
import { Http,RequestOptions,Headers} from "@angular/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from "../user.model";
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {
  usersL : User[] = [];
  nuser :User;
  checked=[];
  srchStr="";
  shownGroup = null;
  shownSearch = null;
  Search=false;
  massDlt=false;
  chkVlue="fname";
      slideOneForm: FormGroup;
     count =0;
  constructor(public  formBuilder:FormBuilder,public navCtrl: NavController,public http: Http, public navParams: NavParams,public loadingController :LoadingController,public alertCtrl: AlertController) {

         this.slideOneForm = formBuilder.group({
      //  name: [''],

         fName: [''],
         lName: [''],
         email: [''],
         gen: [''],
         authen: [''],
         number: ['']
   
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
  const useradding=new User(user.email ,user.password,user.PhoneNo
                                              ,user.Gender ,user.authen,user.fName,user._id,user.lName );


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
  toggleSearch() {
    if(this.Search===false)
      this.Search=true;
      else
      this.Search=false;
};
isGroupShown(group) {
    return this.shownGroup === group;
};
isSearchShown() {
    return  this.Search;
};
 trash(pos){
   
  let loader = this.loadingController.create({
              content: "deleting user..."
        });
        if(this.massDlt==false)
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
        if(this.massDlt==false)
       this.usersL.splice(pos,1);
      loader.dismiss();
     //this.save();
   }

  sync(i){


 let headers = new Headers();
       headers.append('content-Type','application/json');

/*if(this.slideOneForm.value.name==='')
   this.slideOneForm.value.name= i.uname;*/
if(this.slideOneForm.value.fName==='')
this.slideOneForm.value.fName = i.fname;
if(this.slideOneForm.value.email==='')
  this.slideOneForm.value.email = i.email ;
if(this.slideOneForm.value.number==='')
 this.slideOneForm.value.number =i.phoneN;
if(this.slideOneForm.value.gen==='')
 this.slideOneForm.value.gen=i.gender ;
if(this.slideOneForm.value.authen==='')
  this.slideOneForm.value.authen = i.auth ;
  if(this.slideOneForm.value.lName==='')
  this.slideOneForm.value.lName = i.lName ;
       let body = {
    id : i.idd,
   // uname : this.slideOneForm.value.name,
    fName : this.slideOneForm.value.fName,
    lName : this.slideOneForm.value.lName,
    email : this.slideOneForm.value.email,
    PhoneNo:this.slideOneForm.value.number,
    Gender:this.slideOneForm.value.gen,   
    authen:this.slideOneForm.value.authen
  };
 localStorage.setItem("authType", JSON.stringify(this.slideOneForm.value.authen));//date
let options = new RequestOptions({ headers: headers });


this.http
        .post('https://obscure-reef-53169.herokuapp.com/users/update', body, options)
        .map(res => res.json())
       .subscribe(
            data => {
                let alert = this.alertCtrl.create({
      title: "המשתמש עודכן בהצלחה",
      subTitle:
        this.slideOneForm.value.fName+"  המשתמש עודכן ",
      buttons: ['חזרה']
    });
      alert.present();
              console.log(data);
          //      this.navCtrl.push(HomePage);
            },
            
            err => {
  let alert = this.alertCtrl.create({
      title: 'הרשמת משתמש נכשלה!  '+this.slideOneForm.value.fName,
      subTitle:
        'המשתמש המבוקש לא נוצר :יכול להיות כבר קיים בדוק את הנתונים',
      buttons: ['חזרה']
    });
       alert.present();
              console.log("ERROR!: ", err);

            }
        );

  }


   resetP(tmpusr){  
  let loader = this.loadingController.create({
              content: "deleting user..."
        });
        if(this.massDlt==false)
        loader.present();
   let headers = new Headers();
       headers.append('content-Type','application/json');

  let body = {
    id : tmpusr.idd,
  //  uname : tmpusr.uname,
    fName : tmpusr.fname,
    email : tmpusr.email,
    lName : tmpusr.lName,
    PhoneNo: tmpusr.phoneN,
    Gender: tmpusr.gender,
    password : "1234",
    authen:tmpusr.auth
    };
  let options = new RequestOptions({ headers: headers });
  this.http
        .post('https://obscure-reef-53169.herokuapp.com/users/rstPas', body, options)
        .map(res => res.json())
       .subscribe(
            data => {         
            },
            err => {
  this.Alert('בעת מחיקה נתקלנו בבעיה נסה שנית ');     
              console.log("ERROR!: ", err);
            }
        );
  
    
      loader.dismiss();


 }

 counter(i){
   var k=0;
  if(this.checked.length==1&&i==this.checked[k]){
this.count=0;
this.checked.pop();
return this.count;

  }

   for(k=0;k<this.checked.length;k++){
   if(i==this.checked[k]){

      this.checked.splice(k,1);
        this.count-=1;
        return this.count;
   }
   }
   this.checked.push(i);
    this.count+=1;
   return this.count;
 }
  dltList(){
    if(this.checked===null)
    return;
    this.massDlt=true;
    var k=0;
         for(k;k<this.checked.length;k++)
               this.trash(this.checked[k]);
      for(k=0;k<this.checked.length;k++) {
        this.usersL.splice(this.checked[k],1);
        this.checked.splice(k,1);
      }
    this.massDlt=false;  
  this.count=0;
 this.save();
  this.save();


  }
 startSearch(pos){ 


   if(this.srchStr=='')
       return true;
   var str = this.srchStr;
   var arr = this.usersL;
switch(this.chkVlue){
  case  'fname':
             if(arr[pos].fname.toLowerCase().startsWith(str.toLowerCase()))
               return true;
               break;
  case 'email' :
        if(arr[pos].email.toLowerCase().startsWith(str.toLowerCase()))
               return true;
  case 'gender':

  if(arr[pos].gender.toLowerCase().startsWith(str.toLowerCase()))
               return true;
                 case 'auth':

  if(arr[pos].auth.toLowerCase().startsWith(str.toLowerCase()))
               return true;


 }
        return false;
 
    }
    helpBar(){
      var str="";
      switch(this.chkVlue){
                   case 'auth':
  str= 
  "לרשימת אדמינים  "+ " [A] "+ "<br\>"+
  "לרשימת ספקים  "+" [S]"+ "<br\>" +
 "לרשימת תורנים  "+" [M] "+ "<br\>" +
 "לרשימת הרשאה רגילה  "+" [R]" + "<br\>";
          break;
          case 'gender':
           str=   "לרשימת גברים "+ " [M] "+ "<br\>"+
  "לרשימת ספקים  "+" [F]"+ "<br\>";
break;
case 'fname':
    str="התחל בהקלדת השם הרשימה תתעדכן אוטומטית";
break;
case 'email':
    str="התחל בהקלדת האיימיל הרשימה תתעדכן אוטומטית";
break;

      }

                       let alert = this.alertCtrl.create({
      title: "עזרה בחיפוש",
       subTitle:  str,
      buttons: ['חזרה']
    });
      alert.present();
    }
  
}
