export class Product{
    public description:string;
    public likes:number=0;
    public name:string;
    public image:string;
    constructor(name,description,image){
        this.description=description;
        this.name=name;
        this.image=image;
    }
}