<template>
    <div>
        <Card v-show='activeComp.name'>
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                {{activeComp.name}}
                {{activeComp.id}}
            </p>
            <div slot="extra">
                <Button @click='deleteComp' type='error'>删除组件</Button>
            </div>
            <div class="content">
                <div v-if='hasProps'>
                    <div class="custom" v-if='activeComp.enableCustomTemplate'>
                        <Dynamic 
                            :tpName='currentTpName'
                            :editProps='activeComp.props'
                            :change='DynamicTpHandler'
                        />
                    </div>
                    <div v-else>
                        <div v-for="(value, key) in activeComp.props" :key="key">
                            <!-- 简单组件props编辑 即 !enableCustomTemplate -->
                            <Item 
                                v-model='activeComp.props[key]'
                                :label="key"
                            />
                        </div>
                    </div>
                </div>
                <Divider v-else>
                    该组件暂无可编辑参数
                </Divider>
            </div>
            <Row>
                <Col class="center">
                    <div style="text-align: center">
                        <Button @click='tempStorage' type='success'>暂存</Button>
                    </div>
                </Col>
            </Row>
        </Card>
        <Card v-show='!activeComp.name'>
            <Divider>
                暂无选中组件
            </Divider>
        </Card>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch} from 'vue-property-decorator'
import { State, Mutation, Getter } from 'vuex-class';
import { WidgetComp, EditProps, Page } from '../../interface';
import { DEL_COMP, SET_ACTIVECOMP, STORAGE_PAGE_DATA } from '../../store/constants';
import Item from './item.vue';
import Dynamic from './dynamicTpGenerator.vue';
@Component({
    components: {
        Item,
        Dynamic
    }
})
export default class extends Vue {

    @State activeComp!: WidgetComp;
    @State componentList!: WidgetComp[];
    @Getter currentPage!: Page;
    @Mutation DEL_COMP!: Function;
    @Mutation SET_ACTIVECOMP!: Function;
    @Mutation STORAGE_PAGE_DATA!: Function;
    @Watch('activeComp')
    onCompChange(val: WidgetComp) {
        const comp = this.activeComp;
        this.hasProps = Reflect.has(comp, 'props') && Object.keys(comp.props).length > 0;
        if(val.enableCustomTemplate) {
            const compName = val.component;
            this.currentTpName = val.component.replace(/z\-/, '');
        }
    }
    editProps = {};
    currentTpName = '';
    hasProps: boolean = true;

    mounted() {
        // 刷新后手动关联List与activeComp
        if(this.activeComp.id) {
            const List = this.currentPage.componentList;
            const index = List.findIndex(comp => comp.id === this.activeComp.id);
            this.SET_ACTIVECOMP(List[index])
        }
    }
    // 动态组件数据更新处理
    DynamicTpHandler(params: EditProps) {
        // console.log(params);
        const { type, value } = params;
        console.log(type, value);
        this.activeComp.props[type] = value;
    }
    // 暂存数据
    tempStorage() {
        this.STORAGE_PAGE_DATA();
        this.$Message.success("保存成功")
    }
    // 删除当前激活组件
    deleteComp() {
        const id = this.activeComp.id;
        console.log(id);
        this.DEL_COMP(id);
        this.SET_ACTIVECOMP({
        })
    }
}
</script>

<style>
</style>
