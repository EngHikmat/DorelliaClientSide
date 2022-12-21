<template>
  <div class="auth">
    <nuxt-link to="/auth/login" v-if="!authenticated">Login</nuxt-link>
    <nuxt-link to="/auth/signup" v-if="!authenticated">Sign Up</nuxt-link>
    <div class="text" v-if="authenticated">
      Hi, <b>{{ username }}</b>
    </div>
    <div class="logout" v-if="authenticated" @click="logout()">Logout</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false,
      username: "",
      componentKey: 0,
    };
  },
  beforeMount() {
    this.authenticated = localStorage.getItem("jwt") ? true : false;
    this.username = localStorage.getItem("userName");
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
      this.$emit("forceRerender");
    },
  },
};
</script>

<style lang="scss">
.auth {
  position: absolute;
  right: 0;
  z-index: 5;
  @media (max-width: 761px) {
    position: relative;
    text-align: center;
    background-color: $secondary;
  }
  a {
    font-size: 15px;
    color: #555;
    text-decoration: none;
    &:first-child::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 60%;
      top: 50%;
      background-color: #555;
      transform: translateX(5px) translateY(-50%);
    }
  }
  div {
    font-size: 15px;
    color: #555;
    text-decoration: none;
    &:first-child::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 60%;
      top: 50%;
      background-color: #555;
      transform: translateX(5px) translateY(-50%);
    }
  }
  display: flex;
  justify-content: center;
  gap: 10px;

  .logout {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: $primary;
    }
  }
}
</style>
