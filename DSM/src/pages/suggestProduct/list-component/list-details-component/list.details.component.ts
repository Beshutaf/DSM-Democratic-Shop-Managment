import { Component, Input, OnInit, ViewChild } from "@angular/core"
import { Product } from "../../product.model";
import { NavController, NavParams, Content } from "ionic-angular";
import { comments } from "./comments.model";
import { CommentsService } from "./comment.service";
@Component({
    selector:"app-list-details",
    templateUrl:"./list.details.component.html",
    providers:[CommentsService]
})
export class ListDetailsComponent implements OnInit {
    name:string;
    description:string;
    _id:string;
    comment:comments[]=[]
        ngOnInit(){
            
           this.name=this.navParams.get("name");
           this.description=this.navParams.get("description");
           this._id=this.navParams.get("id");
           this.commentsService.getComments(this._id);
           this.commentsService.commentChanged.subscribe((comments)=>{
                    this.comment=comments;
                    console.log(comments);
           })
       
        }
     
  constructor(private navCtrl:NavController,private navParams:NavParams
    ,private commentsService:CommentsService){}
    @Input() productDetail:Product;
@ViewChild(Content) content: Content;
@ViewChild('disc') desc;
    createComment(comment){
        var retrievedData = localStorage.getItem("UserN");
      
       this. commentsService.addComment(this._id,comment.value.comment,retrievedData.replace(/"/g,""))
       comment.reset();
      var height=this.desc.nativeElement.offsetHeight;
        this.content.scrollTo(0,height+300,300);

    }
  
   
}