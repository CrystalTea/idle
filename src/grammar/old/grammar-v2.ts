import {Word, Token} from '../../lexical'

let gWords = Object.assign({}, Word, {
    KVP: '<KVP>',
    KVL: '<KVL>',
    OBJ: '<OBJ>',
    COMMENT: '<COMMENT>',
    ROUTE: '<ROUTE>',
    PARAM: '<PARAM>',
    DATA: '<DATA>',
    Qs: '<Qs>',
    QsL: '<QsL>',
    QUERY: '<QUERY>',
    QL: '<QL>',
    RES: '<RES>',
    RL: '<RL>',
    S: '<S>',
});

class Expr extends Token {
    step: number;

    constructor(public word: string, public value: Expr[] = [], public fin: boolean = false) {
        super(word, value)
    }

    static  fromToken(token: Token) {
        return new Expr(token.word, token.value, true)
    }
}

class KVP extends Expr {
    constructor() {
        super(gWords.KVP)
    }

    static get(list: Expr[]) {
        let [a,b,c,d] = list;
        if (a.word !== gWords.id && b.word !== gWords.colon) {
            return false;
        } else {
            switch (c.word) {
                case gWords.kw_string:
                case gWords.kw_number:
                    if (d.word === gWords.string) {
                        let expr = new KVP();
                        expr.value = list.slice(0, 4);
                        expr.step = 4;
                        return expr
                    } else {
                        let expr = new KVP();
                        expr.value = list.slice(0, 3);
                        expr.step = 3;
                        return expr;
                    }
                case gWords.kw_object:
                case gWords.kw_array:
                    return false;
            }
        }
    }
}
class KVL extends Expr {
    constructor() {
        super(gWords.KVL)
    }

    static get(list: Expr[]) {
        let [a,b] = list;
        if (a.word === gWords.KVL) {
            let r = KVP.get(list.splice(1));
            if (r) {
                let expr = new KVL();
                expr.value = [a, expr];
                let step = a.step + r.step;
                return expr;
            } else {
                return false;
            }
        } else {
            let r = KVP.get(list);
            if (r) {
                let expr = new KVL();
                expr.value = [r];
                let step = r.step;
                return expr;
            } else {
                return false;
            }
        }
    }

}
class OBJ extends Expr {
    constructor() {
        super(gWords.OBJ)
    }

    static get(list: Expr[]) {
        let [a,b] = list;
        if(a.word === gWords.leftBrace && b.word ===gWords.KVL){

        }else if (a.word !== gWords.leftBrace || (b.word != gWords.id)) {
            return false;
        } else {
            let r = KVL.get(list.slice(1));
            if (r) {
                let target = list [1 + r.step];
                if (target.word === gWords.rightBrace) {
                    let expr = new OBJ();
                    expr.value = [a, r, list[1 + r.step]];
                    expr.step = 2 + r.step;
                    return expr;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}
class COMMENT extends Expr {
    constructor() {
        super(gWords.COMMENT)
    }

    static get(list: Expr[]) {
        let [a,b] = list;
        if (a.word === gWords.comment && b.word === gWords.string) {
            let expr = new COMMENT();
            expr.step = 2;
            expr.value = [a, b];
            return expr;
        } else {
            return false;
        }
    }

}
class ROUTE extends Expr {
    constructor() {
        super(gWords.ROUTE)
    }

    static get(list: Expr[]) {
        let [a,b,c] = list;
        if (a.word === gWords.route && b.word === gWords.id && c.word === gWords.string) {
            let expr = new COMMENT();
            expr.step = 3;
            expr.value = [a, b, c];
            return expr;
        } else {
            return false;
        }
    }
}
class PARAM extends Expr {
    constructor() {
        super(gWords.PARAM)
    }
    static get(list: Expr[]) {
        let [a,b] = list;
        if (a.word === gWords.param ) {

        } else {
            return false;
        }
    }
}
class DATA extends Expr {
    constructor() {
        super(gWords.DATA)
    }

}
class Qs extends Expr {
    constructor() {
        super(gWords.Qs)
    }

}
class QsL extends Expr {
    constructor() {
        super(gWords.QsL)
    }

}
class QUERY extends Expr {
    constructor() {
        super(gWords.QUERY)
    }

}
class QL extends Expr {
    constructor() {
        super(gWords.QL)
    }

}
class RES extends Expr {
    constructor() {
        super(gWords.RES)
    }

}
class RL extends Expr {
    constructor() {
        super(gWords.RL)
    }

}
class S extends Expr {
    constructor() {
        super(gWords.S)
    }

}