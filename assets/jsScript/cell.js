let globalData = require('globalData');
let spriteTools = require('spriteTools');
var cell = cc.Class({
    properties: {
        no: 1,
        x: 0,
        y: 0,
        wh: 50,
        data: null,
        node: null,
        sprite: null,
    },

    ctor(){
        //console.log(`cell => ctor`);
	},

    create(parent){
        this.node = new cc.Node();
        parent.addChild(this.node);
        this.node.setPosition(this.x,this.y,0);
        this.node.width = this.wh;
        this.node.height = this.wh;
        //this.node.color = new cc.Color(0, 255, 255, 255);
        //this.node.color = this.node.color.fromHEX('#FF00FF');
        this.node.color = cc.Color.WHITE;
        this.sprite = this.node.addComponent(cc.Sprite);
        this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.sprite.spriteFrame = spriteTools.getDefaultSpriteFrame(50, 50);
        this.node.active = false;

        /*
        cc.resources.load("star_b", cc.SpriteFrame, (err, spriteFrame) => {
            this.sprite.spriteFrame = spriteFrame;
        });*/
        /*
        console.log(`[cell]create => 
        no: ${this.no}, 
        x: ${this.x}, 
        y: ${this.y}, 
        wh: ${this.wh},
        width: ${this.node.width},
        height: ${this.node.height},
        color: ${this.node.color},
        sprite: ${this.sprite != null},
        spriteFrame: ${this.sprite.spriteFrame != null},
        `);*/
    },

    update(all = false){
        if(this.node == null) return;
        if(this.sprite == null) return;
        if(all == true){
            this.node.setPosition(this.x,this.y,0);
        }
        if(this.data != null){
            if(globalData.USE_SPRITE){
                this.updateSprite();
            }else{
                this.updateColor();
            }
            this.node.active = true;
        }else{
            this.node.active = false;
        }
    },

    updateSprite(){
        if(this.node == null) return;
        if(this.sprite == null) return;
        if(typeof this.data === 'string' && this.data.length > 0){
            cc.resources.load(this.data, cc.SpriteFrame, (err, spriteFrame) => {
                //console.log(`updateSprite => err: ${err}`);
                this.sprite.spriteFrame = spriteFrame;
                //this.node.width = this.wh;
                //this.node.height = this.wh;
            });
        }else{
            this.node.color = cc.Color.WHITE;
        }
    },

    updateColor(){
        if(this.node == null) return;
        if(this.sprite == null) return;
        //console.log(`updateColor => this.data: ${this.data}`);
        if(typeof this.data === 'string' && this.data.length > 0 && this.data.substr(0,1) == '#'){
            this.node.color = this.node.color.fromHEX(this.data);
        }else{
            this.node.color = cc.Color.WHITE;
        }
    },

    showLog(){
        console.log(`[cell]showLog => no: ${this.no}, x: ${this.x}, y: ${this.y}, wh: ${this.wh}`);
    },
});

module.exports = cell;