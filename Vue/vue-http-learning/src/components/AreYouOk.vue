<template>
  <div>
    <input type="button" value="Are you Ok?" @click="senData" />
    <h1>我的回答: {{msg}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    senData() {
      this.$axios
        .post("/areYouOk", {
          firstName: "陈",
          lastName: "康",
        })
        .then((response) => { //不要用 function(response){} ，这种方式不行
          console.log(response);
          this.msg = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
