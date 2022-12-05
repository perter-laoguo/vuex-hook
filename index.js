import { computed } from "vue";
import { mapActions, mapGetters, mapMutations, mapState, useStore } from "vuex";

function map(mapFn, arg) {
    const $store = useStore();
    const obj = mapFn(...arg);
    const res = {};
    const isStateOrGetters = [mapState, mapGetters].includes(mapFn);
    for (const key in obj) {
        const fn = obj[key].bind({ $store });
        res[key] = isStateOrGetters ? computed(fn) : fn;
    }
    return res;
}

export const useMapState = function (...arg) {
    return map(mapState, arg);
}

export function useMapGetters(...arg) {
    return map(mapGetters, arg);
}

export function useMapMutation(...arg) {
    return map(mapMutations, arg);
}

export function useMapActions(...arg) {
    return map(mapActions, arg);
}
