import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Http} from "@angular/http"
@Component({
  selector: 'page-Push',
  templateUrl: 'push-page.html',
  providers:[]
})
export class PushPage {
  constructor(private http:Http) {

  }
  submit(form:NgForm){
    this.http.post("https://obscure-reef-53169.herokuapp.com/push/sendPush",{message:form.value.msg}).subscribe(()=>{});
  }
}