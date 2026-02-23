<template>
    <div id="scatter" style="width: 800px; height: 800px; border: 1px solid red;margin: auto;"></div>
</template>

<script>
import axios from '../assets/axios'
import echarts from '../assets/echarts'

export default {
    mounted() {
        axios.post('/dataVisualization/selectOrderInfo',{
            'startTime':'2020-01-01 00:00:00',
            'endTime':'2020-12-30 00:00:00'
        }).then(res => {
            var top10 = res.data.data.splice(0,10)
            // console.log(top10)
            var i = 0
            var data = Object.keys(top10).map(province => [
                province,
                top10[province].finalTotalAmount,
            ])
            // console.log(data)
            var option = {
                title: {
                    text: 'scatter散点图',
                    subtext: '订单金额分布图',
                    left: 'center'
                },
                legend: {
                    left: 'center',
                    icon: 'circle',
                    bottom: 10
                },
                xAxis: {
                    type: 'category',
                    data: data.map(item => item[0]),
                    axisLabel: {
                        formatter: function(value) {
                            return parseInt(value) + 1
                        }
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: function(params) {
                        // console.log(params)
                        return '订单号' + (parseInt(params[0].name) + 1) + '<br>' + params[0].seriesName + ':'+ params[0].value
                    }
                },
                series: [
                    {
                        name: '订单金额',
                        symbolSize: 20,
                        type: 'scatter',
                        data: data
                    }
                ]
            }
            var chart = echarts.init(document.getElementById('scatter'))
            chart.setOption(option)
        }).catch(error => {
            console.error("请求失败:", error)
            // 可以显示错误提示
            alert("数据加载失败，请稍后重试")
        })
    }
}
</script>