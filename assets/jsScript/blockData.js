var blockData = {

    BLOCK_DIR: cc.Enum({
        DIR_0: 0,
        DIR_1: 1,
        DIR_2: 2,
        DIR_3: 3,
        DIR_COUNT: 4,
    }),
    BLOCK_TYPE: cc.Enum({
        TYPE_I: 0,
        TYPE_J: 1,
        TYPE_L: 2,
        TYPE_O: 3,
        TYPE_S: 4,
        TYPE_T: 5,
        TYPE_Z: 6,
        TYPE_COUNT: 7,
    }),
    blockData: null,

    initBlock(){
        this.blockData = new Array(this.BLOCK_TYPE.TYPE_COUNT);
        for(var type = 0;type < this.BLOCK_TYPE.TYPE_COUNT;type++){
            this.blockData[type] = new Array(this.BLOCK_DIR.DIR_COUNT);
            for(var dir = 0;dir < this.BLOCK_DIR.DIR_COUNT; dir++){
                this.blockData[type][dir] = new Array(4);
                for(var x = 0;x < 4;x++){
                    this.blockData[type][dir][x] = new Array(4);
                    for(var y = 0;y < 4;y++){
                        this.blockData[type][dir][x][y] = 0;
                    }
                }
            }
        }

        this.initBlockI();
        this.initBlockJ();
        this.initBlockL();
        this.initBlockO();
        this.initBlockS();
        this.initBlockT();
        this.initBlockZ();
        //this.showLog();
    },

    initBlockI(){
        var index = this.BLOCK_TYPE.TYPE_I;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][3] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][2][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][3][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][3] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][3][1] = 1;
    },

    initBlockJ(){
        var index = this.BLOCK_TYPE.TYPE_J;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][2][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][2][1] = 1;
    },

    initBlockL(){
        var index = this.BLOCK_TYPE.TYPE_L;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][2][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][2][1] = 1;
    },

    initBlockO(){
        var index = this.BLOCK_TYPE.TYPE_O;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][2] = 1;
    },

    initBlockS(){
        var index = this.BLOCK_TYPE.TYPE_S;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][2][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][2][1] = 1;
    },

    initBlockT(){
        var index = this.BLOCK_TYPE.TYPE_T;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][2][1] = 1;
    },

    initBlockZ(){
        var index = this.BLOCK_TYPE.TYPE_Z;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_0][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][0][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][1][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_1][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_2][2][2] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][0][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][0] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][1][1] = 1;
        this.blockData[index][this.BLOCK_DIR.DIR_3][2][0] = 1;
    },

    getRandomType(curType, canSame = false){
        if(this.blockData == null){
            this.initBlock();
        }

        var type = cc.math.randomRangeInt(0, this.BLOCK_TYPE.TYPE_COUNT);
        if(curType == type && canSame == false){
            console.log(`[blockData]getRandomType avoid same => type: ${type}, curType: ${curType}`);
            type = (type + cc.math.randomRangeInt(1, this.BLOCK_TYPE.TYPE_COUNT)) % this.BLOCK_TYPE.TYPE_COUNT;
        }

        return type;
    },

    getBlockData(type, dir = this.BLOCK_DIR.DIR_0){
        if(this.blockData == null){
            this.initBlock();
        }

        if(typeof type !== 'number' || type >= this.BLOCK_TYPE.TYPE_COUNT){
            type = this.BLOCK_TYPE.TYPE_I;
        }
        if(typeof dir !== 'number' || dir >= this.BLOCK_DIR.DIR_COUNT){
            dir = this.BLOCK_DIR.DIR_0;
        }

        return this.blockData[type][dir];
    },

    showLog(){
        for(var t = 0;t < this.blockData.length;t++){
            for(var d = 0;d < this.blockData[t].length;d++){
                var str = '';
                for(var x = 0;x < this.blockData[t][d].length;x++){
                    for(var y = 0;y < this.blockData[t][d][x].length;y++){
                        str += this.blockData[t][d][x][y] == 0 ? 'X' : 'O';
                    }
                    str += '\n';
                }
                console.log(str);
            }
        }
    },
}

module.exports = blockData;