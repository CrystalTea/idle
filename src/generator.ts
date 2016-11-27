import {lWords, gWords} from './grammar/grammar/exprs'
import {match} from './grammar/grammar/common';
import {analyze} from './grammar/grammar/grammar'

let search = ((obj) => {
    let path = [];
    let set = (key, val, arr = false) => {
        let target = obj;
        for (let i in path) {
            let _t = target[path[i]]
            if (_t) {
                target = _t;
            } else {
                target[path[i]] = {};
                target = target[path[i]];
            }

        }
        target[key] = val
    }

    let search = (expr, space : string, str) => {
        window['str'] = str;
        if (typeof expr.value === 'string') {
            // str += space + expr.word + ' : ' + expr.value + '\n';
            str = space + expr.word + ' : ' + expr.value + '\n';
            if ([lWords.colon, lWords.leftBrace, lWords.rightBrace].indexOf(expr.word) === -1) {
                // set(expr.word, expr.value);
            }
            return str;
        } else {
            space += '  ';
            str = space + expr.word + '\n';

            let searchChild = () => expr
                .value
                .forEach(child => {
                    // str += search(child, space, str)
                    str += search(child, space, str)
                })

            if (expr.word === gWords.RES) {
                path.push(expr.value[1].value);
                searchChild();
                path.pop();
            } else if (expr.word === gWords.QUERY) {
                let method = expr.value[0].value;
                path.push(method);
                searchChild();
                path.pop();
            } else if (expr.word === gWords.COMMENT) {
                set('comment', expr.value[1].value)
                searchChild()
            } else if (expr.word === gWords.PARAM) {
                path.push('params');
                searchChild();
                path.pop();
            } else if (expr.word === gWords.DATA) {
                path.push('body');
                searchChild();
                path.pop();
            } else if (expr.word === gWords.RESPONSE) {
                path.push('response');
                searchChild();
                path.pop();
            } else if (expr.word === gWords.ROUTE) {
                path.push('route');
                set(expr.value[1].value, expr.value[2].value)
                searchChild()
                path.pop()
            } else if (expr.word === gWords.HEAD) {
                path.push('head');
                set(expr.value[1].value, expr.value[2].value)
                searchChild()
                path.pop()
            } else if (expr.word === gWords.KVP) {
                switch (expr.value[2].word) {
                    case lWords.kw_string:
                    case lWords.kw_number:
                        // console.log(expr.value[2].word);
                        set(expr.value[0].value, expr.value[2].value + ':' + expr.value[3].value);
                        searchChild();
                        break;
                    case lWords.kw_object:
                    case lWords.kw_array:
                        path.push(expr.value[0].value);
                        if (typeof expr.value[3].value === 'string') {
                            set('$$comment', expr.value[3].value);
                            set('$$type', expr.value[2].value);
                        }
                        searchChild();
                        path.pop();
                        break;
                }
            } else {

                searchChild();
            }

            return str + '\n' + space + expr.word[0] + '/' + expr
                .word
                .slice(1) + '\n';
        }
    }
    return search;
})

export let getObj = (rootExpr) => {
    let obj:any = {};
    search(obj)(rootExpr, '', '')
    return obj;
}