<template>
    <div id="courseedit" style="width: 100%;">
        <el-card shadow="always" style="width: 97%;">
<!--            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">-->
<!--                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">课程信息</el-col>-->
<!--                <el-col :span="4">{{ courseInfo.kh }} {{ courseInfo.km }}</el-col>-->
<!--                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">学分学时</el-col>-->
<!--                <el-col :span="4">{{ courseInfo.xf }}学分 {{ courseInfo.xs }}学时</el-col>-->
<!--            </el-row>-->
<!--            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">-->
<!--                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">教师信息</el-col>-->
<!--                <el-col :span="4">{{ courseInfo.gh }} {{ courseInfo.xm }}</el-col>-->
<!--                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">上课时间</el-col>-->
<!--                <el-col :span="4">{{ courseInfo.sksj }}</el-col>-->
<!--            </el-row>-->
<!--            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">-->
<!--                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">开课学院</el-col>-->
<!--                <el-col :span="4">{{ courseInfo.mc }}</el-col>-->
<!--                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">开课学期</el-col>-->
<!--                <el-col :span="4">{{ courseInfo.xq.slice(0,4) }}学年{{ courseInfo.xq.slice(-2,) == '01'? '秋季' : courseInfo.xq.slice(-2,) == '02'? '冬季' : courseInfo.xq.slice(-2,) == '03'? '春季' : '夏季' }}学期</el-col>-->
<!--            </el-row>-->
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left; height: 3.1vh;">
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">
                    只看我的
                </el-col>
                <el-col :span="10">
                    <el-switch v-model="onlyme" />
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
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;"></el-col>
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
                    :data="(((courseData.filter(searchC)).filter(ghC)).filter(xqC)).slice((currentPageC - 1) * pageSizeC, currentPageC * pageSizeC)"
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
                        width="180">
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
                        prop="rs"
                        label="选课人数"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button
                                :disabled="!((usertype) && (scope.row.gh == userid) || (userid == '10000000'))"
                                size="mini"
                                @click="toDetail(scope)">操作</el-button>
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                type="danger"-->
<!--                                :disabled="!usertype"-->
<!--                                @click="handleDeleteC(scope.$index, scope.row)">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 2vh;">
                <el-pagination
                        @size-change="handleSizeChangeC"
                        @current-change="handleCurrentChangeC"
                        :current-page="currentPageC"
                        :page-sizes="[5, 8, 10, (((courseData.filter(searchC)).filter(ghC)).filter(xqC)).length]"
                        :page-size="pageSizeC"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="(((courseData.filter(searchC)).filter(ghC)).filter(xqC)).length">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "CourseEdit",
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

                onlyme: false,

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
            getCOURSEEDITMessage() {
                let that = this;
                const path = 'https://api.yijunstudio.xyz/school/courseedit';
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
            ghC(rowdata) {
                if (this.onlyme)
                    return rowdata.gh == this.userid;
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
            toDetail(scope) {
                this.$router.push({ path: '/CourseDetail/' + scope.row.xq + '/' + scope.row.kh + '/' + scope.row.gh })
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
                this.getCOURSEEDITMessage();
                this.getAVATERMMessage();
                this.getALLTERMMessage();
                this.getALLTEACHERMMessage();
            }
        },
    }
</script>

<style scoped>

</style>