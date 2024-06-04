<script setup>
import AdminHeaderVue from "@/components/adminHeader.vue";
</script>
<template>
    <AdminHeaderVue />
    <div class="orderDetailsContainer">
        <div class="orderDetailsTitle">
            <router-link to="/admin/orderManage"><i class="bi bi-arrow-left"></i></router-link>
            <h1>Order Details</h1>
        </div>
        <div class="updateOption">
            <a class='btn btn-outline-success' href="OrderDetails.php?oid=$oid&edit=\">Edit Order</a>
        </div>

        <div class="orderContent">
            <form action="" method="post" class="updateForm text-start">
                <div class="mb-3">
                    <label for="orderStatus" class="form-label">Order Status:</label>
                    <select id="orderStatus" name="orderStatus" class="form-select">
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
                    <input type="text" name="cusName" id="cusName" class="form-control" value="">
                </div>
                <div class="mb-3">
                    <label for="contactNum" class="form-label">Contact Number:</label>
                    <input type="text" name="contactNum" id="contactNum" class="form-control" value="">
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address:</label>
                    <input type="text" name="address" id="address" class="form-control" value="">
                </div>
                <button class="btn btn-primary mt-4" type="submit" name="update">Submit</button>
            </form>
            

            <div class="orderDetails">
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
                        <tr>
                            <td>%d</td>
                            <td>%s</td>
                            <td>%d</td>
                            <td>%.2f</td>
                            <td>%.2f</td>
                        </tr>
                    </tbody>
                </table>
                <hr>
                <div class="osummary">
                    <span>Order Time: </span>
                    <span><b>Total Price: </b></span>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>
.orderDetailsContainer{
    margin: 50px;
}

.orderDetailsTitle {
    display: flex;
    justify-content: start;
    align-items: center;
}
.orderDetailsTitle h1{
    font-size: 30px;
    margin: 0;
}
.orderDetailsTitle a{
    color: black;
    margin-right: 20px;
}

.updateOption{
    text-align: right;
    margin: 10px 0 20px 0;
}
.orderContent{
    display: flex;
}
.updateForm{
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 0 30px 0 0;
    border-right: black 1px solid;
    height: 80vh;
}
.updateForm label:not(:first-child){
    margin-top: 20px;
}

.orderDetails{
    width: 75%;
    margin: 0 0 0 30px;
}
.orderDetailsTable,
.orderDetailsTable th,
.orderDetailsTable td{
    border: rgb(165, 174, 255) 1px solid;
    border-spacing: 0;
    text-align: center;
}
.orderDetailsTable th{
    padding: 10px;
    background-color: rgb(222, 222, 254);
}

.orderDetailsTable td{
    padding: 10px;
    background-color: rgb(255, 255, 255);
}

.orderDetailsTable{
    width: 100%;
}

.osummary{
    text-align: right;
    display: flex;
    justify-content: space-between;
}

.error{
    border: rgb(250, 145, 145) solid 2px;
    background-color: rgb(251, 161, 161);
}

.success{
    border: rgb(171, 255, 171) solid 2px;
    background-color: rgb(195, 255, 202);
}

.success, .error{
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 10px;
    width: fit-content;
    margin-left: 50px;
    position: fixed;
    animation: deleteAnimation 3s linear forwards;;
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

.success img, .error img{
    margin-right: 10px;
}

</style>