<template>
  <tr>
    <td>Order #{{ order.order_ID }}</td>
    <td :style="{ color: getStatusColor(order.order_status) }">
      <div class="button-like">{{ order.order_status }}</div>
    </td>
    <td>{{ order.cdate }}</td>
    <td>{{ order.address }}</td>
    <td>{{ "RM" + calculateTotal(order.items) }}</td>
    <td>
      {{
        order.payment_method.charAt(0).toUpperCase() +
        order.payment_method.slice(1)
      }}
    </td>
    <td>
      <i
        class="fas"
        :class="{
          'fa-chevron-down': !order.showDropdown,
          'fa-chevron-up': order.showDropdown,
        }"
        @click="toggleDropdown"
      ></i>
    </td>
  </tr>
  <tr v-if="order.showDropdown">
    <td colspan="7">
      <div class="order-details-dropdown">
        <div class="order-menu">
          <h5>Order Menu</h5>
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item.FoodID">
                <td>{{ item.FoodName }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ "RM" + item.FoodPrice }}</td>
                <td>{{ "RM" + item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="order-info">
          <div>
            <strong>Total: {{ "RM" + calculateTotal(order.items) }}</strong>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    order: Object,
  },
  methods: {
    toggleDropdown() {
      this.$emit('toggle-dropdown', this.order);
    },
    calculateTotal(items) {
      let total = 0;
      items.forEach((item) => {
        total += parseFloat(item.price);
      });
      return total.toFixed(2);
    },
    getStatusColor(status) {
      if (status === "Delivered") {
        return "#28a745"; // Color for Delivered status
      } else {
        return "#ffc107"; // Color for other statuses
      }
    },
  },
};
</script>

<style scoped>
.order-details-container {
  margin-top: 100px;
}
.order-details {
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.order-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.order-tabs button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.order-tabs button.active {
  border-bottom: 2px solid blue;
}

.order-details-content {
  max-width: 1100px;
  margin: 0 auto;
}

.order-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  border-radius: 20px;
  overflow: hidden;
}

.order-table th,
.order-table td {
  padding: 16px 20px;
  /* text-align: left; */
  border-bottom: 1px solid #ddd;
}

.order-table th {
  background-color: antiquewhite;
}

.order-table td.status {
  padding: 0;
}

.order-table tr:not(:last-child):hover {
  background-color: #eeeeed;
  transition: background-color 0.3s ease;
}

.order-table td i.fa-chevron-down {
  color: black; /* Color for the down arrow */
}

.order-table td i.fa-chevron-up {
  color: blue; /* Color for the up arrow */
}

.order-details-dropdown {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px; /* Rounded corners */
}

.order-menu table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}
.order-menu th,
.order-menu td {
  padding: 5px;
  text-align: left;
  /* border: none; */
}
.order-menu th {
  background-color: rgb(239, 239, 240);
  color: #333;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.order-menu h5 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
  text-transform: uppercase;
}

.order-info strong {
  font-weight: bold;
  color: #3b3b3b;
}
.order-info {
  text-align: right;
  padding-right: 115px;
}
.order-info div {
  margin-top: 5px;
}
</style>

