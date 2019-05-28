
export default {
    'base-Component': {
        title: "基础组件",
        list: [
            {
                name: "文章列表",
                component: 'z-List',
                container: false,
                type: "base",
                enableCustomTemplate: false
            },
            {
                name: "轮播图",
                container: false,
                component: "z-Carousel",
                type: "base",
                enableCustomTemplate: true
            },
            {
                name: "辅助空白",
                component: "z-WhiteSpace",
                container: false,
                type: "base",
                enableCustomTemplate: true
            },
            {
                name: "容器",
                component: "z-Area",
                container: true,
                type: "base",
                enableCustomTemplate: false
            }
        ]
    },
    // "template-Component": {
    //     title: "模板",
    //     list: []
    // }
}

