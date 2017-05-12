export class Product{
    public description:string;
    public Likes:number;
    public name:string;
    public imageUrl:string;
    public commentsNumber:number;
    public _id:string;
    public liked:boolean;

    
    constructor(name,description,imageUrl,Likes,liked){
        this.description=description;
        this.name=name;
        this.imageUrl=imageUrl;
        this.Likes=Likes;
        this.liked=liked;
    }
}