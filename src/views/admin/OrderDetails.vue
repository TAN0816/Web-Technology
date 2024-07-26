<template>
    <div class="orderDetailsContainer">
        <div class="orderDetailsTitle">
            <router-link to="/admin/orderManage"><i class="bi bi-chevron-left"></i></router-link>
            <h1>Order Details</h1>
        </div>
        <div class="updateOption">
            <a class='btn btn-outline-success' :href="`/admin/orderDetail?orderId=${orderId}&edit=true`"
                v-if="!editMode">Edit Order</a>
        </div>

        <div class="orderContent">
            <form @submit.prevent="updateOrder" class="updateForm text-start">
                <div class="mb-3">
                    <label for="orderStatus" class="form-label">Order Status:</label>
                    <select id="orderStatus" name="orderStatus" class="form-select" v-model="orderInfo.order_status"
                        :disabled="!editMode">
                        <option value="Pending Prepared">Pending Prepared</option>
                        <option value="Order in Progress">Order in Progress</option>
                        <option value="Ready To Pickup">Ready To Pickup</option>
                        <option value="Ready To Deliver">Ready To Deliver</option>
                        <option value="Delivery In Progress">Delivery In Progress</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="cusName" class="form-label">Name:</label>
                    <input type="text" name="cusName" id="cusName" class="form-control"
                        v-model="orderInfo.customer_name" :disabled="!editMode" />
                </div>
                <div class="mb-3">
                    <label for="contactNum" class="form-label">Contact Number:</label>
                    <input type="text" name="contactNum" id="contactNum" class="form-control"
                        v-model="orderInfo.phone_num" :disabled="!editMode" />
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address:</label>
                    <input type="text" name="address" id="address" class="form-control" v-model="orderInfo.address"
                        :disabled="!editMode" />
                </div>
                <button class="btn btn-primary mt-4" type="submit" name="update" v-if="editMode">Submit</button>
            </form>


            <div class="orderDetails">
                <div style="text-align: left; font-weight: 600; margin-bottom: 8px">Delivery Method: {{ orderInfo.delivery_method }}</div>
                <table class="table table-hover">
                    <thead class="table-primary">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in orderItems" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.FoodName }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.FoodPrice }}</td>
                            <td>{{ item.price }}</td>
                        </tr>
                    </tbody>
                </table>
                <hr>
                <div class="osummary">
                    <span>Order Time: {{ orderInfo.cdate }}</span>
                    <span><b>Total Price: {{ calculateTotalPrice() }} </b></span>
                </div>
            </div>
        </div>
        <div id="toastContainer" class="position-fixed bottom-0 end-0 p-3"></div>
    </div>

</template>

<script>
import Swal from 'sweetalert2'
export default ({
    data() {
        return {
            orderId: '',
            order: [],
            orderInfo: '',
            orderItems: [],
            editMode: false,
        }
    },
    methods: {
        async getOrder() {
            try {
                const response = await fetch(`http://localhost:8080/getOrderById/${this.orderId}`);
                this.order = await response.json();
                this.orderInfo = this.order.orderInfo[0];
                this.orderItems = this.order.orderItems;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        calculateTotalPrice() {
            let totalPrice = 0;
            for (const item of this.orderItems) {
                totalPrice += parseFloat(item.price);
            }
            return totalPrice.toFixed(2); // Format to two decimal places
        },
        async updateOrder() {
            try {
                const response = await fetch(`http://localhost:8080/updateOrder/${this.orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        order_status: this.orderInfo.order_status,
                        customer_name: this.orderInfo.customer_name,
                        phone_num: this.orderInfo.phone_num,
                        address: this.orderInfo.address,
                    })
                });
                const data = await response.json();
                if (data.status === 'success') {
                    this.editMode = false;
                    // alert('Order Updated Successfully');
                    Swal.fire({
                        icon: "success",
                        title: "Order Updated Successfully",
                        showConfirmButton: true
                    });
                } else {
                    this.editMode = false;
                    // alert('Failed to Update Order');
                    Swal.fire({
                        icon: "error",
                        title: "Failed to Update Order",
                        showConfirmButton: true
                    });
                }
            } catch (error) {
                console.error('Error updating order:', error);
            }
        }
    },
    mounted() {
        this.orderId = this.$route.query.orderId;
        this.editMode = this.$route.query.edit ? this.$route.query.edit : false;
        this.getOrder();
    },
})
</script>

<style scoped>
.orderDetailsContainer {
    margin: 50px;
}

.orderDetailsTitle {
    display: flex;
    justify-content: start;
    align-items: center;
}

.orderDetailsTitle h1 {
    font-size: 30px;
    margin: 0;
}

.orderDetailsTitle a {
    color: black;
    margin-right: 20px;
}

.updateOption {
    text-align: right;
    margin: 10px 0 20px 0;
}

.orderContent {
    display: flex;
}

.updateForm {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 0 30px 0 0;
    border-right: black 1px solid;
    height: 80vh;
}

.updateForm label:not(:first-child) {
    margin-top: 20px;
}

.orderDetails {
    width: 75%;
    margin: 0 0 0 30px;
}

.orderDetailsTable,
.orderDetailsTable th,
.orderDetailsTable td {
    border: rgb(165, 174, 255) 1px solid;
    border-spacing: 0;
    text-align: center;
}

.orderDetailsTable th {
    padding: 10px;
    background-color: rgb(222, 222, 254);
}

.orderDetailsTable td {
    padding: 10px;
    background-color: rgb(255, 255, 255);
}

.orderDetailsTable {
    width: 100%;
}

.osummary {
    text-align: right;
    display: flex;
    justify-content: space-between;
}
</style>