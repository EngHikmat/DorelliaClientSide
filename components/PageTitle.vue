<template>
  <div class="page-title d-flex justify-content-center align-items-center">
    <div class="left-line"></div>
    <h1>{{ page_title }}</h1>
    <div class="right-line"></div>
  </div>
</template>

<script>
export default {
  props: ["page_title"],
};
</script>

<style lang="scss">
.page-title {
  margin: 20px 0;
  text-align: center;
  gap: 20px;
  h1 {
    margin: auto;
    font-size: 3.22em;
  }
}
</style>
