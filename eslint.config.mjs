import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import sonarjs from 'eslint-plugin-sonarjs'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * All packages that leverage t3-env should use this rule
 */
export const restrictEnvAccess = tseslint.config({
  files: ['**/*.js', '**/*.ts', '**/*.tsx'],
  rules: {
    'no-restricted-properties': [
      'error',
      {
        object: 'process',
        property: 'env',
        message: "Use `import { env } from '@/env'` instead to ensure validated types.",
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        name: 'process',
        importNames: ['env'],
        message: "Use `import { env } from '@/env'` instead to ensure validated types.",
      },
    ],
  },
})

// We need to use i18n'ed Link - Ref: https://next-intl.dev/docs/workflows/linting
export const restrictRoutingUtilsToi18nedVersions = tseslint.config({
  files: ['**/*.js', '**/*.ts', '**/*.tsx'],
  rules: {
    // Consistently import navigation APIs from `@/i18n/routing`
    'no-restricted-imports': [
      'error',
      {
        name: 'next/link',
        message: 'Please import from `@/i18n/routing` instead.',
      },
      {
        name: 'next/navigation',
        importNames: ['redirect', 'permanentRedirect', 'useRouter', 'usePathname'],
        message: 'Please import from `@/i18n/routing` instead.',
      },
    ],
  },
})

const compat = new FlatCompat({ baseDirectory: __dirname })

export default tseslint.config(
  /**
   * =====================
   * Ignores: Ignore files not tracked by VCS and any config files.
   * =====================
   */
  includeIgnoreFile(path.join(__dirname, '.gitignore')),
  { ignores: ['*.config.*', 'setup-vitest.ts'] },
  /**
   * =====================
   * Base Configuration
   * =====================
   */
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  /**
   * =====================
   * Typescript ESLint Configuration
   * =====================
   */
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: { project: true, projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  /**
   * =====================
   * Customization
   * =====================
   */
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      quotes: [
        2,
        'single',
        {
          avoidEscape: true,
        },
      ],
      'import/no-anonymous-default-export': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'no-unused-vars': 'off', // or
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  sonarjs.configs.recommended,
  restrictEnvAccess,
  restrictRoutingUtilsToi18nedVersions,
  eslintConfigPrettier,
  // eslintPluginPrettierRecommended,
)
