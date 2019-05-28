<template>
    <div class="wrap">
        <Carousel :autoplay='autoplay'
            :autoplay-speed='autoplaySpeed'
        >
            <CarouselItem v-for='(n, i) of list' :key="i">
                <div class="demo-carousel">
                    {{i}}
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { VueComp } from '../../../interface';
import WidgetMixin from '@/mixins/widgetMixins';
@Component
export default class extends WidgetMixin {
    static compName = 'z-Carousel'
    @Prop({default: false}) autoplay!: boolean;
    @Prop({default: 3}) pagesize!: number;
    @Prop({default: 3000}) autoplaySpeed!: number; 

    @Watch('pagesize', {deep: true, immediate: true})
    onPagesizeChange(val: number) {
        if(val > 10) return this.$Message.error('轮播个数不得大于10');
        this.list = new Array(+val);
    }

    value1 = 0;
    list: number[] = [1, 2, 3];

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
    padding 5px
</style>
