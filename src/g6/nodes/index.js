/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
const files = require.context('.', false, /\.js$/)
const nodes = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  nodes[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
export default nodes
