export class FacebookModel{
public message:String;
public id:String;
public name:String;
imageUrl:String;
constructor(message:String,id:String,name:String,imageUrl:String){
    this.message=message;
    this.id=id;
    this.name=name;
    this.imageUrl=imageUrl;
}
}