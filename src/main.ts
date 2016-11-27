// let mock = `
// url "/v1/{orgid}/userinfoes" {

//     post {
//         # "通过openid获取用户信息的接口"

//         h Content-Type "application/json"

//         r orgid "机构id"

//         p start:number "开始页"
//         p size:number "分页大小"

//         b admin:object "管理员信息" {
//             name:string "管理员的名字"
//             pass:string "管理员的密码"
//         }
//         b token:string "口令"

//         res msg:string "返回的消息"
//         res code:number "返回码"
//         res data:object "返回的数据"{
//             list:array "用户信息列表" {
//                 name:string "用户名"
//                 phone:string "电话"
//             }
//         }

//     }
    
//     get {
//         # "通过openid获取用户信息的接口"

//         h Content-Type "application/json"

//         r orgid "机构id"

//         p start:number "开始页"
//         p size:number "分页大小"

//         b admin:object "管理员信息" {
//             name:string "管理员的名字"
//             pass:string "管理员的密码"
//         }
//         b token:string "口令"

//         res msg:string "返回的消息"
//         res code:number "返回码"
//         res data:object "返回的数据"{
//             list:array "用户信息列表" {
//                 name:string "用户名"
//                 phone:string "电话"
//             }
//         }

//     }
// }
// url "/v2/{orgid}/userinfoes" {

//     post {
//         # "通过openid获取用户信息的接口"

//         h Content-Type "application/json"

//         r orgid "机构id"

//         p start:number "开始页"
//         p size:number "分页大小"

//         b admin:object "管理员信息" {
//             name:string "管理员的名字"
//             pass:string "管理员的密码"
//         }
//         b token:string "口令"

//         res msg:string "返回的消息"
//         res code:number "返回码"
//         res data:object "返回的数据"{
//             list:array "用户信息列表" {
//                 name:string "用户名"
//                 phone:string "电话"
//             }
//         }

//     }
// }
// `

import {Word, Token, lexical} from './lexical'
import {lWords, gWords} from './grammar/grammar/exprs'
import {match} from './grammar/grammar/common';
import {analyze} from './grammar/grammar/grammar'
import {getObj} from './generator'
import {compile,compileToMarkdown} from './compiler'


let requests = [compile,compileToMarkdown];