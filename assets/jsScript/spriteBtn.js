let globalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        uiOpacity: {
            default: null,
            visible: false,
        },
        canvas: {
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log(`spriteBtn => onLoad`);
        this.uiOpacity = this.node;
        this.canvas = cc.director.getScene().getChildByName('Canvas');
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
        console.log(`canvas => ${this.canvas}`);
    },

    onDestroy () {
        console.log(`spriteBtn => onDestroy`);
        this.uiOpacity = null;
        this.canvas = null;
        this.node.off(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.off(cc.Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    },

    start () {
        
    },

    update (dt) {
        
    },

    onMouseEnter () {
        console.log(`spriteBtn => onMouseEnter`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 200;
        }
    },

    onMouseLeave () {
        console.log(`spriteBtn => onMouseLeave`);
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 255;
        }
    },

    onMouseDown () {
        console.log(`spriteBtn => onMouseDown`);

        var node = new cc.Node();
        this.canvas.addChild(node);

        var v2 = this.getRandomPos();
        node.setPosition(v2.x,v2.y,0);
        //node.layer = cc.Layers.Enum.UI_2D;
        console.log(`spriteBtn => v2 : ${v2}`);

        var nSprite = node.addComponent(cc.Sprite);
        if(nSprite != null){
            cc.resources.load("star_a", cc.SpriteFrame, (err, spriteFrame) => {
                console.log(`onMouseDown => err: ${err}`);
                nSprite.spriteFrame = spriteFrame;
                nSprite.node.addComponent('autoDestroy').second = 3;
            });
        }
    },

    getRandomPos(){
        var x = cc.math.random() * globalData.MAX_WIDTH - globalData.MAX_WIDTH/2;
        var y = cc.math.random() * globalData.MAX_HEIGHT - globalData.MAX_HEIGHT/2;
        return cc.v2(x,y);
    },
});
