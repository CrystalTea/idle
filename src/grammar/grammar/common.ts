import {lWords, gWords, exprs} from "./exprs";
import * as _ from 'lodash'

export function match(arr : string[]) {
    const check = arr
        .slice()
        .reverse();
    const matched = exprs.reduce((pv, cv) => {
        const right = cv
            .slice(1)
            .reverse();
        if (_.isEqual(check.slice(0, right.length), right)) {
            if (right.length + 1 > pv.length) {
                return cv;
            }
        }
        return pv
    }, [])
    return matched;
}
