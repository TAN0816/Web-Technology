<script setup>

</script>

<template>
  <body>
    <div id="app" class="page">
      <div class="container">
        <h2 class="menu-title">Our Menu</h2>
        <div class="menulist" v-if="products.length != 0">
          <div v-for="product in products" :key="product.id">
            <div class="menu">
              <div class="hoverr">
                <img
                  :src="getImageUrl(product.FoodImg)"
                  alt="image"
                  class="cartimg"
                />
                <div class="description">
                  <p>{{ product.FoodDescription }}</p>
                </div>
              </div>
              <div class="menuword">
                <h3 class="h3margintop">{{ product.FoodName }}</h3>
                <p class="price">RM{{ product.FoodPrice }}</p>
              </div>
              <button @click="addToCart(product)" class="addcartbutton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="#FDF3DD"
                  class="bi bi-cart-plus cart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
                  />
                  <path
                    d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="cartemptybox">
          <div class="card">
            <div class="cartempty">
              <div class="cartemptycontent">
                <img
                  src="../../assets/image/menuempty.png"
                  alt="Cart Empty"
                  class="cartemptyimage"
                />
                <h3>Menu is empty</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container2">
        <div class="content">
          <div class="cart-title">
            <h2>Shopping Cart</h2>
          </div>
          <div v-if="carts.length!=0" class="list">
            <div v-for="(cart, key) in carts" :key="key" class="item">
              <div class="col1">
                <input
                  type="checkbox"
                  :id="'cartcheckbox_' + key"
                  name="cartcheckbox"
                  class="cartcheckbox"
                  :checked="cart.checked"
                  @change="checkedorunchecked(key)"
                />
              </div>
              <div class="col2">
                <img
                  :src="getImageUrl(cart.FoodImg)"
                  alt="image"
                  class="cartimg"
                />
              </div>
              <div class="col3">
                <div class="col3description">
                  <p>{{ cart.name }}</p>
                  <p id="pricep">RM{{ cart.FoodPrice }} </p>
                  <div>
                    <label :for="'quantity_' + key">Qty:</label>
                    <input
                      type="number"
                      :id="'quantity_' + key"
                      class="quantityinput"
                      :value="cart.quantity"
                      @change="changeQuantity(key, $event.target.value)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="totalcart">
              <div class="totalcol1">
                <input
                  type="checkbox"
                  id="cartcheckboxtotal"
                  name="cartcheckboxtotal"
                  class="cartcheckbox"
                  :checked="checkAllBox"
                  @change="checkAll()"
                />
              </div>
              
              <div class="totalcol2">
                <h3>ALL</h3>
              </div>
              <div class="totalcol3">
                <h3>Total:</h3>
              </div>
              <div class="totalcol4">
                <h3>RM{{ totalPrice }}</h3>
              </div>
            </div>
            <div class="buttoncheckout">
              <button type="submit" name="submit" class="buttonn" @click="submitOrder()">Checkout</button>
          </div>
          </div>

          <div v-else class="cartemptybox">
            <div class="card">
              <div class="cartempty">
                <div class="cartemptycontent">
                  <img
                    src="../../assets/image/cartempty.png"
                    alt="Cart Empty"
                    class="cartemptyimage"
                  />
                  <h3>Cart is empty</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import router from '../../router'
export default {
  name: "MenuCart",
  data() {
    return {
      products: [
      ],

      carts: [],
      checkAllBox: false,
      selectAll: false,
      totalPrice: 0,
    };
  },
  watch: {
    carts: {
      handler: function (newCarts) {
        this.calculateTotalPrice();
        this.updateSessionStorage(newCarts);
      },
      deep: true,
    },
  },
  methods: {
    async getAllMenuItems() {
            try {
                const response = await fetch(`http://localhost:8080/menuList`);
                this.products = await response.json();
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        },
        getImageUrl(imageName) {
            // Assuming your images are stored in the 'assets/image/food' directory
            return require('../../assets/image/food/' + imageName);
        },
    changeQuantity(key, updatedQuantity) {
      this.carts[key].quantity = updatedQuantity;

      if (updatedQuantity <= 0) {
        this.carts.splice(key, 1);
      } else {
        this.carts[key].subprice = this.carts[key].FoodPrice * updatedQuantity;
      }
    },
    checkedorunchecked(key) {
      this.carts[key].checked = !this.carts[key].checked;
      console.log(this.carts[key].checked);
      this.calculateTotalPrice();
      console.log(this.totalPrice);
    },
    calculateTotalPrice() {
      this.totalPrice = 0;
      this.carts.forEach((cart) => {
        if (cart.checked == true) {
          this.totalPrice += parseFloat(cart.subprice);
        }
      });
    },
    checkAll() {
      this.checkAllBox = !this.checkAllBox;
      if (this.checkAllBox == true) {
        this.carts.forEach((cart) => {
          cart.checked = true;
        });
        this.calculateTotalPrice();
      }
    },
    addToCart(product) {
      const existingCartItem = this.carts.find(
        (cart) => cart.FoodID === product.FoodID
      );

      if (existingCartItem) {
        existingCartItem.quantity++;
        existingCartItem.subprice = parseFloat(existingCartItem.FoodPrice) * existingCartItem.quantity;
        window.alert("The quantity of the product has been increased by 1.");
      } else {
        const cart = {
          ...product,
          subprice: parseFloat(product.FoodPrice),
          quantity: 1,
          checked: false,
        };
        this.carts.push(cart);
        window.alert("Product added to cart.");
      }
      
    },
    updateSessionStorage(newCarts){
      sessionStorage.setItem('carts', JSON.stringify(newCarts));
    },
    submitOrder(){
      const order = this.carts.filter(cart => cart.checked);

      sessionStorage.setItem('order', JSON.stringify(order));
      
      router.push('/user/PaymentPage');
    }
  },
  mounted() {
    this.getAllMenuItems();
    const storedCarts = sessionStorage.getItem('carts');
    if (storedCarts) {
      this.carts = JSON.parse(storedCarts);
    }
  }
  

};
</script>

<style scoped>
.list {
  width: 100%;
}

.cartemptybox {
  border: none;
}

body {
  background-color: #f3f3f3;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.page {
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  max-width: 100vw;
}

.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
}

