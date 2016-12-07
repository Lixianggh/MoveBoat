/**
 *
 * @author
 *
 */
var Admin = (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        _super.call(this);
        this.show();
    }
    var d = __define,c=Admin,p=c.prototype;
    p.show = function () {
        var backView = new egret.Shape();
        backView.graphics.beginFill(0x66CCFF, 1);
        backView.graphics.drawRect(0, 0, 640, 1080);
        backView.graphics.endFill();
        this.addChild(backView);
        var centerLine = new egret.Shape();
        centerLine.graphics.lineStyle(8, 0xCC6633);
        centerLine.graphics.moveTo(320, 0);
        centerLine.graphics.lineTo(320, 1080);
        centerLine.graphics.endFill();
        this.addChild(centerLine);
        var leftLine = new egret.Shape();
        leftLine.graphics.lineStyle(4, 0xFFCC66);
        leftLine.graphics.moveTo(158, 0);
        leftLine.graphics.lineTo(158, 1080);
        leftLine.graphics.endFill();
        this.addChild(leftLine);
        var rightLine = new egret.Shape();
        rightLine.graphics.lineStyle(4, 0xFFCC66);
        rightLine.graphics.moveTo(478, 0);
        rightLine.graphics.lineTo(478, 1080);
        rightLine.graphics.endFill();
        this.addChild(rightLine);
        var blueBoat = new Boat();
        var color = 0x66CCFF;
        var image = "blueBoat_png";
        blueBoat.SetTitle(color, image);
        blueBoat.width = 156;
        blueBoat.height = 200;
        blueBoat.x = 0;
        blueBoat.y = 830;
        this.addChild(blueBoat);
        var redBoat = new Boat();
        var color = 0x66CCFF;
        var image = "redBoat_png";
        redBoat.SetTitle(color, image);
        redBoat.width = 156;
        redBoat.height = 200;
        redBoat.x = 324;
        redBoat.y = 830;
        this.addChild(redBoat);
        this.numLabel = new egret.TextField();
        this.numLabel.text = '0';
        //没写完,修改全局boat12
        var leftTouchBar = new egret.Shape();
        leftTouchBar.graphics.beginFill(0xff0000, 0);
        leftTouchBar.graphics.drawRect(0, 0, 320, 1080);
        leftTouchBar.graphics.endFill();
        this.addChild(leftTouchBar);
        leftTouchBar.touchEnabled = true;
        leftTouchBar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftTouch, this);
        var rightTouchBar = new egret.Shape();
        rightTouchBar.graphics.beginFill(0xff0000, 0);
        rightTouchBar.graphics.drawRect(0, 0, 320, 1080);
        rightTouchBar.x = 320;
        rightTouchBar.graphics.endFill();
        this.addChild(rightTouchBar);
        rightTouchBar.touchEnabled = true;
        rightTouchBar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightTouch, this);
    };
    p.rightTouch = function () {
        alert('right');
    };
    p.leftTouch = function () {
        alert('left');
    };
    return Admin;
}(egret.Sprite));
egret.registerClass(Admin,'Admin');
