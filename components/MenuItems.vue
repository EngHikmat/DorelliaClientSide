<template>
  <div class="menu-items">
    <div v-for="(item, index) in menu_items.data" :key="index" class="box">
      <img
        :src="`${url}${item.attributes.Image.data.attributes.formats.medium.url}`"
        alt=""
      />

      <div class="content">
        <div class="header">
          <div class="title">
            {{ item.attributes.Title }}
          </div>

          <div class="price">${{ item.attributes.Price }}</div>
        </div>

        <div class="description">{{ item.attributes.Description }}</div>
        <button class="btn btn-secondary" @click="addToCart(item)">
          <i class="bi bi-bag-plus-fill me-1"></i> <span>Add to Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menu_items"],
  data() {
    return {
      data: {
        name: "",
        description: "",
        price: null,
        image: "",
      },
      token: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("jwt");
  },
  methods: {
    async addToCart(item) {
      if (this.token) {
        this.data.name = item.attributes.Title;
        this.data.description = item.attributes.Description;
        this.data.price = item.attributes.Price;
        this.data.image = item.attributes.Image.data.id;
        try {
          const response = await this.$axios.post(
            "/cart-items",
            { data: this.data },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          this.$emit("forceRerender");
          this.$notify({
            type: "success",
            title: "Add to cart",
            text: "This item has <b> Successfully </b> added.",
            duration: 5000,
            speed: 1000,
            data: {},
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$router.push("/auth/login");
      }
    },
  },
  computed: {
    url() {
      return this.$axios.defaults.baseURL
        ? this.$axios.defaults.baseURL.split("/api")[0]
        : "https://dorelliabackendapi-production-285d.up.railway.app";
    },
  },
};
</script>

<style lang="scss">
.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-content: center;
  gap: 30px;
  padding: 55px 0;
  .box {
    display: flex;
    gap: 15px;
    @media (max-width: 767px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
    }
    img {
      max-width: 100%;
      height: 100px;
      @media (max-width: 767px) {
        height: 200px;
        border-radius: 15px;
      }
    }
    .content {
      .header {
        display: flex;
        justify-content: space-between;
        @media (max-width: 767px) {
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          text-transform: uppercase;
          font-weight: bold;
          color: $primary;
          font-size: 18px;
        }
        .price {
          font-size: 15px;
          font-weight: bold;
        }
      }
      .description {
        font-size: 15px;
        margin: 10px 0;
        @media (max-width: 767px) {
          margin: 2px auto;
          width: 90%;
          text-align: center;
        }
      }
      button {
        @media (max-width: 767px) {
          margin: auto;
        }
      }
    }
  }
}
</style>
