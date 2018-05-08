import { Component, Input } from "@angular/core"
import { FacebookModel } from "../facebook.model";

@Component({
    selector : "app-facebook-list",
    templateUrl :  "./facebook-list.component.html"
})
export class FacebookListComponent {
    active : String = "black-white";
    test : Boolean = false;

    @Input() facebook : FacebookModel;
    
    markpost() {
        if (this.test === false) {
            this.active = "markblue";
        } else {
            this.active = "black-white";
        }

        this.test = !this.test;
    }
}