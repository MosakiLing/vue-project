<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>这是一个about页面</h1>
  </div>
  <div id="bar" style="width: 800px;height: 500px;"></div>
</template>

<script>
// 导入依赖包
import axios from '../assets/axios'
import echarts from '../assets/echarts'

export default {
  mounted() {
    axios.post("/dataVisualization/selectOrderInfo",{
      "startTime":"2020-01-01 00:00:00",
      "endTime":"2020-12-30 00:00:00"
    }).then(json=>{
      var org = json.data.data
      
      var provinceData = {}
      org.forEach(ele=>{
        // console.log(ele)
        var province = ele.provinceName
        var amount = ele.finalTotalAmount

        // 我们将省份名称和金额保存到provinceDaat中，将金额进行累加
        if(!provinceData[province]){ // 代表数据第一次进入到我们的provinceData中
          provinceData[province] = {
            amount:amount
          }
        }else{  // 数据已经进入到provinceData
          provinceData[province].amount += amount
        }

      })
      // console.log(provinceData)

      var data = Object.keys(provinceData).map(function(province){
        return {
          provinceName:province,
          provinceAmount:provinceData[province].amount
        }
      })
      // console.log(data)

      data.sort(function(a,b){
        return b.provinceAmount - a.provinceAmount
      })
      var top5 = data.slice(0,5)
      // console.log(top5)
      console.log(top5.map(item => item.provinceName))
      console.log(top5.map(item => item.provinceAmount))
      var option = {
        xAxis: {
          type: 'category',
          data: top5.map(item => item.provinceName)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: top5.map(item => item.provinceAmount),
            type: 'bar'
          }
        ]
      };
      echarts.init(document.getElementById("bar")).setOption(option)
    })
  }
}
</script>