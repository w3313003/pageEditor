<template>
    <div class="wrap">
        <slot name='list'>可拖入组件</slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WidgetMixin from '@/mixins/widgetMixins';
@Component
export default class extends WidgetMixin {
    static compName = 'z-Area';
    // @Prop({default: "标题"}) title!: string;
}

</script>

<style lang='stylus' scoped>
.demo-carousel
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: #506b9e;
.wrap
    position relative
    padding 7px 5px
    overflow hidden
</style>
