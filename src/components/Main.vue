<template>
  <div class="main" style="width: 100%;">
    <el-card shadow="always" style="width: 97%;">
      <el-row style="margin-top: -2.2vh; margin-bottom: -3vh;">
        <h2>功能说明</h2>
      </el-row>
      <el-row style="margin-bottom: 0.5vh;">
        <el-col :span="8" align="center">
          <h3>选课管理</h3>
          <h4>学生选课（仅学生）</h4>
          <div style="text-align: left;">- 指定学期学生选课、退课功能；<br>- 显示指定学期课表功能。</div>
          <h4>课程一览</h4>
          <div style="text-align: left;">- 查看所有课程信息；<br> - 教师/管理员用户新增或删除课程信息。</div>
          <h4>开课管理（仅教师/管理员）</h4>
          <div style="text-align: left;">- 查看所有开课信息；<br>- 新增或删除开课信息。</div>
          <h4>选课情况（仅教师/管理员）</h4>
          <div style="text-align: left;">- 查看所有开课信息（含选课人数）；<br>- 详情页面编辑具体选课情况。</div>
        </el-col>
        <el-col :span="8">
          <h3>成绩管理</h3>
          <h4>成绩查询（仅学生）</h4>
          <div style="text-align: left;">- 指定学期学生成绩查询功能；<br>- 显示该学期总学分、平均成绩及绩点。</div>
          <h4>成绩大表（仅学生）</h4>
          <div style="text-align: left;">- 学生所有成绩查询功能；<br>- 显示总获得学分、平均成绩及平均绩点；<br>- 获得学分、平均成绩及平均绩点学期变化。</div>
          <h4>成绩录入（仅教师/管理员）</h4>
          <div style="text-align: left;">- 查看所有开课信息（含选课人数）；<br>- 详情页面编辑学生平时、考试成绩及占比；<br>- 查看指定课程成绩分析。</div>
        </el-col>
        <el-col :span="8">
          <h3>人员管理</h3>
          <h4>学生信息管理（仅教师/管理员）</h4>
          <div style="text-align: left;">- 查看所有学生信息（不含密码）；<br>- 新增或编辑学生信息；<br>- 管理员用户删除学生信息。</div>
          <h4>教师信息管理（仅教师/管理员）</h4>
          <div style="text-align: left;">- 查看所有教师信息（不含密码）；<br>- 新增或编辑学生信息，<br>- 管理员用户可以删除教师信息。</div>
          <h4>院系信息管理（仅教师/管理员）</h4>
          <div style="text-align: left;">- 查看所有教师信息（不含密码）；<br>- 管理员用户新增或编辑或删除院系信息。</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    userid: String,
    usertype: Boolean,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
