<script setup>
import AdminHeaderVue from "@/components/adminHeader.vue";
</script>
<template>
    <AdminHeaderVue />
    <div class=menuMContainer>
        <h1 class=title>Menu List</h1>
        <div class=addmenu>
            <div class=add>
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#addMenuModal">
                    <i class="bi bi-plus-circle me-2"></i> Add Menu
                </button>
            </div>
        </div>
        <div class=list-container>
            <table class="table table-hover">
                <thead>
                    <tr class="table-primary">
                        <th scope="col">No</th>
                        <th scope="col">Food Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Availability</th>
                        <th scope="col" colspan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Name</td>
                        <td>
                            <img class="foodPhoto" style="width: 100px; height: 100px" src="" alt="Food Image">
                        </td>
                        <td width="500px">desc</td>
                        <td>.Price.</td>
                        <td>Availability.</td>
                        <td class="edit"><a class="btn btn-outline-primary" href="editMenuFrm.php?foodId=$id">Edit</a>
                        </td>
                        <td class="delete"><a class="btn btn-outline-danger" onclick="..."
                                href="deleteMenu.php?foodId=$id&foodImg=$foodImg">Delete</a></td>
                    </tr>
                    <!-- <tr>
                        <td colspan="8">Food not added yet.</td>
                    </tr> -->
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="addMenuModal" tabindex="-1" aria-labelledby="addMenuModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addMenuModalLabel">Add Menu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Your form content here -->
                        <form action="" method="post" enctype="multipart/form-data" class="text-start">
                            <div class="mb-3">
                              <label for="foodName" class="form-label">Name</label>
                              <input type="text" class="form-control" name="foodName" id="foodName" maxlength="100" required>
                            </div>
                            <div class="mb-3">
                              <label for="foodDescription" class="form-label">Description</label>
                              <textarea class="form-control" name="foodDescription" id="foodDescription" rows="4" required></textarea>
                            </div>
                            <div class="mb-3">
                              <label for="foodPrice" class="form-label">Price (RM)</label>
                              <input type="number" class="form-control" name="foodPrice" id="foodPrice" step="0.1" required>
                            </div>
                            <div class="mb-3">
                              <label for="foodImg" class="form-label">Image</label>
                              <input type="file" class="form-control" name="foodImg" id="foodImg" accept="image/*">
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Availability</label>
                              <div>
                                <div class="form-check form-check-inline">
                                  <input class="form-check-input" type="radio" name="foodAvailability" id="Yes" value="Yes" checked>
                                  <label class="form-check-label" for="Yes">Yes</label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input class="form-check-input" type="radio" name="foodAvailability" id="No" value="No">
                                  <label class="form-check-label" for="No">No</label>
                                </div>
                              </div>
                            </div>
                            <div class="text-end">
                              <button type="submit" name="submit" id="submit" class="btn btn-primary">Submit</button>
                            </div>
                          </form>
                    </div>
                </div>
            </div>
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