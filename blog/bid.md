
# EOSPark杂谈：账户竞拍小插曲

<p align="right">作者：specer</p>

<p align="right">联系邮箱：specer@eospark.com</p>

<p align="right">日期：2018.7.5</p>



今天晚上8点左右收到合伙人转发的一封邮件：


<img :src="$withBase('/projects/bid-1.png')">


我粗略一看里面还贴有git的链接，感觉逼格一下就起来了。回家后不敢怠慢，细细研读起来。大体意思就是说前几天有个叫“eos”的短帐号被竞拍成功的事，他表示当时这个帐号并没有被竞拍成功，并给了一堆证据。

花时间一一验证了他给的那些证据后我突然回想起上个月读eos的源码的时候无意中发现的一个关于主网激活时间的bug，第一反应就是去找线索验证自己的猜想，去git上的各个版本的源码里摸爬滚打了十几分钟后终于确认了我的猜想，应该就是这个bug了。于是给他回了邮件：


<img :src="$withBase('/projects/bid-2.png')">


其实事情的起源在于源码里voting.cpp文件里的一个bug，这个bug在6月15号的时候被修复，详情见[这里](<https://github.com/EOSIO/eos/commit/2a9e28694925529ba9a37c54419a4e70fa5020f8#diff-4a17a9395811a1608b337a3813fe802aR155>)。

```cpp
if( _gstate.total_activated_stake >= min_activated_stake && _gstate.thresh_activated_stake_time == 0 ) {
             _gstate.thresh_activated_stake_time = current_time();
}
```

相比之前的代码呢，多了一个`&& _gstate.thresh_activated_stake_time == 0`的判断。在修复之前因为读过这里的逻辑，所以当时就对[producer_pay.cpp](https://github.com/EOSIO/eos/blob/90fefdd12a4797e47890910f11dd7b60f1435ed4/contracts/eosio.system/producer_pay.cpp#L57)竞标成功的逻辑判断存疑。后来就在6月15号那天晚上刚好目睹了开发团队在疯狂提交代码，然后第二天新版本v1.0.4就出来了。



> 我还在想呢，大神果然是大神啊，这么多代码合并打包都不留点测试时间就直接发版，看来没有一定的技术实力是不敢这么自信的啊。接着就打脸了，1.0.4版本bug太多，直接跳过，节点由1.0.3直接跳到1.0.5，因为这个事主网还暂停了一段时间。



回到主题来，那个`&& _gstate.thresh_activated_stake_time == 0`为什么这么关键呢？因为如果没有这个限制，每当有从未投过票的用户首次开始投票时`thresh_activated_stake_time`都会被赋值一次，值就是该用户的首次投票时间。而这个`thresh_activated_stake_time`的任务就是==记录主网首次激活的时间==，要是照这个逻辑一直跑下去的话，隔壁的[producer_pay.cpp](https://github.com/EOSIO/eos/blob/90fefdd12a4797e47890910f11dd7b60f1435ed4/contracts/eosio.system/producer_pay.cpp#L57)的竞标成功的判断条件几乎就不可能通过了。因为下面第9行的判断条件就是**主网激活两周后启动竞标逻辑**，但是现在主网激活时间很容易就被刷新……大家可以参照我的[另一篇文章](https://blog.eospark.com)里的方法去查看这个值。

```bash
if( (timestamp.slot - _gstate.last_name_close.slot) > blocks_per_day ) {
	name_bid_table bids(_self,_self);
	auto idx = bids.get_index<N(highbid)>();
	auto highest = idx.begin();
	if( highest != idx.end() &&
        highest->high_bid > 0 &&
        highest->last_bid_time < (current_time() - useconds_per_day) &&
        _gstate.thresh_activated_stake_time > 0 &&
        (current_time() - _gstate.thresh_activated_stake_time) > 14 * useconds_per_day ) {
        _gstate.last_name_close = timestamp;
        idx.modify( highest, 0, [&]( auto& b ){
        b.high_bid = -b.high_bid;
        });
    }
}
```



所以后来开发者加上了这个限制，修补了这个bug，但是这里是有后遗症的，因为含bug的代码已经跑了有段时间了。大家公认的主网激活时间是在6月15号，然而那时代码里记录的主网激活时间还在不断创新高呢……直到6月20号晚上10点后，节点们纷纷升级版本到v1.0.5后，这个bug被正式修复，代码里的主网激活时间停留在了北京时间**2018-06-20 22:44:52**，[这儿](<https://eospark.com/MainNet/block/1717756>)就是当时的那笔交易。



好了，清楚了事情的前因后果，我们就能明白为什么代码里显示“eos”帐号还并没有被拍卖了。

首先回顾一下竞标成功的逻辑，看[这里](https://eospark.com/MainNet/bidaccount)。在7月3号的12点后，starteos团队已经满足了前3个条件，但是恰好这个时候被第4点给拦住了。

我们公认的主网激活时间是6月15号，7月3号的时候早就过了2周了，实际上呢在代码里记录的主网激活时间是6月20号，真正的2周后其实是7月4号的晚上22点44分52秒。所以starteos当时并不能创建这个帐号，因为那个时候该帐号还在竞标中呢。好在starteos开的价够高，终于有惊无险顺利拿到该帐号。不然还得闹一波纠纷…

