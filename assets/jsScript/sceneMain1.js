let globalData = require('globalData');
let eventData = require('eventData');
cc.Class({
    extends: cc.Component,

    properties: {
        tetrisNode: {
            default: null,
            type: cc.Node,
        },
        tetrisComp: {
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.tetrisNode != null){
            this.tetrisComp = this.tetrisNode.getComponent('tetris');
            if(this.tetrisComp != null){
                this.tetrisComp.leftKeyCode = cc.macro.KEY.a;
                this.tetrisComp.rightKeyCode = cc.macro.KEY.d;
                this.tetrisComp.downKeyCode = cc.macro.KEY.s;
                this.tetrisComp.rotateKeyCode1 = cc.macro.KEY.w;
                this.tetrisComp.rotateKeyCode2 = cc.macro.KEY.space;
            }
            console.log(`sceneMain1 => tetrisComp: ${this.tetrisComp}, column: ${this.tetrisComp.column}`);
        }
        cc.game.on(eventData.GAME_OVER_EVENT, this.onGameOverEvent, this);
    },

    onDestroy () {
        cc.game.off(eventData.GAME_OVER_EVENT, this.onGameOverEvent, this);
    },

    start () {
        
    },

    // update (dt) {},

    onGameOverEvent(name = ''){
        console.log(`[sceneMain1]onGameOverEvent => name: ${name}`);

        //create gameover
        var node = new cc.Node();
        this.node.addChild(node);
        node.setPosition(this.tetrisNode.position.x,this.tetrisNode.position.y,0);
        var size = Math.min(this.tetrisNode.width+100, this.tetrisNode.height+100);
        node.width = size;
        node.height = size;
        var nSprite = node.addComponent(cc.Sprite);
        if(nSprite != null){
            nSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            cc.resources.load("game-over", cc.SpriteFrame, (err, spriteFrame) => {
                //console.log(`onGameOverEvent => err: ${err}`);
                nSprite.spriteFrame = spriteFrame;
            });
        }
    },
});
