module.exports = {
    extends: ['@goodboydigital/eslint-config/prettier'],
    parserOptions: {
        project: ['./tsconfig.eslint.json'],
    },
    rules: {
        '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
        'no-mixed-operators/no-mixed-operators': 'off',
        'no-return-await': 'off', // overridden by @typescript-eslint/return-await
        'no-void': 'off', // for compatibility with @typescript-eslint/return-await
    },
};
