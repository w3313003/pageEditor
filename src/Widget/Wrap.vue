<template>
    <div class="widget-wrap" :class="{active}">
        <div class="shadow" v-if="showShadow"></div>
        <slot>
            可拖入组件
        </slot>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        showShadow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        test() {
            console.log(this);
        }
    }
}
</script>

<style lang='stylus' scoped>
.widget-wrap
    box-sizing border-box
    cursor pointer
    transition: border-color .5s;
    border: 1px dashed #dcdcdc;
    position relative
    &:hover
        border-color #6af
        border-radius 5px
        border-style solid
        border-width 2px
    &.active
        border-color red
        &:hover
            border-color red
            border-radius 5px
            border-style solid
            border-width 2px
.shadow
    position absolute
    height 100%
    width 100%
    background-color #2ccafa4d
    z-index 999
    left 0
    top 0

</style>
