import { VueConstructor } from 'vue';
import { Vue } from 'vue/types/vue';

export interface WidgetComp {
    name: string;
    component: string;
    container?: boolean;
    children: WidgetComp[];
    props: {
        [key: string]: any
    };
    enableCustomTemplate: boolean;
    parentId?: string;
    id?: string;
}

// 由于类组件返回的是构造函数 动态注册组件时无法获取组件options.name 此处手动添加一个compName属性替代
export interface VueComp extends VueConstructor {
    // name: string;
    compName?: string;
    [key: string]: any
}

// 可编辑组件
export interface EditComp extends Vue {
    getConfig: Function;
    [key: string]: any
}

export interface EditProps {
    type: string;
    value: any;
}

export interface Page {
    name: string;
    path: string;
    componentList: WidgetComp[]
}