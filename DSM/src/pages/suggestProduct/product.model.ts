export class Product{
   public Accepted: boolean;
    public description: string;
    public Likes:number;
    public name:string;
    public imageUrl:string;
    public commentsNumber:number;
    public _id:string;
    public liked:boolean;
    public status:string="none";
    public numberOfLikes:number;

    
    constructor(name,description,imageUrl,Likes,liked,Accepted){
        this.description=description;
        this.name=name;
        this.imageUrl=imageUrl;
        this.Likes=Likes;
        this.liked=liked;
        this.Accepted=Accepted;
    }
}