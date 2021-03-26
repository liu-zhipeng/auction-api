module.exports = {
  plugins: [
    'inline-dotenv',
    'inline-json-import'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' }
      }
    ]
  ]
}
