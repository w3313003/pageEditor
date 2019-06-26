<template>
    <div :class="{transparent}" :style="`height: ${height + unit};background-color: ${bgColor}`">
    </div>
</template>

<script>
export default {
    name: 'z-WhiteSpace',
    props: ['height', 'unit', 'transparent', 'bgColor']
}
</script>

<style scoped>
.transparent {
    background-color: transparent!important;
}
</style>
