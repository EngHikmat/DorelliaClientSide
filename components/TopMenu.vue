<template>
  <div class="top-menu">
    <div
      class="d-flex flex-sm-row flex-column justify-content-center align-items-center"
    >
      <nuxt-link to="/" exact-active-class="active">Starters</nuxt-link>
      <span class="dot"><i class="bi bi-dot"></i></span>
      <nuxt-link to="/lunch" exact-active-class="active">Lunch</nuxt-link>
      <span class="dot"><i class="bi bi-dot"></i></span>
      <nuxt-link to="/desserts" exact-active-class="active">Desserts</nuxt-link>
      <span class="dot"><i class="bi bi-dot"></i></span>
      <nuxt-link to="/yourorder" exact-active-class="active"
        >Your Order <i class="bi bi-bag"></i> (0)</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.top-menu div {
  //   display: flex;
  //   justify-content: center;

  gap: 5px;
  a {
    text-decoration: none;
    position: relative;
    color: $gray-700;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 300;
    transition: all 0.5s;
    &::before,
    &::after {
      content: "";
      position: absolute;
      background-color: $primary;
      height: 1px;
      opacity: 0;
      transition: all 0.5s;
    }

    &::before {
      left: 0;
      bottom: 0;
      width: 100%;
    }
    &::after {
      width: 50%;
      left: 50%;
      transform: translateX(-50%);
      bottom: -4px;
    }
    &:hover::before,
    &:hover::after {
      opacity: 1;
    }
    &.active::before,
    &.active::after {
      opacity: 1;
    }
  }
}
</style>
