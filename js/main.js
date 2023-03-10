let eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
   <div class="product">
        <div id="axis" class="one">
            <img :src="image" :alt="altText" class="img van duplicate">
            <img :src="image" 
                 :alt="altText" 
                 :class="{ moveRight:animate }"
                 @animationend="animationEnd"
                 id="img" 
                 class="img van">
        </div>

    <div class="product-info">

      <h1>{{ title }}</h1>

      <div class="stock">
        <p v-if="inventory > 10" :class="{disabledStock: !inStock}">In stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0" :class="{disabledStock: !inStock}">Almost sold out!</p>
        <p v-else :class="{disabledStock: !inStock}">Out of stock</p>
      </div>

      <product-details></product-details>

      <div
              class="color-box"
              v-for="(variant, index) in variants"
              :key="variant.variantId"
              :style="{backgroundColor:variant.variantColor}"
              @mouseover="updateProduct(index)"
      >
      </div>

      <div class="sizes" v-for="size in sizes">
        <p>{{size}}</p>
      </div>

      <div class="onSale">
        <span>{{sale}}</span>
      </div>
      
      <p>Shipping: {{ shipping }}</p>

      <div class="link">
        <a :href="link">More products like this</a>
      </div>

      <div style="display: flex">
        <button
                class="butt-add"
                @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
        >
          Add
        </button>
        <button
                class="butt"
                @click="lessToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
        >
          Less</button>
      </div>

        <product-tabs :reviews="reviews"></product-tabs>

    </div>
   </div>
 `,
    data() {
        return {
            product: "Socks",
            selectedVariant: 0,
            brand: 'Vue',
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 11,
            onSale: true,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
            reviews: [],
            animate: false
        }
    },
    methods: {
        animationImg(value) {
            return this.animate = value
        },
        animationEnd(){
            this.animationImg(false)
        },
        addToCart() {
            this.animationImg(true)
            if (this.cart < this.inventory) {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
            }
            console.log(this.animate)
        },
        lessToCart() {
            if (this.cart < this.inventory) {
                this.$emit('less-to-cart', this.variants[this.selectedVariant].variantId);
            }
        },
        updateProduct(index) {
            this.selectedVariant = index
            // как кубикам присвоено 0 и 1, от куда это?
        }

    },
    computed: {
        title() {
            return this.brand + ' Gabella ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' ON SALE!'
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

        // как понять что является вычисляемым свойством, а что методоми?
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    },
})
Vue.component('product-details', {
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        };
    },
})
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>

 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>

 <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>
 
 <p>
    <label for="liking">Would you recommend this product?</label>
    <div style="float: left">
        <label for="liking">yes</label>
        <input v-model.number="liking" id="liking" type="radio" name="but" value="yes">
    </div>
    <div style="float: left">
        <label for="liking">no</label>
        <input v-model.number="liking" id="liking" type="radio" name="but" value="no">
</div>
</p>

 <p>
   <input type="submit" value="Submit"> 
 </p>

</form>


 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            liking: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    liking: this.liking
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.liking = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.liking) this.errors.push("Not liked")
            }
        }

    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },

    template: `
     <div>   
       <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
       </ul>
       <div v-show="selectedTab === 'Reviews'">
         <p v-if="!reviews.length">There are no reviews yet.</p>
         <ul>
           <li v-for="review in reviews">
           <p>{{ review.name }}</p>
           <p>Rating: {{ review.rating }}</p>
           <p>{{ review.review }}</p>
           </li>
         </ul>
       </div>
       <div v-show="selectedTab === 'Make a Review'">
         <product-review></product-review>
       </div>
     </div>
`,

    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'  // устанавливается с помощью @click
        }
    },
    methods: {}
})


let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            // !!!
            this.cart.push(id);
        },
        lessFromCart(id) {
            this.cart.pop(id);
        },
    }
})