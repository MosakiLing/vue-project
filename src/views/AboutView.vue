<template>
  <div class="about">
    <h1>Bar条形图</h1>
  </div>
  <div id="bar" style="width: 800px;height: 500px;margin: auto"></div>
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

        // 将省份名称和金额保存到provinceData中，将金额进行累加
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
      console.log(data)

      data.sort(function(a,b){
        return b.provinceAmount - a.provinceAmount
      })
      var top5 = data.slice(0,5)
      // console.log(top5)
      console.log(top5.map(item => item.provinceName))
      console.log(top5.map(item => item.provinceAmount))
      var option = {
        title: {
          text: '各地区销量情况',
          left: 'center'
        },
        legend: {
          left: 'center',
          bottom: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: top5.map(item => item.provinceName)
        },
        series: [
          {
            name: '销量额',
            data: top5.map(item => item.provinceAmount),
            type: 'bar',
            barWidth: '30%',
          },
          {
            name: '销量额2',
            data: [14000000,13000000,10000000,20000000,15000000],
            type: 'bar',
            barWidth: '30%',
          }
        ]
      };
      echarts.init(document.getElementById("bar")).setOption(option)
    }).catch(error => {
      console.error("请求失败:", error)
      // 可以显示错误提示
      alert("数据加载失败，请稍后重试")
    })
  }
}
</script>