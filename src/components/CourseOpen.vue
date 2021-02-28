<template>
    <div id="courseopen" style="width: 100%;">
        <el-card shadow="always" style="width: 97%;">
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left; height: 3.1vh;">
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">学期</el-col>
                <el-col :span="4">
                    <el-select v-model="New.xqNew" clearable placeholder="请选择开课学期" size="mini">
                        <el-option
                                v-for="item in avaTerm"
                                :key="item.xq"
                                :label="item.xq.slice(0,4) + '学年' + (item.xq.slice(-2,) == '01'? '秋季' : item.xq.slice(-2,) == '02'? '冬季' : item.xq.slice(-2,) == '03'? '春季' : '夏季') + '学期'"
                                :value="item.xq">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">课程</el-col>
                <el-col :span="4">
                    <el-select v-model="New.khNew" clearable placeholder="请选择开设课程" filterable size="mini">
                        <el-option
                                v-for="item in allCourse"
                                :key="item.kh"
                                :label="item.kh + ' ' + item.km"
                                :value="item.kh">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">教师</el-col>
                <el-col :span="4">
                    <el-select v-model="New.ghNew" clearable placeholder="请选择开课教师" filterable size="mini" :disabled="(userid != '10000000')">
                        <el-option
                                v-for="item in allTeacher"
                                :key="item.gh"
                                :label="item.gh + ' ' + item.xm"
                                :value="item.gh">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">时间</el-col>
                <el-col :span="4">
                    <el-input placeholder="如：一1-4 三1-2" v-model="New.sksjNew" class="input-with-select" size="mini" clearable/>
                </el-col>
                <el-col :span="4" align="right">
                    <el-button-group>
                        <el-button size="mini" type="primary" @click="courseNew(New)" v-loading.fullscreen.lock="fullscreenLoading">新增开课</el-button>
