<template>
  <div>
    <b-table
      stacked="sm"
      :items="items"
      :fields="fields"
      :busy="isBusy"
      show-empty
    >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      </template>
      <template #empty>
        <div class="text-center p-5 text-dark" style="font-size: 12px">
          There is no Records yet ...
        </div>
      </template>
      <template #cell(actions)="row">
        <div
          class="icon-container"
          v-if="row.item.status !== 'Delivered'"
          @click="$emit('removeItem', row.item.id)"
        >
          <i class="bi bi-trash-fill"></i>
        </div>
      </template>
      <template #cell(image)="row">
        <div v-if="row.item.image">
          <div class="image">
            <img
              :src="`${url}${row.item.image.data.attributes.formats.large.url}`"
              alt=""
            />
          </div>
          <div class="hover-image">
            <img
              :src="`${url}${row.item.image.data.attributes.formats.large.url}`"
              alt=""
            />
          </div>
        </div>
      </template>
      <template #cell(price)="row">
        <div>{{ row.item.price }}<b class="text-primary">$</b></div>
      </template>
      <template #cell(status)="row">
        <div>
          <span
            :class="`badge rounded-pill ${
              row.item.status == 'Created'
                ? 'bg-dark'
                : row.item.status == 'Processing'
                ? 'bg-warning'
                : row.item.status == 'Delivered'
                ? 'bg-success'
                : 'bg-danger'
            } `"
          >
            {{ row.item.status }}
          </span>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["items", "fields", "isBusy"],
  computed: {
    url() {
      return this.$axios.defaults.baseURL
        ? this.$axios.defaults.baseURL.split("/api")[0]
        : "https://dorelliabackendapi-production-285d.up.railway.app";
    },
  },
};
</script>

<style lang="scss" scoped></style>
