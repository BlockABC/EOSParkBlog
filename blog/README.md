# 简明区块魔法：How to Scatter

<p align="right">作者: Link</p>

<p align="right">联系邮箱: link@blockabc.com</p>


初次接触区块链的朋友都容易把区块链当作虚拟货币来理解，今天这篇教程作为面向入门级的内容对概念上不会进行任何深究，但是既然想要使用“货币”，我们无论如何也绕不过去的一个坎就是拥有一个“钱包”，而 Scatter 就是今天流行的一个 EOS 钱包。由于 Scatter 最近处在从 Chrome Extension 版向 Desktop 版的过渡中，新入门的朋友肯定会疑惑为什么我的 Scatter 和网上的教程都不一样，我是被钓鱼了吗？当然不是，而是因为 Desktop 版太新，往上资料多是 Chrome Extension 版所导致的。所以，为了配合 Eospark 新上线的[需要 Scatter 才能使用的功能](https://eospark.com/MainNet/tool/account-register)，这里就图文并茂的简介一下 Scatter 的使用方法。

::: tip PS
跟随本教程实践的一个**必要前提是自己拥有一个 EOS 账户，并拥有其公私钥**，但由于篇幅所限本教程不会包含如何创建 EOS 账户相关的说明，请自行谷歌相关资料。
:::

::: tip PPS
**即使拥有账户名、公私钥也并不一定意味着拥有账户的所有权**，具体是否拥有账户所有权要查看账户的权限组信息，**确认公钥和账户的 owner, active 两个权限组关联，才说明确实拥有账户所有权**。未经任何设置的账户默认只会存在 owner, active 两个权限组，可以参考该示例（进入页面后查看权限一项）：[https://eospark.com/MainNet/account/eospark.x](https://eospark.com/MainNet/account/eospark.x)
:::


## 安装 Scatter

1. 首先是前往[ Scatter 官网(https://get-scatter.com/)](https://get-scatter.com/)，点击首页上的下载按钮进入 Scatter 下载页面。

![Step1](/projects/how_to_scatter/step1.png)

2. 点击后会跳转到一个画风完全不同的下载页面，不要惊慌，这是知名开源项目代码管理网站 Github ，我们看到的是 Scatter 项目的下载页面，所以放心的按照自己操作系统选择其中一个安装包进行下载即可。

![Step2](/projects/how_to_scatter/step2.png)

3. 安装包下载完成之后，运行安装包，参考其他软件的安装方式逐步完成即可。

::: danger
如果还不熟悉软件的下载、安装操作等基本计算机操作，那么很可能你的操作系统有可能不是安全的状态，建议联系熟悉的计算机基本操作的朋友帮忙确认操作系统未受到病毒、木马等污染后，再进行后续操作，否则你将面对数字资产损失的可能。
:::


## 初次启动 Scatter

1. Scatter 启动！由于是初次启动，我们会看到如下图所示的页面，在第一步的位置填入想要为钱包设置的密码，建议使用 12 位以上混合英文大小写和数字的密码，其次这个密码**一定要自己写在纸上保留下来**，因为万一忘记了密码，**没有任何方法可以找回**！记下密码之后就可以点击第二步位置的按钮进入下一步了。

![Step3](/projects/how_to_scatter/step3.png)

2. 记下钱包给出的 12 个助记词，虽说是助记词但是我也是完全记不住，所以还是**记在另一张纸上保留下来比较好**，万一连记密码的纸都弄丢了，这就是最后的救命稻草了。

![Step4](/projects/how_to_scatter/step4.png)

3. 接受钱包的使用条款。

![Step5](/projects/how_to_scatter/step5.png)

4. 注意这里步骤 1 的位置 Scatter 也强调了 `Scatter has no way to re-create your Secure Vault` ，也就是说如果保存你私钥的仓库被不小心删除或磁盘损坏，Scatter 也无法恢复仓库，所以**不要因为使用了 Scatter 管理私钥，就不再保留其他存放的私钥信息**！理解这一点后，点击步骤 2 处的按钮，选择一个计算机上的目录存放 Scatter 备份即可。

![Step6](/projects/how_to_scatter/step6.png)

::: danger
密码保存妥当了吗？没有的话，你可以删除 Scatter 并重新安装，就可以重复上述的初次启动步骤。如果已经确认密码保存妥当了，那就可以继续下面的步骤了。
:::

::: danger
注意 **密码和备份是两个完全不同的东西**，密码是一个你只有决定的字符组合(俗称字符串)，备份是经过密码加密过的存放着你的账户信息的文件。假设你需要重新安装 Scatter ，安装完成后如果你没有密码，即使从备份文件恢复了 Scatter 你也无法再次使用其中的账户；如果你没有备份文件(比如不小心删除了或者磁盘损坏导致文件丢失)，那么即使你有密码 Scatter 也没有了之前的账户。所以**同时保管好密码和备份才能真正保证你的钱包不会丢失**！
:::


## 添加账户

1. 成功启动 Scatter 后，会出现引导带领你进入账户仓库管理界面，开始初次创建账户仓库，也就是界面上名为 Vault 的东西，它是 Scatter 用来管理 EOS 账户的一个类似计算机中文件夹的抽象概念，暂时无需深究，跟随指引操作即可。

![Step7-1](/projects/how_to_scatter/step7-1.png)
![Step7-2](/projects/how_to_scatter/step7-2.png)

2. 到达这里后第一步需要为账户仓库设置一个有意义的名字，这里我的账户仓库就叫做 `My Test Vault` 。然后点击第二步所示位置，就会看到第三步所示的位置，不要迷惘，继续点击前进。

![Step8-1](/projects/how_to_scatter/step8-1.png)
![Step8-2](/projects/how_to_scatter/step8-2.png)

1. 到这里就是最后一步了，填写进你账户的私钥，然后 Scatter 就会提示你稍等片刻，这段时间内 Scatter 会根据私钥计算出对应的公钥并根据公钥自动从 EOS 网络上查询你的 EOS 账户信息，只要账户确实存在就能看到图三的结果，至此恭喜你已经成功的！确认账户信息之后可以点击图三中左上角的 X 按钮或周围的空白处即可关闭账户仓库管理界面。

![Step9-1](/projects/how_to_scatter/step9-1.png)
![Step9-2](/projects/how_to_scatter/step9-2.png)
![Step9-3](/projects/how_to_scatter/step9-3.png)

::: danger
随意填写 EOS 账户私钥是**极其危险的行为**，这里因为 Scatter 是**开源的、仅仅把私钥保存在你的计算机里的(俗称：保存在本地的)**钱包，并且使用钱包**不可避免一定要提供私钥**，所以教程中才有指引你填写私钥的流程。出于对自己数字资产负责的必要性，建议自行多多补充相关的知识。
:::


## 签名交易

Scatter 已经启动了，账户也已经添加了，那么剩下的就是签名交易了！这时你就回去使用自己想要尝试的 Dapp 即可，当遇到需要发起交易时，Dapp 如果支持 Scatter 支付，就会主动通知通知 Scatter 让你进入签名交易的流程，也就是以下流程。

:::tip PS
并不是所有的 Dapp 都支持 Scatter 钱包，所以请注意区分 Dapp 界面上支付相关的说明。
:::

1. 如果这是同一个 Dapp 第一次需要对交易进行签名，Scatter 会询问是否给予授权。如果我们当前没有做任何事情突然弹出一个支付包的支付窗口，当然应该关闭对吧？这里也是同理，判断是自己的操作触发的请求那就可以放心授权，否则就该拒绝，另外请放心这一步还不会要求实际支付 EOS。

![Step10](/projects/how_to_scatter/step10.png)

2. 由于每个账号默认都有两个权限组，所以授权后我们还要做一个权限组的选择，具体来说就是允许 Dapp 使用何种权限，这里请记住**除非明确知道自己在做什么，否则永远不要使用 owner 权限组，使用 active 权限组就够了！**

![Step11](/projects/how_to_scatter/step11.png)

3. 权限选择完成后就是交易内容的确认了！下图绿框中的内容为 `eosio.token->transfer` 时，黄框中的内容也就如下图所示，这就是一个最常见的 EOS 转账交易，但是**在区块链世界中交易可以是任意行为，并不一定是转账**，所以黄框中的内容也可能各不相同，具体这里就不深入了。

![Step12](/projects/how_to_scatter/step12.png)

图中转账信息解释：

- `from` 指转出账号
- `memo` 指转账的备注信息，**请不要随意填写，一般由 Dapp 按需生成**
- `quantity` 指转账金额
- `to` 指转入账号

:::tip PS
Scatter 必须是在运行状态才能够响应 Dapp 的签名请求，所以**在使用 Dapp 前你就需要启动 Scatter**。另一方面来说，**不使用 Dapp 时，退出 Scatter 有助于确保自己的账户安全**。
:::

至此，从安装 Scatter 到完成支付的完整流程就结束了，感谢你的阅读。如有不清楚的地方欢迎加我们的官方微信群（二维码如下）或者官方 Telegram: [https://t.me/eospark](https://t.me/eospark) 进行咨询。

![Wechat QRCode](/projects/blockabc-wechat-qrcode.jpg)