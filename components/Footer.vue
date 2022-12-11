<template>
  <footer class="footer text-center">
    <div class="d-flex align-items-center justify-content-center">
      <div class="left-line"></div>
      <Logo />
      <div class="right-line"></div>
    </div>

    <div
      class="d-flex flex-sm-row flex-column justify-content-center align-items-lg-center"
    >
      <span>Copyright &copy; 2022 Dorellia</span>
      <nuxt-link to="/">Privacy Policy</nuxt-link>
      <span class="dot"><i class="bi bi-dot"></i></span>
      <nuxt-link to="/">Terms of Use</nuxt-link>
      <span class="dot"><i class="bi bi-dot"></i></span>
      <nuxt-link to="/">Contact</nuxt-link>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
  div:first-child {
    gap: 20px;
    .logo {
      img {
        width: 80px;
        margin: 15px 0;
      }
    }
  }
  div {
    font-size: 15px;
    span:first-child {
      margin-right: 10px;
    }
    @media (max-width: 767px) {
      span:first-child {
        margin-bottom: 10px;
      }
    }
  }
  gap: 5px;
  a {
    text-decoration: none;
    position: relative;
    color: $gray-700;
    transition: all 0.5s;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 0%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: $primary;
      transition: all 0.5s;
    }
    &:hover::before {
      width: 100%;
    }
  }
}
</style>
