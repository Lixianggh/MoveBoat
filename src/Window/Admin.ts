/**
 *
 * @author 
 *
 */
class Admin extends egret.Sprite{
    
    //控件
    private numLabel: egret.TextField
    private blueBoat: Boat;
    private redBoat: Boat;
    private leftTouchBar: egret.Shape;
    private rightTouchBar: egret.Shape;
    /*
     * boatState: 小船上下控制 0为全下 ，1为左上右下，2为左下右上，3为都上
     * speedUp : 加速度
     */ 
    private boatState:number;
    //速度
    private speedUp:number;
    //加速度
    private addUp:number;
    private goNum:number;
    //左右路 路程
    private leftRoad:number;
    private RightRoad:number;
    private barArray;
    //左右船状态
    private leftBoat:number;
    private rightBoat:number;
    //控制器
    private timer: egret.Timer;
    
	public constructor() {
    	super();
    	this.goNum = 0;
    	this.leftRoad = 1000;
    	this.RightRoad = 1000;
    	this.leftBoat = 0;
    	this.rightBoat = 0;
      this.timer = new egret.Timer(10,0);
      this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
      this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
    	this.show();
	}
	
	private show(){
	    
        var backView: egret.Shape = new egret.Shape();
        backView.graphics.beginFill(0x66CCFF,1);
        backView.graphics.drawRect(0,0,640,1080);
        backView.graphics.endFill();
        this.addChild(backView);
        
        var centerLine: egret.Shape = new egret.Shape();
        centerLine.graphics.lineStyle(8,0xCC6633);
        centerLine.graphics.moveTo(320,0);
        centerLine.graphics.lineTo(320,1080);
        centerLine.graphics.endFill();
        this.addChild(centerLine);
        
        var leftLine: egret.Shape = new egret.Shape();
        leftLine.graphics.lineStyle(4,0xFFCC66);
        leftLine.graphics.moveTo(158,0);
        leftLine.graphics.lineTo(158,1080);
        leftLine.graphics.endFill();
        this.addChild(leftLine);
            
        var rightLine: egret.Shape = new egret.Shape();
        rightLine.graphics.lineStyle(4,0xFFCC66);
        rightLine.graphics.moveTo(478,0);
        rightLine.graphics.lineTo(478,1080);
        rightLine.graphics.endFill();
        this.addChild(rightLine);
        
        this.blueBoat = new Boat();
        var color = 0x66CCFF;
        var image = "blueBoat_png";
        this.blueBoat.SetTitle(color , image);
        this.blueBoat.width = 156;
        this.blueBoat.height = 200;
        this.blueBoat.x = 0;
        this.blueBoat.y = 830;
        this.addChild(this.blueBoat);
        
        this.redBoat = new Boat();
        var color = 0x66CCFF;
        var image = "redBoat_png";
        this.redBoat.SetTitle(color,image);
        this.redBoat.width = 156;
        this.redBoat.height = 200;
        this.redBoat.x = 324;
        this.redBoat.y = 830;
        this.addChild(this.redBoat);
        
        this.numLabel = new egret.TextField();
        this.numLabel.text = ''+this.goNum;
        this.numLabel.textAlign = "right";
        this.numLabel.width = 320;
        this.numLabel.height = 40;
        this.numLabel.size = 38;
        this.numLabel.x = 320;
        this.numLabel.y = 0;
        this.addChild(this.numLabel);
        //没写完,修改全局boat12
        
        this.leftTouchBar = new egret.Shape();
        this.leftTouchBar.graphics.beginFill(0xff0000,0);
        this.leftTouchBar.graphics.drawRect(0,0,320,1080);
        this.leftTouchBar.graphics.endFill();
        this.addChild(this.leftTouchBar);
        //this.leftTouchBar.touchEnabled = true;
        this.leftTouchBar.addEventListener(egret.TouchEvent.TOUCH_TAP,this.leftTouch,this);
        
        this.rightTouchBar = new egret.Shape();
        this.rightTouchBar.graphics.beginFill(0xff0000,0);
        this.rightTouchBar.graphics.drawRect(0,0,320,1080);
        this.rightTouchBar.x = 320;
        this.rightTouchBar.graphics.endFill();
        this.addChild(this.rightTouchBar);
        //this.rightTouchBar.touchEnabled = true;
        this.rightTouchBar.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rightTouch,this);
        
