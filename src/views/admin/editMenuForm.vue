<template>
    <form action="" method="post" class="editMenuForm" enctype="multipart/form-data" >
        <div class="form-content">
            <h1>Edit food</h1>
                <table>
                    <tr>
                        <td><label for="foodName">Name: </label></td>
                        <td><input type="text" name="foodName" id="foodName" value="<?php echo $name?>" required/></td>
                    </tr>
                    <tr>
                        <td><label for="foodDescription">Description: </label></td>
                        <td><textarea name="foodDescription" id="foodDescription" rows="4" required><?php echo $description?></textarea></td>
                    </tr>
                    <tr>
                        <td><label for="foodPrice">Price (RM): </label></td>
                        <td><input type="number" name="foodPrice" id="foodPrice" step="0.1" value="<?php echo $price?>" required/></td>
                    </tr>
                    <tr>
                        <td>Current Image: </td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td><label for="foodImg">New Image: </label></td>
                        <td><input type="file" name="foodImg" id="foodImg" accept="image/*"/></td>
                    </tr>
                    <tr>
                        <td><label>Availability:  </label></td>
                        <td>
                            <label for="Yes">Yes</label>
                            <input type="radio" name="foodAvailability" id="Yes" value="Yes"/>
                            <label for="No">No</label>
                            <input type="radio" name="foodAvailability" id="No" value="No" />
                        </td>
                    </tr>
                </table>
                <input type="hidden" name="id" value="<?php echo $id; ?>"/>
                <input type="hidden" name="currentImg" value="<?php echo $currentImg; ?>"/>
            <div class="submitbtnStyle"><button type="submit" name="submit" id="submit" class="submitbtn">Submit</button></div>
        </div>
    </form>
</template>