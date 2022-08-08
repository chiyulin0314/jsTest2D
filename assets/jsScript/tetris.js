let globalData = require('globalData');
let eventData = require('eventData');
let drawTools = require('drawTools');
let cell = require('cell');
let blockData = require('blockData');
let key = require('key');
cc.Class({
    extends: cc.Component,

    properties: {
        tetrisName: '',
        column: 20,
        row: 10,
        cellArray: {
            default: null,
            visible: false,
        },
        nowBlock: {
            default: null,
            visible: false,
        },
        blockPos: {
            default: null,
            visible: false,
        },
        blockColor: {
            default: null,
            visible: false,
        },
        blockType: {
            default: -1,
            visible: false
        },
        blockDir: {
            default: -1,
            visible: false
        },

        graphics: {
            default: null,
            visible: false,
        },
        lineColor: new cc.Color(0, 0, 0, 255),
        fillColor: new cc.Color(255, 255, 255, 200),
        lineWidth: 5,

        deltaTime: {
            default: 0,
            visible: false,
        },
        isGameOver: {
            default: false,
            visible: false,
        },
        isGamePause: {
            default: false,
            visible: false,
        },

        leftKeyCode: {
            default: cc.macro.KEY.a,
            visible: false,
        },
        rightKeyCode: {
            default: cc.macro.KEY.d,
            visible: false,
        },
        downKeyCode: {
            default: cc.macro.KEY.s,
            visible: false,
        },
        rotateKeyCode1: {
            default: cc.macro.KEY.w,
            visible: false,
        },
        rotateKeyCode2: {
            default: cc.macro.KEY.space,
            visible: false,
        },

        leftKey: {
            default: null,
            visible: false,
        },
        rightKey: {
            default: null,
            visible: false,
        },
        downKey: {
            default: null,
            visible: false,
        },

        deltaMoveTime: {
            default: 0,
            visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.graphics = this.node.addComponent(cc.Graphics);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    onDestroy () {
        this.graphics = null;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    start () {
        var res = this.setContainerSize();
        if(res === true){
            this.drawContainer();
            this.initKeys();
            this.initCells();
            this.initBlock();

            this.setBlock();
            this.drawBlock();
        }

        /*
        for(var i = 0;i < this.cellArray.length;i++){
            for(var j = 0;j < this.cellArray[i].length;j++){
                this.cellArray[i][j].showLog();
            }
        }*/
    },

    update (dt) {
        //console.log(`update dt: ${dt}`);
        if(this.blockPos == null) return;
        if(this.isGameOver || this.isGamePause) return;

        this.deltaMoveTime += dt;
        if(this.deltaMoveTime >= globalData.MOVE_TIME){
            this.updateKeyMove();
            this.deltaMoveTime -= globalData.MOVE_TIME;
        }
        
        this.deltaTime += dt;
        if(this.deltaTime >= globalData.DROP_TIME){
            this.blockPos.x++;
            if(this.isBlockOutside() || this.isBlockCollide()){
                //出界或到底
                this.blockPos.x--;
                this.copyBlock();
                this.cleanBlock();

                this.setBlock();
                this.drawBlock();
                if(this.isBlockCollide()){
                    //一出現就碰到 => game over
                    this.isGameOver = true;
                    cc.game.emit(eventData.GAME_OVER_EVENT, this.tetrisName);
                }
            }else{
                //沒事
                this.drawBlock();
            }
            this.deltaTime -= globalData.DROP_TIME;
        }
    },

    updateKeyMove(isDraw = true){
        var needUpdate = true;
        var lastKeyCode = this.getLastPressKeyCode();
        if(lastKeyCode == this.leftKeyCode){
            this.blockPos.y--;
            if(this.isBlockOutside() || this.isBlockCollide()){
                this.blockPos.y++;
                needUpdate = false;
            }
        }else if(lastKeyCode == this.rightKeyCode){
            this.blockPos.y++;
            if(this.isBlockOutside() || this.isBlockCollide()){
                this.blockPos.y--;
                needUpdate = false;
            }
        }else if(lastKeyCode == this.downKeyCode){
            this.blockPos.x++;
            if(this.isBlockOutside() || this.isBlockCollide()){
                this.blockPos.x--;
                needUpdate = false;
            }else{
                //主動按下後，重新計時自動落下
                this.deltaTime = 0;
            }
        }else{
            needUpdate = false;
        }

        if(needUpdate && isDraw){
            this.drawBlock();
        }

        return needUpdate;
    },

    onKeyDown (e) {
        if(this.blockPos == null) return;
        if(this.isGameOver || this.isGamePause) return;
        //console.log(`onKeyDown before => blockPos: ${this.blockPos}`);
        var needUpdate = false;
        switch(e.keyCode){
            case this.leftKeyCode:
                //console.log(`onKeyDown => leftKeyCode: ${this.leftKeyCode}`);
                this.leftKey?.onKeyDown();
                needUpdate = this.leftKey?.isKeyDown() ?? false;
                /*
                this.blockPos.y--;
                if(this.isBlockOutside() || this.isBlockCollide()){
                    this.blockPos.y++;
                }*/
                break;
            case this.rightKeyCode:
                //console.log(`onKeyDown => rightKeyCode: ${this.rightKeyCode}`);
                this.rightKey?.onKeyDown();
                needUpdate = this.rightKey?.isKeyDown() ?? false;
                /*
                this.blockPos.y++;
                if(this.isBlockOutside() || this.isBlockCollide()){
                    this.blockPos.y--;
                }*/
                break;
            case this.downKeyCode:
                //console.log(`onKeyDown => downKeyCode: ${this.downKeyCode}`);
                this.downKey?.onKeyDown();
                needUpdate = this.downKey?.isKeyDown() ?? false;
                /*
                this.blockPos.x++;
                if(this.isBlockOutside() || this.isBlockCollide()){
                    this.blockPos.x--;
                }else{
                    //主動按下後，重新計時自動落下
                    this.deltaTime = 0;
                }*/
                break;
        }

        if(needUpdate){
            this.updateKeyMove();
            this.deltaMoveTime = 0;
        }
        //console.log(`onKeyDown after => blockPos: ${this.blockPos}`);
        //this.drawBlock();
    },

    onKeyUp (e) {
        if(this.isGameOver || this.isGamePause) return;
        
        var needUpdate = false;
        switch(e.keyCode){
            case this.rotateKeyCode1:
                needUpdate = this.rotateBlock();
                break;
            case this.rotateKeyCode2:
                needUpdate = this.rotateBlock();
                break;

            case this.leftKeyCode:
                this.leftKey?.onKeyUp();
                break;
            case this.rightKeyCode:
                this.rightKey?.onKeyUp();
                break;
            case this.downKeyCode:
                this.downKey?.onKeyUp();
                break;
        }

        if(needUpdate){
            this.drawBlock();
        }
    },

    //取得最後按下的按鍵
    getLastPressKeyCode(){
        var keyCode = 0;
        var time = 0;
        if(this.leftKey != null && this.leftKey.isKeyPress && this.leftKey.keyDownTime > time){
            keyCode = this.leftKey.keyCode;
            time = this.leftKey.keyDownTime;
        }
        if(this.rightKey != null && this.rightKey.isKeyPress && this.rightKey.keyDownTime > time){
            keyCode = this.rightKey.keyCode;
            time = this.rightKey.keyDownTime;
        }
        if(this.downKey != null && this.downKey.isKeyPress && this.downKey.keyDownTime > time){
            keyCode = this.downKey.keyCode;
            time = this.downKey.keyDownTime;
        }

        return keyCode;
    },

    //判斷出界
    isBlockOutside(){
        if(this.blockPos == null) return false;
        if(this.nowBlock == null) return false;

        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                if(this.nowBlock[i][j].data != null){
                    var col = this.blockPos.x + i;
                    var row = this.blockPos.y + j;

                    if(col < 0 || col >= this.column) return true;
                    if(row < 0 || row >= this.row) return true;
                }
            }
        }

        return false;
    },

    //判斷碰撞
    isBlockCollide(){
        if(this.blockPos == null) return false;
        if(this.nowBlock == null) return false;
        if(this.cellArray == null) return false;

        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                if(this.nowBlock[i][j].data != null){
                    var col = this.blockPos.x + i;
                    var row = this.blockPos.y + j;

                    if(col >= 0 && col < this.column && row >= 0 && row < this.row){
                        var cellData = this.cellArray[col][row];
                        if(cellData.data != null){
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    },

    setContainerSize(){
        var maxW = this.row * globalData.CELL_WH;
        var maxH = this.column * globalData.CELL_WH;
        if(maxW > globalData.MAX_WIDTH || maxH > globalData.MAX_HEIGHT){
            return false;
        }else if(this.row < 4 || this.column < 4){
            return false;
        }

        this.node.width = maxW;
        this.node.height = maxH;
        return true;
    },

    drawContainer(){
        this.graphics.clear();
        this.graphics.lineWidth = this.lineWidth;
        this.graphics.fillColor = this.fillColor;
        this.graphics.strokeColor = this.lineColor;
        drawTools.fillRect(this.graphics,-this.node.width/2 - this.lineWidth/2 + 1, -this.node.height/2 - this.lineWidth/2 + 1, this.node.width + this.lineWidth - 2, this.node.height + this.lineWidth - 2);
        drawTools.stroke(this.graphics,-this.node.width/2 - this.lineWidth/2 + 1, -this.node.height/2 - this.lineWidth/2 + 1, this.node.width + this.lineWidth - 2, this.node.height + this.lineWidth - 2);
    },

    initCells(){
        var maxW = this.row * globalData.CELL_WH;
        var maxH = this.column * globalData.CELL_WH;

        var num = 1;
        this.cellArray = new Array(this.column);
        for(var i = 0;i < this.cellArray.length;i++){
            this.cellArray[i] = new Array(this.row);
            for(var j = 0;j < this.cellArray[i].length;j++){
                this.cellArray[i][j] = new cell();
                this.cellArray[i][j].no = num;
                num++;
            }
        }

        var posY = maxH/2 - globalData.CELL_WH/2;
        for(var i = 0;i < this.cellArray.length;i++){
            var posX = -maxW/2 + globalData.CELL_WH/2;
            for(var j = 0;j < this.cellArray[i].length;j++){
                this.cellArray[i][j].x = posX;
                this.cellArray[i][j].y = posY;
                this.cellArray[i][j].wh = globalData.CELL_WH;
                this.cellArray[i][j].create(this.node);
                posX += globalData.CELL_WH;
            }
            posY -= globalData.CELL_WH;
        }

        //console.log(`initCells children length => ${this.node.children.length}`);
    },

    initKeys(){
        this.leftKey = new key(this.leftKeyCode);
        this.rightKey = new key(this.rightKeyCode);
        this.downKey = new key(this.downKeyCode);
        this.leftKey.keyDownEvent = this.onKeyDownEvent;
    },

    initBlock(){
        var num = 1;
        this.nowBlock = new Array(4);
        for(var i = 0;i < this.nowBlock.length;i++){
            this.nowBlock[i] = new Array(4);
            for(var j = 0;j < this.nowBlock[i].length;j++){
                this.nowBlock[i][j] = new cell();
                this.nowBlock[i][j].no = num;
                this.nowBlock[i][j].wh = globalData.CELL_WH;
                this.nowBlock[i][j].create(this.node);
                num++;
            }
        }
        
        this.blockPos = cc.v2(0, Math.floor(this.row/2) - 2);
        this.blockColor = this.getRandomColor();
        //console.log(`[tetris]initBlock => blockColor: ${this.blockColor}`);
        this.nowBlock[1][1].data = this.blockColor;
        this.nowBlock[1][2].data = this.blockColor;
        this.nowBlock[2][1].data = this.blockColor;
        this.nowBlock[2][2].data = this.blockColor;
    },

    setBlock(){
        if(this.nowBlock == null) return false;

        this.blockPos = cc.v2(0, Math.floor(this.row/2) - 2);
        this.blockColor = this.getRandomColor();
        this.blockType = blockData.getRandomType(this.blockType);
        this.blockDir = blockData.BLOCK_DIR.DIR_0;
        var data = blockData.getBlockData(this.blockType);
        //console.log(`[tetris]setBlock => blockColor: ${this.blockColor}, blockType: ${this.blockType}, blockDir: ${this.blockDir}`);
        if(data != null){
            for(var x = 0;x < 4;x++){
                for(var y = 0;y < 4;y++){
                    if(data.length > x && data[x].length > y){
                        if(data[x][y] != 0){
                            this.nowBlock[x][y].data = this.blockColor;
                        }else{
                            this.nowBlock[x][y].data = null;
                        }
                    }else{
                        this.nowBlock[x][y].data = null;
                    }
                }
            }
        }else{
            console.error(`[tetris]setBlock data is null => blockType: ${this.blockType}, blockDir: ${this.blockDir}`);
        }
    },

    drawBlock(){
        if(this.blockPos == null) return false;
        if(this.nowBlock == null) return false;
        if(this.cellArray == null) return false;

        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                var col = this.blockPos.x + i;
                var row = this.blockPos.y + j;
                if(this.nowBlock[i][j].data != null){
                    if(col >= 0 && col < this.column && row >= 0 && row < this.row){
                        var cellData = this.cellArray[col][row];
                        this.nowBlock[i][j].x = cellData.x;
                        this.nowBlock[i][j].y = cellData.y;
                        this.nowBlock[i][j].update(true);
                    }else{
                        console.error(`[tetris]drawBlock => [i,j]: [${i},${j}], [col,row]: [${col},${row}]`);
                    }
                }else{
                    this.nowBlock[i][j].update(true);
                }
            }
        }
    },

    rotateBlock(){
        if(this.blockPos == null) return false;
        if(this.nowBlock == null) return false;
        if(this.cellArray == null) return false;
        var shiftX = 0;

        var newDir = (this.blockDir + 1) % blockData.BLOCK_DIR.DIR_COUNT;
        var data = blockData.getBlockData(this.blockType, newDir);
        if(data == null) return false;

        //檢查是否需往左右移
        if(this.blockPos.y < 0){
            //檢查右移
            for(var y = 0;y < 4;y++){
                var row = this.blockPos.y + y;
                if(row >= 0) break;

                for(var x = 0;x < 4;x++){
                    var col = this.blockPos.x + x;
                    //console.log(`[tetris]rotateBlock(右) => (x,y): (${x},${y}), (col,row): (${col},${row}), val: ${data[x][y]}`);
                    if(data[x][y] != 0){
                        shiftX = 0 - row;
                        break;
                    }
                }

                if(shiftX != 0){
                    break;
                }
            }
            //console.log(`[tetris]rotateBlock 檢查右移 => shiftX: ${shiftX}`);
        }else if(this.blockPos.y + 3 > this.row){
            //檢查左移
            for(var y = 3;y >= 0;y--){
                var row = this.blockPos.y + y;
                if(row < this.row) break;

                for(var x = 0;x < 4;x++){
                    var col = this.blockPos.x + x;
                    //console.log(`[tetris]rotateBlock(左) => (x,y): (${x},${y}), (col,row): (${col},${row}), val: ${data[x][y]}`);
                    if(data[x][y] != 0){
                        shiftX = this.row - row - 1;
                        break;
                    }
                }

                if(shiftX != 0){
                    break;
                }
            }
            //console.log(`[tetris]rotateBlock 檢查左移 => shiftX: ${shiftX}`);
        }

        //檢查位移後是否有碰撞
        var isCollide = false;
        var newPos = cc.v2(this.blockPos.x, this.blockPos.y + shiftX);
        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                if(data[i][j] != 0){
                    var col = newPos.x + i;
                    var row = newPos.y + j;

                    if(col < 0 || col >= this.column){
                        isCollide = true;
                    }
                    if(row < 0 || row >= this.row){
                        isCollide = true;
                    }

                    if(isCollide == false){
                        var cellData = this.cellArray[col][row];
                        //console.log(`[tetris]rotateBlock 檢查碰撞 => (i,j): (${i},${j}), (col,row): (${col},${row}), newPos: ${newPos}`);
                        if(cellData.data != null){
                            isCollide = true;
                        }
                    }
                }
            }
        }

        if(isCollide == true){
            return false;
        }else{
            this.blockPos = newPos;
            this.blockDir = newDir;

            for(var x = 0;x < 4;x++){
                for(var y = 0;y < 4;y++){
                    if(data.length > x && data[x].length > y){
                        if(data[x][y] != 0){
                            this.nowBlock[x][y].data = this.blockColor != null ? this.blockColor : globalData.COLOR_LIST[0];
                        }else{
                            this.nowBlock[x][y].data = null;
                        }
                    }else{
                        this.nowBlock[x][y].data = null;
                    }
                }
            }
        }

        return true;
    },

    copyBlock(){
        if(this.blockPos == null) return false;
        if(this.nowBlock == null) return false;
        if(this.cellArray == null) return false;

        for(var i = 0;i < 4;i++){
            for(var j = 0;j < 4;j++){
                var col = this.blockPos.x + i;
                var row = this.blockPos.y + j;
                if(this.nowBlock[i][j].data != null){
                    if(col >= 0 && col < this.column && row >= 0 && row < this.row){
                        this.cellArray[col][row].data = this.nowBlock[i][j].data;
                        this.cellArray[col][row].update();
                    }else{
                        console.error(`[tetris]drawBlock => [i,j]: [${i},${j}], [col,row]: [${col},${row}]`);
                    }
                }
            }
        }
    },

    cleanBlock(){
        if(this.blockPos == null) return false;
        if(this.nowBlock == null) return false;
        if(this.cellArray == null) return false;

        for(var i = 0;i < 4;i++){
            var col = this.blockPos.x + i;
            if(col < 0 || col >= this.column) break;

            //取得一列填滿的數量
            var num = 0;
            for(var row = 0;row < this.row;row++){
                if(this.cellArray[col][row].data != null){
                    num++;
                }else{
                    break;
                }
            }

            //這列已滿，消除作業
            if(num == this.row){
                //取得這列的資料(避開當前顏色)
                var rowData = new Array(this.row);
                for(var y = 0;y < this.row;y++){
                    if(this.blockColor == this.cellArray[col][y].data){
                        rowData[y] = null;
                    }else{
                        rowData[y] = this.cellArray[col][y].data;
                    }
                }

                //搬移作業
                for(var x = col;x > 0;x--){
                    for(var y = 0;y < this.row;y++){
                        this.cellArray[x][y].data = this.cellArray[x-1][y].data;
                        this.cellArray[x][y].update();
                    }
                }

                //清空第一行
                for(var y = 0;y < this.row;y++){
                    this.cellArray[0][y].data = null;
                    this.cellArray[0][y].update();
                }

                //將取得的列資料送出
                console.log(`[tetris]cleanBlock emit => rowData: ${rowData}`);
                cc.game.emit(eventData.CLEAN_BLOCK_EVENT, this.tetrisName, rowData);
            }
        }
    },

    getRandomColor(canSame = false){
        if(globalData.COLOR_LIST.length <= 0) return false;

        var index = cc.math.randomRangeInt(0, globalData.COLOR_LIST.length);
        if(canSame == false && globalData.COLOR_LIST[index] == this.blockColor){
            console.log(`[tetris]getRandomColor avoid same => blockColor: ${this.blockColor}, newColor: ${globalData.COLOR_LIST[index]}`);
            index = (index + cc.math.randomRangeInt(1, globalData.COLOR_LIST.length)) % globalData.COLOR_LIST.length;
        }
        //console.log(`[tetris]getRandomColor => index: ${index}, globalData.COLOR_LIST: ${globalData.COLOR_LIST}`);
        return globalData.COLOR_LIST[index];
    },

    addToBottom(data){
        if(this.isGameOver || this.isGamePause) return;
        if(this.blockPos == null) return false;
        if(this.nowBlock == null) return false;
        if(this.cellArray == null) return false;
        if(data == null || Array.isArray(data) == false) return;

        var length = Math.min(this.row, data.length);
        var isLose = false;

        //檢查data
        var hasData = false;
        for(var i = 0;i < length;i++){
            if(data[i] != null && data[i] != ''){
                hasData = true;
                break;
            }
        }
        if(hasData == false) return false;

        //檢查第一列有無東西，有的話一定輸
        for(var j = 0;j < this.row;j++){
            if(this.cellArray[0][j].data != null){
                isLose = true;
                break;
            }
        }

        //往上推
        for(var x = 0;x < this.column - 1;x++){
            for(var y = 0;y < this.row;y++){
                this.cellArray[x][y].data = this.cellArray[x+1][y].data;
                this.cellArray[x][y].update();
            }
        }

        //新增至最後一行
        for(var y = 0;y < this.row;y++){
            var val = data.length > y && data[y] != null && data[y] != '' ? data[y] : null;
            this.cellArray[this.column - 1][y].data = val;
            this.cellArray[this.column - 1][y].update();
        }

        //檢查方塊有無碰撞
        if(this.isBlockCollide()){
            //若當前方塊已在最上面且第一列有值 => 輸
            //否則將方塊往上推一格且判斷為強制碰撞，然後再生成新方塊
            var isValRow1 = false;
            if(this.blockPos.x == 0){
                for(var i = 0;i < 4;i++){
                    if(this.nowBlock[0][i].data != null){
                        isValRow1 = true;
                        break;
                    }
                }
            }

            if(isValRow1){
                isLose = true;
            }else{
                this.blockPos.x--;
                this.copyBlock();
                this.cleanBlock();

                this.setBlock();
                this.drawBlock();
                if(this.isBlockCollide()){
                    //一出現就碰到 => game over
                    isLose = true;
                }
                this.deltaTime = 0;
            }
        }

        if(isLose){
            this.isGameOver = true;
            cc.game.emit(eventData.GAME_OVER_EVENT, this.tetrisName);
        }
    },
});
