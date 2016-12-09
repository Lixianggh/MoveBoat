class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;
    private admin:Admin;
    private welcom:Welcom;
    private lose:Lose;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;
    //GameOver
    public getData(evt: GameOver) {
        this.lose = new Lose();
        this.lose.width = 640;
        this.lose.height = 1080;
        this.lose.x = 0;
        this.lose.y = 0;
        this.stage.addChild(this.lose);
        var type = evt._type;
        var goNum = evt._goNum;
        this.lose.setValue(type , goNum);
        
        this.lose.beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goAgain,this);
    }
    
    private goAgain(){
        this.stage.removeChild(this.lose);
        this.stage.removeChild(this.admin);
        document.title = "双船快划";
        this.createGameScene();
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        
        this.admin = new Admin();
        this.admin.width = 640;
        this.admin.height = 1080;
        this.stage.addChild(this.admin);
        
        this.welcom = new Welcom();
        this.welcom.width = 640;
        this.welcom.height = 1080;
        this.stage.addChild(this.welcom);
        this.welcom.begin();
        this.welcom.herdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.herdTouch,this);
        this.welcom.medioBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.medioTouch,this);
        this.welcom.easyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.easyTouch,this);
        
        this.admin.addEventListener(GameOver.DATE,this.getData,this);
    }
    
    private herdTouch(evt: egret.TouchEvent) {
        this.welcom.end();
        this.stage.removeChild(this.welcom);
        //随机数
        var random: number = Math.floor(Math.random() * 2) + 1;
        this.admin.setValue(random,10);
        this.admin.begin();
    }
    private medioTouch(evt: egret.TouchEvent) {
        this.welcom.end();
        this.stage.removeChild(this.welcom);
        this.admin.setValue(0,8);
        this.admin.begin();
    }
    private easyTouch(evt: egret.TouchEvent) {
        this.welcom.end();
        this.stage.removeChild(this.welcom);
        this.admin.setValue(0,5);
        this.admin.begin();
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        let self:any = this;

        let parser = new egret.HtmlTextParser();
        let textflowArr:Array<Array<egret.ITextElement>> = [];
        for (let i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        let textfield = self.textfield;
        let count = -1;
        let change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            let tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


