module.exports = api => {
  api.cache(true);
  return {
    presets: ['@babel/preset-react'],
    plugins: [
      'add-module-exports',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-transform-parameters',
      '@babel/plugin-transform-spread',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
