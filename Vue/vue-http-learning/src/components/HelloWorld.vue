<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
var _self;

export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    getData() {
      this.$axios
        .get("/hello")
        .then((response) => {
          this.msg = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    _self = this;
  },
  mounted() {
    _self.getData();
  },
};
</script>

<style>
</style>
