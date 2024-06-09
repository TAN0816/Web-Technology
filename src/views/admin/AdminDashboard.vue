<script setup>
</script>

<template>
    <AdminHeader />
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

<style scoped>
.wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 20px;
}

.block-content{
    font-size: 40px;
}

.dashboard_container{
    width: 100%;
    display: flex;
    justify-content: center;
    
}

.blocks{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 1300px;

}
.block-item{
    border: solid #afcbff 3px;
    background-color: #dbe7fe;
    width: 250px;
    min-height: 200px;
    margin: 50px;
}

.block-item h3{
    text-align: center;
    font-size: 20px;
    padding: 0 5px;
}

.date{
    border-bottom: solid 2px rgb(19, 78, 255);
    border-top: solid 2px rgb(19, 78, 255);
    padding: 10px;
    margin: auto;
    width: fit-content;
}
</style>