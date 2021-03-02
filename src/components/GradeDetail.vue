<template>
    <div id="gradedetail" style="width: 100%;">
        <el-card shadow="always" style="width: 97%;">
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2">
                    <el-button size="mini" plain @click="toGradeEdit">返回成绩录入</el-button>
                </el-col>
                <el-col :span="20"></el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">
                    <el-button v-if="!editgrade" size="mini" @click="changeEditGrade" type="primary">录入成绩</el-button>
                    <el-button v-else size="mini" @click="submitGrade" type="success">提交成绩</el-button>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">课程信息</el-col>
                <el-col :span="4">{{ courseInfo.kh }} {{ courseInfo.km }}</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">学分学时</el-col>
                <el-col :span="4">{{ courseInfo.xf }}学分 {{ courseInfo.xs }}学时</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">开课学院</el-col>
                <el-col :span="4">{{ courseInfo.mc }}</el-col>
                <el-col :span="4" style="text-indent: 10px; font-weight: 500;">
                    <span style="color: red;">*成绩可为空，请输入整数。</span>
                </el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">
                    <el-button size="mini" @click="gradeAnalysis = true" :disabled="loadingC">成绩分析</el-button>
                    <el-dialog title="成绩分布图" :visible.sync="gradeAnalysis"  width="80%">
                        <GradeAnalysis :courseData="courseData"></GradeAnalysis>
                    </el-dialog>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">教师信息</el-col>
                <el-col :span="4">{{ courseInfo.gh }} {{ courseInfo.xm }}</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">上课时间</el-col>
                <el-col :span="4">{{ courseInfo.sksj }}</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">开课学期</el-col>
                <el-col :span="4">{{ (courseInfo.xq).slice(0,4) }}学年{{ (courseInfo.xq).slice(-2,) == '01'? '秋季' : (courseInfo.xq).slice(-2,) == '02'? '冬季' : (courseInfo.xq).slice(-2,) == '03'? '春季' : '夏季' }}学期</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500; color: dodgerblue;">平时成绩占比</el-col>
                <el-col :span="2">
                    <span v-if="!edit" style="text-indent: 10px; color: dodgerblue;"> {{ percent }}%</span>
                    <div v-else  style="color: dodgerblue;">
                        <el-input-number :min="10" :max="90" v-model="percent" size="mini" controls-position="right" placeholder="请输入整数" style="width: 82%;"> %</el-input-number>
                        <span> %</span>
                    </div>
                </el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">
                    <el-button v-if="!edit" size="mini" @click="changeEdit">编辑比例</el-button>
                    <el-button v-else size="mini" type="primary" @click="changeEdit">确认更改</el-button>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle">
                <el-col :span="1"><i class="el-icon-search"></i></el-col>
                <el-col :span="23">
                    <el-input v-model="searchtextC" placeholder="学号/姓名 关键字搜索" @input="changeC($event)" clearable size="mini"
                              style="margin-top:10px; margin-bottom: 10px;"></el-input>
                </el-col>
            </el-row>
            <el-table
                    v-loading="loadingC"
                    ref="filterTableS"
                    :data="(courseData.filter(searchC)).slice((currentPageC - 1) * pageSizeC, currentPageC * pageSizeC)"
                    style="width: 100%"
                    show-summary
                    :summary-method="getAverage">
                <el-table-column
                        fixed
                        prop="xh"
                        label="学号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="sxm"
                        label="姓名"
                        :formatter="formatterC">
                </el-table-column>
                <el-table-column
                        prop="mc"
                        label="学院"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="pscj"
                        label="平时成绩"
                        width="120">
                    <template slot-scope="scope">
                        <el-input v-if="editgrade" size="mini" v-model="scope.row.pscj"></el-input>
                        <span v-else>{{ scope.row.pscj == null? '-' :scope.row.pscj }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="kscj"
                        label="考试成绩"
                        width="120">
                    <template slot-scope="scope">
                        <el-input v-if="editgrade" size="mini" v-model="scope.row.kscj"></el-input>
                        <span v-else>{{ scope.row.kscj == null? '-' :scope.row.kscj }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="zpcj"
                        label="总评成绩"
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
<!--                <el-table-column-->
<!--                        fixed="right"-->
<!--                        label="操作"-->
<!--                        width="100">-->
<!--                    <template slot-scope="scope">-->
<!--&lt;!&ndash;                        <el-button&ndash;&gt;-->
<!--&lt;!&ndash;                                :disabled="!usertype"&ndash;&gt;-->
<!--&lt;!&ndash;                                size="mini">编辑</el-button>&ndash;&gt;-->
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                type="danger"-->
<!--                                :disabled="!usertype"-->
<!--                                @click="handleDeleteC(scope.row)">退课</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
            <div style="margin-top: 2vh;">
                <el-pagination
                        @size-change="handleSizeChangeC"
                        @current-change="handleCurrentChangeC"
                        :current-page="currentPageC"
                        :page-sizes="[5, 8, 10, (courseData.filter(searchC)).length]"
                        :page-size="pageSizeC"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="(courseData.filter(searchC)).length">
                </el-pagination>
            </div>
        </el-card>

    </div>
</template>

<script>
    import axios from 'axios';
    import GradeAnalysis from "@/components/GradeAnalysis";
    export default {
        name: "GradeDetail",
        components: {
            GradeAnalysis
        },
        props: {
            userid: String,
            usertype: Boolean,
            xq: String,
            kh: String,
            gh: String,
        },
        data() {
            return {
                gradeAnalysis: false,
                courseData: [],
                totalC: 0,
                loadingC: true,
                currentPageC: 1,
                pageSizeC: 8,
                searchtextC: '',
                firstC: 1,
                courseInfo: {
                    kh: '',
                    km: '',
                    gh: '',
                    xm: '',
                    xf: '',
                    xs: '',
                    mc: '',
                    xq: '',
                    sksj: '',
                },
                newStu: '',
                allStu: '',
                edit: false,
                percent: 50,
                editgrade: false,
                fullscreenLoading: true,
            }
        },
        methods: {
            getSTUDENTMessage() {
                let that = this;
                const path = 'http://localhost:5000/student';
                axios.get(path)
                    .then((res) => {
                        that.allStu = res.data;
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
            },
            getCOURSEINFOMessage() {
                let that = this;
                const path = 'http://localhost:5000/courseopen/' + that.xq + '/' + that.kh + '/' + that.gh;
                axios.get(path)
                    .then((res) => {
                        that.courseInfo = res.data[0];
                        if (that.courseInfo.gh != that.userid && that.userid != '10000000') {
                            that.$message({
                                message: '无权限操作',
                                type: 'error'
                            });
                            this.$router.push({ path: '/CourseEdit' });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
            },
            getGRADEDEATILMessage() {
                let that = this;
                that.loadingC = true;
                const path = 'http://localhost:5000/gradedetail/' + that.xq + '/' + that.kh + '/' + that.gh;
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
            changeC () {
                this.firstC = 0;
                this.$forceUpdate();
                if (this.searchtextC == '')
                    this.firstC = 1;
            },
            searchC(rowdata) {
                if (this.firstC == 1)
                    return rowdata;
                else
                if (rowdata.sxm != null || rowdata == this.searchtextC)
                    if (rowdata.sxm.includes(this.searchtextC))
                        return rowdata;
                if (rowdata.xh != null || rowdata == this.searchtextC)
                    if (rowdata.xh.includes(this.searchtextC))
                        return rowdata;
                if (rowdata.mc != null || rowdata == this.searchtextC)
                    if (rowdata.mc.includes(this.searchtextC))
                        return rowdata;
            },
            formatterC(row) {
                return row.sxm;
            },
            handleSizeChangeC(pageSize) {
                this.pageSizeC = pageSize
            },
            handleCurrentChangeC(currentPage) {
                this.currentPageC = currentPage
            },
            handleDeleteC(row) {
                console.log(row);
            },
            querySearchnewStu(queryString, cb) {
                var allStu = this.allStu;
                var results = queryString ? allStu.filter(this.createFilter(queryString)) : allStu;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (stu) => {
                    return (stu.xh.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || stu.xm.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectnewStu(item) {
                this.newStu = item.xh;
            },
            addNewStu(xq, kh, gh, xh) {
                let NewStu = {
                    xq: xq,
                    kh: kh,
                    gh: gh,
                    xh: xh
                }
                let that = this;
                that.fullscreenLoading = true;
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/newelection',
                    data: NewStu,
                }).then((response) => {
                    console.log(response)
                    if (response.data == 'success') {
                        that.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        that.fullscreenLoading = false;
                        that.getCOURSEDEATILMessage();
                    } else if (response.data == 'repeat') {
                        that.$message({
                            message: '不得重复选课',
                            type: 'error'
                        });
                        that.fullscreenLoading = false;
                    } else {
                        that.fullscreenLoading = false;
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    }
                }).catch((error) => {
                    console.log(error)
                    that.fullscreenLoading = false;
                })
            },
            toGradeEdit() {
                this.$router.push({ path: '/GradeEdit' });
            },
            changeEdit() {
                this.edit = !this.edit;
            },
            changeEditGrade() {
                this.editgrade = !this.editgrade;
            },
            submitGrade() {
                let that = this;
                if (that.edit) {
                    that.$message({
                        message: '请确认平时成绩比例',
                        type: 'error'
                    });
                } else {
                    console.log(that.courseData);
                    let gradeData = {
                        grade: that.courseData,
                        percent: that.percent
                    };
                    that.loadingC = true;
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/gradeUpdate',
                        data: gradeData,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '录入成功',
                                type: 'success'
                            });
                            that.loadingC = false;
                            that.editgrade = !that.editgrade;
                            that.getGRADEDEATILMessage();
                        } else {
                            that.loadingC = false;
                            that.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                }
                console.log(that);
            },
            getAverage(param) {
                const { columns, data } = param;
                const avg = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        avg[index] = '显示内容平均值';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        avg[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        if (this.searchtextC == '')
                            avg[index] = (avg[index]/(this.pageSizeC)).toFixed(2);
                        else {
                            let min = Math.min((this.courseData.filter(this.searchC)).length, this.pageSizeC);
                            avg[index] = (avg[index] / (min)).toFixed(2);
                        }
                        avg[index] += '';
                    } else {
                        avg[index] = '';
                    }
                });

                return avg;
            }
        },
        mounted() {
            // console.log(this.userid, this.usertype);
            // console.log(this.xq, this.kh, this.gh);
            if (!this.usertype) {
                // console.log(this.userid);
                this.$message({
                    message: '无权限操作',
                    type: 'error'
                });
                this.$router.push({ path: '/' });
            } else {
                this.getGRADEDEATILMessage();
                this.getCOURSEINFOMessage();
                this.getSTUDENTMessage();
            }
        },
    }
</script>

<style scoped>
    .el-table th .el-table tr {
        min-height: 5.9vh !important;
        max-height: 5.9vh !important;
    }
</style>