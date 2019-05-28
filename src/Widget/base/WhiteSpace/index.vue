<template>
    <div
        class="wrap"
        :class="{
            'transparent': transparent
        }"
        :style="{
            'height': height + unit,
            'backgroundColor': bgColor
        }"
    >
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WidgetMixin from "@/mixins/widgetMixins"

@Component
export default class extends WidgetMixin {
    static compName = "z-WhiteSpace";
    @Prop({default: '10'}) height!: string;
    @Prop({default: 'px'}) unit!: string;
    @Prop({default: false}) transparent!: boolean;
    @Prop({default: '#fff'}) bgColor!: string;
}
</script>


<style scoped>
.wrap {
    /* padding: 5px; */
    box-sizing: border-box
}
.transparent {
    background: transparent!important;
}
</style>
