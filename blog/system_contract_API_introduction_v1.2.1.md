

# 系统合约接口说明v1.2.1

<p align="right">作者：specer</p>

<p align="right">联系邮箱：specer@eospark.com</p>

<p align="right">日期：2018.8.29</p>



本文是关于目前系统合约接口的详细说明，已经是本人的所有精华了，有些接口没写的，要么是太简单懒得介绍，要么就是我自己也还没搞懂的。文档会不定期更新，有新的东西就会写上去，如果有什么地方写错了的，欢迎联系指正，邮箱、微信公众帐号、电报都可以。



## 写接口，要钱的那种

### delegatebw

##### 用法

```bash
cleos system delegatebw [OPTIONS] from receiver stake_net_quantity stake_cpu_quantity

#主要OPTIONS
--transfer	是否直接赠送抵押的EOS。意思就是当这个设置为1的时候，from给receiver抵押的EOS就归为receiver账下了，到时候赎回操作只能由receiver有权限操作；当这个值为0的时候，代表这些抵押的EOS只是租借给receiver的，from账户随时有权限可以赎回到from账户。
```

##### 参数

```json
{
    "from": "blueredy5253",
    "receiver": "blueredy5253",
    "stake_net_quantity": "0.0000 EOS",
    "stake_cpu_quantity": "10.0000 EOS",
    "transfer": 0
}
```

##### 说明

