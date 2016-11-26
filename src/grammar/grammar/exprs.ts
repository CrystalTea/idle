export let lWords = {
    colon: "':'", // 冒号
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
    kw_string: 'kw_string',
    kw_number: 'kw_number',
    kw_object: 'kw_object',
    kw_array: 'kw_array',
    leftBrace: "'{'",
    rightBrace: "'}'",
    lineBreak: 'lineBreak',
    EOF: 'EOF'
}

export let gWords = {
    KVP: '<KVP>',
    KVL: '<KVL>',
    OBJ: '<OBJ>',
    COMMENT: '<COMMENT>',
    ROUTE: '<ROUTE>',
    PARAM: '<PARAM>',
    DATA: '<DATA>',
    QS: '<Qs>',
    QSL: '<QsL>',
    QUERY: '<QUERY>',
    QL: '<QL>',
    RES: '<RES>',
    RL: '<RL>',
    S: '<S>'
}

export let exprs = [
    [
        gWords.KVP, lWords.id, lWords.colon, lWords.kw_string
    ],
    [
        gWords.KVP, lWords.id, lWords.colon, lWords.kw_string, lWords.string
    ],
    [
        gWords.KVP, lWords.id, lWords.colon, lWords.kw_number
    ],
    [
        gWords.KVP, lWords.id, lWords.colon, lWords.kw_number, lWords.string
    ],
    [
        gWords.KVP, lWords.id, lWords.colon, lWords.kw_object, gWords.OBJ
    ],
    [
        gWords.KVP,
        lWords.id,
        lWords.colon,
        lWords.kw_object,
        lWords.string,
        gWords.OBJ
    ],
    [
        gWords.KVP, lWords.id, lWords.colon, lWords.kw_array, gWords.OBJ
    ],
    [
        gWords.KVP,
        lWords.id,
        lWords.colon,
        lWords.kw_array,
        lWords.string,
        gWords.OBJ
    ],

    [
        gWords.KVL, gWords.KVP
    ],
    [
        gWords.KVL, gWords.KVL, gWords.KVP
    ],
    [
        gWords.OBJ, lWords.leftBrace, gWords.KVL, lWords.rightBrace
    ],

    [
        gWords.COMMENT, lWords.comment, lWords.string
    ],
    [
        gWords.ROUTE, lWords.route, lWords.id, lWords.string
    ],
    [
        gWords.PARAM, lWords.param, gWords.KVP
    ],
    [
        gWords.DATA, lWords.data, gWords.KVP
    ],
    [
        gWords.QS, gWords.COMMENT
    ],
    [
        gWords.QS, gWords.ROUTE
    ],
    [
        gWords.QS, gWords.PARAM
    ],
    [
        gWords.QS, gWords.DATA
    ],
    [
        gWords.QSL, gWords.QS
    ],
    [
        gWords.QSL, gWords.QSL, gWords.QS
    ],
    [
        gWords.QUERY, lWords.get, lWords.leftBrace, gWords.QSL, lWords.rightBrace
    ],
    [
        gWords.QUERY, lWords.post, lWords.leftBrace, gWords.QSL, lWords.rightBrace
    ],
    [
        gWords.QUERY, lWords.put, lWords.leftBrace, gWords.QSL, lWords.rightBrace
    ],
    [
        gWords.QUERY, lWords.delete, lWords.leftBrace, gWords.QSL, lWords.rightBrace
    ],
    [
        gWords.QL, gWords.QUERY
    ],
    [
        gWords.QL, gWords.QUERY, gWords.QL
    ],
    [
        gWords.RES,
        lWords.res,
        lWords.string,
        lWords.leftBrace,
        gWords.QL,
        lWords.rightBrace
    ],
    [
        gWords.RL, gWords.RES
    ],
    [
        gWords.RL, gWords.RES, gWords.RL
    ],
    ['EOF', 'EOF', gWords.RL]
];