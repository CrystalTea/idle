let mock = `
res "/v1/{website}/userinfoes" {
    post {
        # "通过openid获取用户信息的接口"
        r website "网址"
        p token:string "token"
        p admin:object "管理员" {
            name:string "管理员的名字"
            pass:string "管理员的密码"
        }
        d users:array "用户列表" {
            name:string "用户的名字"
            pass:number "123456"
        }  
    }
}
res "/v1/{website}/userinfoes1" {
    post {
        # "通过openid获取用户信息的接口"
        r website "网址"
        p admin:object "管理员" {
            name:string "管理员的名字"
            pass:string "管理员的密码"
        }
        d users:array "用户列表" {
            name:string "用户的名字"
            pass:number "123456"
        }  
    }
}
`
























import {Word, Token, lexical} from './lexical'

console.log(lexical);

mock = mock.replace('\r', '');
let lines = mock.split('\n');

let testNum = window['testNum'] = x => /^[\d|\.]$/.test(x.toString());
let testLetter = window['testLetter'] = x => /^[\w\u4E00-\u9FA5\uF900-\uFA2D\$_]$/.test(x.toString()) && !testNum(x.toString());
let testSymbol = window['testSymbol'] = x => /^[\:+\-*/=;,\(\)\[\]<>\{\}\.]$/.test(x.toString())
let testSpace = window['testSpace'] = x => /^\s$/.test(x.toString())

let tokens = lines.map((line, index) => lexical.analyze(line, index))
let tokensWithLb = tokens.reduce((pv, cv) => pv.concat(cv)
// .concat(new Token(Word.lineBreak, ';')), []
).concat(new Token(Word.EOF, 'EOF'));

console.log(tokensWithLb);

import {lWords, gWords} from './grammar/grammar/exprs'
import {match} from './grammar/grammar/common';
import {analyze} from './grammar/grammar/grammar'

// let m = match(['<QsL>','<Qs>']) console.log('m',m);


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
                path.push('data');
                searchChild();
                path.pop();
            } else if (expr.word === gWords.ROUTE) {
                path.push('route');
                set(expr.value[1].value, expr.value[2].value)
                searchChild()
                path.pop()
            } else if (expr.word === gWords.KVP) {
                switch (expr.value[2].word) {
                    case lWords.kw_string:
                    case lWords.kw_number:
                        console.log(expr.value[2].word);
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

let rls = analyze(tokensWithLb);
console.log(rls);
let result = window['result'] = {}
let str = search(result)(rls, '', '');

