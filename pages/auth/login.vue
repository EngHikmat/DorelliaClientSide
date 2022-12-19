<template>
  <div class="row">
    <div class="col-sm-12">
      <LoginForm :email.sync="email" :password.sync="password" @login="login" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post(
          "/auth/local",
          {
            identifier: this.email,
            password: this.password,
          },
          {
            /*headers: {
              Authorization: `Bearer ${token}`,
              "Agent": 'WEB'
            }*/
          }
        );
        //console.log(response.status);
        if (response.status === 200) {
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("userId", response.data.user.id);
          localStorage.setItem("userName", response.data.user.username);
          this.$router.push("/");
        } else {
          console.log("errr");
        }
        //console.log(response);
        /* if (!response.error) {
          console.log(response);
        } else {
          console.log(response.error.message);
        }*/
      } catch (err) {
        console.log("err");
      }
    },
  },
};
</script>

<style lang="scss"></style>
