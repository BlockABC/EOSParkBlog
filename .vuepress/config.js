module.exports = {
    title: "EOSPark Blog",
    description: "A Powerful EOS Block Explorer",
    base: "/",
    dest: "./dist",
    head: [
        ['link', {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'}],
    ],
    themeConfig: {
        nav: [
            {text: "EOSPark", link: "https://eospark.com/"},
            {text: "WePromise", link: "https://wepromise.app/"},
        ],
        sidebar: {
            '/': genSidebarConfig(),
        },
        lastUpdated: 'Last Updated',
    },
    markdown: {
        anchor: {permalink: false},
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
                'arm1',
            ]
        }
    ]
}