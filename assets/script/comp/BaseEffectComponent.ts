const { ccclass, property, executeInEditMode } = cc._decorator;


/** 基础特效组件 */
@ccclass
@executeInEditMode()
export default class BaseEffectComponent extends cc.Component {
    @property()
    materialName = '';
    @property(cc.RenderComponent)
    renderers: cc.RenderComponent[] = [];
    @property(cc.Material)
    mtl: cc.Material = null;

    protected ubo: any = {};

    resetInEditor() {
        this.getAllRenderers();
        this.loadMaterial();
    }

    // 获取所有的渲染组件
    private getAllRenderers() {
        const self = this.node.getComponents(cc.RenderComponent);
        const child = this.node.getComponentsInChildren(cc.RenderComponent);
        this.renderers = self.concat(child);
    }
    private loadMaterial() {
        // 加载material
        const url = `effect/${this.materialName}`;
        cc.resources.load(url, cc.Material, (err, m: cc.Material) => {
            if (err) {
                cc.error('load effect error!');
                cc.error(err);
                return;
            }
            this.mtl = m;
            this.renderers.forEach(r => r.setMaterial(0, m));
        });
    }

    onLoad() {
        this.getAllRenderers();
        this.loadMaterial();
    }

    onEnable() {
        this.node.on('refresh-data', this.onRefreshData, this);
    }
    onDisable() {
        this.node.off('refresh-data', this.onRefreshData, this);
    }

    setData(ubo: any) {
        if (!ubo) return;
        this.ubo = ubo;
        this.updateMaterial();
    }

    setValue(key: string, value: any) {
        this.ubo[key] = value;
        this.updateMaterial();
    }


    /** 更新材质 */
    updateMaterial() {
        const material = this.mtl;
        let ubo = this.ubo;
        for (const key in ubo) {
            if (Object.prototype.hasOwnProperty.call(ubo, key)) {
                const value = ubo[key];
                cc.log('value', value);
                material.setProperty(key, value);
            }
        }

        let arr = this.renderers;
        for (let i = 0; i < arr.length; i++) {
            const renderer = arr[i];
            let material = renderer.getMaterial(0);
            renderer.setMaterial(0, material);
        }
    }

    onRefreshData(data) {

    }
}