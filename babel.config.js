module.exports = (api) => {
  api.cache(true);

  const presets = [
    '@babel/preset-env', '@babel/preset-react'
  ];
  // add any more presets you need above as shown

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ];
  return {
    presets,
    plugins
  };
};
