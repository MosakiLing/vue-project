<template>
    <div class="pie">
        <h1>line折线图</h1>
    </div>
    <div id="line" style="width: 800px;height: 500px;margin: auto;"></div>
</template>

<script>
import axios from '../assets/axios'
import echarts from '../assets/echarts'

export default {
    mounted() {
        axios.get('/data.json').then(json=>{
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
                xAxis: {
                    type: 'category',
                    data: Object.keys(dir)
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: Object.values(dir),
                    type: 'line'
                    }
                ]
            };
            echarts.init(document.getElementById("line")).setOption(option)
        }).catch(error => {
            console.error("请求失败:", error)
            // 可以显示错误提示
            alert("数据加载失败，请稍后重试")
        })
    }
}
</script>