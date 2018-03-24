import { Component, Input } from "@angular/core"
import { InAppBrowser } from 'ionic-native';

@Component({
    selector:"facebook-home-item",
    templateUrl:"facebook-home-item.html"
})
export class FacebookHomeItem{
@Input() topFacebookPost;
toggle:Boolean=false;


setToggle(url:string){
	if (this.toggle) {
		new InAppBrowser(url,'_system');
	}
	
    this.toggle=!this.toggle;
}
}