import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class PropEditorMixin extends Vue {
    emit(type: string, value: any) {
        this.$emit('change', {
            type,
            value
        })
    }
}
