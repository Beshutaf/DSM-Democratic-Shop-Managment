import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ViewController } from 'ionic-angular';
import { comments } from "./comments.model";
import { CommentsService } from "./comment.service";

/*
  Generated class for the Modalcomment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modalcomment',
  templateUrl: 'modalcomment.html',
  providers:[CommentsService]
})
export class ModalcommentPage implements OnInit {
  _id:string;
   commentsNumber:number;
  
  comment:comments[]=[];
  @ViewChild('disc') desc;
  @ViewChild(Content) content: Content;
    ngOnInit(){
      this._id=this.navParams.get("id");
       this.commentService.getComments(this._id);
      this.commentService.commentChanged.subscribe((comments)=>{
        this.comment=comments;
        this.commentsNumber=comments.length;
      })   
      
    }



   
  constructor(public navCtrl: NavController, public navParams: NavParams,public commentService:CommentsService,public view:ViewController) {}


return(){
 
    // Returning data from the modal:
    this.view.dismiss(
      this.commentsNumber
    );
}
createComment(comment){
  console.log("hi");
        var retrievedData = localStorage.getItem("UserN");
      
       this.commentService.addComment(this._id,comment.value.comment,retrievedData.replace(/"/g,""))
       comment.reset();
      // var height=this.desc.nativeElement.offsetHeight;
        this.content.scrollTo(0,0,300);

    }
}
