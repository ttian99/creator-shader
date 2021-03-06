import BaseEffectComponent from "./comp/BaseEffectComponent";

const { ccclass, property, executeInEditMode } = cc._decorator;

class OldPhotoUBO {
    oldLevel: number = 0.5;
}
export { OldPhotoUBO }


/**
 * 老照片
 */
@ccclass
@executeInEditMode()
export default class OldPhoto extends BaseEffectComponent {
    @property({ override: true })
    materialName = 'old-photo';
    ubo = new OldPhotoUBO();
    @property(cc.Label)
    descLabel: cc.Label = null;

    setOldLevel(lvl = 0.5) {
        this.setValue('oldLevel', lvl);
        this.renderDesc(lvl);
    }

    renderDesc(lvl) {
        this.descLabel.string = `老化程度：${lvl.toFixed(2)}`;
    }

    onSlider(slider) {
        var lvl = slider.progress;
        this.setOldLevel(lvl);
    }
}
