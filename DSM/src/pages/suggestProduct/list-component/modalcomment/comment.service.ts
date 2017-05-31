
import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { comments } from "./comments.model";
import * as io from 'socket.io-client';
import * as mongoose from 'mongoose';
@Injectable()
export class CommentsService {
       private socket;

       commentChanged=new EventEmitter<comments[]>();
      comment:comments[]=[];
     getComments(id:String){
         
         this.http.get("https://obscure-reef-53169.herokuapp.com/suggest/getcomments?id="+id)
         .subscribe((Response)=>{
             var temp:comments[]=[];
            for(let comment of Response.json()){
                let timestamp = comment._id.toString().substring(0,8);
                let date = new Date( parseInt( timestamp, 16 ) * 1000 );
               let  dateString= date.toISOString().substr(0, 19).replace('T', ' ');
                // var dateString = date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate() + " " + date.getHours().toString() + ":" + date.getMinutes() ;
                         console.log(dateString);
                         let newComment = new comments(comment.username,comment.comment);
                         newComment.date=dateString;
                temp.push(newComment);

            }
        
              this.comment=temp;
             this.commentChanged.emit(this.comment.slice());
          
         })
     }
    constructor(private http:Http){
         this.socket = io("https://obscure-reef-53169.herokuapp.com");
         this.socket.on('comment',(comment)=>{
             console.log("commented");
            this.comment.push(new comments(comment.user,comment.comment));
            this.commentChanged.emit(this.comment.slice());
         });
    }


    addComment(_id:string,comment:String,user:String){
        this.http.post("https://obscure-reef-53169.herokuapp.com/suggest/addcomment",{id:_id,comment:comment,user:user})
        .subscribe((response)=>{
            this.socket.emit('add-comment',{id:_id,comment:comment,user:user})
        })

    }
}