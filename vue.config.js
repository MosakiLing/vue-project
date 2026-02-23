module.exports = {
  devServer:{
    proxy:{
      '/dataVisualization':{
        target:"http://192.168.1.146:8999",
        ws:true,
        changeOrigin:true
      }
    }
  }
}
