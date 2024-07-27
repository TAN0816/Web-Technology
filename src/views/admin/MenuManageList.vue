<template>
    <div class=menuMContainer>
        <h1 class=title>Menu List</h1>
        <div class=addmenu>
            <div class=add>
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal"
                    data-bs-target="#addMenuModal">
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
                    <tr v-if="menuItems.length === 0">
                        <td colspan="8">Food not added yet.</td>
                    </tr>
                    <tr v-else v-for="(item, index) in menuItems" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.FoodName }}</td>
                        <td>
                            <img class="foodPhoto" style="width: 100px; height: 100px" v-if="item.FoodImg"
                                :src="getImageUrl(item.FoodImg)" alt="Food Image">
                        </td>
                        <td width="500px">{{ item.FoodDescription }}</td>
                        <td>{{ item.FoodPrice }}</td>
                        <td>{{ item.FoodAvailability }}</td>
                        <td class="edit"><button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                                :data-bs-target="'#editMenuModal' + item.FoodID">
                                Edit
                            </button>
                        </td>
                        <td class="delete"><button class="btn btn-outline-danger"
                                @click="deleteMenu(item.FoodID)">Delete</button></td>

                        <!-- Edit Menu Modal -->
                        <div class="modal fade" :id="'editMenuModal' + item.FoodID" tabindex="-1"
                            aria-labelledby="editMenuModalLabel" aria-hidden="true"
                            style="background-color: transparent">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="editMenuModalLabel">Edit Menu</h5>
                                        <button type="button" class="btn-close closeModal" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form :id="'form_' + item.FoodID" action="http://localhost:8080/updateMenu"
                                            method="post" enctype="multipart/form-data" class="editMenuForm text-start"
                                            @submit.prevent="handleFormSubmit(item.FoodID)">
                                            <input type="hidden" name="id" :value="item.FoodID" />
                                            <input type="hidden" name="currentImg" :value="item.FoodImg" />
                                            <div class="mb-3">
                                                <label for="foodName" class="form-label">Name</label>
                                                <input type="text" class="form-control" name="foodName" id="foodName"
                                                    v-model="item.FoodName" maxlength="100" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="foodDescription" class="form-label">Description</label>
                                                <textarea class="form-control" name="foodDescription"
                                                    v-model="item.FoodDescription" id="foodDescription" rows="4"
                                                    required></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label for="foodPrice" class="form-label">Price (RM)</label>
                                                <input type="number" class="form-control" name="foodPrice"
                                                    v-model="item.FoodPrice" id="foodPrice" step="0.1" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="foodImg" class="form-label">New Image</label>
                                                <input type="file" class="form-control" name="foodImg" id="foodImg"
                                                    @change="handleNewFileUpload" accept="image/*">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Availability</label>
                                                <div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio"
                                                            v-model="item.FoodAvailability" name="foodAvailability"
                                                            id="Yes" value="Yes">
                                                        <label class="form-check-label" for="Yes">Yes</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio"
                                                            v-model="item.FoodAvailability" name="foodAvailability"
                                                            id="No" value="No">
                                                        <label class="form-check-label" for="No">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-end">
                                                <button type="submit" name="submit" id="submit"
                                                    class="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Add Menu Modal -->
        <div class="modal fade" id="addMenuModal" tabindex="-1" aria-labelledby="addMenuModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addMenuModalLabel">Add Menu</h5>
                        <button type="button" class="btn-close closeModal" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Your form content here -->
                        <form @submit.prevent="addMenu" enctype="multipart/form-data" class="text-start">
                            <div class="mb-3">
                                <label for="foodName" class="form-label">Name</label>
                                <input type="text" class="form-control" name="foodName" id="foodName"
                                    v-model="newFoodName" maxlength="100" required>
                            </div>
                            <div class="mb-3">
                                <label for="foodDescription" class="form-label">Description</label>
                                <textarea class="form-control" name="foodDescription" id="foodDescription"
                                    v-model="newFoodDescription" rows="4" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="foodPrice" class="form-label">Price (RM)</label>
                                <input type="number" class="form-control" name="foodPrice" id="foodPrice"
                                    v-model="newFoodPrice" step="0.1" required>
                            </div>
                            <div class="mb-3">
                                <label for="foodImg" class="form-label">Image</label>
                                <input type="file" class="form-control" name="foodImg" id="foodImg" accept="image/*"
                                    @change="handleNewFileUpload">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Availability</label>
                                <div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="foodAvailability" id="Yes"
                                            v-model="newFoodAvailability" value="Yes" checked>
                                        <label class="form-check-label" for="Yes">Yes</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="foodAvailability" id="No"
                                            v-model="newFoodAvailability" value="No">
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

