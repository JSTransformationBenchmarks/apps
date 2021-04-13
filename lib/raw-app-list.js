const fs_readFilePromise = require('util').promisify(require('fs').readFile)

const fs_readdirPromise = require('util').promisify(require('fs').readdir)

const fs = require('fs')

const path = require('path')

const yaml = require('js-yaml')

module.exports = async function getSlugs() {
  return (await fs_readdirPromise(path.join(__dirname, '../apps')))
    .filter((filename) => {
      return fs
        .statSync(path.join(__dirname, `../apps/${filename}`))
        .isDirectory()
    })
    .sort()
    .map(async (slug) => {
      const yamlFile = path.join(__dirname, `../apps/${slug}/${slug}.yml`)
      const app = Object.assign(
        {
          slug: slug,
          iconPath: path.join(__dirname, `../apps/${slug}/${slug}-icon.png`),
        },
        yaml.safeLoad(await fs_readFilePromise(yamlFile))
      )
      return app
    })
}
