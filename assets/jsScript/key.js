
var key = cc.Class({
    extends: cc.Component,

    properties: {
        keyCode: null,
        isValid: {
            get(){
                return typeof this.keyCode == 'number' && this.keyCode > 0;
            }
        },
        _preState: 0, // 0=UP, 1=DOWN
        _nowState: 0, // 0=UP, 1=DOWN
        keyDownTime: 0,
        keyDownEvent: null,
        keyUpEvent: null,
    },

    ctor(keyCode){
        this.keyCode = keyCode;
        if(this.isValid == false){
            console.error(`[key]ctor failed => keyCode: ${keyCode}`);
        }
	},

    onKeyDown(){
        if(this.isValid == false) return;

        this._preState = this._nowState;
        this._nowState = 1;

        if(this.isKeyDown()){
            this.keyDownTime = new Date().getTime();
            //console.log(`[key]onKeyDown => keyDownTime: ${this.keyDownTime}`);
            if(typeof this.keyDownEvent === 'function'){
                this.keyDownEvent(this.keyCode);
            }
        }
    },

    onKeyUp(){
        if(this.isValid == false) return;

        this._preState = this._nowState;
        this._nowState = 0;

        if(this.isKeyUp()){
            this.keyDownTime = 0;
            //console.log(`[key]onKeyUp`);
            if(typeof this.keyUpEvent === 'function'){
                this.keyUpEvent(this.keyCode);
            }
        }
    },

    //按下的一瞬間
    isKeyDown(){
        return this._preState == 0 && this._nowState == 1;
    },

    //放開的一瞬間
    isKeyUp(){
        return this._preState == 1 && this._nowState == 0;
    },

    //按住
    isKeyPress(){
        return this._nowState == 1;
    },
});
module.exports = key;