<template>
    <div class="module-wrap">
        <Collapse v-model="openName">
            <Panel name='0' v-for="(module, k, index) of WidgetList" :key="index">
                {{module.title}}
                <div slot="content" class="module">
                    <Tag v-for="(item, i) of module.list" 
                        :key="i"
                        :color="colorList[randomColor[i]]"
                        @click.native="selectWidget(item)">
                        {{item.name}}
                    </Tag>
                </div>
            </Panel>
        </Collapse>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WidgetList from "../../Widget/index";
import { WidgetComp } from "../../interface";
import { State, Mutation } from "vuex-class";
import { PUSH_COMP } from "../../store/constants/index";
import { uuidGenerator, randomNum } from "@/common/utils";
@Component
export default class extends Vue {
    @State componentList!: object[];

    WidgetList = {};

    openName = '0';
    timeId!: number;
    colorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
    
    mounted() {
        this.WidgetList = WidgetList;
        this.timeId = setInterval(() => {
            this.colorList = this.colorList.sort(() =>  Math.random() - 0.5);
        }, 10000);
    }
    destroy() {
        clearInterval(this.timeId);
    }
    @Mutation(PUSH_COMP) addComp!: Function;
    @Mutation PUSH_PAGE_COMP!: Function;

    get randomColor() {
        const set = new Set();
        for(let i = 0; i < 4; i++) {
            let index = randomNum(0, this.colorList.length - 1);
            while(set.has(index)) {
                index = randomNum(0, this.colorList.length - 1);
            }
            set.add(index)
        };
        return [...set];
    }

    selectWidget(widget: WidgetComp) {
        widget = Object.assign({}, widget, { id: uuidGenerator() });
        if (widget.container && !Reflect.has(widget, "children")) {
            widget.children = [];
        }
        this.PUSH_PAGE_COMP(widget);
    }
}
</script>

<style lang="stylus" scoped>
.module-wrap {
    width: 100%;
}
</style>

