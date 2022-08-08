
var spriteTools = {

    getDefaultSpriteFrame(width, height, color = cc.Color.WHITE){
        let texture = new cc.Texture2D;
        let spriteFrame = new cc.SpriteFrame;
        //texture.initWithData(new Uint8Array([color.r, color.g, color.b]), cc.Texture2D.PixelFormat.RGB888, 1, 1, cc.winSize);
        texture.initWithData(new Uint8Array([color.r, color.g, color.b]), cc.Texture2D.PixelFormat.RGB888, 1, 1);
        spriteFrame.setTexture(texture);
        spriteFrame.setRect(cc.rect(0, 0, width, height));
        return spriteFrame;
    },
}

module.exports = spriteTools;