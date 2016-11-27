import {lWords, gWords, exprs} from "./exprs";
import * as _ from 'lodash'

export function match(arr : {
    word: string,
    value: any
}[]) {
    const check = arr
        .slice()
        .reverse();
    const matched = exprs.reduce((pv, cv) => {
        const right = cv
            .slice(1)
            .reverse();
        if (_.isEqual(check.slice(0, right.length).map(x => x.word), right)) {
            if (right.length + 1 > pv.length) {
                return cv;
            }
        }
        return pv
    }, [])
    let l = matched.length;
    if (l > 0) {
        let result = arr.slice(-l + 1);
        let _result = [{word:matched[0],value:result}].concat(result);
        return _result;
    }
    return [];
}
