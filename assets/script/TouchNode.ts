const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchNode extends cc.Component {
    private touchPos: cc.Vec2 = cc.v2();
    
    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }
    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }
    onTouchStart(event) {
        this.getPos(event);
    }
    onTouchMove(event) {
        this.getPos(event);
    }
    onTouchEnd(event) {
        this.getPos(event);
    }
    onTouchCancel(event) {
        this.getPos(event);
    }

    getPos(event) {
        const touchPointInWorldSpace = event.getLocation();
        let touchPointInNodeSpace = this.node.convertToNodeSpaceAR(touchPointInWorldSpace);
        const pos = cc.v2(
            this.node.anchorX + touchPointInNodeSpace.x / this.node.width,
            1 - (this.node.anchorY + touchPointInNodeSpace.y / this.node.height)
        );
        this.touchPos = pos;
        return pos;
    }

    getTouchPos() {
        return this.touchPos;
    }
}
