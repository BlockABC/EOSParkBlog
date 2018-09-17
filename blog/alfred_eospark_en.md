# Alfred + EOSpark, the most efficient way to check EOS blockchain informations

Hi guys!  This is Tim from EOSpark. Alfred is my favorite product which makes great improvement in the efficiency of our daily work. And EOSpark is a powerful EOS block explorer proudly operated by us. We reorganized the data on EOS chain to clearly display everything happened on EOS.



How to make our users get EOS related informations in the fastest way is a proposition that we have been thinking about. Therefore, we tried to combine Alfred and EOSPark together, and we luanched an Alfred extension to help our users checking EOS informations in a better efficient way.



<img :src="$withBase('/projects/alfred_eospark/Alfred+EOSpark.gif')" alt="Alfred+EOSpark">



### How it works

If you haven't yet installed Alfred, you must try this best efficient tool. Official download address: https://www.alfredapp.com/

If you have Alfred installed, please follow these two steps:

1. Download <a :href="$withBase('/projects/alfred_eospark/Search on EOSpark.alfredworkflow')" download="Search on EOSpark.alfredworkflow">EOSpark.workflow</a> and double click to install
2. Search  `ep supereospark` in Alfred which means you start the account page of supereospark on EOSPark.com at the same time.

Asides from searching accounts, it supports searching Smart Contracts/Transaction/Block ID/Public Key Address and etc., you don't need to care about what to search, we will automatically direct to the certain page by reading the content that you entered, try these commands:

- Search Accounts：`ep supereospark`
- Search Blocks：`ep 16858641` or `ep 01013e1145ab86600ce885ac03004bc3f5bee0d52a72d19b3e16636ce157adf9 `
- Search Transactions：`ep 4a4744a5dd4496e12c239490634e5f0ed04498f2b7b425ed9f9af05051047896`
- Search Publich Key Address：`ep EOS5P7tbccoAQK51fLND4H3HA13gXCDrNhRJESwEdDfKVBw93GHpk`

### For unpaid Alfred users

Workflow function of Alfred should be enabled after payment, but it doesn't stand for you are not able to use EOSPark with Alfred.

You can make it by means of adding custom web search for your Alfred. 

#### Step 1

Go to Settings of Alfred and choose **Features** -> **Web Search** -> **Add Custom Search**

<img :src="$withBase('/projects/alfred_eospark/step1.png')" alt="step1">



#### Step 2

Enter informations

> Search URL: `https://eospark.com/MainNet/search?query={query}`
>
> Title: `Search on EOSpark`
>
> KeyWord: `ep` 

Other infortaions is not required, Settings done by clicking `Save`. If you want to beautify your search page by uploading LOGO, you can <a :href="$withBase('/projects/alfred_eospark/logo_EOSpark.png')" download="logo_EOSpark.png">download LOGO here</a>.

<img :src="$withBase('/projects/alfred_eospark/step2.png')" alt="step2">



#### Step 3

Please refer to the before-mentioned instructions, search accounts by entering ep+keywords in Alfred.



Hope this tool helps you. Should you have any questions or suggestions, please join our Telegram group: https://t.me/eospark.
