<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <PageTitle page_title="Deserts" />
        <MenuCombos
          :menu_combos="menu"
          @forceRerender="$emit('forceRerender')"
        />
        <div class="col-12">
          <MenuItems
            :menu_items="menuItems"
            @forceRerender="$emit('forceRerender')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "homepage",
  name: "deserts",
  data() {
    return {
      menu: [],
      menuItems: [],
    };
  },
  created() {
    this.getMenu();
    this.getMenuItems();
  },
  methods: {
    async getMenu() {
      try {
        const qs = require("qs");
        const query = qs.stringify(
          {
            filters: {
              ComboType: {
                $eq: "dessert",
              },
            },
          },
          {
            encodeValuesOnly: true,
          }
        );
        const items = await this.$axios.get(`/menu-compos?populate=*&${query}`);
        this.menu = items.data;
        // console.log(this.menu);
      } catch (e) {
        console.log(e);
      }
    },
    async getMenuItems() {
      try {
        const qs = require("qs");
        const query = qs.stringify(
          {
            filters: {
              ComboType: {
                $eq: "dessert",
              },
            },
          },
          {
            encodeValuesOnly: true,
          }
        );
        const items = await this.$axios.get(`/menu-items?populate=*&${query}`);
        this.menuItems = items.data;
        // console.log(this.menuItems);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
