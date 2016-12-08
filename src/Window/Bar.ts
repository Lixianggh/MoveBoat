/**
 *
 * @author 
 *
 */
class Bar extends egret.Sprite{
    
    private imageName:string;
    private backImage:egret.Bitmap;
    //是否在屏幕内
    private state: number;
    //方块或者心
    private type:number;
    //红蓝
    private road:number;
    
	public constructor() {
    	  super();
    	  this.state = 0;
    	  this.road = 0;
    	  this.show();
	}
	
	private show(){
	    
        this.backImage = new egret.Bitmap();
        this.backImage.texture = RES.getRes(this.imageName);
        this.addChild(this.backImage);
	}
	
	public setImage(image:string){
	    this.imageName = image;
        this.backImage.texture = RES.getRes(this.imageName);
	}
	
	public getImage(){
	    return this.imageName;
	}
	
	public setState(state:number){
	    this.state = state;
	}
	
	public setType(type:number){
	    this.type = type;
	}
	
	public setRoad(road:number){
	    this.road = road;
	}
	
	public getRoad(){
	    return this.road;
	}
	
	public getType(){
	    return this.type;
	}
	
	public getState(){
	    return this.state;
	}
}
