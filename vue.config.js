module.exports = {
  devServer:{
    proxy:{
      '/dataVisualization':{
        target:"http://192.168.10.103:8999",
        ws:true,
        changeOrigin:true
      }
    }
  }
}
