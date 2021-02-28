<template>
    <div id="coursedetail" style="width: 100%;">
        <el-card shadow="always" style="width: 97%;">
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2">
                    <el-button size="mini" plain @click="toCourseEdit">返回选课情况</el-button>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">课程信息</el-col>
                <el-col :span="4">{{ courseInfo.kh }} {{ courseInfo.km }}</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">学分学时</el-col>
                <el-col :span="4">{{ courseInfo.xf }}学分 {{ courseInfo.xs }}学时</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">开课学院</el-col>
                <el-col :span="4">{{ courseInfo.mc }}</el-col>
                <el-col :span="4">
                    <el-select multiple collapse-tags filterable clearable
                               size="mini" v-model="newStuList"
                               placeholder="可使用 学号/姓名 搜索"
                               style="width: 100%">
                        <el-option
                                v-for="item in allStu"
                                :key="item.xh"
                                :label="item.xh + ' ' + item.xm"
                                :value="item.xh">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">
                    <el-button size="mini" @click="addNewStu(courseInfo.xq, courseInfo.kh, courseInfo.gh, newStuList)" type="primary">新增学生</el-button>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">教师信息</el-col>
                <el-col :span="4">{{ courseInfo.gh }} {{ courseInfo.xm }}</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">上课时间</el-col>
                <el-col :span="4">{{ courseInfo.sksj }}</el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">开课学期</el-col>
                <el-col :span="4">{{ (courseInfo.xq).slice(0,4) }}学年{{ (courseInfo.xq).slice(-2,) == '01'? '秋季' : (courseInfo.xq).slice(-2,) == '02'? '冬季' : (courseInfo.xq).slice(-2,) == '03'? '春季' : '夏季' }}学期</el-col>
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
                    style="width: 100%">
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
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
<!--                        <el-button-->
<!--                                :disabled="!usertype"-->
<!--                                size="mini">编辑</el-button>-->
                        <el-button
                                size="mini"
                                type="danger"
                                :disabled="!usertype"
                                @click="handleDeleteC(scope.row)">退课</el-button>
                    </template>
                </el-table-column>
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
    export default {
        name: "CourseDetail",
        props: {
            userid: String,
            usertype: Boolean,
            xq: String,
            kh: String,
            gh: String,
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
                newStuList: [],
                allStu: [],
                fullscreenLoading: true,
            }
        },
        methods: {
            getSTUDENTMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/student';
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
                const path = 'https://api.yijunstudio.xyz/school/courseopen/' + that.xq + '/' + that.kh + '/' + that.gh;
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
            getCOURSEDEATILMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/coursedetail/' + that.xq + '/' + that.kh + '/' + that.gh;
                axios.get(path)
                    .then((res) => {
                        that.courseData = res.data;
                        that.totalC = that.courseData.length;
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
                let delE = {
                    xq: row.xq,
                    kh: row.kh,
                    gh: row.gh,
                    xh: row.xh
                }
                let that = this;
                that.loadingC = true;
                axios({
                    method: 'post',
                    url: 'https://api.yijunstudio.xyz/school/delelection',
                    data: delE,
                }).then((response) => {
                    console.log(response)
                    if (response.data == 'success') {
                        that.$message({
                            message: '退课成功',
                            type: 'success'
                        });
                        that.getCOURSEDEATILMessage();
                    } else if (response.data == 'repeat') {
                        that.$message({
                            message: '该选课记录不存在',
                            type: 'error'
                        });
                        that.loadingC = false;
                    } else {
                        that.loadingC = false;
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    }
                }).catch((error) => {
                    console.log(error)
                    that.loadingC = false;
                })
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
            addNewStu(xq, kh, gh, xhList) {
                let that = this;
                that.loadingC = true;
                for (var i = 0; i < xhList.length; i++) {
                    that.loadingC = true;
                    let xh = xhList[i];
                    let NewStu = {
                        xq: xq,
                        kh: kh,
                        gh: gh,
                        xh: xh
                    }
                    axios({
                        method: 'post',
                        url: 'https://api.yijunstudio.xyz/school/newelection',
                        data: NewStu,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '新增成功 ' + NewStu.xh,
                                type: 'success'
                            });
                            that.getCOURSEDEATILMessage();
                        } else if (response.data == 'repeat') {
                            that.$message({
                                message: '不得重复选课 ' + NewStu.xh,
                                type: 'error'
                            });
                            that.loadingC = false;
                        } else {
                            that.loadingC = false;
                            that.$message({
                                message: '未知错误 ' + NewStu.xh,
                                type: 'error'
                            });
                        }
                    }).catch((error) => {
                        console.log(error)
                        that.loadingC = false;
                    })
                }
            },
            toCourseEdit() {
                this.$router.push({ path: '/CourseEdit' });
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
                this.getCOURSEDEATILMessage();
                this.getCOURSEINFOMessage();
                this.getSTUDENTMessage();
            }
        },
    }
</script>

<style scoped>

</style>