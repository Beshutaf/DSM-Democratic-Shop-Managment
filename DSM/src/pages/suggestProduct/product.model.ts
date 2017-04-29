export class Product{
    public description:string;
    public Likes:number;
    public name:string;
    public imageUrl:string;
    public commentsNumber:number;
    public _id:string;
    constructor(name,description,imageUrl,Likes){
        this.description=description;
        this.name=name;
        this.imageUrl=imageUrl;
        this.Likes=Likes;
    }
}