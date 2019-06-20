<template>
    <draggable 
        class="drag-wrap"
        :list='list'
        :group='{
            name: "group"
        }'
        v-bind="dragOptions"
        @start="drag=true"
        @end="onEndHandler"
        :disabled='disable'
        :move='onMoveHandler'
    >
        <div v-for='(item, i) of list' :key="i"
            @dragstart.self="selectItem = item"
            @dragend.self="selectItem = {}"
        >
            <Wrap
                :active='item.id === activeComp.id'
                :showShadow='selectItem === item'
            >
                <component 
                    :is='item.component'
                    :ref="`comp-${item.id}`"
                    v-bind="item.props"
                    @click.native.stop='select(item)'
                >
                    <template v-slot:list>
                        <Inner
                            v-if='item.children'
                            :list='item.children'
                            :parent='item'
                        />
                        <span class="shadow" v-if='item.children.length === 0'>可拖入组件</span>
                    </template>
                </component>
            </Wrap>
        </div>  
    </draggable>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import draggable from "vuedraggable";
import { VueComp, EditComp, WidgetComp, Page } from '../../../interface';
import { SET_ACTIVECOMP, STORAGE_PAGE_DATA } from '../../../store/constants';
import Wrap from "@/Widget/Wrap.vue";
import { uuidGenerator } from '../../../common/utils';
@Component({
    name: "Inner",
    components: {
        draggable,
        Wrap
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                ghostClass: "ghost"
            };
        }
    }
})
export default class extends Vue {
    @State componentList!: WidgetComp[];
    @State activeComp!: WidgetComp;
    @Prop({default: () => []}) list!: [];
    @Prop({default: undefined}) parent!: [];
    
    @Watch("list", {deep: true})
    listChangeHandler(val: []) {
        if(!this.parent) return;
        val.forEach((comp: WidgetComp) => {
            (comp.parentId as any) = (this.parent as any).id;
        });
    }

    drag = false;
    selectItem = {};
    disable = false;
    children!: [];

    @Mutation SET_ACTIVECOMP!: Function;
    @Mutation STORAGE_PAGE_DATA!: Function;
    select(comp: WidgetComp) {
        if(!comp.id) {
            comp.id = uuidGenerator();
        }
        const hasProps = Reflect.has(comp, 'props');
        if(comp.id === this.activeComp.id) return;
        const vueComp = (this.$refs[`comp-${comp.id}`] as EditComp[])[0];
        const props = vueComp.getConfig();
        if(!hasProps) {
            this.$set(comp, 'props', props)
        }
        this.SET_ACTIVECOMP(comp);
        this.STORAGE_PAGE_DATA();
    }

    onMoveHandler(evt: any, originalEvent: any) {
        const { relatedContext } = evt;
        const comp = relatedContext.element;
        if(!comp) return;
        if(comp.container) {
            this.disable = true;
        } else {
            this.disable = false;
        }
    }
    onEndHandler() {
        this.drag = false;
        this.disable = false;
    }
}

</script>

<style lang="stylus" scoped>
.drag-wrap
    min-height 20px
.shadow
    position absolute 
    left 50%
    top 50%
    display block
    text-align center
    transform translate(-50%, -50%)
</style>
