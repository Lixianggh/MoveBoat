
//游戏结束侦听
class GameOver extends egret.Event {
    public static DATE: string = "结束";
    public _type: number = 0;
    public _goNum :number = 0;
    public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
    }
}