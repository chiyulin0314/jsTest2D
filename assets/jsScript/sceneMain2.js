let globalData = require('globalData');
let eventData = require('eventData');
cc.Class({
    extends: cc.Component,

    properties: {
        tetrisNode1: {
            default: null,
            type: cc.Node,
        },
        tetrisComp1: {
            default: null,
            visible: false,
        },

        tetrisNode2: {
            default: null,
            type: cc.Node,
        },
        tetrisComp2: {
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(this.tetrisNode1 != null){
            this.tetrisComp1 = this.tetrisNode1.getComponent('tetris');
            if(this.tetrisComp1 != null){
                this.tetrisComp1.leftKeyCode = cc.macro.KEY.a;
                this.tetrisComp1.rightKeyCode = cc.macro.KEY.d;
                this.tetrisComp1.downKeyCode = cc.macro.KEY.s;
                this.tetrisComp1.rotateKeyCode1 = cc.macro.KEY.w;
                this.tetrisComp1.rotateKeyCode2 = cc.macro.KEY.space;
            }
        }

        if(this.tetrisNode2 != null){
            this.tetrisComp2 = this.tetrisNode2.getComponent('tetris');
            if(this.tetrisComp2 != null){
                this.tetrisComp2.leftKeyCode = cc.macro.KEY.left;
                this.tetrisComp2.rightKeyCode = cc.macro.KEY.right;
                this.tetrisComp2.downKeyCode = cc.macro.KEY.down;
                this.tetrisComp2.rotateKeyCode1 = cc.macro.KEY.up;
                this.tetrisComp2.rotateKeyCode2 = cc.macro.KEY.enter;
            }
        }
        cc.game.on(eventData.GAME_OVER_EVENT, this.onGameOverEvent, this);
        cc.game.on(eventData.CLEAN_BLOCK_EVENT, this.onCleanBlockEvent, this);
    },

    onDestroy () {
        cc.game.off(eventData.GAME_OVER_EVENT, this.onGameOverEvent, this);
        cc.game.off(eventData.CLEAN_BLOCK_EVENT, this.onCleanBlockEvent, this);
    },

    start () {

    },

    // update (dt) {},

    onGameOverEvent(name = ''){
        console.log(`[sceneMain2]onGameOverEvent => name: ${name}`);

        var loseTetrisNode = null;
        var winTetrisNode = null;
        if(this.tetrisComp1.tetrisName == name){
            loseTetrisNode = this.tetrisNode1;
            winTetrisNode = this.tetrisNode2;
            this.tetrisComp2.isGamePause = true;
        }else{
            loseTetrisNode = this.tetrisNode2;
            winTetrisNode = this.tetrisNode1;
            this.tetrisComp1.isGamePause = true;
        }

        //create lose
        var nodeLose = new cc.Node();
        this.node.addChild(nodeLose);
        nodeLose.setPosition(loseTetrisNode.position.x,loseTetrisNode.position.y,0);
        var size = Math.min(loseTetrisNode.width+100, loseTetrisNode.height+100);
        nodeLose.width = size;
        nodeLose.height = size;
        var nSpriteLose = nodeLose.addComponent(cc.Sprite);
        if(nSpriteLose != null){
            nSpriteLose.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            cc.resources.load("lose", cc.SpriteFrame, (err, spriteFrame) => {
                //console.log(`onGameOverEvent => err: ${err}`);
                nSpriteLose.spriteFrame = spriteFrame;
            });
        }

        //create win
        var nodeWin = new cc.Node();
        this.node.addChild(nodeWin);
        nodeWin.setPosition(winTetrisNode.position.x,winTetrisNode.position.y,0);
        var size = Math.min(winTetrisNode.width+100, winTetrisNode.height+100);
        nodeWin.width = size;
        nodeWin.height = size;
        var nSpriteWin = nodeWin.addComponent(cc.Sprite);
        if(nSpriteWin != null){
            nSpriteWin.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            cc.resources.load("win", cc.SpriteFrame, (err, spriteFrame) => {
                //console.log(`onGameOverEvent => err: ${err}`);
                nSpriteWin.spriteFrame = spriteFrame;
            });
        }
    },

    onCleanBlockEvent(name, data){
        console.log(`[sceneMain2]onCleanBlockEvent => name: ${name}, data: ${data}`);
        if(globalData.IS_HINDER == false) return;

        var targetTetrisComp = null;
        if(this.tetrisComp1.tetrisName == name){
            targetTetrisComp = this.tetrisComp2;
        }else{
            targetTetrisComp = this.tetrisComp1;
        }

        var needSend = false;
        if(data != null && Array.isArray(data)){
            for(var i = 0;i < data.length;i++){
                if(data[i] != null && data[i] != ''){
                    needSend = true;
                    break;
                }
            }

            if(needSend){
                targetTetrisComp.addToBottom(data);
            }else{
                console.warn(`[sceneMain2]onCleanBlockEvent => not need to send`);
            }
        }
    },
});
