
import { Injectable, EventEmitter } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "../../product.model";
import { comments } from "./comments.model";
import * as io from 'socket.io-client';
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
                temp.push(new comments(comment.username,comment.comment));
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