<template>
  <div class="container">
    <client-only>
      <div class="p-3">
        <notifications position="bottom left" />
        <Auth :key="componentKey" @forceRerender="forceRerender" />
        <Logo />
        <TopMenu :key="componentKey + 1" />
        <NuxtChild :key="componentKey + 2" @forceRerender="forceRerender" />
        <Footer />
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  layouts: "homepage",
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