账户blueredy5253给账户blueredy5253抵押了价值0.0000 EOS的网络带宽和价值为10.0000 EOS的CPU资源（非赠与）。详情见[这里](https://eospark.com/MainNet/tx/e74ee9e76b9c3fa3e64bfabd097ba25604c5e4b175c8f48cf7fab941e32d3379)

如果from和receiver相同那就是给自己抵押资源



### undelegatebw

##### 用法

```bash
cleos system undelegatebw [OPTIONS] from receiver unstake_net_quantity unstake_cpu_quantity
```

##### 参数

```json
{
    "from":"blueredy5253",
    "receiver":"fuckitfuckit",
    "unstake_net_quantity":"0.0000 EOS",
    "unstake_cpu_quantity":"2.0000 EOS"
}
```

##### 说明

账户blueredy5253 从账户fuckitfuckit赎回了之前抵押给他的价值0.0000 EOS的网络带宽和价值2.0000 EOS的CPU计算资源。详情见[这里](https://eospark.com/MainNet/tx/416e8a69c606ba564491a50ec9510e3771e15cd300ff2494208166a524b82af5)



### buyram & buyrambytes

##### 用法

```bash
cleos system buyram [OPTIONS] payer receiver amount
#主要OPTIONS
-k,--kbytes	以字节为单位购买内存。如果设置了这个OPTION，那么后面的amount就是字节数，代表我想买多少字节的内存；否则amount代表我想要花费多少EOS数量来买内存。通俗来讲就是，前者是我想买10斤苹果，后者则是我想买价值20块的苹果，到手多少斤我不关心。
```

##### 参数

```json
//不带--kbytes参数
{   
    "payer": "blueredy5253",   
    "receiver": "mburhanuddin",   
    "quant": "0.3000 EOS" 
}

//带--kbytes参数
{   
    "payer": "blueredy5253",   
    "receiver": "fuckitfuckit",   
    "bytes": 4096 
}
```

##### 说明

_不带--kbytes参数：_ 账户blueredy5253给账户mburhanuddin买了价值0.3000 EOS的RAM。如果两账户相同就是给自己买的。详情见[这里](https://eospark.com/MainNet/tx/00dc6ee677fb4f740c769fbd83980f7bd7ebf97b0c71906cca888d6c290b578a)

_带--kbytes参数：_ 账户blueredy5253给账户fuckitfuckit买了4096B的RAM。如果两账户相同就是给自己买的。详情见[这里](https://eospark.com/MainNet/tx/842ce91143a3b7a9b39a9eaf2d1c465735c85cc041f39d40efeb26a78d78231e)



### sellram

##### 用法

```bash
cleos system sellram [OPTIONS] account bytes
```

##### 参数

```json
{
    "account":"g4ydomzzhege",
    "bytes":199
}
```

##### 说明

账户g4ydomzzhege卖出了199B的RAM。详情见[这里](https://eospark.com/MainNet/tx/28a213b216bba30c97991bbaa513d5ca116192d7fbaa80d65768d14c13616e6d)



### setcode & setabi

##### 用法

```bash
cleos set contract [OPTIONS] account contract-dir [wasm-file] [abi-file]
#这个命令会调用下面的两条命令
cleos set code [OPTIONS] account code-file
cleos set abi [OPTIONS] account abi-file
```

##### 参数

```json
//setcode
{
    "account":"g4ydomzzhege",
    "vmtype":0,
    "vmversion":0,
    "code":"xxxxx……"
}
//setabi
{
    "account":"g4ydomzzhege",
    "abi": "0e656f73696f3a3a6162692f312e30000102686900010475736572046e616d6501000000000000806b0268690000000000"
}
```

##### 说明

账户g4ydomzzhege部署了一个智能合约。[详情](https://eospark.com/MainNet/tx/aeafad170f41721cdb65a9bf0b6442a0bfdcae243c18351aa5c3222a370b0c31)



### regproducer

##### 用法

```bash
cleos system regproducer [OPTIONS] account producer_key [url] [location]
```

##### 参数

```json
{
    "producer":"eosauthority",
    "producer_key":"EOS7dA4bBiwNqwHwoSY9wSVyXfUgKqdLEMv5hC6tBxVsutKkarpUk",
    "url":"https://eosauthority.com",
    "location":826
}
```

##### 说明

账户eosauthority注册成为了节点。[详情](https://eospark.com/MainNet/tx/3530094107f9c457c3285e2e039376758ed072ed35b86292aa3b42a01ad9a0a9)



### unregprod

##### 用法

```bash
cleos system unregprod [OPTIONS] account
```

##### 参数

```json
{
    "producer":"eoskunmingbp"
}
```

##### 说明

账户eoskunmingbp取消了自己的节点身份。[详情](https://eospark.com/MainNet/tx/4d98ccbef5153548dc266a516b4a9584c35fc844836785c5af81edadce066b0c)



### regproxy & unregproxy

##### 用法

```bash
cleos system regproxy [OPTIONS] proxy
cleos system unregproxy [OPTIONS] proxy
```

##### 参数

```json
{
    "proxy":"galaxypirate",
    "isproxy":1
}
```

##### 说明

账户galaxypirate注册成为代理，isproxy为0就是取消代理身份。[详情](https://eospark.com/MainNet/tx/788e6b8107ca7fd0835d76665468022e40606bbe130a16669d1c5b9f2815ff8d)



### voteproducer

##### 用法

```bash
#自己手动投票
cleos system voteproducer prods [OPTIONS] voter producers...
#将自己的投票权委托给代理
cleos system voteproducer proxy [OPTIONS] voter proxy
```

##### 参数

```json
{
    "voter":"eosmesodotio",
    "proxy":"",
    "producers":["eosmesodotio"]
}
```

##### 说明

当`参数`里的proxy字段值为空的时候，账户eosmesodotio给eosmesodotio投了一票；当proxy有值的时候，账户eosmesodotio将投票权委托给代理proxy了。前者使用的`用法`里的第一行命令的用法，后者使用的第二行命令的用法。



### claimrewards

##### 用法

```bash
cleos system claimrewards [OPTIONS] owner
```

##### 参数

```json
{
    "owner":"eoschaintech"
}
```

##### 说明

节点eoschaintech申领了EOS奖励。这个奖励就归owner所有，所以节点可以选择把奖励送给其他账户，一般没人这么做。[详情](https://eospark.com/MainNet/tx/fb56720e2d2861ba51c27b48765784fb470c3956a8c7a29bb106cce06d52d163)



### bidname

##### 用法

```bash
cleos system bidname [OPTIONS] bidder newname bid
```

##### 参数

```json
{
    "bidder":"g4zdgmztgege",
    "newname":"pigdog",
    "bid":"0.0001 EOS"
}
```

##### 说明

账户g4zdgmztgege以0.0001 EOS的价格竞拍pigdog帐号。[详情](https://eospark.com/MainNet/tx/4a570c1219bc02ae530311fd6927e4618d479207fbdd180720fae6dd5ffef963)



### updateauth & deleteauth

##### 用法

```bash
cleos set account permission [OPTIONS] account permission authority [parent]
#当authority为NULL时代表deleteauth操作，当其有值时代表updateauth
```

##### 参数

```json
//updateauth
{
  "account": "eos121dacsky",
  "permission": "abc",
  "parent": "active",
  "auth": {
    "threshold": 1,
    "keys": [
      {
        "key": "EOS6whTX2fYZCEv5quTtm6zrW2m2fe5Si134sJG3yBpcmBTy4d7VM",
        "weight": 1
      }
    ],
    "accounts": [],
    "waits": []
  }
}

//deleteauth
{
    "account":"eos121dacsky",
    "permission":"abc"
}
```

##### 说明

`updateauth`示例表示账户eos121dacsky创建了一个名为`abc`权限组，该权限组下面的帐号公钥为EOS6whTX2fYZCEv5quTtm6zrW2m2fe5Si134sJG3yBpcmBTy4d7VM， [详情](https://eospark.com/MainNet/tx/4cc4d9fb69765d10ef9dfc05226fccee580e5203afc03caa4166ec3b9672288d)。

`deleteauth`示例表示账户eos121dacsky删除了`abc`权限组。[详情](https://eospark.com/MainNet/tx/8fe97a3deb76401ec62a62876cd213b917b47ebc45b54c78fb45df8ac12b4c6d)



### linkauth & unlinkauth

##### 用法

```bash
cleos set action permission [OPTIONS] account code type requirement
#当requirement为NULL时代表unlinkauth操作，当其有值时代表linkauth
```

##### 参数

```json
//linkauth
{
    "account":"wangshanshan",
    "code":"eosio.token",
    "type":"transfer",
    "requirement":"active1"
}

//unlinkauth
{
	"account": "wangshanshan",
	"code": "eosio.token",
	"type": "transfer"
}
```

##### 说明

`linkauth`表示账户wangshanshan授权其`active1`权限组操作合约eosio.token里的transfer接口。说白了就是允许`active1`权限去操作EOS的转账行为。[详情](https://eospark.com/MainNet/tx/779fb939e95a39bf50571adfbe2c3647d6554bdf001f8517189fdf94286d3030)

`unlinkauth`表示账户wangshanshan解除了之前能操作合约eosio.token里的transfer接口的权限组的授权。也就是说又取消了前面的`active1`对EOS转账操作的权限。[详情](https://eospark.com/MainNet/tx/ec38109450e475a91377542f8a869f30c43787c01557caa462cbd34ed2293aca)



### newaccount

##### 用法

```bash
cleos create account [OPTIONS] creator name OwnerKey [ActiveKey]
```

##### 参数

```json
{
    "creator":"itokenpocket",
    "name":"themessidona",
    "owner":{
        "threshold":1,
        "keys":[{
            "key":"EOS5RrfvBVwMsWRCZjuCpD43pvr2taeYmBhVMws4X7wxGBdiPxVqC",
            "weight":1
        }],
        "accounts":[],
        "waits":[]
    },
    "active":{
        "threshold":1,
        "keys":[{
            "key":"EOS5RrfvBVwMsWRCZjuCpD43pvr2taeYmBhVMws4X7wxGBdiPxVqC",
            "weight":1
        }],
        "accounts":[],
        "waits":[]
    }
}
```

##### 说明

账户itokenpocket创建了一个名为themessidona的账户。[详情](https://eospark.com/MainNet/tx/c61d9b04c8c49adc9f460945afd6e2593728d4104cf728aaef64650dd109d616)



### setramrate

##### 说明

只有系统账户才能操作的接口，用于设置每出一个块增加多少内存。可以通过下面的命令才获取这个值：

```bash
curl https://eu1.eosdac.io/v1/chain/get_table_rows -X POST -d '{"scope":"eosio","code":"eosio","table":"global2","json":true}'
```

返回：

```json
{
    "rows":[{
        "new_ram_per_block":1024,//每出一个块新增的内存数，即1kb
        "last_ram_increase":"2018-08-29T07:50:16.000",//上一次增加ram的时间
        "last_block_num":"2018-08-29T07:54:04.500",
        "reserved":"0.00000000000000000",
        "revision":0
    }],
    "more":false
}
```

之所以会有`last_ram_increase` 这个字段，原因来自于这个“内存每出一个块就增加1kb”的实现方式。目前的实现方式是：

> 每当有人买卖内存的时候，就会计算本次内存买卖距离上一次内存买卖间隔的时间，然后通过这个时间间隔再计算出总共需要增发的内存数。



### setparams

##### 说明

只有系统账户才能操作的接口，用于设置全网的一些全局变量。可以通过下面的命令获取这些值：

```bash
curl https://eu1.eosdac.io/v1/chain/get_table_rows -X POST -d '{"scope":"eosio","code":"eosio","table":"global","json":true}'
```

返回：

```json
{
    "rows":[{
        "max_block_net_usage":1048576,
        "target_block_net_usage_pct":1000,
        "max_transaction_net_usage":524288,
        "base_per_transaction_net_usage":12,
        "net_usage_leeway":500,
        "context_free_discount_net_usage_num":20,
        "context_free_discount_net_usage_den":100,
        "max_block_cpu_usage":200000,
        "target_block_cpu_usage_pct":1000,
        "max_transaction_cpu_usage":150000,
        "min_transaction_cpu_usage":100,
        "max_transaction_lifetime":3600,
        "deferred_trx_expiration_window":600,
        "max_transaction_delay":3888000,
        "max_inline_action_size":4096,
        "max_inline_action_depth":4,
        "max_authority_depth":6,
        "max_ram_size":"76377832448",//当前全网RAM总量，单位：byte
        "total_ram_bytes_reserved":"47486761878",//当前全网被卖出的RAM总量，单位：byte
        "total_ram_stake":"23804448013",//当前买RAM花费的EOS总量，这个值加上初始化时的100w个EOS正好是EOSPark首页上显示的“当前EOS池子总量”的值。单位：0.0001 EOS
        "last_producer_schedule_update":"2018-08-29T08:00:26.000",//该时间用于记录每一轮21个节点出块后的一些操作逻辑，比如：决定下一轮出块的21个节点、检测账户竞拍逻辑是否满足
        "last_pervote_bucket_fill":"1535529566500000",//用于计算系统增发多少EOS。每次有节点做claimrewards操作时，该值会被重置为当时的时间
        "pervote_bucket":232830088,//用于投票增发的EOS总数量，每有节点做claimrewards操作，这个值都会先增加，然后再减去由该节点获得的选票的得分占全网选票的得分比例获得相应的奖励。
        "perblock_bucket":35934001,//用于出块增发的EOS总数量，每有节点做claimrewards操作，这个值都会先增加，然后再减去由该节点的出块数占全部节点的出块数的比例获得相应的奖励。
        "total_unpaid_blocks":91369,//当前还未申领出块奖励的总块数
        "total_activated_stake":"3758291581231",//当前全网所有已经投票的用户所抵押的EOS总数量，也是用的这个值判断主网是否已被激活（比较其值是否超过1500000000000，因为EOS上限有100亿个，这也是投票率15%的来源）。单位：0.0001 EOS
        "thresh_activated_stake_time":"1529505892000000",//主网激活时间，这里有个小插曲，详情可以看我之前的一篇文章：https://eospark.com/bid.html
        "last_producer_schedule_size":21,
        "total_producer_vote_weight":"15897526877384359936.00000000000000000",//所有节点的获票得分，我们用来计算各个节点的得分率的
        "last_name_close":"2018-08-07T06:13:30.000"//上一次系统判断竞拍成功的时间，不是该账户的竞拍者下单时间，也不是竞拍者创建的时间。这个时间会用于判断24小时冷却的竞拍条件
    }],
    "more":false
}
```



### rmvproducer

##### 说明

只有系统账户才能操作的接口，用于取消某节点的节点资格，可以用这个来制裁作恶节点……



### setpriv

##### 说明

只有系统账户才能操作的接口，给账户设置特权。至于有啥特权，小弟还不清楚。





## 读接口，免费的

当前版本下所有的http接口都列在[这里](https://github.com/EOSIO/eos/blob/master/programs/cleos/httpc.hpp)

下面举例列出部分接口的使用姿势：

```bash
#https://eu1.eosdac.io可以换成任意的超级节点，也可以是自己的搭的本地节点

#获取基本信息
curl https://eu1.eosdac.io/v1/chain/get_info

#获取某代币的发币信息
curl https://eu1.eosdac.io/v1/chain/get_currency_stats -X POST -d '{"symbol":"ETH", "code":"gy4doojqgyge"}'

#获取指定区块高度的信息
curl https://eu1.eosdac.io/v1/chain/get_block -X POST -d '{"block_num_or_id":"32111"}'

#获取所有节点信息
curl https://eu1.eosdac.io/v1/chain/get_producers -X POST -d '{"json":true,"limit":1000000000}'

#获取全局信息的接口信息
curl https://eu1.eosdac.io/v1/chain/get_table_rows -X POST -d '{"scope":"eosio","code":"eosio","table":"global","json":true}'
```

主要需要注意的是get_table_rows接口。这里有个小技巧，其实所有的这类请求都可以是如下格式：

```json
{
    "scope":"eosio",//发起查询的账户
    "code":"eosio",//要查询的目标合约账户
    "table":"voters",//要查询的目标合约账户下的接口
    "json":true,//以json的形式展示，这个为false的话可能会返回一堆二进制
    "lower_bound":0,//根据具体的接口表示不同的作用，一般用于过滤返回的内容
    "upper_bound":-1,//根据具体的接口表示不同的作用，一般用于过滤返回的内容
    "limit":1000000000//部分合约接口会返回一个数组，这个值用于只取前limit个
}
```

比如下面的：

```bash
curl https://eu1.eosdac.io/v1/chain/get_table_rows -X POST -d '{"scope":"eosio","code":"eosio","table":"namebids","json":true,"limit":3}'
```

会返回：

```json
{
    "rows":[
        {"newname":"","high_bidder":"guydgnjygige","high_bid":3000,"last_bid_time":"1529553110500000"},
         {"newname":"1","high_bidder":"tokeneconomy","high_bid":2300000,"last_bid_time":"1531987462500000"},
         {"newname":"11","high_bidder":"gm3dgnztgige","high_bid":15000,"last_bid_time":"1531106828000000"
         }
    ],
 	"more":true
}
```

我没有加`lower_bound`的过滤条件，那么就会给我返回被竞标账户按ascii码排序的结果。大家看第一项的newname……诶？md怎么是个空，先忽略，我们先看第二个就是账户`1`，竞标账户叫`tokeneconomy`，花了230.0000个EOS。

如果我加上`lower_bound`也修改`limit`参数值为5：

```bash
curl https://eu1.eosdac.io/v1/chain/get_table_rows -X POST -d '{"scope":"eosio","code":"eosio","table":"namebids","json":true,"lower_bound":"tencent","limit":5}'
```

会返回5个跟`tencent`相关的结果：

```json
{
    "rows":[
        {"newname":"tencent","high_bidder":"allyallyally","high_bid":29286,"last_bid_time":"1535175548000000"},
        {"newname":"tencentcom","high_bidder":"gq4dkmbxhege","high_bid":1,"last_bid_time":"1529753293000000"},
        {"newname":"tencenteos","high_bidder":"haytmnrygyge","high_bid":1,"last_bid_time":"1529906735000000"},
        {"newname":"tencentfund","high_bidder":"tencentfunds","high_bid":10,"last_bid_time":"1530551232500000"},
        {"newname":"tencentgame","high_bidder":"biquanshoufu","high_bid":1,"last_bid_time":"1531135167000000"}
    ],
    "more":true
}
```


