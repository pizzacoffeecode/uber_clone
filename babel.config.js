module.exports = {
  presets: [ 'module:metro-react-native-babel-preset' ],
  plugins: [
    [ "module:react-native-dotenv",
      {
        moduleName: "@env",         // name our import as env instead of react-native-dotenv
        path: ".env",               // path is our .env files that is at the root
      } ],
  ],
};
