<script setup lang="ts"></script>

<template>
  <div class="box">
    <el-result title="404" subTitle="抱歉，请求错误">
      <template v-slot:icon>
        <img src="../../assets/images/error_images/hamburger.png" />
      </template>
      <template v-slot:extra>
        <el-button type="primary" @click="() => $router.push('/home')"
          >返回</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
