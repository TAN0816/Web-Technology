<script setup>
import AdminHeaderVue from "@/components/adminHeader.vue";
</script>
<template>
    <AdminHeaderVue />
    <div class="orderMContainer">
        <h1 class="title text-center">Order List</h1>
        <div class="tool d-flex justify-content-between align-items-center mb-3">
            <div class="filter d-flex align-items-center">
                <i class="bi bi-filter me-2"></i>
                <select class="form-select me-2" name="filter">
                    <option value="">None</option>
                    <option value="sortname">Sort by name</option>
                    <option value="sortrole">Sort by role</option>
                </select>
                <button class="btn btn-primary">Apply</button>
            </div>
            <div class="search d-flex">
                <input type="text" name="search_val" value="" class="form-control me-2" placeholder="User Name" />
                <button class="btn btn-primary"><i class="bi bi-search"></i></button>
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
                    <tr>
                        <td>1</td>
                        <td>Mr Tan</td>
                        <td>12/2/2024</td>
                        <td>Pending</td>
                        <td class="view">
                            <a class="btn btn-outline-primary" href="/admin/orderDetail">View</a>
                        </td>
                        <td class="edit">
                            <a class="btn btn-outline-success" href="OrderDetails.php?oid=$oid&edit=">Edit</a>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td colspan="6" class="text-center">No order found.</td>
                    </tr> -->
                </tbody>
            </table>
        </div>
    </div>
</template>
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