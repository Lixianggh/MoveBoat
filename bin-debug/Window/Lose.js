/**
 *
 * @author
 *
 */
var Lose = (function (_super) {
    __extends(Lose, _super);
    function Lose() {
        _super.call(this);
        this.show();
    }
    var d = __define,c=Lose,p=c.prototype;
    p.show = function () {
        var backgroundView = new egret.Shape();
        backgroundView.graphics.beginFill(0x000000, 0.9);
        backgroundView.graphics.drawRect(0, 0, 640, 1080);
        backgroundView.graphics.endFill();
        this.addChild(backgroundView);
        this.title = new egret.TextField();
        this.title.width = 640;
        this.title.height = 70;
        this.title.size = 58;
        this.title.text = "鼓励语";
        this.title.textAlign = "center";
        this.title.x = 0;
        this.title.y = 200;
        this.addChild(this.title);
        this.beginBtn = new egret.TextField();
        this.beginBtn.width = 640;
        this.beginBtn.height = 50;
        this.beginBtn.size = 42;
        this.beginBtn.text = "重新开始";
        this.beginBtn.textAlign = "center";
        this.beginBtn.x = 0;
        this.beginBtn.y = 450;
        this.addChild(this.beginBtn);
        this.beginBtn.touchEnabled = true;
    };
    p.setValue = function (type, goNum) {
    };
    return Lose;
}(egret.Sprite));
egret.registerClass(Lose,'Lose');
