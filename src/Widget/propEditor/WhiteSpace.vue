<template>
    <div>
        <Form label-position="top">
            <FormItem label="高度">
                <Input :value='height' @input.native='change("height", $event)'></Input>
            </FormItem>
            <FormItem label="单位">
                <Input disabled :value='unit' @input.native='change("unit", $event)'></Input>
            </FormItem>
            <FormItem label="透明背景">
                <i-switch :value='transparent' @on-change="booleanChange" />
            </FormItem>
            <FormItem label="背景色">
                <ColorPicker :value="bgColor" alpha @on-change='colorChange'/>
            </FormItem>
        </Form>
    </div>
</template>

<script lang='ts'>
import {  Component, Prop } from 'vue-property-decorator';
import PropEditorMixin from "../../mixins/PropEditorMixin";
import '../../'
@Component
export default class extends PropEditorMixin {
    @Prop({default: '10'}) height!: string;
    @Prop({default: 'px'}) unit!: string;
    @Prop({default: true}) transparent!: boolean;
    @Prop({default: '#fff'}) bgColor!: string;

    change(type: string, $event?: any) {
        this.emit(type, $event.target.value)
    }
    booleanChange(val: boolean) {
        this.emit('transparent', val);
    }
    colorChange(val: string) {
        this.emit('bgColor', val);
    }
}
</script>
