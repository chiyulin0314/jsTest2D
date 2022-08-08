cc.Class({
    extends: cc.Component,

    properties: {
        second: 3,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onDestroy(){
        console.log(`autoDestroy => onDestroy`);
    },

    start() {
        setTimeout(()=>{
            if(this.node != null){
                this.node.destroy();
            }
        }, this.second*1000);
    },

    // update (dt) {},
});
