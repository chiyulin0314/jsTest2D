let globalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        uiOpacity: {
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.uiOpacity = this.node;
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    },

    onDestroy () {
        this.uiOpacity = null;
        this.node.off(cc.Node.EventType.MOUSE_DOWN,this.onMouseDown,this);
        this.node.off(cc.Node.EventType.MOUSE_ENTER,this.onMouseEnter,this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE,this.onMouseLeave,this);
    },

    start () {

    },

    // update (dt) {},

    onMouseEnter () {
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 200;
        }
    },

    onMouseLeave () {
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 255;
        }
    },

    onMouseDown () {
        if(this.uiOpacity != null){
            this.uiOpacity.opacity = 222;
        }

        cc.director.loadScene(globalData.MAIN_SCENE);
    },
});
