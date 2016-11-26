
// class Expr extends Token {
//     constructor(public word, public value, public fin : boolean = false) {
//         super(word, value)
//     }
//     static fromToken(token : Token) {
//         return new Expr(token.word, token.value, true)
//     }
// }

// class Obj extends Expr {
//     from(arr : Expr) {}
// }

// class ValueDefineList extends Expr {
//     list : ValueDefine[] = [];
//     constructor(value) {
//         super(Word.VDL, value)
//     }
//     from < T extends Expr > (arr : T[]) {
//         let [p1,
//             p2] = arr;
//         if (p1.word !== Word.VDL) {
//         // 本节点不是VDL
//             return new ValueDefineList([]);
//         } else if (p2.word === Word.VD) {
//             // 本节点是VDL，下一个节点是VD
//             let result = new ValueDefineList([]);
//             result.list = result
//                 .list
//                 .concat(p1['list'].concat(p2));
//             return result;
//         } else {
//             // 本节点是VDL，下一个节点不是VD
//             return null;
//         }

//     }
// }

// class ValueDefine extends Expr {
//     _note : string;

//     id : string;
//     type : string;
//     comment : string;
//     data : Obj;

//     note(note : string) {
//         this._note = note;
//         return this;
//     }
//     from(arr : Expr[]) {
//         let [p1,
//             p2,
//             p3,
//             p4,
//             p5] = arr;
//         if (p1.word === Word.id && p2.word === Word.colon) {
//             if (p3.word === Word.kw_string && p4.word === Word.string) {
//                 // 生成式： <VD> -> id + : + kw_string + string
//                 let vd = new ValueDefine(Word.VD, [p1, p2, p3, p4])
//                 vd.id = p1.value;
//                 vd.type = 'string';
//                 vd.comment = p4.value;
//                 return vd;
//             } else if (p3.word === Word.kw_string) {
//                 // 生成式： <VD> -> id + : + kw_string
//                 let vd = new ValueDefine(Word.VD, [p1, p2, p3])
//                 vd.id = p1.value;
//                 vd.type = 'string';
//                 return vd;
//             } else if (p3.word === Word.kw_number && p4.word === Word.string) {
//                 // <VD> -> id + : + kw_number + string
//                 let vd = new ValueDefine(Word.VD, [p1, p2, p3, p4])
//                 vd.id = p1.value;
//                 vd.type = 'number';
//                 vd.comment = p4.value;
//                 return vd;
//             } else if (p3.word === Word.kw_number) {
//                 // <VD> -> id + : + kw_number
//                 let vd = new ValueDefine(Word.VD, [p1, p2, p3])
//                 vd.id = p1.value;
//                 vd.type = 'number';
//                 return vd;
//             } else if (p3.word === Word.kw_object) {
//                 if (p4.word === Word.string) {} else {}
//             } else if (p3.word === Word.kw_array) {
//                 if (p4.word === Word.string) {} else {}
//             }
//         }

//     }
// }