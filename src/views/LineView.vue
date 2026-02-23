<template>
    <div class="pie">
        <h1>line折线图</h1>
    </div>
    <div id="line" style="width: 800px;height: 500px;margin: auto;border: 1px red solid"></div>
    <div id="area" style="width: 800px;height: 500px;margin: auto;border: 1px red solid"></div>
</template>

<script>
import axios from '../assets/axios'
import echarts from '../assets/echarts'

export default {
    mounted() {
        axios.get('/data.json').then(json=>{
            console.log('echarts', echarts.version)
            var org = json.data
            // console.log(org)
            var dir = {}
            org.forEach(ele => {
                var year = ele.year
                var amount = ele.count
                if(!dir[year]){
                    dir[year] = amount
                }else{
                    dir[year] += amount
                }
            });
            console.log('x轴数据:', Object.keys(dir))
            console.log('y轴数据:', Object.values(dir))
            var option = {
                title: {
                    text: 'line折线图',
                    left: 'center'
                },
                legend: {
                    bottom: 5,
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: Object.keys(dir)
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis'
                },
                series: [
                    {
                        name: '年销量1',
                        data: Object.values(dir),
                        type: 'line',
                        areaStyle: {},
                        stack: '总量'
                    },
                    {
                        name: '年销量2',
                        data: [6000,10000,11000,3000],
                        type: 'line',
                        areaStyle: {},
                        stack: '总量'
                    }
                ]
            };
            echarts.init(document.getElementById("line")).setOption(option)
            var option2 = {
                title: {
                    text: 'line平滑折线图',
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: Object.keys(dir),
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis'
                },
                series: [
                    {
                        data: Object.values(dir),
                        type: 'line',
                        smooth: true,
                        areaStyle: {},
                        name: '年销售总额',
                        areaStyle: {},
                        markPoint: {
                            data: [
                                {
                                    type: 'max',
                                    name: '最大值',
                                    label: {
                                        formatter: 'MAX'
                                    }
                                },
                                {
                                    type:'min',
                                    name: '最小值',
                                    label: {
                                        formatter: 'MIN'
                                    }
                                }
                            ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值',
                                    label: {
                                        formatter: 'AVG'
                                    }
                                }
                            ]
                        }
                    }
                ],
                legend: {
                    bottom: 5,
                    left: 'center',
                }
            };
            echarts.init(document.getElementById("area")).setOption(option2)
        }).catch(error => {
            console.error("请求失败:", error)
            // 可以显示错误提示
            alert("数据加载失败，请稍后重试")
        })
    }
}
</script>