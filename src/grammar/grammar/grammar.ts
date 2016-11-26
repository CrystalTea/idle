import {lWords, gWords, exprs, wish} from "./exprs";
import * as _ from 'lodash'
import {match} from './common'

let resolve : {
    word : string,
    value : any
}[] = [
    {
        word: 'EOF',
        value: 'EOF'
    }
];
let input : {
    word : string,
    value : any
}[] = [
    {
        word: 'EOF',
        value: 'EOF'
    }
];

export function analyze(_ipt : {
    word: string,
    value: string
}[]) {
    input = _ipt;

    let pushNext = () => {
        let next = input.shift();
        if (next.word === 'EOF') {
            throw '预期外的文件结尾';
        }
        resolve.push(next)
    }

    let count = 0
    let rls = [];
    while (resolve[resolve.length - 1].word != 'EOF' || input[0].word != 'EOF') {
        count++;
        /*
         match用于匹配生成式，返回一个生成式
         exprs存储了所有的生成式，对照表在grammer.html
        */
        let matched = match(resolve);
        let pushPrev = () => {
            let length = matched.length - 1;
            resolve.splice(resolve.length - length, length, matched[0]);
        }
        if (matched && matched.length > 0) {
            if (_.isEqual(matched.map(x => x.word), exprs[0])) {
                let matched = match(resolve.concat(input[0]))
                if (matched.length > 0) {
                    pushNext();
                } else {
                    pushPrev();
                }
            } else if (_.isEqual(matched.map(x => x.word), exprs[2])) {
                let matched = match(resolve.concat(input[0]))
                if (matched.length > 0) {
                    pushNext();
                } else {
                    pushPrev();
                }
            } else {
                let length = matched.length - 1;
                resolve.splice(resolve.length - length, length, matched[0]);
            }
        } else {
            let next = input.shift();
            let wishNext : string[] = wish[resolve[resolve.length - 1].word];
            if (wishNext) {
                let f = wishNext.filter(x => x === next.word);
                if (f.length === 0) {
                    throw `期待得到“ ‘${wishNext.join('’ 或 ‘')}’ ”，但是得到了${next.word}`;
                }
            }
            if (next.word === 'EOF') {
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
            .innerText = resolve
            .map(x => x.word)
            .join(' ');
        document
            .getElementById(`tdr${count}`)
            .innerText = input
            .map(x => x.word)
            .join(' ');
        // if (count > 100) {     break; }
        if (resolve.length === 2 && resolve[1].word === gWords.RL) {
            rls.push(resolve[1]);
        }
    }
    return rls
}