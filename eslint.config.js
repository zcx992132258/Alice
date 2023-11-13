// module.exports = {
//   extends: ['@antfu', 'standard-jsx'],
//   rules: {
//     'curly': 'off',
//     'max-len': ['error', { code: 100 }],
//   },
//   ignorePatterns: ['**/*.scss'],
// }
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()
export default antfu({
  jsx: true,
  ...compat.config({
    extends: [
      'standard-jsx',
    ],
    rules: {
      'curly': 'off',
      'max-len': ['error', { code: 100 }],
    },
  }),
},
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
