<template>

    <div class="orderDetailsContainer">
        <div class="orderDetailsTitle">
            <a href="./OrderManageList.php"><img src="" alt="back" /></a>
            <h1>Order Details</h1>
        </div>
        <div class="updateOption">

            <span class='edit-btn'><a href="OrderDetails.php?oid=$oid&edit=\">Edit Order</a></span>";

        </div>

        <div class="orderContent">
            <form action="" method="post" class="updateForm">
                <label for="orderStatus">Order Status: </label>
                <select id="orderStatus" name="orderStatus">
                    <option value="Pending Prepared">Pending Prepared</option>
                    <option value="Order in Progress"> >Order in Progress</option>
                    <option value="Ready To Pickup"> >Ready To Pickup</option>
                    <option value="Ready To Deliver">Ready To Deliver</option>
                    <option value="Delivery In Progress"> >Delivery In Progress</option>
                    <option value="Delivered"> >Delivered</option>
                </select>
                <label for="cusName">Name: </label>
                <input type="text" name="cusName" id="cusName" value="<?php echo $cus_name ?>" />
                <label for="contactNum">Contact Number: </label>
                <input type="text" name="contactNum" id="contactNum" value="<?php echo $contact ?>" />
                <label for="address">Address: </label>
                <input type="text" name="address" id="address" value="<?php echo $address ?>" />


                echo "<input class='submit-btn' type='submit' name='update' value='Submit' />";

            </form>

            <div class="orderDetails">
                <table class="orderDetailsTable">
                    <tr>
                        <th>No</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>%d</td>
                        <td>%s</td>
                        <td>%d</td>
                        <td>%.2f</td>
                        <td>%.2f</td>
                    </tr>
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