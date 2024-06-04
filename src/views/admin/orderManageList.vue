<template>
    <div class="orderMContainer">
        <h1 class="title">Order List</h1>
        <div class="tool">
            <form action="" method="POST">
                <div class="filter">
                    <i class="bi bi-filter"></i>
                    <select class='foption' name="filter">
                        <option value="">None</option>
                        <option value="sortname">Sort by name</option>
                        <option value="sortdate">Sort by order time</option>
                    </select>
                    <input type="submit" name="filter-btn" value="Apply" />
                </div>
            </form>
            <form action="" method="GET">
                <div class="search">
                    <input type="text" name="search_val"
                        value="<?php if(isset($_GET['search'])){ echo $search_val; } ?>"
                        placeholder="Order ID/Customer Name" />
                    <button type="submit" name="search"><i class="bi bi-search"></i></button>
                </div>
            </form>
        </div>
        <div class="list-container">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Order Time</th>
                    <th>Status</th>
                    <th colspan='2' calss='action'>Actions</th>
                </tr>

                <tr>
                    <td>%d</td>
                    <td>%s</td>
                    <td>%s</td>
                    <td>%s</td>
                    <td class='view'><a class='view-btn' href='OrderDetails.php?oid=$oid'>View</a></td>
                    <td class='edit'><a class='edit-btn' href='OrderDetails.php?oid=$oid&edit='>Edit</a></td>
                </tr>
                <tr>
                    <td colspan='6'>No order found.</td>
                </tr>";

            </table>
        </div>
    </div>
</template>