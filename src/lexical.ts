// export default lexical;


let testNum = window['testNum'] = x => /^[\d|\.]$/.test(x.toString());
let testLetter = window['testLetter'] = x => /^[\w\u4E00-\u9FA5\uF900-\uFA2D#\$_\-]$/.test(x.toString()) && !testNum(x.toString());
let testSymbol = window['testSymbol'] = x => /^[\:+*/=;,\(\)\[\]<>\{\}\.]$/.test(x.toString());
let testSpace = window['testSpace'] = x => /^\s$/.test(x.toString());

export class Token {
    constructor(public word : string, public value : any) {}
}

export let Word = {
    colon: ":", // 冒号
    number: "number",
    string: "string",
    id: "id",
    res: "res",
    get: "get",
    post: "post",
    put: "put",
    delete: "delete",
    comment: "comment",
    route: "route",
    param: "param",
    data: "data",
    response: "response",
    head: "http_head",
    kw_string:'kw_string',
    kw_number:'kw_number',
    kw_object:'kw_object',
    kw_array:'kw_array',
    leftBrace: "{",
    rightBrace: "}",
    lineBreak: 'lineBreak',
    EOF:'EOF'
}

export module lexical {
    enum type {
        wait, // 空闲
        number, // 数字常量
        string, // 字符串
        keywordOrId, // 关键字或标识符
        operator, // 运算符
        delimiters, // 界符
    }
    let line = '';
    let lineNum = 0;
    let col = 0;
    let cache = '';
    let state = type.wait;
    let result : Token[] = [];
    export function analyze(str, _lineNum) {
        cache = '';
        line = str + ' ';
        lineNum = _lineNum;
        for (; col < line.length; col++) {
            let char = line[col];
            let isnum = testNum(char);
            let isletter = testLetter(char);
            let issymble = testSymbol(char);
            let isspace = testSpace(char);
            switch (state) {
                case type.wait:
                    if (isnum) {
                        cache += char;
                        state = type.number;
                    } else if (isletter) {
                        cache += char;
                        state = type.keywordOrId;
                    } else if (issymble) {
                        switch (char) {
                            case ':':
                                result.push(new Token(Word.colon, ':'));
                                cache = '';
                                break;
                            case '{':
                                result.push(new Token(Word.leftBrace, '{'));
                                cache = '';
                                break;
                            case '}':
                                result.push(new Token(Word.rightBrace, '}'));
                                cache = '';
                                break;
                            default:
                                throw `操作符 ${char} 不支持。（${lineNum}:${col}）`
                        }
                    } else if (char === '"') {
                        state = type.string;
                    } else if (!isspace) {
                        throw `符号 ${char} 不可解析。（${lineNum}:${col}）`
                    }
                    break;
                case type.number:
                    if (isnum) {
                        cache += char;
                    } else if (isspace || issymble) {
                        result.push(new Token(Word.number, cache));
                        cache = '';
                        state = type.wait;
                        if (issymble) {
                            col = col - 1;
                        }
                    } else {
                        throw `期待一个数字，但是得到了 ${char} 。（${lineNum}:${col}）`
                    }
                    break;
                case type.string:
                    if (char === '"') {
                        result.push(new Token(Word.string, cache));
                        cache = '';
                        state = type.wait;
                    } else {
                        cache += char;
                    }
                    break;
                case type.keywordOrId:
                    if (isspace || issymble) {
                        // 开始识别关键字
                        switch (cache) {
                            case '#':
                            case 'comment':
                                result.push(new Token(Word.comment, cache));
                                break;

                            case 'r':
                            case 'route':
                                result.push(new Token(Word.route, cache));
                                break;

                            case 'p':
                            case 'param':
                                result.push(new Token(Word.param, cache));
                                break;

                            case 'b':
                            case 'body':
                                result.push(new Token(Word.data, cache));
                                break;

                            case 'res':
                            case 'response':
                                result.push(new Token(Word.response, cache));
                                break;

                            case 'h':
                            case 'head':
                                result.push(new Token(Word.head, cache));
                                break;

                            case 'url':
                                result.push(new Token(Word.res, cache));
                                break;

                            case 'get':
                                result.push(new Token(Word.get, cache));
                                break;

                            case 'post':
                                result.push(new Token(Word.post, cache));
                                break;

                            case 'put':
                                result.push(new Token(Word.put, cache));
                                break;

                            case 'delete':
                                result.push(new Token(Word.delete, cache));
                                break;
                                
                            case 'string':
                                result.push(new Token(Word.kw_string, cache));
                                break;
                                
                            case 'number':
                                result.push(new Token(Word.kw_number, cache));
                                break;
                                
                            case 'object':
                                result.push(new Token(Word.kw_object, cache));
                                break; 

                            case 'array':
                                result.push(new Token(Word.kw_array, cache));
                                break;
                                // 都不匹配则按标识符处理
                            default:
                                result.push(new Token(Word.id, cache));
                                break;
                        }
                        cache = '';
                        state = type.wait;
                        if (issymble) {
                            col = col - 1;
                        }
                    } else if (isletter) {
                        cache += char;
                    } else {
                        throw `标识符的名字不可以包含 ${char} 。（${lineNum}:${col}）`
                    }
                    break;
                case type.operator:
                    break;
                case type.delimiters:
                    break;
            }
        }
        col = 0;
        let _result = result.map(x => x);
        result = [];
        // console.log('line ', lineNum, ' : ', _result.map(x => `(${x.word}: "${x.value}")`).join(' | '));
        return _result;
    }
}