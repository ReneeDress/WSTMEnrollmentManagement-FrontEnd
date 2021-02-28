<template>
    <div id="gradeedit">

    </div>
</template>

<script>
    export default {
        name: "GradeEdit",
        props: {
            userid: String,
            usertype: Boolean,
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
            }
        },
    }
</script>

<style scoped>

</style>