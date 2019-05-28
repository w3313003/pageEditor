<template>
    <div class="wrap">
        <h3>
            {{title}}
        </h3>
        <div>
            {{content}}
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VueComp } from '../../../interface';
import WidgetMixin from '@/mixins/widgetMixins';

@Component
export default class extends WidgetMixin {
    static compName = 'z-List'

    @Prop({ default: "标题"}) title!: string;
    @Prop({ default: "内容"}) content!: string;
    @Prop({ default: "baidu.com"}) href!: string;
    
}

</script>

<style lang='stylus' scoped>
.wrap
    background #fff
    padding 5px
</style>
