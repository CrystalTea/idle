# idle
A simple language to declare RESTful API. You can compile it to a markdown document with compiler.

## usage


类似这样的语法，在编译后将会生成Markdown文档或者存储了相关信息的Josn对象。


    url "/v1/{orgid}/userinfoes" {
        post {
            # "通过openid获取用户信息的接口"
            h Content-Type "application/json"
            r orgid "机构id"
            p start:number "开始页"
            p size:number "分页大小"
            b admin:object "管理员信息" {
                name:string "管理员的名字"
                pass:string "管理员的密码"
            }
            b token:string "口令"
            res msg:string "返回的消息"
            res code:number "返回码"
            res data:object "返回的数据"{
                list:array "用户信息列表" {
                    name:string "用户名"
                    phone:string "电话"
                }
            }
        }        
    }
    
\#代表注解，h代表请求头，r代表路由（需要和url里面的对应上），p代表请求参数（querystring里的项），b代表body（请求体里的项目），res代表返回体的内容。

调用BreezeIdle.compileToObj可以获得数据对象，把数据对象传给BreezeIdle.compileToMarkdown可以生产Markdown。

下一步考虑代码生成
