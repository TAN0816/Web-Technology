<template>
    <form action="" method="post" class="addMenuForm"  enctype="multipart/form-data">
        <div class="form-content">
            <h1>Add food</h1>
                <table>
                    <tr>
                        <td><label for="foodName">Name: </label></td>
                        <td><input type="text" name="foodName" id="foodName" maxlength="100" required/></td>
                    </tr>
                    <tr>
                        <td><label for="foodDescription">Description: </label></td>
                        <td><textarea name="foodDescription" id="foodDescription" rows="4" required></textarea></td>
                    </tr>
                    <tr>
                        <td><label for="foodPrice">Price (RM): </label></td>
                        <td><input type="number" name="foodPrice" id="foodPrice" step="0.1" required/></td>
                    </tr>
                    <tr>
                        <td><label for="foodImg">Image: </label></td>
                        <td><input type="file" name="foodImg" id="foodImg" accept="image/*"/></td>
                    </tr>
                    <tr>
                        <td><label>Availability:  </label></td>
                        <td>
                            <label for="Yes">Yes</label>
                            <input type="radio" name="foodAvailability" id="Yes" value="Yes" checked/>
                            <label for="No">No</label>
                            <input type="radio" name="foodAvailability" id="No" value="No" />
                        </td>
                    </tr>
                </table>
                
            <div class="submitbtnStyle"><button type="submit" name="submit" id="submit" class="submitbtn">Submit</button></div>
        </div>
    </form>
</template>