<!--                        <el-button size="mini" type="primary">批量新增</el-button>-->
<!--                        <el-dialog title="批量新增开课信息" :visible.sync="dialogVisible" width="30%">-->
<!--                            <el-form :model="newT" style="display: inline-block; margin: 0 auto;">-->
<!--                                <el-form-item label="院系号" :label-width="formLabelWidth" required>-->
<!--                                    <el-input v-model="newD.yxh" autocomplete="off"></el-input>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="学院名称" :label-width="formLabelWidth" required>-->
<!--                                    <el-input v-model="newD.mc" autocomplete="off"></el-input>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="地址" :label-width="formLabelWidth" required>-->
<!--                                    <el-input v-model="newD.dz" autocomplete="off"></el-input>-->
<!--                                </el-form-item>-->
<!--                                <el-form-item label="联系电话" :label-width="formLabelWidth" required>-->
<!--                                    <el-input v-model="newD.lxdh" autocomplete="off"></el-input>-->
<!--                                </el-form-item>-->
<!--                            </el-form>-->
<!--                            <div slot="footer" class="dialog-footer">-->
<!--                                <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--                                <el-button type="primary" @click="submitNew('D', newD)"-->
<!--                                           :disabled="!(newD.yxh != '' && newD.mc != '' && newD.dz != '' && newD.lxdh != '')">确 定</el-button>-->
<!--                            </div>-->
<!--                        </el-dialog>-->
                    </el-button-group>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">开课学期</el-col>
                <el-col :span="10">
                    <el-select v-model="term" multiple clearable placeholder="所有学期（可多选）" size="mini" style="width: 88%;">
                        <el-option
                                v-for="item in allTerm"
                                :key="item.xq"
                                :label="item.xq.slice(0,4) + '学年' + (item.xq.slice(-2,) == '01'? '秋季' : item.xq.slice(-2,) == '02'? '冬季' : item.xq.slice(-2,) == '03'? '春季' : '夏季') + '学期'"
                                :value="item.xq">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">开课学院</el-col>
                <el-col :span="10">
                    <el-select v-model="dept" multiple clearable placeholder="所有学院（可多选）" size="mini" style="width: 88%;">
                        <el-option
                                v-for="item in allDept"
                                :key="(item.yxh).toString()"
                                :label="item.mc"
                                :value="(item.yxh).toString()">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle">
                <el-col :span="1"><i class="el-icon-search"></i></el-col>
                <el-col :span="23">
                    <el-input v-model="searchtextC" placeholder="课号/课名/工号/教师/上课时间 关键字搜索" @input="changeC($event)" clearable size="mini"
                              style="margin-top:10px; margin-bottom: 10px;"></el-input>
                </el-col>
            </el-row>
            <el-table
                    v-loading="loadingC"
                    ref="filterTableS"
                    :data="(((courseData.filter(searchC)).filter(xyC)).filter(xqC)).slice((currentPageC - 1) * pageSizeC, currentPageC * pageSizeC)"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="xq"
                        label="开课学期"
                        width="160">
                    <template slot-scope="scope">
                        {{ scope.row.xq.slice(0,4) }}学年{{ scope.row.xq.slice(-2,) == '01'? '秋季' : scope.row.xq.slice(-2,) == '02'? '冬季' : scope.row.xq.slice(-2,) == '03'? '春季' : '夏季' }}学期
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
                        prop="gh"
                        label="教师工号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="xm"
                        label="教师姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="sksj"
                        label="上课时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="xf"
                        label="课程学分"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="mc"
                        label="开课学院"
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
                                :disabled="!((usertype) && (scope.row.gh == userid) || (userid == '10000000'))"
                                @click="handleDeleteC(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 2vh;">
                <el-pagination
                        @size-change="handleSizeChangeC"
                        @current-change="handleCurrentChangeC"
                        :current-page="currentPageC"
                        :page-sizes="[5, 8, 10, (((courseData.filter(searchC)).filter(xyC)).filter(xqC)).length]"
                        :page-size="pageSizeC"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="(((courseData.filter(searchC)).filter(xyC)).filter(xqC)).length">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "CourseOpen",
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

                allTerm: [],
                term: [],

                allDept: [],
                dept: [],

                allTeacher: [],
                allCourse: [],
                avaTerm: [],

                New: {
                    xqNew: '',
                    khNew: '',
                    ghNew: '',
                    sksjNew: '',
                },

                fullscreenLoading: false,
            }
        },
        methods: {
            getAVATERMMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/avaterm/5';
                axios.get(path)
                    .then((res) => {
                        that.avaTerm = res.data;
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
            },
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
            getALLTEACHERMMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/teacher';
                axios.get(path)
                    .then((res) => {
                        that.allTeacher = res.data;
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
            },
            getALLCOURSEMMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/courseall';
                axios.get(path)
                    .then((res) => {
                        that.allCourse = res.data;
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
            },
            getALLDEPTMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/alldept';
                axios.get(path)
                    .then((res) => {
                        that.allDept = res.data;
                    })
                    .catch((error) => {
                        console.error(error);
                        that.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    });
            },
            getCOURSEOPENMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/courseopen';
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
            changeC() {
                this.firstC = 0;
                this.$forceUpdate();
                if (this.searchtextC == '')
                    this.firstC = 1;
            },
            searchC(rowdata) {
                if (this.firstC == 1)
                    return rowdata;
                else if (rowdata.km != null || rowdata == this.searchtextC)
                    if (rowdata.km.includes(this.searchtextC))
                        return rowdata;
                if (rowdata.kh != null || rowdata == this.searchtextC)
                    if (rowdata.kh.includes(this.searchtextC))
                        return rowdata;
                if (rowdata.gh != null || rowdata == this.searchtextC)
                    if (rowdata.gh.includes(this.searchtextC))
                        return rowdata;
                if (rowdata.xm != null || rowdata == this.searchtextC)
                    if (rowdata.xm.includes(this.searchtextC))
                        return rowdata;
                if (rowdata.sksj != null || rowdata == this.searchtextC)
                    if (rowdata.sksj.includes(this.searchtextC))
                        return rowdata;
            },
            xqC(rowdata) {
                if (this.term.includes(rowdata.xq))
                    return rowdata;
                if (this.term.length == 0)
                    return rowdata;
            },
            xyC(rowdata) {
                if (this.dept.includes(rowdata.yxh))
                    return rowdata;
                if (this.dept.length == 0)
                    return rowdata;
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
            handleDeleteC(row) {
                let Del = {
                    xq: row.xq,
                    kh: row.kh,
                    gh: row.gh
                }
                let that = this;
                that.fullscreenLoading = true;
                axios({
                    method: 'post',
                    url: 'https://api.yijunstudio.xyz/school/courseopenDel',
                    data: Del,
                }).then((response) => {
                    console.log(response)
                    if (response.data == 'success') {
                        that.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        that.fullscreenLoading = false;
                        that.getCOURSEOPENMessage();
                    } else if (response.data == 'deletestudentfirst') {
                        that.fullscreenLoading = false;
                        that.$confirm('确认退选所有选课学生？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            axios({
                                method: 'post',
                                url: 'https://api.yijunstudio.xyz/school/courseopenDel/force',
                                data: Del,
                            }).then((response) => {
                                if (response.data == 'success') {
                                    that.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                    that.fullscreenLoading = false;
                                    that.getCOURSEOPENMessage();
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
                                that.$message({
                                    message: '未知错误',
                                    type: 'error'
                                });
                            })
                        }).catch(() => {
                            that.$message({
                                type: 'info',
                                message: '取消删除'
                            });
                        });
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
                    that.$message({
                        message: '未知错误',
                        type: 'error'
                    });
                })
            },
            courseNew(New) {
                let that = this;
                if (New.xqNew == '' || New.khNew == '' || New.ghNew == '' || New.sksjNew == '') {
                    that.$message({
                        message: '新增课程信息不得为空',
                        type: 'error'
                    });
                } else {
                    // console.log(New);
                    that.fullscreenLoading = true;
                    axios({
                        method: 'post',
                        url: 'https://api.yijunstudio.xyz/school/courseopenNew',
                        data: New,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            that.fullscreenLoading = false;
                            that.getCOURSEOPENMessage();
                        } else {
                            that.fullscreenLoading = false;
                            that.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            },
        },
        mounted() {
            // console.log(this.userid, this.usertype);
            if (!this.usertype) {
                // console.log(this.userid);
                this.$message({
                    message: '无权限操作',
                    type: 'error'
                });
                this.$router.push({ path: '/' });
            } else {
                if (this.userid != '10000000')
                    this.New.ghNew = this.userid;
                this.getCOURSEOPENMessage();
                this.getAVATERMMessage();
                this.getALLTERMMessage();
                this.getALLDEPTMessage();
                this.getALLTEACHERMMessage();
                this.getALLCOURSEMMessage();
            }
        },
    }
</script>

<style scoped>

</style>