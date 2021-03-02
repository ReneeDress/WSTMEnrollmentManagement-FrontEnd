<template>
    <div id="gradeanalysis" style="width: 80vw; height: 400px; color: #707070;">
    </div>
</template>

<script>
    // import axios from "axios";
    // import echarts from "echarts";

    export default {
        name: "GradeAnalysis",
        props: {
            userid: String,
            courseData: Array
        },
        data() {
            return {
                // courseData: [],
                totalC: 0,
                loadingC: true,
                currentPageC: 1,
                pageSizeC: 8,
                searchtextC: '',
                firstC: 1,

                allCredit: null,
                avgGrade: null,
                GPA: null,

                gpaData: [],
            }
        },
        methods: {
            myEcharts(data){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.echarts.init(document.getElementById('gradeanalysis'));
                var stu = [];
                var range = ['0-29', '30-59', '60-69', '70-79', '80-89', '90-100'];
                var pscjs = [];
                var kscjs = [];
                var zpcjs = [];
                var pscjc = [0, 0, 0, 0, 0, 0];
                var kscjc = [0, 0, 0, 0, 0, 0];
                var zpcjc = [0, 0, 0, 0, 0, 0];

                console.log(data)
                var cnt = 0;
                data.forEach(item => {
                    console.log(item);
                    cnt += 1;
                    stu.push(cnt);
                    pscjs.push(item.pscj == null? 0 : item.pscj)
                    kscjs.push(item.kscj == null? 0 : item.kscj)
                    zpcjs.push(item.zpcj == null? 0 : item.zpcj)

                    if (item.pscj < 30)
                        pscjc[0] += 1;
                    else if (item.pscj < 60)
                        pscjc[1] += 1;
                    else if (item.pscj < 70)
                        pscjc[2] += 1;
                    else if (item.pscj < 80)
                        pscjc[3] += 1;
                    else if (item.pscj < 90)
                        pscjc[4] += 1;
                    else
                        pscjc[5] += 1;

                    if (item.kscj < 30)
                        kscjc[0] += 1;
                    else if (item.kscj < 60)
                        kscjc[1] += 1;
                    else if (item.kscj < 70)
                        kscjc[2] += 1;
                    else if (item.kscj < 80)
                        kscjc[3] += 1;
                    else if (item.kscj < 90)
                        kscjc[4] += 1;
                    else
                        kscjc[5] += 1;

                    if (item.zpcj < 30)
                        zpcjc[0] += 1;
                    else if (item.zpcj < 60)
                        zpcjc[1] += 1;
                    else if (item.zpcj < 70)
                        zpcjc[2] += 1;
                    else if (item.zpcj < 80)
                        zpcjc[3] += 1;
                    else if (item.zpcj < 90)
                        zpcjc[4] += 1;
                    else
                        zpcjc[5] += 1;
                })
                // 指定图表的配置项和数据
                var option = {
                    // title: {
                    //     text: '成绩分布图',
                    //     padding: [0,0,0,0],
                    //     textStyle: {
                    //         color: '#707070',
                    //     },
                    //     left: 'center'
                    // },
                    tooltip: {},
                    legend: {
                        data: ['平时成绩柱状图', '考试成绩柱状图', '总评成绩柱状图','平时成绩分布线', '考试成绩分布线', '总评成绩分布线']
                    },
                    xAxis: {
                        name: '分',
                        data: range,
                        axisLine:{
                            lineStyle:{
                                color: '#707070',
                                width: 1,//这里是为了突出显示加上的
                            }
                        }

                    },
                    yAxis: {
                        name: '人数',
                        axisLine:{
                            lineStyle:{
                                color: '#707070',
                                width: 1,//这里是为了突出显示加上的
                            }
                        }
                    },
                    series: [
                        {
                            name: '平时成绩柱状图',
                            type: 'bar',
                            data: pscjc,
                            // color: '#409EFF'
                        },{
                            name: '考试成绩柱状图',
                            type: 'bar',
                            data: kscjc,
                            // color: '#409EFF'
                        },{
                            name: '总评成绩柱状图',
                            type: 'bar',
                            data: zpcjc,
                            // color: '#409EFF'
                        },{
                            name: '平时成绩分布线',
                            type: 'line',
                            smooth: true,
                            data: pscjc,
                            // color: '#409EFF'
                        },{
                            name: '考试成绩分布线',
                            type: 'line',
                            smooth: true,
                            data: kscjc,
                            // color: '#409EFF'
                        },{
                            name: '总评成绩分布线',
                            type: 'line',
                            smooth: true,
                            data: zpcjc,
                            // color: '#409EFF'
                        }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
        mounted() {
            this.myEcharts(this.courseData);
        }
    }
</script>

<style scoped>

</style>