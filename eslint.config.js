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
export default antfu(
  {
    jsx: true,
    typescript: true,
    ignorePatterns: ['**/.env', '**/pnpm-lock.yaml', '**/.gitignore'],
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
  {

    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.ts'],
    rules: {
      'ts/consistent-type-imports': 'off',
    },
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
