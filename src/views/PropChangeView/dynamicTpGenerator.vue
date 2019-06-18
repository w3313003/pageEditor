<template>
    <div>
        <component 
            :is='componentType'
            v-bind="editProps"
            @change='change'
        ></component>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class extends Vue {
    @Prop({default: ""}) tpName!: string;
    @Prop({default: ''}) editProps!: object;
    // 透传change处理函数
    @Prop({default: () => {}}) change!: Function;
    @Watch('tpName')
    onTpNameChange(val: string) {
        console.log(`组件编辑模板改变为 @/Widget/${val}.vue`);
        import(`@/Widget/propEditor/${val}.vue`).then(loadedComponent => { 
            this.componentType = loadedComponent.default
        }).catch(e => {
            console.log(e);
        })
    }

    componentType = '';
    mounted() {
        import(`@/Widget/propEditor/${this.tpName}.vue`).then(loadedComponent => {
            this.componentType = loadedComponent.default
        }).catch(e => {
            console.log(e);
        })
    }
}
</script>

<style>

</style>
