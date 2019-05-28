<template>
    <div>
        <!-- 字符串 -->
        <template v-if="type === 'string'">
            <Form label-position="top">
                <FormItem :label='c_label'>
                    <Input :value="value" @on-change="changeHandler" />
                </FormItem>
            </Form>
        </template>
        <!-- 数字 -->
        <template v-if="type === 'number'">
            <Form label-position="top">
                <FormItem :label='c_label'>
                    <InputNumber :value="value" @on-change="changeHandler" />
                </FormItem>
            </Form>
        </template>
        <!-- 布尔值 -->
        <template v-if="type === 'boolean'">
            <Form label-position="top">
                <FormItem :label='c_label'>
                    <i-switch :value='value' @on-change="changeHandler" />
                </FormItem>
            </Form>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { transKeyToChinese } from '@/translate';
@Component
export default class extends Vue {
    @Prop([Object, Array, Number, String, Boolean]) value: any;
    @Prop(String) label!: string;

    c_label: string = '';
    type: string = '';
    created() {
        this.c_label = transKeyToChinese(this.label);
        this.type = this.checkType(this.value);
    }
    changeHandler(val: any) {
        switch(this.type) {
            case 'string':
                return this.$emit("input", val.target.value);
            case 'number':
                return this.$emit('input', val);
            case 'boolean':
                return this.$emit('input', val);
        }
    }
    checkType(data: any) {
        return (Object.prototype.toString.call(data) as any).match(/\[object (.*?)\]/)[1].toLocaleLowerCase();
    }

}
</script>

<style>

</style>
