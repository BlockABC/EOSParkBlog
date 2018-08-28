---
description: 'A Powerful EOS Block Explorer'
avatar: /profile.svg
head: 'EOSPark Blog'
info: 'A Powerful EOS Block Explorer'
---
# EOSPark杂谈：RAM篇——基本概念



<p align="right">作者：specer</p>

<p align="right">联系邮箱：specer@eospark.com</p>

<p align="right">日期：2018.7.4</p>



## RAM兑换公式

RAM和EOS之间的兑换通过一个中间货币来中转，代码里称之为__RAMCORE__，我们这里不用太多关注它，之前首页上展示过一个简单的RAM兑换EOS的公式，下面推导一下这个公式是怎么来的：

| 变量 |               含义               | [初始值](https://github.com/EOSIO/eos/blob/v1.0.5/contracts/eosio.system/eosio.system.cpp#L27) |
| :--: | :------------------------------: | :----------------------------------------------------------: |
|  A   |          EOS的发行总量           |                           10亿EOS                            |
|  B   |        EOS池子里EOS的数量        |                           100万EOS                           |
|  C   |      RAM池子里可用RAM的容量      |                             64G                              |
|  X   | 韭菜准备投入用于购买RAM的EOS数量 |                                                              |
|  Y   |   大佬收割韭菜时出售的RAM容量    |                                                              |

根据[这里](https://github.com/EOSIO/eos/blob/v1.0.5/contracts/eosio.system/exchange_state.cpp#L4)的代码，翻译成数学语言：

先兑换成中间货币RAMCORE：

<img :src="$withBase('/projects/arm0-1.png')" alt="arm">

最后再用RAMCORE兑换成想要的RAM：

<img :src="$withBase('/projects/arm0-2.png')" alt="arm">

一般情况下RAMCORE都是远远小于A的，所以为了后续计算方便可以理解为$A-RAMCORE$≈$A$，那么将第一个式子代入第二个式子就有：

<img :src="$withBase('/projects/arm0-3.png')" alt="arm">

> 同理可知，RAM兑换EOS简要公式推导为：
>
> $RAMCORE = ((\frac{Y}{Y+C}+1)^{\frac{0.5}{1000}}-1)A$
>
>  $EOS=((\frac{RAMCORE}{A}+1)^{\frac{1000}{0.5}}-1)B$
>
>  $=(((\frac{Y}{Y+C}+1)^{\frac{0.5}{1000}}-1+1)^{\frac{1000}{0.5}}-1)B$
>
>  $=\frac{YB}{Y+C}$



所以，当有用户买入RAM时，B和C的变化情况为:

<img :src="$withBase('/projects/arm0-5.png')" alt="arm">

那么，就有：

<img :src="$withBase('/projects/arm0-6.png')" alt="arm">

同理也可证明卖出RAM也是一样的结论，感兴趣的同学可以去试试~

所以可以得出一个组略的结论：

<center><B>无论RAM市场如何波动，B和C的乘积是几乎保持不变的。</B></center>

这个乘积就是64\*1024\*1024 KiB*100万EOS，即67108864000000，设为G，那么：

<img :src="$withBase('/projects/arm0-7.png')" alt="arm">

所以，最终的RAM兑换公式即：

<img :src="$withBase('/projects/arm0-8.png')" alt="arm">

当计算1个EOS能兑换多少RAM时，X=1，此时RAM就是汇率了：

<img :src="$withBase('/projects/arm0-9.png')" alt="arm">

考虑到1远远小于B，有：

<img :src="$withBase('/projects/arm0-10.png')" alt="arm">

同样的，1KB的RAM可兑换的EOS数量为：

<img :src="$withBase('/projects/arm0-11.png')" alt="arm">

举个例子，假设你现在花1个EOS去买RAM时，此时全网剩余RAM是9481966.148 KiB，那么你大约能买到的RAM数为：

<img :src="$withBase('/projects/arm0-12.png')" alt="arm">

跟现网的数据一对比差不多。



那么精确的RAM计算公式是怎样的呢：

<img :src="$withBase('/projects/arm0-13.png')" alt="arm">

再次将RAMCORE代入有：

<img :src="$withBase('/projects/arm0-14.png')" alt="arm">

……我^™^实在编不下去了

<img :src="$withBase('/projects/arm0-15.png')" alt="arm">


## 关于B和C

以上，可以看到能精确买到多少RAM和能卖到多少EOS取决于B和C。

B里的数量代表了全网用户用于购买RAM所花费的EOS数量，其初始值是当前EOS总发行量的千分之一（主网刚启动时，总发行量是10亿，后续随着超级节点的申领奖励EOS的操作会有增发，每年增发不超过5%）。每有一个人来购买RAM，在扣除0.5%的手续费后，剩下的EOS都会进入到这个B里；每有一个人卖出RAM，也都是从这个B里提取EOS。

事实上，真正涉及到转账相关操作的账户是[eosio.ram](https://eospark.com/MainNet/account/eosio.ram)，买卖时收取的0.5%手续费会打到[eosio.ramfee](https://eospark.com/MainNet/account/eosio.ramfee)账户里，可以看到主网激活不到一个月截止目前为止这个账户里已经有331,986.3543个EOS被烧掉了。



C是全网内存总闲置容量，在目前最新版本中（tag: v1.0.7），初始值在[代码](https://github.com/EOSIO/eos/blob/v1.0.7/contracts/eosio.system/eosio.system.hpp#L41)中写死为64G。每有一个人买入RAM，都会从C里减去买到的容量；每有一个人卖出RAM，也会相应地加上。

RAM可以用来干什么呢？对普通用户来说用处不大，但是对于开发者来说，用处就大了，它除了可用于存储账户基本信息外（目前创建一个账户至少需要大约3KB的RAM），也是DApp运行时所必须的资源，跟CPU和带宽不一样，RAM用完了只能买，或者通过清理掉旧数据来回收已有的RAM。



## B和C的来源

B和C的值可以从[超级节点](https://docs.google.com/spreadsheets/d/1K_un5Vak3eDh_b4Wdh43sOersuhs0A76HMCfeQplDOY/htmlview?sle=true#)提供的的HTTP接口里获取，比如：

```bash
curl http://api.hkeos.com/v1/chain/get_table_rows -X POST -d '{"scope":"eosio","code":"eosio","table":"rammarket","json":true}'
```

返回结果为：

```json
{
 	"rows":[{
        "supply":"10000000000.0000 RAMCORE",
         "base":{
             "balance":"9309779598 RAM",
             "weight":"0.50000000000000000"
         },
         "quote":{
             "balance":"7381484.6562 EOS",
             "weight":"0.50000000000000000"
         }
        }],
 	"more":false
}
```

B就是上面的quote.balance，C就是base.balance。



其实B和C并不能精确地表示全网总计有多少EOS用于购买RAM，又有多少RAM被卖出去了。那有没有这样的值呢？可以通过请求这个接口来查看：

```bash
curl http://api.hkeos.com/v1/chain/get_table_rows -X POST -d '{"scope":"eosio","code":"eosio","table":"global","json":true}'
```

返回结果为：

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
        "max_ram_size":"68719476736",
        "total_ram_bytes_reserved":"59534183615",
        "total_ram_stake":"64815246086",
        "last_producer_schedule_update":"2018-07-03T09:03:35.000",
        "last_pervote_bucket_fill":"1530608393500000",
        "pervote_bucket":243287972,
        "perblock_bucket":31676074,
        "total_unpaid_blocks":81877,
        "total_activated_stake":"2824575718422",
        "thresh_activated_stake_time":"1529505892000000",
        "last_producer_schedule_size":21,
     	"total_producer_vote_weight":"8383931808888103936.00000000000000000",
        "last_name_close":"2000-01-01T00:00:00.000"}],
    "more":false
}
```

上面的total_ram_stake就是全网总计有多少EOS用于购买RAM，单位是0.0001EOS。total_ram_bytes_reserved就是全网总计有多少RAM被卖出去了，单位是byte。

上面的json里的每一项都是全网的全局变量，每一个变量在整个EOS网络中都扮演着重要的角色，以后有机会可以挨个介绍一遍，假如我有时间的话:P



## RAM买卖的手续费

下面以v1.0.5版本为例介绍下0.5%的手续费怎么收的

### 购买

$fee=(\frac{quant + 199}{200})$



这里之所以不直接写成$fee=\frac{quant}{200}$，主要是为了防止用户把一大笔数量的EOS切分成无数笔小额订单使得整体手续费趋近于0（因为EOS的精度为0.0001， 所以当quant小于0.02EOS的时候算出来的fee会等于0，程序员对这个应该都懂的~）。

>假设你用100EOS去买RAM，那么根据上面的公式$fee=(\frac{100*10000 + 199}{200})=5000.995$，取整之后为5000，即0.5EOS。
>
>那么系统会先从你的账户中转99.5EOS到eosio.ram账户，接着再从你的账户中转0.5EOS到eosio.ramfee，最后再用上面的EOS兑换RAM公式将99.5EOS代进去计算出RAM值后，将其充到你的账户下。



### 售卖

$fee=\frac{quant}{200}$

不过目前最新的代码也已经改成：

$fee=(\frac{quant + 199}{200})$

值得注意的是，售卖的时候扣除手续费会有一个顺序问题，首先先计算出RAM兑换EOS的个数为quant，然后系统会从eosio.ram账户中转quant个EOS给你，最后才会从你的账户中再转fee个EOS到eosio.ramfee。

之所以不先扣手续费再给你转账，是因为杜绝你账户里本身就没有EOS的情况。