.menulist {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.menu-title {
  font-family: "Poppins", sans-serif;
  font-size: 36px;
  text-align: center;
  color: rgb(7, 7, 24);
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.502);*/
  letter-spacing: 2px;
  margin: 25px;
}

.cart-title {
  font-family: "Poppins", sans-serif;
  font-size: 22px;
  color: rgb(7, 7, 24);
  text-align: center;
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.502);*/
  letter-spacing: 2px;
  margin: 30px 25px 0px 25px;
}

.container {
  width: 66vw;
  margin: 10px 25px 25px 45px;
  background-color: white;
  border-radius: 15px;
}

.container2 {
  width: 34vw;
  margin: 10px 25px 25px 10px;
  background-color: white;
  border-radius: 15px;
}

.cartempty {
  margin-top: 70px;
  height: 650px;
}

.cartemptyimage {
  width: 150px;
  height: auto;
}

.cartemptycontent {
  padding: 20px 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cartempty h3 {
  margin-top: 45px;
}

.menu {
  margin: 20px 30px;
  border-radius: 15px;
  border: 2px solid #eaeaea;
  position: relative;
  color: black;
  width: 200px;
  height: auto;
  font-family: "Lato", sans-serif;
  padding: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.rounded-image {
  border-radius: 15px;
  width: 180px;
  height: 180px;
}

.description {
  border-radius: 15px;
  border: 2px solid #eaeaea;
  width: 220px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 25px;
  background-color: rgba(255, 243, 221, 0.968);
  color: #800000;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.description p {
  line-height: 20px;
  font-family: "Calisto MT", serif;
  font-size: 16x;
  font-style: italic;
  font-weight: 800;
}
.hoverr:hover .description {
  opacity: 1;
  visibility: visible;
}

#pricep {
  color: #ff3131;
  font-style: italic;
}
.cart {
  height: 50px;
  width: 50px;
  padding: 10px;
  border: none;
}

.addcartbutton {
  z-index: 99;
  border: none;
  background-color: #af4848;
  border-radius: 50%;
  position: absolute;
  bottom: -10px;
  right: -10px;
  height: 50px;
  width: 50px;
  cursor: pointer;
}
.addcartbutton :hover {
  z-index: 99;
  border: none;
  background-color: #ef601e;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  cursor: pointer;
}

.h3margintop {
  margin-top: 30px;
  font-size: 16px;
}

.price {
  margin-top: 10px;
  color: #333333;
}

.cartcheckbox,
.cartcheckbox {
  width: 15px;
  height: 15px;
}

.item {
  display: flex;
  flex-direction: row;
  margin: 20px 20px;
  border-bottom: 1px groove #b3b5bb;
  padding-bottom: 30px;
}

.col1,
.col2,
.col3,
.col4 {
  display: flex;
  align-items: center;
}

.col1 {
  width: 12%;
  justify-content: center;
}

.col2 {
  width: 25%;
  justify-content: center;
}

.col3 {
  width: 63%;
}

.col3description {
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.quantityinput {
  width: 40px;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
}

.cartimg {
  height: 70px;
  width: 100px;
  border-radius: 5%;
}

.content {
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.totalcart {
  display: flex;
  flex-direction: row;
  margin: 20px;
}

.totalcol1,
.totalcol3,
.totalcol4 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.totalcol1 {
  width: 12%;
}

.totalcol2 {
  width: 46%;
  display: flex;
  align-items: center;
}

.totalcol3 {
  width: 17%;
  color: #ff3131;
}

.totalcol4 {
  width: 22%;
}

.buttoncheckout {
  display: flex;
  justify-content: flex-end;
  margin: 0 0 50px 0;
}

.hr {
  margin: 30px 40px;
  border-top: 1px groove #b3b5bb;
}

.buttoncheckout .buttonn {
  background-color: #ef601e;
  border: none;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  border-radius: 25px;
  margin-right: 25px;
}
</style>
