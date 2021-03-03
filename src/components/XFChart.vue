<template>
    <div id="xfchart" style="width: 100%; height: 200px; color: #707070;">
    </div>
</template>

<script>
    import axios from "axios";
    // import echarts from "echarts";

    export default {
        name: "XFChart",
        props: {
            userid: String,
        },
        data() {
            return {
                courseData: [],
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
            getGRADEALLMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/gradeAll/' + that.userid;
                axios.get(path)
                    .then((res) => {
                        that.courseData = res.data;
                        that.totalC = that.courseData.length;
                        that.pageSizeC = that.courseData.length;
                        that.getGRADEALLGPAMessage();
                        that.loadingC = false;
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                        that.loadingC = false;
                    });
            },
            getGRADEALLGPAMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/gradeAll/GPA/' + that.userid;
                axios.get(path)
                    .then((res) => {
                        that.gpaData = res.data;
                        console.log('resdata', res.data);
                        that.myEcharts(res.data);
                        that.getGPA(res.data);
                        that.loadingC = false;
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                        that.loadingC = false;
                    });
            },
            hasGrade(item) {
                return item.zpcj != null;
            },
            getGPA(gpa) {
                let hjxf = 0;
                let hjcj = 0.000;
                let hjjd = 0.000;
                let index = ['xq', 'zxf', 'pjcj', 'pjjd'];
                // console.log(gpa)
                gpa.forEach((item) => {
                    // console.log(item);
                    if (item[index[1]] != null && item[index[2]] != null && item[index[3]] != null)
                        hjxf += item[index[1]];
                    hjcj += item[index[2]];
                    hjjd += item[index[1]] * item[index[3]];
                    // console.log(hjxf, hjcj, hjjd)
                });
                this.allCredit = hjxf;
                this.avgGrade = (hjcj/(this.courseData).filter(this.hasGrade).length).toFixed(3);
                this.GPA = (hjjd/hjxf).toFixed(3);
            },
            myEcharts(gpaD){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.echarts.init(document.getElementById('xfchart'));
                // var gpaD = data;
                var xqs = [];
                var xfs = []
                var cjs = [];
                var jds = [];
                // console.log(gpaD)
                gpaD.forEach(gpa => {
                    // console.log(gpa);
                    xqs.push(gpa.xq);
                    xfs.push(gpa.zxf == null? 0 : gpa.zxf);
                    cjs.push(gpa.pjcj == null? 0 : gpa.pjcj);
                    jds.push(gpa.pjjd == null? 0 : gpa.pjjd);
                })
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '获得学分变化趋势',
                        textStyle: {
                            color: '#707070'
                        }
                    },
                    tooltip: {},
                    legend: {
                        data: ['获得学分']
                    },
                    xAxis: {
                        data: xqs,
                        axisLine:{
                            lineStyle:{
                                color: '#707070',
                                width: 1,//这里是为了突出显示加上的
                            }
                        }

                    },
                    yAxis: {
                        axisLine:{
                            lineStyle:{
                                color: '#707070',
                                width: 1,//这里是为了突出显示加上的
                            }
                        }
                    },
                    series: [
                        {
                            name: '获得学分',
                            type: 'line',
                            data: xfs,
                            color: '#409EFF'
                        }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
        mounted() {
            this.getGRADEALLMessage();
        }
    }
</script>

<style scoped>

</style>