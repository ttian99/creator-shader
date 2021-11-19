import BaseEffectComponent from "./comp/BaseEffectComponent";

const { ccclass, property, executeInEditMode } = cc._decorator;

class MosaicUBO {
    xBlockCount: number = 4; //x轴方块数量
    yBlockCount: number = 4; //y轴方块数量
}
export { MosaicUBO }


/**
 * 马赛克效果
 *  原理很简单，一句话形容就是 m x n 方块内取同一颜色 ，具体为两个步骤：
    将纹理分成 m x n 个方块
    方块内取同一个颜色
 */
@ccclass
@executeInEditMode()
export default class Mosaic extends BaseEffectComponent {
    @property({ override: true })
    materialName = 'mosaic';
    ubo = new MosaicUBO();

    @property(cc.Label) xCount: cc.Label = null;
    @property(cc.Label) yCount: cc.Label = null;

    @property(cc.Integer) TotalCount: number = 1000;
    @property(cc.Integer) xNum: number = 4;
    @property(cc.Integer) yNum: number = 4;

    setBlockCount(x_y, count) {
        this.setValue(`${x_y}BlockCount`, count);
        this.render();
    }
    render() {
        this.xCount.string = `x轴数量:${this.xNum}`;
        this.yCount.string = `y轴数量:${this.yNum}`;
    }
    getCount(slider) {
        return Math.round(slider.progress * this.TotalCount);
    }
    onSliderX(slider) {
        const count = this.getCount(slider) || 1;
        this.xNum = count;
        this.setBlockCount('x', count);
    }
    onSliderY(slider) {
        const count = this.getCount(slider) || 1;
        this.yNum = count;
        this.setBlockCount('y', count);
    }
}
