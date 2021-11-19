import BaseEffectComponent from "./BaseEffectComponent";

const { ccclass, property, executeInEditMode } = cc._decorator;

class GrayUBO {
    grayLevel: number = 0.5;
}
export { GrayUBO }


/**
 * 灰化
 */
@ccclass
@executeInEditMode()
export default class GrayComponent extends BaseEffectComponent {
    @property({ override: true })
    materialName = 'gray';
    ubo = new GrayUBO();

    onEnable() {
        
    }
    onDisable() {

    }
    // @property(cc.Label)
    // descLabel: cc.Label = null;

    setGrayLevel(lvl = 0.5) {
        this.setValue('grayLevel', lvl);
        this.renderDesc(lvl);
    }

    renderDesc(lvl) {
        this.descLabel.string = `灰化程度：${lvl.toFixed(2)}`;
    }

    onSlider(slider) {
        var lvl = slider.progress;
        this.setGrayLevel(lvl);
    }
}
