module.exports = {
  root: true,
  extends: ['airbnb-base'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    quotes: ['error', 'single'], // Utiliser des apostrophes pour les chaînes de caractères
    indent: ['error', 2], // Indentation à 2 espaces
    semi: ['error', 'always'], // Utiliser des point-virgules
    'no-underscore-dangle': 'off',
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
  },
};
