<template>
    <div id="gradeall" style="width: 100%;">
        <el-row>
            <el-col :span="12">
                <el-card shadow="always" style="width: 97%;">
                    <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 24px; color: #707070; margin-top: 1.5vh;">
                        <el-col :span="24" align="middle" style="font-weight: 500;">明星大侦探学生成绩大表</el-col>
                    </el-row>
                    <el-row type="flex" align="middle" style="margin-bottom: 0.5vh; font-size: 14px; color: #707070; text-align: left;">
                        <el-col :span="18">
                            <el-row type="flex" align="middle" style="margin-bottom: 0.5vh; font-size: 14px; color: #707070; text-align: left; height: 3.1vh;">
                                <el-col :span="3" style="text-indent: 10px; font-weight: 500;">学号</el-col>
                                <el-col :span="15">{{ myinfo.xh }}</el-col>
                            </el-row>
                            <el-row type="flex" align="middle" style="margin-bottom: 0.5vh; font-size: 14px; color: #707070; text-align: left; height: 3.1vh;">
                                <el-col :span="3" style="text-indent: 10px; font-weight: 500;">姓名</el-col>
                                <el-col :span="15">{{ myinfo.xm }}</el-col>
                            </el-row>
                            <el-row type="flex" align="middle" style="margin-bottom: 0.5vh; font-size: 14px; color: #707070; text-align: left; height: 3.1vh;">
                                <el-col :span="3" style="text-indent: 10px; font-weight: 500;">学院</el-col>
                                <el-col :span="15">{{ myinfo.mc }}</el-col>
                            </el-row>
                            <el-row type="flex" align="middle" style="margin-bottom: 0.5vh; font-size: 14px; color: #707070; text-align: left; height: 3.1vh;">
                                <el-col :span="3" style="text-indent: 10px; font-weight: 500;">学分</el-col>
                                <el-col :span="15">{{ allCredit == null? '-' : allCredit }}</el-col>
                            </el-row>
                            <el-row type="flex" align="middle" style="margin-bottom: 0.5vh; font-size: 14px; color: #707070; text-align: left; height: 3.1vh;">
                                <el-col :span="3" style="text-indent: 10px; font-weight: 500;">成绩</el-col>
                                <el-col :span="15">{{ GPA == null? '-' : GPA }} / 4.000 （{{ avgGrade == null? '-' : avgGrade }} / 100.00）</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6">

                        </el-col>
                    </el-row>
                    <el-divider />
                    <el-table
                            v-loading="loadingC"
                            ref="filterTableC"
                            :data="courseData.slice((currentPageC - 1) * pageSizeC, currentPageC * pageSizeC)"
                            style="width: 100%"
                            show-summary
                            :summary-method="blankBottom">
                        <el-table-column
                                fixed
                                prop="xq"
                                label="开课学期"
                                width="120">
                            <template slot-scope="scope">
                                {{ scope.row.xq.slice(0,4) }}-{{ (parseInt(scope.row.xq.slice(0,4))+1).toString() }}{{ scope.row.xq.slice(-2,) == '01'? '秋' : scope.row.xq.slice(-2,) == '02'? '冬' : scope.row.xq.slice(-2,) == '03'? '春' : '夏' }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="kh"
                                label="课程编号"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="km"
                                label="课程名称"
                                :formatter="formatterC">
                        </el-table-column>
                        <el-table-column
                                prop="xf"
                                label="学分"
                                width="60">
                        </el-table-column>
                        <el-table-column
                                prop="zpcj"
                                label="总评"
                                width="60">
                        </el-table-column>
                        <el-table-column
                                prop="jd"
                                label="绩点"
                                width="60">
                        </el-table-column>
                    </el-table>
<!--                    <el-divider />-->
<!--                    <div style="margin-top: 2vh;">-->
<!--                        <el-pagination-->
<!--                                @size-change="handleSizeChangeC"-->
<!--                                @current-change="handleCurrentChangeC"-->
<!--                                :current-page="currentPageC"-->
<!--                                :page-sizes="[5, 8, 10, courseData.length]"-->
<!--                                :page-size="pageSizeC"-->
<!--                                layout="total, sizes, prev, pager, next, jumper"-->
<!--                                :total="courseData.length">-->
<!--                        </el-pagination>-->
<!--                    </div>-->
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always" style="width: 97%;">

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "GradeAll",
        props: {
            userid: String,
            usertype: Boolean,
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

                myinfo: {
                    xh: '加载中',
                    xm: '加载中',
                    mc: '加载中',
                },
                allCredit: null,
                avgGrade: null,
                GPA: null,

                gpaData: [],
            }
        },
        methods: {
            getMYMessage() {
                let that = this;
                const path = 'http://localhost:5000/student/' + that.userid;
                axios.get(path)
                    .then((res) => {
                        that.myinfo = res.data[0];
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
            },
            getGRADEALLMessage() {
                let that = this;
                const path = 'http://localhost:5000/gradeAll/' + that.userid;
                axios.get(path)
                    .then((res) => {
                        that.courseData = res.data;
                        that.totalC = that.courseData.length;
                        that.pageSizeC = that.courseData.length;
                        that.getGRADEALLGPAMessage();
                        that.getMYMessage();
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
                const path = 'http://localhost:5000/gradeAll/GPA/' + that.userid;
                axios.get(path)
                    .then((res) => {
                        that.gpaData = res.data;
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
            formatterC(row) {
                return row.km;
            },
            handleSizeChangeC(pageSize) {
                this.pageSizeC = pageSize
            },
            handleCurrentChangeC(currentPage) {
                this.currentPageC = currentPage
            },
            hasGrade(item) {
                return item.zpcj != null;
            },
            blankBottom(param) {
                const { columns, data } = param;
                const avg = [];
                data;
                columns.forEach((column, index) => {
                    // console.log(data);
                    avg[index] = ''
                });
                return avg;
            },
            getGPA(gpa) {
                let hjxf = 0;
                let hjcj = 0.000;
                let hjjd = 0.000;
                let index = ['xq', 'zxf', 'pjcj', 'pjjd'];
                gpa.forEach((item) => {
                    console.log(item);
                    hjxf += item[index[1]];
                    hjcj += item[index[2]];
                    hjjd += item[index[1]] * item[index[3]];
                });
                this.allCredit = hjxf;
                this.avgGrade = (hjcj/(this.courseData).filter(this.hasGrade).length).toFixed(3);
                this.GPA = (hjjd/hjxf).toFixed(3);
            }
        },
        mounted() {
            // console.log(this.userid, this.usertype);
            if (this.usertype) {
                // console.log(this.userid);
                this.$message({
                    message: '无权限操作',
                    type: 'error'
                });
                this.$router.push({ path: '/' });
            } else {
                this.getGRADEALLMessage();
            }
        },
    }
</script>

<style scoped>

</style>