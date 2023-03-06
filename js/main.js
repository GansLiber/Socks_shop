let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        selectedVariant: 0,
        brand: 'Vue',
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inventory: 6,
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
            this.selectedVariant=index
            // как кубикам присвоено 0 и 1, от куда это?
        }
    },

    computed: {
        title() {
            return this.brand + ' Gabella ' + this.product;
        },
        image() {
            return  this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale){
                return this.brand + ' ' + this.product + ' ON SALE!'
            }
        }
        // как понять что является вычисляемым свойством, а что методоми?
    }
})

Vue.component('product', {
    template: `
   <div class="product">
    // Здесь будет весь HTML-код, который раньше был в элементе с классом product
   </div>
 `
})

