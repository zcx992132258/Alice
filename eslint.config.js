// module.exports = {
//   extends: ['@antfu', 'standard-jsx'],
//   rules: {
//     'curly': 'off',
//     'max-len': ['error', { code: 100 }],
//   },
//   ignorePatterns: ['**/*.scss'],
// }
import antfu from '@antfu/eslint-config'
export default antfu(
  // {
  //   ignores: [],
  // },

  // // Legacy config
  // ...compat.config({
  //   extends: [
  //     'eslint:recommended',
  //     // Other extends...
  //   ],
  // })

  // Other flat configs...
)
