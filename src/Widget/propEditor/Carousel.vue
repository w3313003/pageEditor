<template>
    <div>
        <Form label-position="top">
            <FormItem label="页码">
                <Input :value='pagesize' @input.native='change("pagesize", $event)'></Input>
            </FormItem>
            <FormItem label="自动播放">
                <i-switch :value='autoplay' @on-change="booleanChange" />
            </FormItem>
            <FormItem label="自动播放间隔">
                <InputNumber :max="10000" :min="1000" :step="1000" :value="autoplaySpeed"
                    @on-change='numberChange'
                ></InputNumber>
            </FormItem>
        </Form>
    </div>
</template>

<script lang='ts'>
import {  Vue, Component, Prop } from 'vue-property-decorator';
import PropEditorMixin from '@/mixins/PropEditorMixin'
@Component
export default class extends PropEditorMixin {
    @Prop({default: false}) autoplay!: boolean;
    @Prop({default: 3}) pagesize!: number;
    @Prop({default: 3000}) autoplaySpeed!: number; 

    change(type: string, $event?: any) {
        this.emit(type, +$event.target.value)
    }
    booleanChange(value: boolean) {
        this.emit("autoplay", value);
    }
    numberChange(value: number) {
        this.emit("autoplaySpeed", value);
    }
}
</script>

<style>

</style>
