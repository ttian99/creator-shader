import BaseEffectComponent from "./comp/BaseEffectComponent";

const { ccclass, property, executeInEditMode } = cc._decorator;

class PointLightUBO {
    x: number = 0.5;
    y: number = 0.5;
    radius: number = 0.3;
}
export { PointLightUBO }


/**
 * 点光效果 :https://www.jianshu.com/p/8ff03b34b0bd
 * 1.原理：
 * - 画圆
 * - 中心点透明度为1.0，边缘透明度为0.0
 * - 在原图形上叠加圆
 * 
 * 2.确定参数
 * - 圆心:(x, y)
 * - 半径:radius
 * - 光的颜色: cc.Color
 */
@ccclass
@executeInEditMode()
export default class PointLight extends BaseEffectComponent {
    @property({ override: true })
    materialName = 'point-light';
    ubo = new PointLightUBO();
    @property(cc.Label)
    radiusLabel: cc.Label = null;

    @property(cc.Label)
    posLabel: cc.Label = null;
    @property(cc.Label) 
    redLabel: cc.Label = null;
    @property(cc.Label) 
    greenLabel: cc.Label = null;
    @property(cc.Label) 
    blueLabel: cc.Label = null;
    @property(cc.Label) 
    alphaLabel: cc.Label = null;


    setGrayLevel(lvl = 0.5) {
        this.setValue('grayLevel', lvl);
        this.renderDesc(lvl);
    }

    renderDesc(lvl) {
        this.desc.string = `灰化程度：${lvl.toFixed(2)}`;
    }

    setColor(type, value) {

    }

    onSliderRed(slider) {
        var lvl = slider.progress;
        this.setGrayLevel(lvl);
    }
    onSliderGreen(slider) {
        var lvl = slider.progress;
        this.setGrayLevel(lvl);
    }
    onSliderBlue(slider) {
        var lvl = slider.progress;
        this.setGrayLevel(lvl);
    }
    onSliderAlpha(slider) {
        var lvl = slider.progress;
        this.setGrayLevel(lvl);
    }
}
