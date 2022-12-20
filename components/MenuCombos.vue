<template>
  <div class="menu-combos">
    <div v-for="(item, index) in menu_combos.data" :key="index" class="box">
      <div class="preview">
        <div
          class="title"
          :style="'background-color:#' + item.attributes.Color"
        >
          <h1>{{ item.attributes.Title }}</h1>
        </div>
        <img
          :src="`${url}${item.attributes.Image.data.attributes.formats.medium.url}`"
          alt=""
        />
      </div>
      <div class="content">
        <div class="description">{{ item.attributes.Description }}</div>
        <div class="price">${{ item.attributes.Price }}</div>
      </div>
      <button class="btn btn-secondary" @click="addToCart(item)">
        <i class="bi bi-bag-plus-fill me-1"></i> <span>Add to Cart</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menu_combos"],
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
  computed: {
    url() {
      return this.$axios.defaults.baseURL
        ? this.$axios.defaults.baseURL.split("/api")[0]
        : "https://dorelliabackendapi-production-285d.up.railway.app";
    },
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
};
</script>

<style lang="scss">
.menu-combos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  justify-content: center;
  align-items: center;
  .preview {
    position: relative;

    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: fit-content;
      padding: 25px;
      width: 250px;
      text-align: center;
      h1 {
        font-size: 27px;
        color: white;
      }
    }
    &::after {
      content: "";
      position: absolute;
      border: 1px solid white;
      width: 300px;
      height: 140px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .content {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 10px 0;
    .price {
      font-weight: bold;
    }
    .description {
      font-size: 15px;
    }
  }
  button {
    font-size: 15px;
  }
}
img {
  max-width: 100%;
}
</style>
