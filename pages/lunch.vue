<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <PageTitle page_title="Lunch" />
        <MenuCombos :menu_combos="menu" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "homepage",
  name: "lunch",
  data() {
    return {
      menu: [],
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    async getMenu() {
      try {
        const qs = require("qs");
        const query = qs.stringify(
          {
            filters: {
              ComboType: {
                $eq: "lunch",
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
  },
};
</script>
