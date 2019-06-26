<template>
    <div>
        <template v-if="ready">
            <component
                v-for="comp of componentList"
                :key="comp.id"
                :is="comp.component"
                v-bind="comp.props"
            >
                <Wrap v-if="comp.children && comp.children.length" :list="comp.children"/>
            </component>
        </template>
    </div>
</template>

<script>
export default {
    name: "Wrap",
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            ready: false
        };
    },
    computed: {
        componentList() {
            return this.list.length && this.list || this.$route.meta.pageInfo;
        }
    },
    created() {
        this._init();
    },
    methods: {
        _init() {
            const asyncRegisterList = [];
            this.componentList.forEach(comp => {
                asyncRegisterList.push(() => import(`./${comp.component}`).then(load => {
                        const components = this.$options.components;
                        const _comp = load.default;
                        if (!Reflect.has(components, _comp.name)) {
                            components[_comp.name] = _comp;
                        }
                    })
                );
            });
            Promise.all(asyncRegisterList.map(fn => fn())).then(() => {
                this.ready = true;
            });
        }
    }
};
</script>

<style>
</style>
