/**
 *
 * @author 
 *
 */
class Boat extends egret.Sprite{
    
    private color:number;
    private imageName:string;
    private backImage: egret.Bitmap;
    
	public constructor() {
    	super();
    	this.show();
	}
	
	private show(){
    	
        this.backImage = new egret.Bitmap();
        this.backImage.texture = RES.getRes(this.imageName);
        this.addChild(this.backImage);
        
	}
	
	SetTitle(color:number , image:string){
	    this.color = color;
	    this.imageName = image;
        this.backImage.texture = RES.getRes(this.imageName);
	}
}