        this.barArray = new Array();
        for(var i=0 ; i < 4 ; i++){
            var bar: Bar = new Bar();
            this.barArray[i] = bar;
            this.addChild(bar);
        }
        
	}
	
	private rightTouch(){
	    if(this.redBoat.x == 324){
	        this.redBoat.x = 476;
	        this.rightBoat = 1;
	    }else{
	        this.redBoat.x = 324;
	        this.rightBoat = 0;
	    }
	}
	
	private leftTouch(){
	    if(this.blueBoat.x == 0){
	        this.blueBoat.x = 156;
	        this.leftBoat = 1;
	    }else{
	        this.blueBoat.x = 0;
	        this.leftBoat = 0;
	    }
	}
	
	private work(){
        
        this.timer.start();
	}
	//倒计时开始
    private timerFunc() {
        this.goNum = this.goNum + this.speedUp;
        this.numLabel.text = ''+this.goNum;
        this.leftRoad = this.leftRoad + this.addUp;
        this.RightRoad = this.RightRoad + this.addUp;
        for(var i=0;i<this.barArray.length;i++){
            var bar = this.barArray[i];
            var state = bar.getState();
            bar.width = 80;
            bar.height = 80;
            if(state == 0){
                var index: number = Math.floor(Math.random() * 2) + 1;
                if(index == 1){
                    //左路
                    if(this.leftRoad > (1200/this.barArray.length*2)){
                        bar.setRoad(1);
                        bar.setState(1);
                        this.leftRoad = 0;
                        //左路可添加
                        var type: number = Math.floor(Math.random() * 2) + 1;
                        if(type == 1){
                            //左路石头
                            bar.setImage('blueBox_png');
                        }else{
                            //左路心
                            bar.setImage('blueHeart_png');
                        }
                        var road: number = Math.floor(Math.random() * 2) + 1;
                        if(road == 1){
                            //左左
                            bar.x = 38;
                        }else{
                            //左右
                            bar.x = 194;
                        }
                        if(this.boatState == 1){
                            bar.y = 1160;
                        }else{
                            bar.y = -80;
                        }
                    }
                }else{
                    //右路
                    if(this.RightRoad > (1160/this.barArray.length*2)){
                        bar.setRoad(2);
                        bar.setState(1);
                        this.RightRoad = 0;
                        //右路可添加
                        var type: number = Math.floor(Math.random() * 2) + 1;
                        if(type == 1) {
                            //右路石头
                            bar.setImage('redBox_png');
                        } else {
                            //右路心
                            bar.setImage('redHeart_png');
                        }
                        var road: number = Math.floor(Math.random() * 2) + 1;
                        if(road == 1) {
                            //右左
                            bar.x = 358;
                        } else {
                            //右右
                            bar.x = 514;
                        }
                        if(this.boatState == 2) {
                            bar.y = 1160;
                        } else {
                            bar.y = -80;
                        }
                    }
                }
            }
            var road: number = bar.getRoad();
            if((road == 1 && this.boatState == 1) || (road == 2 && this.boatState == 2)){
                bar.y = bar.y-this.addUp;
                if(bar.y < -80){
                    bar.setState(0);
                }
            }else{
                bar.y = bar.y+this.addUp;
                if(bar.y > 1160){
                    bar.setState(0);
                }
            }
            //碰撞判断
            console.log(this.blueBoat.y);
            var barState = bar.getState();
            var barRoad = bar.getRoad();
            var barType = bar.getType();
            if(barState == 1 && barType != 1){
                //the bar is work AND is not heart
                if(this.boatState == 1 && barRoad == 1) {
                    if(bar.y < 250 && bar.y > -30){
                        //在范围内，判断障碍在哪边,船在哪边
                        if(((bar.x < 156) && this.leftBoat == 0) || ((bar.x>=156) && this.leftBoat == 1)){
                            //bar at left and boat in left OR bar at right and boat in right ! is not heart
                            alert('lost');
                        }
                    }
                }else if(this.boatState == 2 && barRoad == 2) {
                    if(bar.y < 250 && bar.y > 50){
                        if((bar.x>320 && bar.x<476 && this.rightBoat == 0) || (bar.x>=476) && this.rightBoat == 1){
                            alert('lost');
                        }
                    }
                }else{
                    if(bar.y > 750 && bar.y < 1030){
                        //bar is in pong
                        if(barRoad == 1){
                            if(((bar.x < 156) && this.leftBoat == 0) || ((bar.x >= 156) && this.leftBoat == 1)) {
                                //bar at left and boat in left OR bar at right and boat in right ! is not heart
                                alert('lost');
                            }
                        }else{
                            if((bar.x > 320 && bar.x < 476 && this.rightBoat == 0) || (bar.x >= 476) && this.rightBoat == 1) {
                                alert('lost');
                            }
                        }
                    }
                }
            }
        }
        var add = Math.floor(this.goNum / 2500);
//        console.log(this.addUp);
        if(this.addUp < 15 && this.addUp < add){
            this.addUp = Math.floor(this.goNum/2500);
        }
    }
    
    private timerComFunc() {
        console.log("计时结束");
    }
	
	public setValue(state:number , speedUp:number){
	    
    	this.boatState = state;
    	this.speedUp = speedUp;
    	this.addUp = speedUp;
    }

    public begin() {
        this.removeChildren;
        this.show();
        if(this.boatState == 1) {
            this.blueBoat.y = 50;
            var color = 0x66CCFF;
            var image = "blueBoatDown_png";
            this.blueBoat.SetTitle(color,image);
        } else if(this.boatState == 2) {
            this.redBoat.y = 50;
            var color = 0x66CCFF;
            var image = "redBoatDown_png";
            this.redBoat.SetTitle(color,image);
        } else if(this.boatState == 3) {
            this.blueBoat.y = 50;
            this.redBoat.y = 50;
            var color = 0x66CCFF;
            var image = "blueBoatDown_png";
            this.blueBoat.SetTitle(color,image);
            var image = "redBoatDown_png";
            this.redBoat.SetTitle(color,image);
        }
        this.rightTouchBar.touchEnabled = true;
        this.leftTouchBar.touchEnabled = true;
        this.work();
    }

    public end() {
        this.show();
        this.rightTouchBar.touchEnabled = false;
        this.leftTouchBar.touchEnabled = false;
    }
}
