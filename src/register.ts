import Vue from 'vue';
import List from '@/Widget/base/List/index.vue';
import Carousel from '@/Widget/base/Carousel/index.vue';
import WhiteSpace from '@/Widget/base/WhiteSpace/index.vue';
import Area from "@/Widget/base/Area/index.vue";
import { VueComp } from './interface';

const compList: VueComp[] = [List, Carousel, WhiteSpace, Area];

compList.forEach(comp => {
    Vue.component((comp.compName as any), comp)
})


interface O {
    name: String,
    age: Number,
    lan?: String,
    readonly x: String
}

type X = {
    readonly [T in keyof O]: O[T]
}