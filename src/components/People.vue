<template>
    <div id="people" style="width: 100%;">
        <el-tabs v-model="tab" type="border-card" style="width: 97%;">
            <el-tab-pane label="学生信息管理" name="student">
                <el-row type="flex" align="middle" style="margin-bottom: 1vh;">
<!--                    <el-col :span="6" align="middle">-->
<!--                        <el-button size="mini" @click="clearFilterS">重置所有筛选选项</el-button>-->
<!--                    </el-col>-->
                    <el-col :span="1"><i class="el-icon-search"></i></el-col>
                    <el-col :span="20">
                        <el-input v-model="searchtextS" placeholder="学号/姓名/学院/手机号码 关键字搜索" @input="changeS($event)" clearable
                                  style="margin-top:10px; margin-bottom: 10px;"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="addUser('S')">新增学生</el-button>
                        <el-dialog title="新增学生信息" :visible.sync="dialogNewSVisible" width="30%">
                            <el-form :model="newS" style="display: inline-block; margin: 0 auto;">
                                <el-form-item label="学号" :label-width="formLabelWidth" required>
                                    <el-input v-model="newS.xh" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名" :label-width="formLabelWidth" required>
                                    <el-input v-model="newS.xm" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" :label-width="formLabelWidth" required>
                                    <el-radio-group v-model="newS.xb">
                                        <el-radio label="男">男</el-radio>
                                        <el-radio label="女">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="学院" :label-width="formLabelWidth" required>
                                    <el-select v-model="newS.yxh" style="width: 100%;">
                                        <el-option v-for="item in allDept" :key="item.yxh" :label="item.mc" :value="item.yxh"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="籍贯" :label-width="formLabelWidth">
                                    <el-input v-model="newS.jg" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="出生日期" :label-width="formLabelWidth">
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="newS.csrq" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="手机号码" :label-width="formLabelWidth">
                                    <el-input v-model="newS.sjhm" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogNewSVisible = false">取 消</el-button>
                                <el-button type="primary" @click="submitNew('S', newS)"
                                           :disabled="!(newS.xh != '' && newS.xm != '' && newS.xb != '' && newS.yxh != '') || loading">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                </el-row>
                <el-table
                        v-loading="loading"
                        ref="filterTableS"
                        :data="(studentData.filter(searchS)).slice((currentPageS - 1) * pageSizeS, currentPageS * pageSizeS)"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="xh"
                            label="学号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="xm"
                            label="姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="xb"
                            label="性别"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="jg"
                            label="籍贯"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="csrq"
                            label="出生日期"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="sjhm"
                            label="手机号码"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="mc"
                            label="学院"
                            :formatter="formatterS">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <el-button
                                    :disabled="!usertype"
                                    size="mini"
                                    @click="dialogModSVisible = true; newS = scope.row;">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    :disabled="!usertype"
                                    @click="handleDelete('S', scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <p>
                    <el-pagination
                            @size-change="handleSizeChangeS"
                            @current-change="handleCurrentChangeS"
                            :current-page="currentPageS"
                            :page-sizes="[5, 8, 10]"
                            :page-size="pageSizeS"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="(studentData.filter(searchS)).length">
                    </el-pagination>
                </p>
                <el-dialog title="修改学生信息" :visible.sync="dialogModSVisible" width="30%">
                    <el-form :model="newS" style="display: inline-block; margin: 0 auto;">
                        <el-form-item label="学号" :label-width="formLabelWidth" required>
                            <el-input v-model="newS.xh" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" :label-width="formLabelWidth" required>
                            <el-input v-model="newS.xm" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth" required>
                            <el-radio-group v-model="newS.xb">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="学院" :label-width="formLabelWidth" required>
                            <el-select v-model="newS.yxh" style="width: 100%;">
                                <el-option v-for="item in allDept" :key="item.yxh" :label="item.mc" :value="item.yxh"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="籍贯" :label-width="formLabelWidth">
                            <el-input v-model="newS.jg" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期" :label-width="formLabelWidth">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="newS.csrq" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="手机号码" :label-width="formLabelWidth">
                            <el-input v-model="newS.sjhm" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogModSVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateItem('S', newS)"
                                   :disabled="!(newS.xh != '' && newS.xm != '' && newS.xb != '' && newS.yxh != '') || loading">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="教师信息管理" name="teacher">
                <el-row type="flex" align="middle" style="margin-bottom: 1vh;">
                    <el-col :span="1"><i class="el-icon-search"></i></el-col>
                    <el-col :span="20">
                        <el-input v-model="searchtextT" placeholder="工号/姓名/学院/职称 关键字搜索" @input="changeT($event)" clearable
                                  style="margin-top:10px; margin-bottom: 10px;"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="addUser('T')">新增教师</el-button>
                        <el-dialog title="新增教师信息" :visible.sync="dialogNewTVisible" width="30%">
                            <el-form :model="newT" style="display: inline-block; margin: 0 auto;">
                                <el-form-item label="工号" :label-width="formLabelWidth" required>
                                    <el-input v-model="newT.gh" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名" :label-width="formLabelWidth" required>
                                    <el-input v-model="newT.xm" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" :label-width="formLabelWidth" required>
                                    <el-radio-group v-model="newT.xb">
                                        <el-radio label="男">男</el-radio>
                                        <el-radio label="女">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="学院" :label-width="formLabelWidth" required>
                                    <el-select v-model="newT.yxh" style="width: 100%;">
                                        <el-option v-for="item in allDept" :key="item.yxh" :label="item.mc" :value="item.yxh"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职称" :label-width="formLabelWidth" required>
                                    <el-input v-model="newT.zc" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="出生日期" :label-width="formLabelWidth">
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="newT.csrq" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogNewTVisible = false">取 消</el-button>
                                <el-button type="primary" @click="submitNew('T', newT)"
                                           :disabled="!(newT.gh != '' && newT.xm != '' && newT.xb != '' && newT.yxh != '' && newT.zc != '') || loading">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                </el-row>
                <el-table
                        v-loading="loading"
                        ref="filterTableT"
                        :data="(teacherData.filter(searchT)).slice((currentPageT - 1) * pageSizeT, currentPageT * pageSizeT)"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="gh"
                            label="工号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="xm"
                            label="姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="xb"
                            label="性别"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="zc"
                            label="职称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="csrq"
                            label="出生日期"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="mc"
                            label="学院"
                            :formatter="formatterT">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <el-button
                                    :disabled="!usertype"
                                    size="mini"
                                    @click="dialogModTVisible = true; newT = scope.row;">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    :disabled="!usertype"
                                    @click="handleDelete('T', scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <p>
                    <el-pagination
                            @size-change="handleSizeChangeT"
                            @current-change="handleCurrentChangeT"
                            :current-page="currentPageT"
                            :page-sizes="[5, 8, 10]"
                            :page-size="pageSizeT"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="(teacherData.filter(searchT)).length">
                    </el-pagination>
                </p>
                <el-dialog title="修改教师信息" :visible.sync="dialogModTVisible" width="30%">
                    <el-form :model="newT" style="display: inline-block; margin: 0 auto;">
                        <el-form-item label="工号" :label-width="formLabelWidth" required>
                            <el-input v-model="newT.gh" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" :label-width="formLabelWidth" required>
                            <el-input v-model="newT.xm" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth" required>
                            <el-radio-group v-model="newT.xb">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="学院" :label-width="formLabelWidth" required>
                            <el-select v-model="newT.yxh" style="width: 100%;">
                                <el-option v-for="item in allDept" :key="item.yxh" :label="item.mc" :value="item.yxh"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职称" :label-width="formLabelWidth" required>
                            <el-input v-model="newT.zc" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期" :label-width="formLabelWidth">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="newT.csrq" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogModTVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateItem('T', newT)"
                                   :disabled="!(newT.gh != '' && newT.xm != '' && newT.xb != '' && newT.yxh != '' && newT.zc != '') || loading">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="学院信息管理" name="department">
                <el-row type="flex" align="middle" style="margin-bottom: 1vh;">
                    <el-col :span="1"><i class="el-icon-search"></i></el-col>
                    <el-col :span="20">
                        <el-input v-model="searchtextD" placeholder="院系号/学院名称/地址/联系电话 关键字搜索" @input="changeD($event)" clearable
                                  style="margin-top:10px; margin-bottom: 10px;"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="addUser('D')">新增学院</el-button>
                        <el-dialog title="新增学院信息" :visible.sync="dialogNewDVisible" width="30%">
                            <el-form :model="newD" style="display: inline-block; margin: 0 auto;">
                                <el-form-item label="院系号" :label-width="formLabelWidth" required>
                                    <el-input v-model="newD.yxh" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="学院名称" :label-width="formLabelWidth" required>
                                    <el-input v-model="newD.mc" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="地址" :label-width="formLabelWidth" required>
                                    <el-input v-model="newD.dz" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话" :label-width="formLabelWidth" required>
                                    <el-input v-model="newD.lxdh" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogNewDVisible = false">取 消</el-button>
                                <el-button type="primary" @click="submitNew('D', newD)"
                                           :disabled="!(newD.yxh != '' && newD.mc != '' && newD.dz != '' && newD.lxdh != '') || loading">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                </el-row>
                <el-table
                        v-loading="loading"
                        ref="filterTableT"
                        :data="(allDept.filter(searchD)).slice((currentPageD - 1) * pageSizeD, currentPageD * pageSizeD)"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="yxh"
                            label="院系号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="mc"
                            label="学院名称"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="dz"
                            label="地址"
                            :formatter="formatterD">
                    </el-table-column>
                    <el-table-column
                            prop="lxdh"
                            label="联系电话"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <el-button
                                    :disabled="!usertype"
                                    size="mini"
                                    @click="dialogModDVisible = true; newD = scope.row;">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    :disabled="!usertype"
                                    @click="handleDelete('D', scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <p>
                    <el-pagination
                            @size-change="handleSizeChangeD"
                            @current-change="handleCurrentChangeD"
                            :current-page="currentPageD"
                            :page-sizes="[5, 8, 10]"
                            :page-size="pageSizeD"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="(allDept.filter(searchD)).length">
                    </el-pagination>
                </p>
                <el-dialog title="修改学院信息" :visible.sync="dialogModDVisible" width="40%">
                    <el-form :model="newD" style="display: inline-block; margin: 0 auto;">
                        <el-form-item label="院系号" :label-width="formLabelWidth" required>
                            <el-input v-model="newD.yxh" autocomplete="off" style="width: 15vw;" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="学院名称" :label-width="formLabelWidth" required>
                            <el-input v-model="newD.mc" autocomplete="off" style="width: 15vw;"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" :label-width="formLabelWidth" required>
                            <el-input v-model="newD.dz" autocomplete="off" style="width: 15vw;"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" :label-width="formLabelWidth" required>
                            <el-input v-model="newD.lxdh" autocomplete="off" style="width: 15vw;"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogModDVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateItem('D', newD)"
                                   :disabled="!(newD.yxh != '' && newD.mc != '' && newD.dz != '' && newD.lxdh != '') || loading">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "People",
        props: {
            userid: String,
            usertype: Boolean,
        },
        data() {
            return {
                tab: 'student',
                loading: true,

                studentData: [],
                totalS: 0,
                currentPageS: 1,
                pageSizeS: 8,
                searchtextS: '',
                firstS: 1,
                dialogNewSVisible: false,
                dialogModSVisible: false,
                newS: {
                    xh: '',
                    xm: '',
                    xb: '',
                    csrq: '',
                    jg: '',
                    sjhm: '',
                    yxh: ''
                },

                teacherData: [],
                totalT: 0,
                currentPageT: 1,
                pageSizeT: 8,
                searchtextT: '',
                firstT: 1,
                dialogNewTVisible: false,
                dialogModTVisible: false,
                newT: {
                    gh: '',
                    xm: '',
                    xb: '',
                    csrq: '',
                    zc: '',
                    yxh: ''
                },

                allDept: [],
                totalD: 0,
                currentPageD: 1,
                pageSizeD: 8,
                searchtextD: '',
                firstD: 1,
                dialogNewDVisible: false,
                dialogModDVisible: false,
                newD: {
                    yxh: '',
                    mc: '',
                    dz: '',
                    lxdh: ''
                },

                formLabelWidth: '80px',
            }
        },
        methods: {
            getALLDEPTMessage() {
                let that = this;
                const path = 'http://localhost:5000/alldept';
                axios.get(path)
                    .then((res) => {
                        that.allDept = res.data;
                        that.totalD = that.studentData.length;
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
            getSTUDENTMessage() {
                let that = this;
                const path = 'http://localhost:5000/student';
                axios.get(path)
                    .then((res) => {
                        that.studentData = res.data;
                        that.totalS = that.studentData.length;
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
            getTEACHERMessage() {
                let that = this;
                const path = 'http://localhost:5000/teacher';
                axios.get(path)
                    .then((res) => {
                        that.teacherData = res.data;
                        that.totalT = that.teacherData.length;
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
            changeS () {
                this.firstS = 0;
                this.$forceUpdate();
                if (this.searchtextS == '')
                    this.firstS = 1;
            },
            searchS(rowdata) {
                if (this.firstS == 1)
                    return rowdata;
                else
                if (rowdata.xm != null || rowdata == this.searchtextS)
                    if (rowdata.xm.includes(this.searchtextS))
                        return rowdata;
                if (rowdata.xh != null || rowdata == this.searchtextS)
                    if (rowdata.xh.includes(this.searchtextS))
                        return rowdata;
                if (rowdata.mc != null || rowdata == this.searchtextS)
                    if (rowdata.mc.includes(this.searchtextS))
                        return rowdata;
                if (rowdata.sjhm != null || rowdata == this.searchtextS)
                    if (rowdata.sjhm.includes(this.searchtextS))
                        return rowdata;
            },
            formatterS(row) {
                return row.mc;
            },
            handleSizeChangeS(pageSize) {
                this.pageSizeS = pageSize
            },
            handleCurrentChangeS(currentPage) {
                this.currentPageS = currentPage
            },
            changeT () {
                this.firstT = 0;
                this.$forceUpdate();
                if (this.searchtextT == '')
                    this.firstT = 1;
            },
            searchT(rowdata) {
                if (this.firstT == 1)
                    return rowdata;
                else
                if (rowdata.xm != null || rowdata == this.searchtextT)
                    if (rowdata.xm.includes(this.searchtextT))
                        return rowdata;
                if (rowdata.gh != null || rowdata == this.searchtextT)
                    if (rowdata.gh.includes(this.searchtextT))
                        return rowdata;
                if (rowdata.mc != null || rowdata == this.searchtextT)
                    if (rowdata.mc.includes(this.searchtextT))
                        return rowdata;
                if (rowdata.zc != null || rowdata == this.searchtextT)
                    if (rowdata.zc.includes(this.searchtextT))
                        return rowdata;
            },
            formatterT(row) {
                return row.mc;
            },
            handleSizeChangeT(pageSize) {
                this.pageSizeT = pageSize
            },
            handleCurrentChangeT(currentPage) {
                this.currentPageT = currentPage
            },
            changeD () {
                this.firstD = 0;
                this.$forceUpdate();
                if (this.searchtextD == '')
                    this.firstD = 1;
            },
            searchD(rowdata) {
                if (this.firstD == 1)
                    return rowdata;
                else
                if (rowdata.mc != null || rowdata == this.searchtextD)
                    if (rowdata.mc.includes(this.searchtextD))
                        return rowdata;
                if ((rowdata.yxh).toString() != null || rowdata == this.searchtextD)
                    if ((rowdata.yxh).toString().includes(this.searchtextD))
                        return rowdata;
                if (rowdata.dz != null || rowdata == this.searchtextD)
                    if (rowdata.dz.includes(this.searchtextD))
                        return rowdata;
                if (rowdata.lxdh != null || rowdata == this.searchtextD)
                    if (rowdata.lxdh.includes(this.searchtextD))
                        return rowdata;
            },
            formatterD(row) {
                return row.dz;
            },
            handleSizeChangeD(pageSize) {
                this.pageSizeD = pageSize
            },
            handleCurrentChangeD(currentPage) {
                this.currentPageD = currentPage
            },
            addUser(type) {
                let that = this;
                that.newS = { xh: '', xm: '', xb: '', csrq: '', jg: '', sjhm: '', yxh: '' };
                that.newT = { gh: '', xm: '', xb: '', csrq: '', zc: '', yxh: '' };
                that.newD = { yxh: '', mc: '', dz: '', lxdh: '' };
                if (type == 'T')
                    this.dialogNewTVisible = true;
                else if (type == 'S')
                    this.dialogNewSVisible = true;
                else if (type == 'D')
                    this.dialogNewDVisible = true;
                else
                    that.$message({
                        message: '未知错误',
                        type: 'error'
                    });
            },
            submitNew(type, item) {
                let that = this;
                if (type == 'T' || type == 'S' || type == 'D') {
                    console.log(item);
                    that.loading = true;
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/addNew/' + type,
                        data: item,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            that.loading = false;
                            that.newS = { xh: '', xm: '', xb: '', csrq: '', jg: '', sjhm: '', yxh: '' };
                            that.newT = { gh: '', xm: '', xb: '', csrq: '', zc: '', yxh: '' };
                            that.newD = { yxh: '', mc: '', dz: '', lxdh: '' };
                            that.getALLDEPTMessage();
                            that.getSTUDENTMessage();
                            that.getTEACHERMessage();
                        } else if (response.data == 'repeat') {
                            that.$message({
                                message: '不得重复添加',
                                type: 'error'
                            });
                            that.loading = false;
                            that.newS = { xh: '', xm: '', xb: '', csrq: '', jg: '', sjhm: '', yxh: '' };
                            that.newT = { gh: '', xm: '', xb: '', csrq: '', zc: '', yxh: '' };
                            that.newD = { yxh: '', mc: '', dz: '', lxdh: '' };
                            that.getALLDEPTMessage();
                            that.getSTUDENTMessage();
                            that.getTEACHERMessage();
                        } else {
                            that.loading = false;
                            that.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    that.$message({
                        message: '未知错误',
                        type: 'error'
                    });
                }
            },
            updateItem(type, item) {
                let that = this;
                if (type == 'T' || type == 'S' || type == 'D') {
                    console.log(item);
                    that.loading = true;
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/modItem/' + type,
                        data: item,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            that.loading = false;
                            that.dialogModTVisible = false;
                            that.dialogModSVisible = false;
                            that.dialogModDVisible = false;
                            that.getALLDEPTMessage();
                            that.getSTUDENTMessage();
                            that.getTEACHERMessage();
                        } else if (response.data == 'repeat') {
                            that.$message({
                                message: '该内容不存在',
                                type: 'error'
                            });
                            that.loading = false;
                            that.dialogModTVisible = false;
                            that.dialogModSVisible = false;
                            that.dialogModDVisible = false;
                            that.getALLDEPTMessage();
                            that.getSTUDENTMessage();
                            that.getTEACHERMessage();
                        } else {
                            that.loading = false;
                            that.dialogModTVisible = false;
                            that.dialogModSVisible = false;
                            that.dialogModDVisible = false;
                            that.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    that.$message({
                        message: '未知错误',
                        type: 'error'
                    });
                }
            },
            handleUpdate(type, row) {
                let that = this;
                if (type == 'T') {
                    console.log(row);
                } else if (type == 'S') {
                    console.log(row);
                } else if (type == 'D') {
                    console.log(row);
                } else {
                    that.$message({
                        message: '未知错误',
                        type: 'error'
                    });
                }
            },
            handleDelete(type, row) {
                let that = this;
                if (type == 'T' || type == 'S' || type == 'D') {
                    console.log(row);
                    that.loading = true;
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/delItem/' + type,
                        data: row,
                    }).then((response) => {
                        console.log(response)
                        if (response.data == 'success') {
                            that.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            that.loading = false;
                            that.getALLDEPTMessage();
                            that.getSTUDENTMessage();
                            that.getTEACHERMessage();
                        } else {
                            that.loading = false;
                            that.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    that.$message({
                        message: '未知错误',
                        type: 'error'
                    });
                }
            }
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
                this.getSTUDENTMessage();
                this.getTEACHERMessage();
                this.getALLDEPTMessage();
            }
        },
    }
</script>

<style scoped>
    .el-form-item {
        width: 20vw;
        padding: 0.5vh;
    }
</style>