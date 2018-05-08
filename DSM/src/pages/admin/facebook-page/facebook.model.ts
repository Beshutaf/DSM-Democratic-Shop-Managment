export class FacebookModel {
	public message : String;
	public id : String;
	public name : String;
	public url : String;
	imageUrl : String;
	clicked : Boolean=false;

	constructor(message : String, id : String, name : String, url : String, imageUrl : String) {
	    this.message=message;
	    this.id=id;
	    this.name=name;
	    this.url=url;
	    this.imageUrl=imageUrl;
	}
}