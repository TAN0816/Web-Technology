<script setup>
import AdminHeaderVue from "@/components/adminHeader.vue";

</script>

<template>
    <AdminHeaderVue />
    <div class="wrapper">
        <div class="date">Date: 5/6/2024</div>
        <div class="dashboard_container">
            
            <div class="blocks">

                <div class="block-item" onclick="menu()">
                    <h3>Number of Food in Menu</h3>
                    <p class="block-content">1</p>
                </div>
                <div class="block-item">
                    <h3>Total Order Today</h3>
                    <p class="block-content">2</p>
                </div>
                <div class="block-item">
                    <h3>Total User</h3>
                    <p class="block-content">3</p>
                </div>
                <div class="block-item">
                    <h3>Total Sales</h3>
                    <p class="block-content">RM23.44</p>
                </div>
                <div class="block-item">
                    <h3>Top Sales</h3>
                    <p class="block-content">Salad</p>
                </div>
            </div>
        </div>
    </div>
</template>