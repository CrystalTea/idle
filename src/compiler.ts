import {Word, Token, lexical} from './lexical'
import {lWords, gWords} from './grammar/grammar/exprs'
import {match} from './grammar/grammar/common';
import {analyze} from './grammar/grammar/grammar'
import {getObj} from './generator'

export let compile = (source) => {

    let lines = source
        .replace('\r', '')
        .split('\n');

    let tokens = lines.map((line, index) => lexical.analyze(line, index)).reduce((pv, cv) => pv.concat(cv)).concat(new Token(Word.EOF, 'EOF'));

    let rls = analyze(tokens);
    return getObj(rls);
}

export let compileToMarkdown = (jsObj) => {

    let reqs = [];

    for (let field in jsObj) {
        let url = field;
        let res = jsObj[field];
        let post = res['post'];
        let get = res['get'];
        let put = res['put'];
        let _delete = res['delete'];
        post && (post.method = 'post', post.url = url);
        get && (get.method = 'get', get.url = url);
        put && (put.method = 'put', put.url = url);
        _delete && (_delete.method = '_delete', _delete.url = url);
        reqs = reqs.concat([post, get, put, _delete]);
    }
    reqs = reqs.filter(x => !!x);

    console.log(reqs);

    let analyzeReqobj = (req) => {
        let result = ``;
        let method : string = req.method;
        let comment = req.comment;
        let url = req.url;

        let transType = (type) => {
            switch (type) {
                case 'string':
                    return '字符串';
                case 'number':
                    return '数字';
                case 'object':
                    return '对象';
                case 'array':
                    return '数组';
            }
        }

        let transObj = (obj, space) => {
            if (typeof(obj) !== 'object') {
                let type = obj.split(':')[0];
                let value = obj
                    .split(':')
                    .slice(1)
                    .join(':');
                return ` ( ${value}, ${transType(type)}类型 ) `
            } else {
                let isObj = obj.$$type === 'object';
                let result = ` ( ${obj.$$comment}, ${transType(obj.$$type)}类型)`;
                result += `
`
                for (let i in obj) {
                    if (i !== '$$comment' && i !== '$$type') {
                        result += `${space}- ${i}` + transObj(obj[i], space + '\t') + `
`;
                    }
                }

//                 result += `
// `;
                return result;
            }
        }

        result += `## ${comment}
`;
        result += `- URL
`
        result += `\t-  ${url} (${method.toUpperCase()})
`
        let head = req.head;
        if (!!head) {
            let space = '\t- ';
            result += `- 协议头
`
            for (let i in head) {
                result += space + i + `    ( ${head[i]} )
`
            }
        }
        let route = req.route;
        if (!!route) {
            let space = '\t- ';
            result += `- 路由
`
            for (let i in route) {
                result += space + i + `    ( ${route[i]} )
`
            }
        }
        let params = req.params;
        if (!!params) {
            let space = '\t- ';
            result += `- 请求字符串
`
            for (let i in params) {
                let type = params[i].split(':')[0];
                let value = params[i]
                    .split(':')
                    .slice(1)
                    .join(':');
                result += space + i + `\t\t( ${value}, ${transType(type)}类型 )
`
            }
        }
        let body = req.body;
        if (!!body) {
            result += `- 请求体
`
            for (let i in body) {
                result += '\t- ' + i + ' ' + transObj(body[i], '\t\t') + `
`;
            }
            result += `
`
        }

        let response = req.response;
        if (!!response) {
            result += `- 返回值
`
            for (let i in response) {
                result += '\t- ' + i + ' ' + transObj(response[i], '\t\t') + `
`
            }
            result += `
`
        }

        return result;
    }
    let resultStr = `# 接口文档
`
    reqs.forEach(x => resultStr += analyzeReqobj(x));

    resultStr = resultStr.replace(/\n\n/g,'\n');

    return resultStr;
}

window['BreezeIdle'] = {
    compileToMarkdown:compileToMarkdown,
    compileToObj:compile
}