//游戏结束侦听
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._type = 0;
        this._goNum = 0;
    }
    var d = __define,c=GameOver,p=c.prototype;
    GameOver.DATE = "结束";
    return GameOver;
}(egret.Event));
egret.registerClass(GameOver,'GameOver');
