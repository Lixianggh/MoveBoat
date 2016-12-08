/**
 *
 * @author
 *
 */
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.call(this);
        this.state = 0;
        this.road = 0;
        this.show();
    }
    var d = __define,c=Bar,p=c.prototype;
    p.show = function () {
        this.backImage = new egret.Bitmap();
        this.backImage.texture = RES.getRes(this.imageName);
        this.addChild(this.backImage);
    };
    p.setImage = function (image) {
        this.imageName = image;
        this.backImage.texture = RES.getRes(this.imageName);
    };
    p.getImage = function () {
        return this.imageName;
    };
    p.setState = function (state) {
        this.state = state;
    };
    p.setType = function (type) {
        this.type = type;
    };
    p.setRoad = function (road) {
        this.road = road;
    };
    p.getRoad = function () {
        return this.road;
    };
    p.getType = function () {
        return this.type;
    };
    p.getState = function () {
        return this.state;
    };
    return Bar;
}(egret.Sprite));
egret.registerClass(Bar,'Bar');
