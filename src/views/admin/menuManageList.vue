<template>
    <div class=menuMContainer>
        <h1 class=title>Menu List</h1>
        <div class=addmenu>
            <div class=add>
                <a href=addMenuFrm.php>
                    <img src='' alt=add icon/>
                </a>
            </div>
        </div>
        <div class=list-container>
            <table>
                <tr>
                    <th>No</th>
                    <th>Food Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th colspan='2'>Actions</th>
                </tr>
                <tr>
                        <td>.++$num.</td>
                        <td>.$fname.</td>
                        <td>
                        if($foodImg==)
                            <div>Image is not added</div>
                          
                            <img class='foodPhoto' style='width: 100px; height: 100px' src="" />
                        
                        </td>
                        <td width='500px'>.$description.</td>
                        <td>.$foodPrice.</td>
                        <td>.$foodAvailability.</td>
                        <td class='edit'><a class='edit-btn' href='editMenuFrm.php?foodId=$id'>Edit</a></td>
                        <td class='delete'><a class='delete-btn' onclick={} href='deleteMenu.php?foodId=$id&foodImg=$foodImg'>Delete</a></td>
                        </tr>
                    
                
                    <tr><td colspan='7'>Food not added yet.</td></tr>
                
                
            </table>
            
        </div>
    </div>
</template>