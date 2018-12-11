module.exports = {
    title: "EOSPark Blog",
    description: "A Powerful EOS Block Explorer",
    base: "/",
    dest: "./dist",
    head: [
        ['link', {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'}],
        ['link', {rel: 'icon',  type: "image/ico", href: '/favicon.png'}],
        ['script', {type: 'text/javascript', async: 'async', src: 'https://www.googletagmanager.com/gtag/js?id=UA-120212654-2'}],
        ['script', {src: './ga.js'}]
    ],
    themeConfig: {
        nav: [
            {text: "EOSPark", link: "https://eospark.com/"},
            {text: "API", link: "https://eospark.com/openapi"},
        ],
        sidebar: {
            '/': genSidebarConfig(),
        },
        lastUpdated: 'Last Updated',
    },
    markdown: {
        lineNumbers: true,
        config: md => {
            md.use(require("markdown-it-katex"));
        }
    }
};


function genSidebarConfig() {
  return [
    {
      collapsable: false,
      children: [
        '',
        'talk_about_decentralization',
        'sec',
        'alfred_eospark',
        'alfred_eospark_en',
        'vote',
        'system_contract_API_introduction_v1.2.1',
        'bid',
        'ram2',
        'ram1',
        'basicconcept'
      ]
    }
  ]
}
