<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <PageTitle page_title="Your Order" />
        <Table
          :items.sync="items"
          :fields.sync="fields"
          @removeItem="removeItem"
        />
      </div>
      <div class="col-12">
        <nav class="page-navigation">
          <ul class="pagination pagination-sm justify-content-center">
            <li class="page-item" @click="getCartOrders(false, 'prev')">
              <a class="page-link">&laquo;</a>
            </li>
            <li
              class="page-item"
              v-for="(pageTrig, index) in pages"
              :key="index"
              @click="getCartOrders(pageTrig)"
            >
              <a :class="`page-link ${page === pageTrig ? 'active' : null}`">{{
                pageTrig
              }}</a>
            </li>
            <li class="page-item" @click="getCartOrders(false, 'next')">
              <a class="page-link">&raquo;</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  layout: "homepage",
  name: "yourorder",
  data() {
    return {
      userId: "",
      page: null,
      pageCount: null,
      pages: [],
      fields: [
        {
          key: "name",
          label: "Name",
          thClass: "headborder",
          class: "tableborder",
          sortable: false,
        },
        {
          key: "description",
          label: "Description",
          thClass: "headborder",
          class: "tableborder",
        },
        {
          key: "status",
          label: "Status",
          thClass: "headborder",
          class: "tableborder",
        },
        {
          key: "image",
          label: "Image",
          thClass: "headborder",
          class: "tableborder",
        },
        {
          key: "price",
          label: "Price",
          thClass: "headborder",
          class: "tableborder",
        },
        {
          key: "actions",
          label: "Actions",
          thClass: "headborder",
          class: "tableborder",
          sortable: false,
        },
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
  beforeMount() {
    this.userId = localStorage.getItem("userId");
  },
  mounted() {
    this.getCartOrders();
  },
  methods: {
    async removeItem(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",

        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          let token = localStorage.getItem("jwt");
          const response = await this.$axios.delete(`/cart-items/${id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          //console.log(response);
          this.$emit("forceRerender");
          Swal.fire("Deleted!", "The section has been deleted.", "success");
        }
      });
    },
    async getCartOrders(p, to) {
      to === "prev"
        ? (p = this.page - 1)
        : to === "next"
        ? this.page + 1 <= this.pageCount
          ? (p = this.page + 1)
          : (p = this.page)
        : null;
      p ? (this.page = p) : null;
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
              /* status: {
                $eq: "Created",
              },*/
            },
            sort: ["id:desc"],
            pagination: {
              page: p ? p : 1,
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
        this.items = items.data.data.map((item) => {
          return {
            name: item.attributes.name,
            description: item.attributes.description,
            price: item.attributes.price,
            status: item.attributes.status,
            image: item.attributes.image,
            id: item.id,
          };
        });
        if (this.page == null) {
          let pagination = items.data.meta.pagination;
          this.page = pagination.page;
          this.pageCount = pagination.pageCount;

          for (var i = this.page; i <= this.pageCount; i++) {
            this.pages.push(i);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
a {
  cursor: pointer !important;
}
</style>
