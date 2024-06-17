<template>
  <div class="order-details-container">
    <div class="order-details">
      <h1 class="title">Your Order Details</h1>

      <!-- Tabs for switching between completed and current orders -->
      <div class="order-tabs">
        <button
          :class="{ active: currentTab === 'current' }"
          @click="currentTab = 'current'"
        >
          Current Orders
        </button>
        <button
          :class="{ active: currentTab === 'completed' }"
          @click="currentTab = 'completed'"
        >
          Completed Orders
        </button>
      </div>

      <!-- Display current or completed orders based on the selected tab -->
      <div class="order-details-content" v-show="currentTab === 'current'">
        <table class="order-table" v-show="filteredCurrentOrders.length > 0">
          <thead>
            <tr>
              <th>Order</th>
              <th>Status</th>
              <th>Date</th>
              <th>Address</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredCurrentOrders" :key="order.order_ID">
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
                  @click="toggleDropdown(order)"
                ></i>
              </td>
            </tr>
            <tr
              v-show="order.showDropdown"
              v-for="order in orders"
              :key="order.order_ID + '-details'"
            >
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
          </tbody>
        </table>
        <div v-show="filteredCurrentOrders.length === 0">
          No current orders yet
        </div>
      </div>

      <div class="order-details-content" v-show="currentTab === 'completed'">
        <table class="order-table" v-show="filteredCompletedOrders.length > 0">
          <thead>
            <tr>
              <th>Order</th>
              <th>Status</th>
              <th>Date</th>
              <th>Address</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredCompletedOrders" :key="order.order_ID">
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
                  @click="toggleDropdown(order)"
                ></i>
              </td>
            </tr>
            <tr
              v-show="order.showDropdown"
              v-for="order in filteredCompletedOrders"
              :key="order.order_ID + '-details'"
            >
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
          </tbody>
        </table>
        <div v-show="filteredCompletedOrders.length === 0">
          No completed orders yet
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "@fortawesome/fontawesome-free/css/all.css";

export default {
  data() {
    return {
      currentTab: "current",
      orders: [],
    };
  },
  computed: {
    filteredCurrentOrders() {
      return this.orders.filter((order) => order.order_status !== "Delivered");
    },
    filteredCompletedOrders() {
      return this.orders.filter((order) => order.order_status === "Delivered");
    },
  },
  methods: {
    toggleDropdown(order) {
      order.showDropdown = !order.showDropdown;
    },
    fetchOrders() {
      const userId = localStorage.getItem('userid');
      fetch(`http://localhost:8080/orders/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          this.orders = data.map((order) => ({
            ...order,
            showDropdown: false,
          }));
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    },
    calculateTotal(items) {
      let total = 0;
      items.forEach((item) => {
        total += parseFloat(item.price);
      });
      return total.toFixed(2);
    },
    resetCompletedOrderDropdowns() {
      this.filteredCompletedOrders.forEach((order) => {
        order.showDropdown = false;
      });
    },
    getStatusColor(status) {
      if (status === "Delivered") {
        return "#28a745"; // Color for Delivered status
      } else {
        return "#ffc107"; // Color for other statuses
      }
    },
  },
  mounted() {
    this.fetchOrders();
  },
  watch: {
    currentTab(newTab, oldTab) {
      if (newTab !== oldTab && newTab === "current") {
        this.resetCompletedOrderDropdowns();
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
