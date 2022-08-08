
var drawTools = {
    
    fillRect(graphics,x,y,w,h){
        if(graphics == null || typeof graphics.fillRect !== 'function'){
            return false;
        }else if(x == null || typeof x !== 'number'){
            return false;
        }else if(y == null || typeof y !== 'number'){
            return false;
        }else if(w == null || typeof w !== 'number'){
            return false;
        }else if(h == null || typeof h !== 'number'){
            return false;
        }

        graphics.fillRect(x,y,w,h);
        return true;
    },

    stroke(graphics,x,y,w,h){
        if(graphics == null || typeof graphics.rect !== 'function' || typeof graphics.stroke !== 'function'){
            return false;
        }else if(x == null || typeof x !== 'number'){
            return false;
        }else if(y == null || typeof y !== 'number'){
            return false;
        }else if(w == null || typeof w !== 'number'){
            return false;
        }else if(h == null || typeof h !== 'number'){
            return false;
        }

        graphics.rect(x,y,w,h);
        graphics.stroke();
        return true;
    },
}

module.exports = drawTools;