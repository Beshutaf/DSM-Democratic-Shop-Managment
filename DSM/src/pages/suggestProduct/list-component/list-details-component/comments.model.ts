export class comments{
    public comment;
    public name;
    public date;

    constructor(name,comment){
        this.name=name;
        this.comment=comment;
        this.date=new Date();
    }
}