<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            menuItems: [],
            newFoodName: '',
            newFoodDescription: '',
            newFoodPrice: '',
            newFoodImg: null,
            newFoodAvailability: 'Yes'
        }
    },
    methods: {
        async getAllMenuItems() {
            try {
                const response = await fetch(`http://localhost:8080/menuList`);
                this.menuItems = await response.json();
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        },
        getImageUrl(imageName) {
            return require('../../assets/image/food/' + imageName);
        },
        handleNewFileUpload(event) {
            this.newFoodImg = event.target.files[0];
        },
        async addMenu() {
            const formData = new FormData();
            formData.append('foodName', this.newFoodName);
            formData.append('foodDescription', this.newFoodDescription);
            formData.append('foodPrice', this.newFoodPrice);
            formData.append('foodImg', this.newFoodImg);
            formData.append('foodAvailability', this.newFoodAvailability);
            try {
                const response = await fetch('http://localhost:8080/addMenu', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Menu added successfully",
                        showConfirmButton: true
                    });
                    this.getAllMenuItems();
                    // Clear form fields
                    this.newFoodName = '';
                    this.newFoodDescription = '';
                    this.newFoodPrice = '';
                    this.newFoodImg = null;
                    this.newFoodAvailability = 'Yes';
                } else {
                    Swal.fire({
                        icon: "error",
                        title: 'Failed to add menu',
                        showConfirmButton: true
                    });
                }
                this.closeModal();
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: "error",
                    title: 'Failed to add menu',
                    showConfirmButton: true
                });
                this.closeModal();
            }
        },
        async handleFormSubmit(itemId) {
            try {
                const formData = new FormData(document.getElementById('form_' + itemId));
                const response = await fetch('http://localhost:8080/updateMenu', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (response.ok) {

                    Swal.fire({
                        icon: "success",
                        title: result.message,
                        showConfirmButton: true
                    });
                    this.getAllMenuItems();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: result.message,
                        showConfirmButton: true
                    });
                }
                this.closeModal();
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: "error",
                    title: 'Failed to update menu',
                    showConfirmButton: true
                });
                this.closeModal();
            }
        },
        async deleteMenu(foodId) {
            try {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                });

                if (!result.isConfirmed) {
                    return; // Do nothing if user cancels
                }

                const response = await fetch(`http://localhost:8080/deleteMenu/${foodId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.status === 'success') {
                        this.getAllMenuItems();
                        Swal.fire({
                            icon: "success",
                            title: result.message,
                            showConfirmButton: true
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: result.message,
                            showConfirmButton: true
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: 'Failed to delete menu',
                        showConfirmButton: true
                    });
                }
            } catch (error) {
                console.error('Error deleting menu:', error);
                Swal.fire({
                    icon: "error",
                    title: 'Failed to delete menu',
                    showConfirmButton: true
                });
            }
        },
        closeModal() {
            const closeButtons = document.getElementsByClassName('closeModal');
            for (const closeButton of closeButtons) {
                closeButton.click();
            }
        }

    },
    mounted() {
        this.getAllMenuItems();
    },
}
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