import { register } from "./Widget/register";

import List from '@/Widget/base/List/index.vue';
import Carousel from '@/Widget/base/Carousel/index.vue';
import WhiteSpace from '@/Widget/base/WhiteSpace/index.vue';
import Area from "@/Widget/base/Area/index.vue";
import { VueComp } from './interface';

const compList: VueComp[] = [List, Carousel, WhiteSpace, Area];

compList.forEach(comp => {
    register(comp);
})