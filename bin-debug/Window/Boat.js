/**
 *
 * @author
 *
 */
var Boat = (function (_super) {
    __extends(Boat, _super);
    function Boat() {
        _super.call(this);
        this.show();
    }
    var d = __define,c=Boat,p=c.prototype;
    p.show = function () {
        this.backImage = new egret.Bitmap();
        this.backImage.texture = RES.getRes(this.imageName);
        this.addChild(this.backImage);
    };
    p.SetTitle = function (color, image) {
        this.color = color;
        this.imageName = image;
        this.backImage.texture = RES.getRes(this.imageName);
    };
    return Boat;
}(egret.Sprite));
egret.registerClass(Boat,'Boat');
