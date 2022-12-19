<template>
  <div class="login-container">
    <div class="control">
      <div class="label">Email</div>
      <input type="email" name="email" @input="setEmail" required />
    </div>
    <div class="control">
      <div class="label">Password</div>
      <input type="password" name="password" @input="setPassword" required />
    </div>
    <div class="button-container" @click="$emit('login')">
      <div class="button">Login</div>
    </div>
    <nuxt-link to="/auth/signup">Dont have Account?</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    email: String,
    password: String,
  },
  data() {
    return {};
  },
  methods: {
    setEmail(e) {
      this.$emit("update:email", e.target.value);
    },
    setPassword(e) {
      this.$emit("update:password", e.target.value);
    },
  },
};
</script>

<style lang="scss">
.login-container {
  width: 50%;
  @media (max-width: 761px) {
    width: 100%;
  }
  margin: auto;
  padding-top: 50px;
  padding-bottom: 50px;
  .control {
    margin-bottom: 20px;
    .label {
      font-size: 15px;
    }
    input {
      padding: 14px;
      background-color: #f4f4f4;
      border: none;
      border-radius: 10px;
    }
  }
  .button-container {
    width: 100%;
    .button {
      @media (max-width: 761px) {
        width: 100%;
      }
      width: 100px;
      text-align: center;
      margin: auto;
      background-color: $primary;
      padding: 8px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: $secondary;
      }
    }
  }
  a {
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    margin-top: 15px;
    display: block;
  }
}
input {
  width: 100%;
}
input:focus {
  border: none;
  outline: none;
}
</style>
