<template>
    <div id="gradequery" style="width: 100%;">
        <el-card shadow="always" style="width: 97%;">
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">选择学期</el-col>
                <el-col :span="10">
                    <el-select v-model="term" clearable placeholder="请选择学期" style="width: 88%;">
                        <el-option
                                v-for="item in allTerm"
                                :key="item.xq"
                                :label="item.xq.slice(0,4) + '-' + (parseInt(item.xq.slice(0,4))+1).toString() + '学年' + (item.xq.slice(-2,) == '01'? '秋季' : item.xq.slice(-2,) == '02'? '冬季' : item.xq.slice(-2,) == '03'? '春季' : '夏季') + '学期'"
                                :value="item.xq">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-divider />
            <el-row v-if="term == ''" type="flex" align="middle" justify="center" style="min-height: 60vh; color: #707070;">
                请先选择学期
            </el-row>
            <el-row v-else type="flex" align="top" style="margin-top: 1vh; min-height: 60vh;">
                <el-col :span="24">
                    <el-table
                            v-loading="loadingC"
                            ref="filterTableC"
                            :data="courseData.filter(xqC)"
                            style="width: 100%">
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
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="zpcj"
                                label="总评"
                                width="120">
                            <template slot-scope="scope">
                                {{ scope.row.zpcj == null? '-' : scope.row.zpcj.toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="jd"
                                label="绩点"
                                width="120">
                            <template slot-scope="scope">
                                {{ scope.row.jd == null? '-' : scope.row.jd.toFixed(1) }}
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row type="flex" align="middle" justify="start" style="margin-top: 2vh; font-size: 14px; color: #707070; text-align: right; background-color: #409EFF10; padding: 10px 20px;">
                        <el-col :span="2" style="text-indent: 10px; font-weight: 500;"></el-col>
                        <el-col :span="12"></el-col>
                        <el-col :span="2" style="text-indent: 10px; font-weight: 500;">获得学分</el-col>
                        <el-col :span="3" style="text-align: center; text-indent: 30px;">{{ (gpaData.filter(xqC).length == 0) || (gpaData.filter(xqC))[0].zxf == null? '-' : (gpaData.filter(xqC))[0].zxf }}</el-col>
                        <el-col :span="2" style="text-indent: 10px; font-weight: 500;">平均成绩</el-col>
                        <el-col :span="3">{{ (gpaData.filter(xqC).length == 0) || (gpaData.filter(xqC))[0].pjcj == null? '-' : (gpaData.filter(xqC))[0].pjcj.toFixed(2) }} / 100.00</el-col>
                        <el-col :span="2" style="text-indent: 10px; font-weight: 500;">平均绩点</el-col>
                        <el-col :span="3">{{ (gpaData.filter(xqC).length == 0) || (gpaData.filter(xqC))[0].pjjd == null? '-' : (gpaData.filter(xqC))[0].pjjd.toFixed(3) }} / 4.000</el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "GradeQuery",
        props: {
            userid: String,
            usertype: Boolean,
        },
        data() {
            return {
                term: '',

                allTerm: [],

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
            getALLTERMMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/allterm';
                axios.get(path)
                    .then((res) => {
                        that.allTerm = res.data;
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
                const path = 'https://api.yijunstudio.xyz/school/gradeAll/' + that.userid;
                axios.get(path)
                    .then((res) => {
                        that.courseData = res.data;
                        that.totalC = that.courseData.length;
                        that.pageSizeC = that.courseData.length;
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
                        console.log(that.gpaData);
                        // that.getGPA(res.data);
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
            },
            xqC(row) {
                return row.xq == this.term;
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
                    // console.log(item);
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
                this.getALLTERMMessage();
                this.getGRADEALLMessage();
                this.getGRADEALLGPAMessage();
            }
        },
    }
</script>

<style scoped>

</style>