<template>
  <div>
    <p :style="[obj1, obj2]">数组语法</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
        obj1 : {fontSize: "50px"},
        obj2 : {color: "red"}
    };
  }
};
</script>

<style>
</style>
