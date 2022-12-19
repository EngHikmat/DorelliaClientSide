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
      <span class="dot" v-if="authenticated"><i class="bi bi-dot"></i></span>
      <nuxt-link
        to="/yourorder"
        exact-active-class="active"
        v-if="authenticated"
        >Your Order <i class="bi bi-bag"></i> ({{ cartCount }})</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false,
      userId: "",
      cartCount: 0,
    };
  },
  beforeMount() {
    this.authenticated = localStorage.getItem("jwt") ? true : false;
  },
  mounted() {
    if (this.authenticated) {
      this.userId = localStorage.getItem("userId");
      this.getCartCount();
    }
  },
  methods: {
    async getCartCount() {
      let token = localStorage.getItem("jwt");
      try {
        const qs = require("qs");
        const query = qs.stringify(
          {
            filters: {
              users_permissions_user: {
                id: {
                  $eq: this.userId,
                },
              },
            },
            pagination: {
              page: 1,
              pageSize: 5,
            },
            populate: ["image"],
          },
          {
            encodeValuesOnly: true,
          }
        );
        const items = await this.$axios.get(`/cart-items?${query}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        this.cartCount = items.data.meta.pagination.total;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
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
