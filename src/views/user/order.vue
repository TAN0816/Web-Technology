<script setup>
import UserHeaderVue from "@/components/userHeader.vue";
</script>

<template>
    <UserHeaderVue>
        <section class="order-details">
            <h1 class="title">Your Order Details</h1>
            <div class="order-details-content" v-if="orders.length > 0">
                <div class="od" v-for="order in orders" :key="order.order_ID">
                    <div class="orderDetail">
                        Order ID: {{ order.order_ID }}<br>
                        Order Date: {{ order.cdate }}<br>
                        Order Status: {{ order.order_status }}<br>
                    </div>
                    <table class="orderTable" border="1" cellspacing="0">
                        <th>No</th>
                        <th width="50%">Item</th>
                        <th width="10%">Quantity</th>
                        <th width="10%">Unit Price</th>
                        <th width="20%">Amount</th>
                        <tr v-for="item in order.items" :key="item.FoodID">
                            <td>{{ item.num }}</td>
                            <td>{{ item.FoodName }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.FoodPrice }}</td>
                            <td>{{ item.price }}</td>
                        </tr>
                        <tr>
                            <th colspan="4">Total Price:</th>
                            <td>{{ order.totalPrice }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div v-else>
                No order yet
            </div>
        </section>
    </UserHeaderVue>

</template>

<script>
export default {
    data() {
        return {
            orders: [
                // Example order data
                {
                    order_ID: 12345,
                    cdate: "2024-06-05",
                    order_status: "Pending",
                    items: [
                        { num: 1, FoodName: "Pizza Margherita", quantity: 1, FoodPrice: 10.00, price: 10.00 },
                        { num: 2, FoodName: "Chicken Alfredo", quantity: 2, FoodPrice: 8.50, price: 17.00 },
                    ],
                    totalPrice: 27.00,
                },
                
            ],
        };
    },
};
</script>

<style scoped>
.order-details{
  background-color: white;
  margin: 120px 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
}

.order-details-content{
  margin: 20px 100px;
}

.od{
  margin-bottom: 20px;
  background-color: rgb(255 225 180);
  border: 2px solid rgb(249, 221, 177);
  padding: 20px 40px;
  border-radius: 30px;
}

.orderTable{
  width: 100%;
  margin: auto;
  text-align: center;
}

.orderDetail{
  text-align: left;
  margin:  0 0 10px 0;
}

.osummary{
  text-align: right;
}
</style>
