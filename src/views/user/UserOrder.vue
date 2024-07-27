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
        <table class="order-table" v-if="filteredCurrentOrders.length > 0">
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
            <OrderRow
              v-for="order in filteredCurrentOrders"
              :key="order.order_ID"
              :order="order"
              @toggle-dropdown="toggleDropdown"
            />
          </tbody>
        </table>
        <div v-show="filteredCurrentOrders.length === 0">
          No current orders yet
        </div>
      </div>

      <div class="order-details-content" v-show="currentTab === 'completed'">
        <table class="order-table" v-if="filteredCompletedOrders.length > 0">
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
            <OrderRow
              v-for="order in filteredCompletedOrders"
              :key="order.order_ID"
              :order="order"
              @toggle-dropdown="toggleDropdown"
            />
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
import OrderRow from './OrderRow.vue';
import { jwtDecode } from 'jwt-decode';

export default {
  components: {
    OrderRow,
  },
  data() {
    return {
      currentTab: 'current',
      orders: [],
    };
  },
  computed: {
    filteredCurrentOrders() {
      return this.orders.filter(order => order.order_status !== 'Delivered');
    },
    filteredCompletedOrders() {
      return this.orders.filter(order => order.order_status === 'Delivered');
    },
  },
  methods: {
    toggleDropdown(order) {
      order.showDropdown = !order.showDropdown;
      if (this.currentTab === 'completed') {
        this.resetCompletedOrderDropdowns();
      }
    },
    fetchOrders() {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.data.userId;

        fetch(`http://localhost:8080/orders/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.success === false) {
              console.error('Failed to fetch orders:', data.message);
            } else {
              this.orders = data;
            }
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    },
    resetCompletedOrderDropdowns() {
      this.filteredCompletedOrders.forEach(order => {
        order.showDropdown = false;
      });
    },
  },
  mounted() {
    this.fetchOrders();
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
