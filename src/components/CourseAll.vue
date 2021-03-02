<template>
    <div id="courseall" style="width: 100%;">
        <el-card shadow="always" style="width: 97%;">
            <el-row v-if="usertype" type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left; height: 3.1vh;">
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">课号</el-col>
                <el-col :span="4">
                    <el-autocomplete v-model="New.khNew" clearable placeholder="请输入课程编号" :fetch-suggestions="querySearch" size="mini">
                        <template slot-scope="{ item }">
                            <span>{{ item.kh }}</span>
                            <span style="font-size: 10px;"> 已存在</span>
                        </template>
                    </el-autocomplete>
                </el-col>
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">课名</el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入课程名称" v-model="New.kmNew" size="mini" clearable/>
                </el-col>
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">学院</el-col>
                <el-col :span="4">
                    <el-select v-model="New.yxhNew" clearable placeholder="请选择开课学院" filterable size="mini">
                        <el-option
                                v-for="item in allDept"
                                :key="item.yxh"
                                :label="item.yxh + ' ' + item.mc"
                                :value="item.yxh">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">学分</el-col>
                <el-col :span="2">
                    <el-input-number :min="0" :step="1" placeholder="默认为4" v-model="New.xfNew" size="mini" style="width: 100%;" clearable/>
                </el-col>
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;"></el-col>
                <el-col :span="1" style="text-indent: 10px; font-weight: 500;">学时</el-col>
                <el-col :span="2">
                    <el-input-number :min="0" :step="10" placeholder="默认为40" v-model="New.xsNew" size="mini" style="width: 100%;" clearable/>
                </el-col>
                <el-col :span="3" align="right">
                    <el-button-group>
                        <el-button size="mini" type="primary" @click="courseNew(New)" v-loading.fullscreen.lock="fullscreenLoading">新增课程</el-button>
                    </el-button-group>
                </el-col>
            </el-row>
            <el-divider v-if="usertype"></el-divider>
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
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
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">
                    只看未开
                </el-col>
                <el-col :span="2">
                    <el-switch v-model="zero" />
                </el-col>
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">
                    只看已开
                </el-col>
                <el-col :span="2">
                    <el-switch v-model="notzero" />
                </el-col>
            </el-row>
            <el-row type="flex" align="middle">
                <el-col :span="1"><i class="el-icon-search"></i></el-col>
                <el-col :span="23">
                    <el-input v-model="searchtextC" placeholder="课号/课名/学院 关键字搜索" @input="changeC($event)" clearable size="mini"
                              style="margin-top:10px; margin-bottom: 10px;"></el-input>
                </el-col>
            </el-row>
            <el-table
                    v-loading="loadingC"
                    ref="filterTableS"
                    :data="(((courseData.filter(searchC)).filter(zeroC).filter(notzeroC)).filter(xyC)).slice((currentPageC - 1) * pageSizeC, currentPageC * pageSizeC)"
                    style="width: 100%">
                <el-table-column
                        fixed
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
                        prop="mc"
                        label="开课学院"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="xf"
                        label="课程学分"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="xs"
                        label="课程学时"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="kkcs"
                        label="开课次数"
                        width="120">
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
                                :disabled="!((usertype) && (scope.row.kkcs == 0))"
                                @click="handleDeleteC(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 2vh;">
                <el-pagination
                        @size-change="handleSizeChangeC"
                        @current-change="handleCurrentChangeC"
                        :current-page="currentPageC"
                        :page-sizes="[5, 8, 10, (((courseData.filter(searchC)).filter(zeroC).filter(notzeroC)).filter(xyC)).length]"
                        :page-size="pageSizeC"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="(((courseData.filter(searchC)).filter(zeroC).filter(notzeroC)).filter(xyC)).length">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "CourseAll",
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
                    khNew: '',
                    kmNew: '',
                    yxhNew: '',
                    xfNew: 4,
                    xsNew: 40,
                },

                onlyme: false,
                zero: false,
                notzero: false,

                fullscreenLoading: false,
            }
        },
        methods: {
            querySearch(queryString, cb) {
                var courseData = this.courseData;
                var results = queryString ? courseData.filter(this.createFilter(queryString)) : courseData;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (course) => {
                    return (course.kh.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            getAVATERMMessage() {
                let that = this;
                const path = 'http://localhost:5000/avaterm/5';
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
                const path = 'http://localhost:5000/allterm';
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
                const path = 'http://localhost:5000/teacher';
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
            getALLDEPTMessage() {
                let that = this;
                const path = 'http://localhost:5000/alldept';
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
            getCOURSEALLMessage() {
                let that = this;
                const path = 'http://localhost:5000/courseall';
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
                if (rowdata.mc != null || rowdata == this.searchtextC)
                    if (rowdata.mc.includes(this.searchtextC))
                        return rowdata;
            },
            xyC(rowdata) {
                if (this.dept.includes(rowdata.yxh))
                    return rowdata;
                if (this.dept.length == 0)
                    return rowdata;
            },
            zeroC(rowdata) {
                if (this.zero)
                    return rowdata.kkcs == 0;
                else
                    return rowdata;
            },
            notzeroC(rowdata) {
                if (this.notzero)
                    return rowdata.kkcs != 0;
                else
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
            courseNew(New) {
                let that = this;
                if (New.khNew == '' || New.kmNew == '' || New.yxhNew == '' || New.xfNew == '' || New.xsNew == '') {
                    that.$message({
                        message: '新增课程信息不得为空',
                        type: 'error'
                    });
                } else {
                    // console.log(New);
                    that.fullscreenLoading = true;
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/courseall/new',
                        data: New,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            that.fullscreenLoading = false;
                            that.getCOURSEALLMessage();
                        } else if (response.data == 'repeat') {
                            that.$message({
                                message: '课程编号已存在 新增失败',
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
                    })
                }
            },
            handleDeleteC(row) {
                let that = this;
                that.fullscreenLoading = true;
                if (row.kkcs != 0)
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/courseall/del',
                        data: row,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            that.fullscreenLoading = false;
                            that.getCOURSEALLMessage();
                        } else if (response.data == 'repeat') {
                            that.$message({
                                message: '该课程不存在 无法删除',
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
                    })
                else
                    that.$message({
                        message: '已有开课记录 无法删除',
                        type: 'error'
                    });
            }
        },
        mounted() {
            // console.log(this.userid, this.usertype);
            this.getCOURSEALLMessage();
            this.getAVATERMMessage();
            this.getALLTERMMessage();
            this.getALLTEACHERMMessage();
            this.getALLDEPTMessage();
        },
    }
</script>

<style scoped>

</style>