let globalData = require('globalData');
cc.Class({
    extends: cc.Component,

    properties: {
        xSpeed: 10.0,
        trans: {
            default: null,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad(){
        console.log(`spriteMove => onLoad`);
        this.trans = this.node;
        if(this.trans != null){
            console.log(`trans is not null, width: ${this.trans.width}, height: ${this.trans.height}`);
        }
    },

    start () {
        console.log(`spriteMove => start`);
    },

    update (dt) {
        var pos = this.node.position;
        var newX = pos.x + this.xSpeed*dt;
        this.node.setPosition(newX,pos.y,pos.z);

        if(this.trans != null){
            //console.log(`update => newX: ${newX}`);
            if(this.xSpeed > 0 && newX + this.trans.width / 2 > globalData.MAX_WIDTH / 2){
                console.log(`update => over X => hide`);
                this.node.active = false;
            }
        }
    },

    onDisable(){
        console.log(`spriteMove => onDisable`);
        setTimeout(()=>{
            console.log("onDisable => setTimeout");
            var pos = this.node.position;
            var newX = - globalData.MAX_WIDTH/2;
            if(this.trans != null){
                newX += this.trans.width / 2;
            }
            this.node.setPosition(newX,pos.y,pos.z);
            this.node.active = true;
        }, 3000);
    },
});
