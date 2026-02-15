module.exports = {
  devServer:{
    proxy:{
      '/dataVisualization':{
        target:"http://192.168.10.104:8999",
        ws:true,
        changeOrigin:true
      }
    }
  }
}
