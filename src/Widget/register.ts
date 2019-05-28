import Vue from 'vue';
import { VueComp } from '@/interface';

export function register(comp: VueComp) {
    Vue.component((comp.compName as any), comp)
};