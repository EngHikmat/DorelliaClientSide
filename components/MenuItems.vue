<template>
  <div class="menu-items">
    <div v-for="(item, index) in menu_items.data" :key="index" class="box">
      <img
        :src="`http://localhost:1337${item.attributes.Image.data.attributes.formats.medium.url}`"
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
        <button class="btn btn-secondary">
          <i class="bi bi-bag-plus-fill me-1"></i> <span>Add to Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menu_items"],
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
    img {
      max-width: 100%;
      height: 100px;
    }
    .content {
      .header {
        display: flex;
        justify-content: space-between;
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
      }
    }
  }
}
</style>
