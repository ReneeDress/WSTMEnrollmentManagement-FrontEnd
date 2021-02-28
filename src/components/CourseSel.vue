<template>
    <div id="coursesel" style="width: 100%;">
        <el-card shadow="always" style="width: 97%;">
            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left;">
                <el-col :span="2" style="text-indent: 10px; font-weight: 500;">选择学期</el-col>
                <el-col :span="10">
                    <el-select v-model="term" clearable placeholder="请选择学期" style="width: 88%;" @change="changeTerm">
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
                <el-col :span="12">
                    <el-tabs v-model="tab" type="border-card" style="width: 100%; display: inline-block; margin: 0 auto;">
                        <el-tab-pane label="课表查询" name="schedule">
                            <el-table
                                    v-loading="loadingC"
                                    ref="filterTableS"
                                    :data="courseData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="kh"
                                        label="课号"
                                        width="90">
                                </el-table-column>
                                <el-table-column
                                        prop="km"
                                        label="课程"
                                        :formatter="formatterC">
                                </el-table-column>
                                <el-table-column
                                        prop="txm"
                                        label="教师"
                                        width="80">
                                </el-table-column>
                                <el-table-column
                                        prop="sksj"
                                        label="上课时间"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="xf"
                                        label="学分"
                                        width="80">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="快捷选课" name="election">
                            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left; margin-top: 1vh; ">
                                <el-col :span="4" style="text-indent: 10px; font-weight: 500;">已选课程</el-col>
                            </el-row>
                            <el-table
                                    v-loading="loadingC"
                                    ref="filterTableS"
                                    :data="courseData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="kh"
                                        label="课号"
                                        width="90">
                                </el-table-column>
                                <el-table-column
                                        prop="km"
                                        label="课程"
                                        :formatter="formatterC">
                                </el-table-column>
                                <el-table-column
                                        prop="txm"
                                        label="教师"
                                        width="80">
                                </el-table-column>
                                <el-table-column
                                        prop="sksj"
                                        label="上课时间"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="xf"
                                        label="学分"
                                        width="80">
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="退课"
                                        width="50">
                                    <template slot-scope="scope">
                                        <el-button
                                                :disable="(scope.row.zt == 'cannotdelete')"
                                                size="mini"
                                                type="danger"
                                                icon="el-icon-close"
                                                circle
                                                @click="handleDeleteC(scope.row)"></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-divider />
                            <el-row type="flex" align="middle" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left; margin-top: 2vh;">
                                <el-col :span="4" style="text-indent: 10px; font-weight: 500;">可选课程</el-col>
                            </el-row>
                            <el-row type="flex" align="middle">
                                <el-col :span="2"><i class="el-icon-search"></i></el-col>
                                <el-col :span="22">
                                    <el-input v-model="searchtextC" placeholder="课号/课名/教师/上课时间 关键字搜索" @input="changeC($event)" clearable size="mini"
                                              style="margin-top:10px; margin-bottom: 10px;"></el-input>
                                </el-col>
                            </el-row>
                            <el-table
                                    v-loading="loadingCO"
                                    ref="filterTableS"
                                    :data="courseOPENData.filter(searchC)"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="kh"
                                        label="课号"
                                        width="90">
                                </el-table-column>
                                <el-table-column
                                        prop="km"
                                        label="课程"
                                        :formatter="formatterC">
                                </el-table-column>
                                <el-table-column
                                        prop="xm"
                                        label="教师"
                                        width="80">
                                </el-table-column>
                                <el-table-column
                                        prop="sksj"
                                        label="上课时间"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="xf"
                                        label="学分"
                                        width="80">
                                </el-table-column>
                            </el-table>
                            <el-row type="flex" align="middle" justify="end" style="margin-bottom: 1vh; font-size: 14px; color: #707070; text-align: left; margin-top: 2vh;">
                                <el-button type="primary" @click="newSelection">一键选课</el-button>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="12" align="middle">
                    <el-table
                            :loading="loading"
                            class="schedule"
                            :data="tableData"
                            :row-style="rowHeight"

                            :span-method="objectSpanMethod"
                            style="width: 90%;">
                        <el-table-column
                                align="center"
                                prop="cls"
                                label="节次"
                                min-width="10%">
