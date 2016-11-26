import {lWords, gWords, exprs} from "./exprs";
import * as _ from 'lodash'
import {match} from './common'

let resolve = ['EOF'];
let input = [
    "res",
    "string",
    "'{'",
    "post",
    "'{'",
    "comment",
    "string",
    "route",
    "id",
    "string",
    "param",
    "id",
    "':'",
    "kw_object",
    "string",
    "'{'",
    "id",
    "':'",
    "kw_string",
    "string",
    "id",
    "':'",
    "kw_string",
    "string",
    "'}'",
    "data",
    "id",
    "':'",
    "kw_array",
    "string",
    "'{'",
    "id",
    "':'",
    "kw_string",
    "string",
    "id",
    "':'",
    "kw_string",
    "string",
    "'}'",
    "'}'",
    "'}'",
    "EOF"
];

export function analyze(_ipt) {
    input = _ipt;
    console.log(input);

    let pushNext = () => {
        let next = input.shift();
        if (next === 'EOF') {
            throw '预期外的文件结尾';
        }
        resolve.push(next)
    }

    let count = 0
    while (resolve[resolve.length - 1] != 'EOF' || input[0] != 'EOF') {
        count++;
        let matched = match(resolve);
        if (matched && matched.length > 0) {
            if (_.isEqual(matched, exprs[0])) {
                let matched = match(resolve.concat(input[0]))
                if (matched.length > 0) {
                    pushNext();
                }
            } else if (_.isEqual(matched, exprs[2])) {
                let matched = match(resolve.concat(input[0]))
                if (matched.length > 0) {
                    pushNext();
                }
            } else {
                let length = matched.length - 1;
                resolve.splice(resolve.length - length, length, matched[0]);
            }
        } else {
            let next = input.shift();
            if (next === 'EOF') {
                throw '预期外的文件结尾';
            }
            resolve.push(next)
        }
        document
            .getElementById('table')
            .innerHTML += `
                <tr>
                    <td id='tdl${count}' class='left'></td>
                    <td id='tdr${count}' class='right'></td>
                </tr>
            `
        document
            .getElementById(`tdl${count}`)
            .innerText = resolve.join(' ');
        document
            .getElementById(`tdr${count}`)
            .innerText = input.join(' ');
        // if (count > 1000)     break;
    }
}