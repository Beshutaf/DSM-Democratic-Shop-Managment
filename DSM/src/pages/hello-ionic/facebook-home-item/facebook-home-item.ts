import { Component, Input } from "@angular/core"

@Component({
    selector:"facebook-home-item",
    templateUrl:"facebook-home-item.html"
})
export class FacebookHomeItem{
@Input() topFacebookPost;
toggle:Boolean=false;


setToggle(){
    this.toggle=!this.toggle;
}
}