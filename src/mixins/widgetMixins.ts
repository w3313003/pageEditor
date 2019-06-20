import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class WidgetMixin extends Vue {
    getConfig() {
        interface temp {
            [key: string]: any;
        }
        const ret: temp = {},
            { props }: temp = this.$options;
        if (!props) return {};
        Object.keys(props).forEach(key => {
            ret[key] = props[key]['default'];
        });
        return ret;
    }
}
