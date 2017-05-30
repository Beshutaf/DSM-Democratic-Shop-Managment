export class User{

    public email:string;
    public password:string;
    public phoneN:Number;
    public gender:string;
    public auth:string;
 public fname:string;
   public lName:string;
    constructor(email,password,phoneN,gender,auth,fname,lName){
      this.email=email;
           this.fname=fname;   
        this.password=password;
        this.gender=gender;
           this.phoneN=phoneN;
           this.auth=auth;
    this.lName=lName;

    }
}