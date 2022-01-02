module.exports = {
    title: 'View Router',
    description: 'Vue tooling for VS Code.',
    home: '/docs/',
    darkmode: false,
    themeConfig: {
      repo: 'https://github.com/bukunmikuti/view-router',
      editLinks: true,
      docsBranch: 'gh-pages',
      docsRepo: 'https://github.com/bukunmikuti/view-router',
      docsDir: 'docs',
      navbar: [
        { text: 'Guide', link: '/guide/' },
        { text: 'Reference', link: '/reference/' },
        { text: 'Credits', link: '/credits' },
      ],
      sidebar: [
        {
          text: 'Introduction',
          collapsible: false,
          link: '/guide'
        },
        {
          text: 'Getting Started',
          children: [
            '/guide/installation.md',
            '/guide/setup.md',
            '/guide/options.md'
          ]
        }
      ]
    }
  };