<template>
    <div class="orderMContainer">
        <h1 class="title text-center">Order List</h1>
        <div class="tool d-flex justify-content-between align-items-center mb-3">
            <div class="filter d-flex align-items-center">
                <i class="bi bi-filter me-2"></i>
                <select class="form-select me-2" name="filter" v-model="filter">
                    <option value="">None</option>
                    <option value="Pending Prepared">Pending Prepared</option>
                    <option value="Order in Progress">Order in Progress</option>
                    <option value="Ready To Pickup">Ready To Pickup</option>
                    <option value="Ready To Deliver">Ready To Deliver</option>
                    <option value="Delivery In Progress">Delivery In Progress</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <button class="btn btn-primary" v-on:click="fetchOrders()">Apply</button>
            </div>
            <div class="search d-flex">
                <input type="text" name="search_val" value="" class="form-control me-2" placeholder="Customer Name"  v-model="searchVal" />
                <button class="btn btn-primary" v-on:click="fetchOrders()"><i class="bi bi-search"></i></button>
            </div>
        </div>
        <div class="list-container">
            <table class="table table-hover">
                <thead>
                    <tr class="table-primary">
                        <th scope="col">ID</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Order Time</th>
                        <th scope="col">Status</th>
                        <th scope="col" colspan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="orders.length === 0">
                        <td colspan="6" class="text-center">No order found.</td>
                    </tr>
                    <tr v-else v-for="order in orders" :key="order.order_ID">
                        <td>{{ order.order_ID }}</td>
                        <td>{{ order.customer_name }}</td>
                        <td>{{ order.cdate }}</td>
                        <td>{{ order.order_status }}</td>
                        <td class="view">
                            <a class="btn btn-outline-primary" :href="`/admin/orderDetail?orderId=${order.order_ID}`">View</a>
                        </td>
                        <td class="edit">
                            <a class="btn btn-outline-success" :href="`/admin/orderDetail?orderId=${order.order_ID}&edit=true`">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default ({
    data(){
        return {
            filter: '',
            searchVal: '',
            orders: [],
        }
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await fetch(`http://localhost:8080/orderManageList?search_val=${this.searchVal}&filter=${this.filter}`);
                this.orders = await response.json();
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    },
    mounted() {
        this.fetchOrders();
    },
})
</script>

<style scoped>
.menuMContainer,
.orderMContainer,
.userMContainer {
    margin: 50px;
}

.addmenu {
    text-align: end;
    margin-bottom: 10px;
}

.addmenu .add img {
    width: 25px;
}

.title {
    font-size: 35px;
    text-align: center;
}

th:first-child {
    border-top-left-radius: 10px;
    padding-left: 20px;
}

th:last-child {
    border-top-right-radius: 10px;
    padding-right: 20px;
}

.tool {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.error {
    border: rgb(250, 145, 145) solid 2px;
    background-color: rgb(251, 161, 161);
}

.success {
    border: rgb(171, 255, 171) solid 2px;
    background-color: rgb(195, 255, 202);
}

.success,
.error {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 10px;
    width: fit-content;
    margin-left: 50px;
    position: fixed;
    animation: deleteAnimation 3s linear forwards;
    ;
    animation-fill-mode: forwards;
}

@keyframes deleteAnimation {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        display: none;
    }
}

.success img,
.error img {
    margin-right: 10px;
}
</style>