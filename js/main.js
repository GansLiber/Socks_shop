let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        brand: 'Veu Mastery',
        image: "./assets/vmSocks-blue-onWhite.jpg",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: true,
        inventory: 6,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
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
        updateProduct(variantImage) {
            this.image = variantImage
        }
    },

    computed: {
        title() {
            return this.brand + ' Gabella ' + this.product;
        }
    }
})
