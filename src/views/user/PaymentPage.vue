<script setup>
import userHeaderVue from "@/components/NavBar.vue";
</script>
<template>
   <userHeaderVue></userHeaderVue>
<body>
   <div>
      <div class="background">
         <div class="payment">
            <div class="form">
               <form @submit.prevent="addOrder">
                  <h1>Payment Detail:</h1>
                  <h2>Payment Method:</h2>
                  <div class="option">
                     <input type="radio" id="cash" name="paymentmethod" value="cash" checked v-model="paymentmethod"/>
                     <label for="cash">
                        <img src="../../assets/image/cash.png" alt="Cash" class="paymentimg" />
                     </label>
                     <input type="radio" id="card" name="paymentmethod" value="card" v-model="paymentmethod" />
                     <label for="card">
                        <img src="../../assets/image/card.png" alt="Card" class="paymentimg" />
                     </label>
                  </div>

                  <h2>Delivery Method:</h2>
                  <div class="option2">
                     <div class="margin-right">
                        <input type="radio" id="pickupmethod" name="deliverymethod" value="pickup" checked v-model="deliverymethod"/>
                        <label for="pickupmethod">
                           <p class="pickup">Pickup</p>
                        </label>
                     </div>
                     <input type="radio" id="deliverymethod" name="deliverymethod" value="delivery" v-model="deliverymethod" />
                     <label for="deliverymethod">
                        <p class="Delivery">Delivery</p>
                     </label>
                  </div>

                  <div class="personalinformation">
                     <label for="cname">Name:</label>
                     <input type="text" id="cname" name="cname" required placeholder="Name" v-model="cname" />
                     <label for="caddress">Address:</label>
                     <input type="text" id="caddress" name="caddress" required placeholder="Address" v-model="caddress" />
                     <label for="cpnumber">Phone number:</label>
                     <input type="text" id="cpnumber" name="cpnumber" required maxlength="13" minlength="9"
                        placeholder="0123456789" v-model="cpnumber"/>
                  </div>
                  <div class="buttoncenter">
                     <button type="submit" class="buttonnn" name="submit">
                        Pay Now
                     </button>
                  </div>
               </form>
            </div>
         </div>

         <div class="ordersummary">
            <div class="orderpadding">
               <h1>Summary Order:</h1>
               <div class="order">
                  <div class="item" v-for="order in orders" :key="order.id">
                     <img :src="getImageUrl(order.FoodImg)" class="roundedimg" alt="Order" />
                     <div class="orderdescription">
                        <p>
                           {{ order.FoodName }}
                           <span class="orange">x {{ order.quantity }}</span>
                        </p>
                        <p>
                           RM {{ order.subprice }}
                        </p>
                     </div>
                  </div>
               </div>
               <div class="totalcontainer">
                  <h2 id="total">
                     Total: RM {{ totalPrice }}
                  </h2>
               </div>
            </div>
         </div>
      </div>
   </div>
</body>
</template>

<script>
export default {
   name: "MenuCart",
   data() {
      return {
         orders: [],
         totalPrice: 0,
         cname: '',
         caddress: '',
         cpnumber: '',
         deliverymethod: 'pickup',  // Default value
         paymentmethod: 'cash',     // Default value
      };
   },
   mounted() {
      const storedOrder = sessionStorage.getItem('order');
      if (storedOrder) {
         this.orders = JSON.parse(storedOrder);
      }
      this.orders.forEach((order) => {
         this.totalPrice += parseFloat(order.subprice);
      });
   },
   methods: {
      getImageUrl(imageName) {
         return require('../../assets/image/food/' + imageName);
      },
      async addOrder() {
         const formData = new FormData();
         formData.append('customer_name', this.cname);
         formData.append('payment_method', this.paymentmethod);
         formData.append('delivery_method', this.deliverymethod);
         formData.append('address', this.caddress);
         formData.append('phone_num', this.cpnumber);
         formData.append('order', JSON.stringify(this.orders));
         formData.append('userid', localStorage.getItem('userid'));

         // Log form data values
         for (let [key, value] of formData.entries()) {
            console.log(key, value);
         }

         try {
            const response = await fetch('http://localhost:8080/addOrder', {
               method: 'POST',
               body: formData
            });

            if (response.ok) {
               alert('Order added successfully');
               console.log(response);
               console.log(formData.order);
               console.log(formData.address);
               // window.location.href = "/user/MenuCart";
            } else {
               const result = await response.json();
               alert('Failed to add order: ' + result.message);
            }
         } catch (error) {
            console.error('Error:', error);
            alert('Failed to add order');
         }
      }
   }
};
</script>


<style scoped>
.paymentimg {
   width: 100px;
   height: 70px;
   margin: 0;
   margin-right: 25px;
}

.form {
   text-align: left;
   width: 85%;
   background-color: #fdf3dd;
   border-radius: 20px 20px 20px 20px;
   margin: 40px;
}

.orange {
   color: #ef601e;
}

.payment {
   width: 55%;
   display: flex;
   flex-direction: column;
   align-items: center;
   border-radius: 20px 20px 20px 20px;
}

.ordersummary {
   border-radius: 20px 20px 20px 20px;
   display: flex;
   flex-direction: column;
   width: 45%;
}

body {
   width: 100%;
   background-image: url("../../assets/image/bck.png");
   padding:30px;
}

.content {

   width: 100%;
}

.background {
   margin: 10% auto;
   border-radius: 20px 20px 20px 20px;
   width: 85%;
   display: flex;
   flex-direction: row;
   background-color: white;
   min-width: 900px;
}

.option input[type="radio"],
.option2 input[type="radio"] {
   display: none;
}

.option input[type="radio"]:checked+label>img {
   border: 2px solid grey;
}

.payment form {
   margin: 20px 100px;
}

.personalinformation {
   display: flex;
   flex-direction: column;
   margin-top: 25px;
}

.personalinformation input {
   margin-top: 5px;
   margin-bottom: 15px;
   padding: 10px;
}

h1 {
   color: #383072;
   font-size: 25px;
   text-align: left;
}

h2{
   font-size:20px;
   margin:10px 0px;
}

.pickup,
.Delivery {
   border: 2px solid #f85959;
   background-color: white;
   margin: 0;
   padding: 15px 30px;
}

.option2 {
   display: flex;
   flex-direction: row;
}

.option2 input[type="radio"]:checked+label>p {
   border: 2px solid #ff3131;
   background-color: #ef601e;
   color: white;
}

.margin-right {
   margin-right: 25px;
}

.buttonnn {
   background-color: #383072;
   border: none;
   padding: 10px 15px;
   color: white;
   font-size: 16px;
   border-radius: 5px;
   margin-top: 20px;
   cursor: pointer;
}

.buttonnn:hover {
   background-color: red;
}

.buttoncenter {
   display: flex;
   justify-content: center;
}

.order {
   border-radius: 10px;
   border: 3px solid #eff0f2;
   padding: 20px 30px;
}

.item {
   display: flex;
   flex-direction: row;
   margin-bottom: 25px;
}

.roundedimg {
   border-radius: 5px;
   width: 100px;
   height: auto;
}

.orderpadding {
   margin: 40px 70px;
}

.orderdescription {
   margin-left: 20px;
   line-height: 5px;
   text-align: left;
}

.totalcontainer {
   display: flex;
   justify-content: flex-end;
   color: #ff3131;
}

#total {
   color: #ff3131;
}

.orderdescription p{
   line-height: 1;
}


@media (max-width: 768px) {
   .order {
     padding: 10px 15px;
     border: none;
   }
 }
   
</style>