<!--                            <template slot-scope="scope">-->
<!--                                {{scope.row.cls}}-->
<!--                            </template>-->
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="Mon"
                                label="周一"
                                min-width="20%">
                            <template slot-scope="scope">
                                <div class="classCard" :style="addColor(scope.row.Mon.color, scope.row.Mon.js)">
                                    <div style="display: inline-block; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; width: 100%; height: 20%;">
                                        <div class="km">{{scope.row.Mon.km}}</div>
                                        <div class="kh">{{scope.row.Mon.kh}}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="Tue"
                                label="周二"
                                min-width="20%">
                            <template slot-scope="scope">
                                <div class="classCard" :style="addColor(scope.row.Tue.color, scope.row.Tue.js)">
                                    <div style="display: inline-block; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; width: 100%; height: 20%;">
                                        <div class="km">{{scope.row.Tue.km}}</div>
                                        <div class="kh">{{scope.row.Tue.kh}}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="Wed"
                                label="周三"
                                min-width="20%">
                            <template slot-scope="scope">
                                <div class="classCard" :style="addColor(scope.row.Wed.color, scope.row.Wed.js)">
                                    <div style="display: inline-block; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; width: 100%; height: 20%;">
                                        <div class="km">{{scope.row.Wed.km}}</div>
                                        <div class="kh">{{scope.row.Wed.kh}}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="Thu"
                                label="周四"
                                min-width="20%">
                            <template slot-scope="scope">
                                <div class="classCard" :style="addColor(scope.row.Thu.color, scope.row.Thu.js)">
                                    <div style="display: inline-block; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; width: 100%; height: 20%;">
                                        <div class="km">{{scope.row.Thu.km}}</div>
                                        <div class="kh">{{scope.row.Thu.kh}}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="Fri"
                                label="周五"
                                min-width="20%">
                            <template slot-scope="scope">
                                <div class="classCard" :style="addColor(scope.row.Fri.color, scope.row.Fri.js)">
                                    <div style="display: inline-block; position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto; width: 100%; height: 20%;">
                                        <div class="km">{{scope.row.Fri.km}}</div>
                                        <div class="kh">{{scope.row.Fri.kh}}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "CourseSel",
        props: {
            userid: String,
            usertype: Boolean,
        },
        data() {
            return {
                tab: 'schedule',

                term: '',

                avaTerm: [],
                allTerm: [],

                multipleSelection: [],

                loadingC: true,
                courseData: [],

                searchtextC: '',
                firstC: 1,
                loadingCO: true,
                courseOPENData: [],

                loading: true,
                tableData: [{
                    cls: '1',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '2',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '3',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '4',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '5',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '6',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '7',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '8',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '9',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '10',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                },{
                    cls: '11',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '12',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }, {
                    cls: '13',
                    Mon: { kh: '', km: '', js: 0 },
                    Tue: { kh: '', km: '', js: 0 },
                    Wed: { kh: '', km: '', js: 0 },
                    Thu: { kh: '', km: '', js: 0 },
                    Fri: { kh: '', km: '', js: 0 },
                }]
            }
        },
        methods: {
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                row, column, rowIndex, columnIndex;
                // console.log(row);
                if (columnIndex === 1) {
                    if (row.Mon.js != 0)
                        return {
                            rowspan: row.Mon.js,
                            colspan: 1
                        };
                }
                if (columnIndex === 2) {
                    if (row.Tue.js != 0)
                        return {
                            rowspan: row.Tue.js,
                            colspan: 1
                        };
                }
                if (columnIndex === 3) {
                    if (row.Wed.js != 0)
                        return {
                            rowspan: row.Wed.js,
                            colspan: 1
                        };
                }
                if (columnIndex === 4) {
                    if (row.Thu.js != 0)
                        return {
                            rowspan: row.Thu.js,
                            colspan: 1
                        };
                }
                if (columnIndex === 5) {
                    if (row.Fri.js != 0)
                        return {
                            rowspan: row.Fri.js,
                            colspan: 1
                        };
                }
                return {
                    rowspan: 1,
                    colspan: 1
                };
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
            rowHeight() {
                let styleJson = {
                    'height': '54px'
                }
                return styleJson
            },
            addColor(color, js) {
                if (js != 0) {
                    return {
                        'background-color': '#409EFF50',
                        'box-shadow': '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            changeTerm(value) {
                console.log(this.term);
                // this.term = value;
                this.loading = true;
                if (value != '')
                    // this.$forceUpdate();
                    this.getCOURSEDETAILMessage();
                    this.getSCHEDULEMessage();
                    this.getCOURSEOPENMessage();
            },
            getCOURSEOPENMessage() {
                let that = this;
                that.loadingCO = true;
                const path = 'https://api.yijunstudio.xyz/school/courseopen/' + that.term;
                if (that.term != '')
                    axios.get(path)
                        .then((res) => {
                            that.courseOPENData = res.data;
                            that.loadingCO = false;
                        })
                        .catch((error) => {
                            console.error(error);
                            that.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                            that.loadingCO = false;
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
                if (rowdata.xm != null || rowdata == this.searchtextC)
                    if (rowdata.xm.includes(this.searchtextC))
                        return rowdata;
                if (rowdata.sksj != null || rowdata == this.searchtextC)
                    if (rowdata.sksj.includes(this.searchtextC))
                        return rowdata;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
            },
            getCOURSEDETAILMessage() {
                let that = this;
                that.loadingC = true;
                const path = 'https://api.yijunstudio.xyz/school/coursedetail/' + that.term + '/' + that.userid;
                if (that.term != '')
                    axios.get(path)
                        .then((res) => {
                            that.courseData = res.data;
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
            newSelection() {
                let that = this;
                that.loadingC = true;
                for (var i = 0; i < that.multipleSelection.length; i++) {
                    that.loadingC = true;
                    let newsel = that.multipleSelection[i];
                    newsel['xh'] = that.userid;
                    axios({
                        method: 'post',
                        url: 'https://api.yijunstudio.xyz/school/newelection',
                        data: newsel,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '新增成功 ' + newsel.kh,
                                type: 'success'
                            });
                            that.getCOURSEDETAILMessage();
                            that.getSCHEDULEMessage();
                        } else if (response.data == 'repeat') {
                            that.$message({
                                message: '不得重复选课 ' + newsel.kh,
                                type: 'error'
                            });
                            that.getCOURSEDETAILMessage();
                            that.getSCHEDULEMessage();
                        } else {
                            that.loadingC = false;
                            that.$message({
                                message: '未知错误 ' + newsel.kh,
                                type: 'error'
                            });
                        }
                    }).catch((error) => {
                        console.log(error)
                        that.loadingC = false;
                    })
                }
            },
            formatterC(row) {
                return row.km;
            },
            getSCHEDULEMessage() {
                let that = this;
                that.loading = true;
                const path = 'https://api.yijunstudio.xyz/school/schedule/' + that.term + '/' + that.userid;
                if (that.term != '')
                    axios.get(path)
                        .then((res) => {
                            that.tableData = res.data;
                            that.loading = false;
                        })
                        .catch((error) => {
                            console.error(error);
                            that.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                            that.loading = false;
                        });
            },
            handleDeleteC(row) {
                console.log(row);
                let that = this;
                let delE = {
                    xq: that.term,
                    kh: row.kh,
                    gh: row.gh,
                    xh: that.userid
                }
                if (row.zt == 'candelete') {
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
                            that.getCOURSEDETAILMessage();
                            that.getSCHEDULEMessage();
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
                } else
                    that.$message({
                        message: '已有成绩 无法退课',
                        type: 'error'
                    });
            },
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
                this.getAVATERMMessage();
                this.getALLTERMMessage();
                this.getCOURSEDEATILMessage();
                this.getSCHEDULEMessage();
                this.getCOURSEOPENMessage();
            }
        },
    }
</script>

<style scoped>
    .kh {
        font-size: 8px;
        letter-spacing: 0.5px;
        line-height: 8px;
    }
    .km {
        font-size: 12px;
        line-height: 20px;
    }
    .cell {
        height: 11vh;
    }
    .classCard {
        display: block;
        position: absolute;
        top: 2.5%;
        left: 5%;
        height: 95%;
        width: 90%;
        /*min-height: 5vh;*/
        /*padding: 1vh 0;*/
        border-radius: 16px;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
        background-color: transparent;
    }
</style>