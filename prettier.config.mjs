/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@ianvs/prettier-plugin-sort-imports').PluginOptions} */
const config = {
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  printWidth: 120,
  endOfLine: 'auto',
  // sort-imports
  importOrder: [
    '^(node:(.*)$)|^(node/(.*)$)',
    '<BUILTIN_MODULES>',
    '^react$',
    '^next$|^next/(.*)$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^~/(.*)$',
    '',
    '^[../]',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5',
}

export default config
