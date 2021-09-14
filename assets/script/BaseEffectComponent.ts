const { ccclass, property, executeInEditMode } = cc._decorator;

/** 基础特效参数 */
class BaseUBO {

}

export { BaseUBO }


/** 基础特效组件 */
@ccclass
@executeInEditMode()
export default class BaseEffectComponent extends cc.Component {
    @property()
    materialName = '';

    @property(cc.RenderComponent)
    public renderers: cc.RenderComponent[] = [];
    public ubo: BaseUBO;

    resetInEditor() {
        // 获取所有的渲染组件
        const self = this.node.getComponents(cc.RenderComponent);
        const child = this.node.getComponentsInChildren(cc.RenderComponent);
        this.renderers = self.concat(child);
        // 加载material
        const url = `effect/${this.materialName}`;
        cc.resources.load(url, cc.Material, (err, m: cc.Material) => {
            if (err) {
                cc.error('load effect error!');
                cc.error(err);
                return;
            }
            this.renderers.forEach(r => r.setMaterial(0, m));
        });
    }

    setData(data: BaseUBO) {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (Object.prototype.hasOwnProperty.call(this.ubo, key)) {
                    this.ubo[key] = data[key];
                }
            }
        }
        this.updateMaterial();
    }

    /** 更新材质 */
    updateMaterial() {
        this.renderers.forEach(r => {
            let material = r.getMaterial(0);
            let ubo = this.ubo;
            for (const key in ubo) {
                if (Object.prototype.hasOwnProperty.call(ubo, key)) {
                    const value = ubo[key];
                    material.setProperty(key, value);
                }
            }
            r.setMaterial(0, material);
        })
    }

}