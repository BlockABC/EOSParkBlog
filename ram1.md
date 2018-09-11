# EOSPark杂谈：RAM篇——理性投资



<p align="right">作者：specer</p>

<p align="right">联系邮箱：specer@eospark.com</p>

<p align="right">日期：2018.7.6</p>



这篇文章我们探究一下**是否存在这么一个值P，使得我们花掉P个EOS来买内存，接着瞬间再卖掉使得最终的EOS余额增多**。虽然全网同时有很多人买卖内存，但是通过脚本的话还是有可能做到你的这一买一卖之间没有夹杂进其他人的内存买卖订单。

公式推演比较多，不感兴趣的朋友就求个转发，多谢多谢~



接着[上篇文章](/)，我们已知有下面两个公式：

单位RAM能兑换多少EOS：

<img :src="$withBase('/projects/arm1-1.png')" alt="arm">

以及我们用$X$个EOS能买到的内存：

<img :src="$withBase('/projects/arm1-2.png')" alt="arm">

那么，假如我们再把这些RAM转手卖掉得到的EOS个数$X_1$就是：

<img :src="$withBase('/projects/arm1-3.png')" alt="arm">

那么就有：

<img :src="$withBase('/projects/arm1-4.png')" alt="arm">

考虑到买卖内存会有0.5%的手续费，假设买内存花费的本金$P_0$，卖内存实际到手EOS个数为$P_1$，显然有：

<img :src="$withBase('/projects/arm1-5.png')" alt="arm">

那么：

<img :src="$withBase('/projects/arm1-6.png')" alt="arm">

要想使我们能够赚钱，那$P_0$和$P_1$必须得满足下面的条件：

<img :src="$withBase('/projects/arm1-7.png')" alt="arm">

最终得到：

<img :src="$withBase('/projects/arm1-8.png')" alt="arm">



把式子$RAM=\frac{C_0}{1+\frac{G}{C_0X_0}}$做一下变换，并代入上面的不等式中：

<img :src="$withBase('/projects/arm1-9.png')" alt="arm">

解不等式：

<img :src="$withBase('/projects/arm1-10.png')" alt="arm">

那么我们得到最终答案：

<img :src="$withBase('/projects/arm1-11.png')" alt="arm">


这个不等式表明了：

> 举例来说明的话就是，我写这篇文章的时候$B_0$的值是5551226.7248，那么算出来$P_0>56212.46464154$，意思就是只要我投入超过56212.46464154个EOS去买内存并且立即再卖掉，那么我账户上的EOS最终余额就一定是增长的。

拿到这个结果，我很激动，因为昨晚上刚刚看了bancor的[白皮书](https://about.bancor.network/protocol/)，对比源码发现BM并没有严格实现白皮书里写的兑换公式，所以就以为真的找到bug了，都准备联系拥有5w多EOS的大佬合作一波共同财富自由了……

后来为了保险起见，决定先写一个模拟器脚本，来测试这个值的有效性。等最后的脚本写完后测试失败了，这个值的表现就跟一个普通数字没有任何区别，很诡异。

后来不甘心，直接在现网测试，写了一个机器人瞬间买卖内存的脚本，下表是最后的测试结果，本人EOS数量不多，只能小额测一下。

| EOS    | 收支情况           |
| ------ | ------------------ |
| 1      | -0.0102999999999   |
| 0.1    | -0.00160000000005  |
| 0.01   | -0.000799999999799 |
| 0.001  | -0.000700000000052 |
| 0.0008 | -0.000500000000102 |
| 0.0007 | -0.0003999999999   |

可以大致发现，基本都是亏损的，亏损的多少和投入的EOS数量正相关。

反复演算上面的公式推导，并没有错啊，那么只可能是一个原因了，价格是连续的，并不是离散的，需要用到微积分了。

我们有公式：

<img :src="$withBase('/projects/arm1-12.png')" alt="arm">

假设我们购买了容量为$R$的内存，那么花费的真正正确的EOS数量将是：

<img :src="$withBase('/projects/arm1-13.png')" alt="arm">

同理卖内存也是一样的算法，自己算吧，反正并不是简单的相乘。

然后我用这个公式去对比自己写的模拟器脚本跑出来的数据，基本吻合（之所以数据不是完全吻合可能是因为本身$UnitRAMforEOS$就是一个约等于的公式吧）。