let encode = {}

let mock1 = `
res "/v1/{website}/userinfoes" {
    post {
        # "通过openid获取用户信息的接口"
        r website "网址"
        p admin:object "管理员" {
            name:string "管理员的名字"
            pass:string "管理员的密码"
        }
        d users:array "用户列表" {
            name:string "用户的名字"
            pass:string "用户的密码"
        }  
    }
}
`
let mock2 = `
res "/v1/{website}/userinfoes" {
    post {
        # "通过openid获取用户信息的接口"
        r website "网址"
        p admin:string  
        d users:string 
    }
}
`
let mock = mock1;

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

console.log(tokensWithLb.map(x => x.word));

import {lWords, gWords} from './grammar/grammar/exprs'
import {match} from './grammar/grammar/common';
import {analyze} from './grammar/grammar/grammar'

// let m = match(['<QsL>','<Qs>'])
// console.log('m',m);

analyze(tokensWithLb.map(x=>x.word));