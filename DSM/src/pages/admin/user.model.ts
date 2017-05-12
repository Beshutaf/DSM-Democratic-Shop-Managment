export class User{
    public email:string;
    public uname:string;
    public password:string;
    public phoneN:Number;
    public gender:string;
    public auth:string;
 public fname:string;

   
    constructor(uname,password,email,phoneN,gender,auth,fname){
      this.email=email;
        this.uname=uname;
           this.fname=fname;
      
        this.password=password;
        this.gender=gender;
           this.phoneN=phoneN;
           this.auth=auth;
        //this._id=_id;

    }
}