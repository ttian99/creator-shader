import BaseEffectComponent from "./BaseEffectComponent";

const { ccclass, property, executeInEditMode } = cc._decorator;

class OldPhotoUBO {
    oldLevel: number = 0.5;
}
export { OldPhotoUBO }


@ccclass
@executeInEditMode()
export default class OldPhoto extends BaseEffectComponent {
    @property({ override: true })
    materialName = 'old-photo';
    @property({ override: true })
    ubo: OldPhotoUBO = new OldPhotoUBO();
    @property(cc.Label) 
    descLabel: cc.Label = null;

    start() {
        this.setOldLevel(0.5);
    }

    setOldLevel(lvl = 0.5) {
        this.setData({ oldLevel: lvl });
    }

    renderDesc() {
        this.descLabel.string = `老化程度：${this.ubo.oldLevel}`;
    }

    onSlider(slider) {
        var lvl = slider.progress;
        this.setOldLevel(lvl);
    }
}
