
Vue.component('product', {
    template: `
   <div class="product">
        <div class="product-image">
      <img :src="image" :alt="altText">
    </div>

    <div class="product-info">

      <h1>{{ title }}</h1>

      <div class="stock">
        <p v-if="inventory > 10" :class="{disabledStock: !inStock}">In stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0" :class="{disabledStock: !inStock}">Almost sold out!</p>
        <p v-else :class="{disabledStock: !inStock}">Out of stock</p>
      </div>

      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>

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

      <div class="link">
        <a :href="link">More products like this</a>
      </div>

      <div class="cart">
        <p>Cart({{ cart }})</p>
      </div>
      <div style="display: flex">
        <button
                class="butt"
                @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
        >
          Add
        </button>
        <button
                class="butt"
                @click="lessFromCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
        >
          Less</button>
      </div>

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
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
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
        }
    },
    methods: {
        addToCart() {
            if (this.cart < this.inventory) {
                this.cart += 1
            }
        },
        lessFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
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
        }
        // как понять что является вычисляемым свойством, а что методоми?
    }

})

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})
