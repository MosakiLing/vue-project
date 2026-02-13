<template>
    <div class="pie">
        <h1>pie饼图</h1>
    </div>
    <div id="pie" style="width: 800px;height: 800px;margin: auto;"></div>
</template>

<script>
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
            org.forEach(ele => {
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
            });
            // console.log(provinceData)
            var data = Object.keys(provinceData).map(function(province){
                return {
                    value:provinceData[province].amount,
                    name:province
                }
            })
            var option = {
                title: {
                    text: '各地区消费能力统计',
                    // subtext: 'Fake Data',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',  // 水平排列
                    left: 'center',        // 水平居中
                    bottom: 10  
                },
                series: [
                    {
                    name: '该地区销售总额',
                    type: 'pie',
                    radius: ['20%','50%'],
                    data: data,
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
            };
            echarts.init(document.getElementById("pie")).setOption(option)
        }).catch(error => {
            console.error("请求失败:", error)
            // 可以显示错误提示
            alert("数据加载失败，请稍后重试")
        })
    }
}
</script>