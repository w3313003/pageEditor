import { createDecorator } from 'vue-class-component';
import { mapState } from 'vuex';

export function State(stateType: string[]) {
    return createDecorator((options, key) => {
        if (!options.computed) options.computed = {};
        Object.assign(options.computed, mapState(stateType))
    })
}