<template>
    <div class="container-fluid">
        <div class="container-fluid mt-4">
            <div class="row">
                <div class="col-md custom-card">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Total Menus</h5>
                            <p class="card-text display-4">{{ totalMenus }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md custom-card">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Total Sales</h5>
                            <p class="card-text display-4">{{ "RM" + totalSales }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md custom-card">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Total Orders Today</h5>
                            <p class="card-text display-4">{{ totalOrders }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md custom-card">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Total Customers</h5>
                            <p class="card-text display-4">{{ totalCustomers }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md custom-card">
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">Sales per Menu</h5>
                            <p class="card-text display-4">{{ averageSalesPerMenu !== null ? "RM" +
                                averageSalesPerMenu.toFixed(2) : "Loading..." }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 mb-3">
                    <div class="card" style="width: 100%">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title">Orders Summary</h5>
                            </div>
                            <div class="mt-4">
                                <canvas id="orderChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-3" style="height: 100%">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Popular Food</h5>
                            <canvas id="foodChart" style="height: 300px"></canvas>
                            <ul class="list-unstyled">
                                <li v-for="(food, index) in popularFood" :key="index">
                                    <span class="badge" :style="{ backgroundColor: food.color }">&nbsp;</span>
                                    {{ food.name }} ({{ food.percent * food.quantity }}%) -
                                    {{ food.quantity }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
    name: "AdminDashboard",
    setup() {
        const foodChart = ref(null);
        const orderChart = ref(null);
        const totalMenus = ref(0);
        const totalSales = ref(0);
        const totalOrders = ref(0);
        const totalCustomers = ref(0);
        const popularFood = ref([]);
        const averageSalesPerMenu = ref(0);

        onMounted(async () => {
            try {
                // Fetch data for total menus
                const totalMenusResponse = await fetch(
                    "http://localhost:8080/total_menus"
                );
                totalMenus.value = await totalMenusResponse.json();

                // Fetch data for total sales
                const totalSalesResponse = await fetch(
                    "http://localhost:8080/total_sales"
                );
                totalSales.value = await totalSalesResponse.json();

                // Fetch data for total orders
                const totalOrdersResponse = await fetch(
                    "http://localhost:8080/total_orders"
                );
                totalOrders.value = await totalOrdersResponse.json();

                // Fetch data for total customers
                const totalCustomersResponse = await fetch(
                    "http://localhost:8080/total_customers"
                );
                totalCustomers.value = await totalCustomersResponse.json();

                // Fetch data for average sales per menu
                const averageSalesPerMenuResponse = await fetch("http://localhost:8080/average_sales_permenu");
                const averageSalesPerMenuData = await averageSalesPerMenuResponse.json();
                averageSalesPerMenu.value = averageSalesPerMenuData.averageSalesPerMenu || 0;

                // Fetch data for popular food
                const popularFoodResponse = await fetch(
                    "http://localhost:8080/popular_food"
                );
                const popularFoodData = await popularFoodResponse.json();
                const totalQuantity = popularFoodData.reduce(
                    (sum, food) => sum + food.quantity,
                    0
                );
                popularFood.value = popularFoodData.map((food, index) => ({
                    ...food,
                    percent: ((food.quantity / totalQuantity) * 100).toFixed(2),
                    color: ["#FFCD56", "#FF6384", "#4BC0C0"][index % 3],
                }));

                // Fetch data for order summary
                const orderSummaryResponse = await fetch(
                    "http://localhost:8080/order_summary"
                );
                const orderSummaryData = await orderSummaryResponse.json();

                // Initialize food chart
                const ctxFood = document.getElementById("foodChart").getContext("2d");
                foodChart.value = new Chart(ctxFood, {
                    type: "doughnut",
                    data: {
                        labels: popularFood.value.map((food) => food.name),
                        datasets: [
                            {
                                data: popularFood.value.map((food) => food.quantity),
                                backgroundColor: popularFood.value.map((food) => food.color),
                                hoverBackgroundColor: popularFood.value.map(
                                    (food) => food.color
                                ),
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                });

                // Initialize order chart
                const ctxOrder = document.getElementById("orderChart").getContext("2d");
                orderChart.value = new Chart(ctxOrder, {
                    type: "bar",
                    data: {
                        labels: orderSummaryData.labels,
                        datasets: [
                            {
                                label: "Orders",
                                data: orderSummaryData.values,
                                backgroundColor: ["#FF6384", "#4BC0C0", "#CCCCCC"],
                                hoverBackgroundColor: ["#FF6384", "#4BC0C0", "#CCCCCC"],
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });

        return {
            foodChart,
            orderChart,
            totalMenus,
            totalSales,
            totalOrders,
            totalCustomers,
            popularFood,
            averageSalesPerMenu,
        };
    },
};
</script>

<style>
.custom-card{
    padding: 15px;
}
.card {
    font-size: 16px;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 2rem;
}

.card-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
}
.card-text {
    font-size: 14px; 
}

.display-4 {
    font-size: 2.5rem;
}
.display-4 {
    font-size: 2.0rem;
}

.progress {
    margin-bottom: 1rem;
}

.progress-bar {
    width: 60%;
}

.badge {
    width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 5px;
}
</style>
