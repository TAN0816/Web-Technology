<template>
    <div class="userMContainer">
        <h1 class="title">User List</h1>
        <div class="tool">
            <form action="" method="POST">
                <div class="filter">
                    <i class="bi bi-filter"></i>
                    <select class='foption' name="filter">
                        <option value=""> None</option>
                        <option value="sortname"> >Sort by name</option>
                        <option value="sortrole">Sort by role</option>
                    </select>
                    <input type="submit" name="filter-btn" value="Apply" />
                </div>
            </form>
            <form action="" method="GET">
                <div class="search">
                    <input type="text" name="search_val"
                        value="<?php if(isset($_GET['search'])){ echo $search_val; } ?>" placeholder="User Name" />
                    <button type="submit" name="search"><i class="bi bi-search"></i></button>
                </div>
            </form>
        </div>
        <div class="list-container">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                <tr>
                    <td>%d</td>
                    <td>%s</td>
                    <td>%s</td>
                    <td>%s</td>

                </tr>
                <tr>
                    <td colspan='4'>No user found.</td>
                </tr>";

            </table>
        </div>
    </div>
</template>