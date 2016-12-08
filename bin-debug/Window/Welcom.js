/**
 *
 * @author
 *
 */
var Welcom = (function (_super) {
    __extends(Welcom, _super);
    function Welcom() {
        _super.call(this);
        this.show();
    }
    var d = __define,c=Welcom,p=c.prototype;
    p.show = function () {
        var backgroundView = new egret.Shape();
        backgroundView.graphics.beginFill(0x000000, 0.9);
        backgroundView.graphics.drawRect(0, 0, 640, 1080);
        backgroundView.graphics.endFill();
        this.addChild(backgroundView);
        var title = new egret.TextField();
        title.width = 640;
        title.height = 70;
        title.size = 58;
        title.text = "游戏名";
        title.textAlign = "center";
        title.x = 0;
        title.y = 200;
        this.addChild(title);
        this.herdBtn = new egret.TextField();
        this.herdBtn.width = 640;
        this.herdBtn.height = 50;
        this.herdBtn.size = 42;
        this.herdBtn.text = "困难";
        this.herdBtn.textAlign = "center";
        this.herdBtn.x = 0;
        this.herdBtn.y = 450;
        this.addChild(this.herdBtn);
        this.medioBtn = new egret.TextField();
        this.medioBtn.width = 640;
        this.medioBtn.height = 50;
        this.medioBtn.size = 42;
        this.medioBtn.text = "中等";
        this.medioBtn.textAlign = "center";
        this.medioBtn.x = 0;
        this.medioBtn.y = 550;
        this.addChild(this.medioBtn);
        this.easyBtn = new egret.TextField();
        this.easyBtn.width = 640;
        this.easyBtn.height = 50;
        this.easyBtn.size = 42;
        this.easyBtn.text = "简单";
        this.easyBtn.textAlign = "center";
        this.easyBtn.x = 0;
        this.easyBtn.y = 650;
        this.addChild(this.easyBtn);
    };
    p.begin = function () {
        this.herdBtn.touchEnabled = true;
        this.medioBtn.touchEnabled = true;
        this.easyBtn.touchEnabled = true;
    };
    p.end = function () {
        this.herdBtn.touchEnabled = false;
        this.medioBtn.touchEnabled = false;
        this.easyBtn.touchEnabled = false;
    };
    return Welcom;
}(egret.Sprite));
egret.registerClass(Welcom,'Welcom');
