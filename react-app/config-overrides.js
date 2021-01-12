
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
 

const theme = require('./antd-theme');

module.exports = override(
   
  
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: theme
        }
    }),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: true
    })
)
 