<template>
    <div class="edit-wrap">
        <img class="shell top" src="https://img.alicdn.com/tfs/TB1klxPA7yWBuNjy0FpXXassXXa-320-40.png" alt="">
        <div class="main">
            <Inner 
                ref="inner"
                :list = 'List'
            />
        </div>
        <img class="shell bottom" src="https://img.alicdn.com/tfs/TB1bSJPA7yWBuNjy0FpXXassXXa-320-60.png" alt="">
    </div>
</template>

<script>
import Vue from 'vue';
import Inner from './innerWrap/inner.vue';

export default {
    components: {
        Inner
    },
    computed: {
        List: {
            get() {
                return this.$store.getters.currentPage.componentList
            },
            set(val) {
                this.$store.commit('STORAGE_PAGE_DATA', val)
            } 
        }
    },
    watch: {
        List :{
            deep: true,
            handler(val) {
                this.$refs.inner.checkProps();
                this.$store.commit('STORAGE_PAGE_DATA')
            }
        }
    }
}
</script>

<style lang='stylus' scoped>
.edit-wrap
    width 375px
    margin auto
    display: flex;
    flex-direction: column;
    height: 669px;
    box-shadow: 2px 2px 8px rgba(0,0,0,.16);
    border-radius: 42px;
    overflow: hidden;
    .shell
        display block 
        &.top
            height 40px
        &.bottom
            height 60px
    .main
        overflow-y scroll
        height 569px
</style>
