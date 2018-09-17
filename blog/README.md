# Alfred + EOSpark，最高效的EOS信息查询方式

大家好，我们是EOSpark团队。Alfred是我们非常喜爱的一款产品，它极大的提高了我们团队的工作效率。EOSpark是我们非常骄傲的一款产品，我们重新组织了EOS的链上数据，将EOS上发生的一切清晰的展示在用户面前。



如何让用户以最快的方式查询到所需要的EOS相关信息，是我们一直在不断思考的命题。今天，我们将Alfred和EOSpark组合到了一起，推出了一款Alfred插件，实现最高效的EOS信息查询方式。



![Alfred+EOSpark](https://github.com/BlockABC/picbec/blob/master/alfred_eospark/Alfred+EOSpark.gif?raw=true)

### 如何使用

如果你尚未安装Alfred，那一定要去尝试一下这款效率神器。官方地址：https://www.alfredapp.com/

如果你已经安装了Alfred，那只需两步：

1. 下载 [EOSpark.workflow](https://static.eospark.com/) 并双击安装
2. 在Aflred中输入 `ep supereospark` 即可理解在EOSpark中打开账户页面 supereospark

除了可以搜索账户以外，还支持搜索智能合约/交易hash/区块ID/区块Hash/公钥地址等等。你无需区分你搜索的是什么，我们会自动根据你输入的内容进行判断，试试以下命令吧：

* 搜索账户：`ep supereospark`
* 搜索区块：`ep 16858641` 或 `ep 01013e1145ab86600ce885ac03004bc3f5bee0d52a72d19b3e16636ce157adf9 `
* 搜索交易：`ep 4a4744a5dd4496e12c239490634e5f0ed04498f2b7b425ed9f9af05051047896`
* 搜索公钥地址：`ep EOS5P7tbccoAQK51fLND4H3HA13gXCDrNhRJESwEdDfKVBw93GHpk`



### 不是Alfred的付费用户

Alfred的workflow功能需要付费之后才能使用，但并不意味着你不能使用我们的工具。你可以为了你的Alfred添加自定的web search来实现。

#### 第一步

打开Aflred配置页面 **Features** -> **Web Search** -> **Add Custom Search**

![step1](https://github.com/BlockABC/picbec/blob/master/alfred_eospark/step1.png?raw=true)



#### 第二步

填写信息。

> Search URL: `https://eospark.com/MainNet/search?query={query}`
>
> Title: `Search on EOSpark`
>
> KeyWord: `ep`

其他信息不用填写，点击`Save` 配置就完成了。如果你希望使用LOGO让搜索页面更美观，可以在此处下载LOGO。

![step2](https://github.com/BlockABC/picbec/blob/master/alfred_eospark/step2.png?raw=true)



#### 第三步

和前面的使用方法一样，在Alfred中输入ep+关键字即可开始搜索账户。



希望这个工具可以实在的帮助到你，如果你对这个工具有任何的想法或者建议，欢迎加入我们的Telegram讨论组：https://t.me/eospark
