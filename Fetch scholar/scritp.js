const searchBtn = document.querySelector(".search-btn");
const productInput = document.querySelector(".product-input");
const productInfo = document.querySelector(".products-info");
const sortBtn = document.querySelector(".sort-btn");

let url = "https://fakestoreapi.com/products";

searchBtn.addEventListener("click", () => {
    searchProducts();
})

sortBtn.addEventListener("change", () => {
    sortProducts();
})

function sortProducts() {
    productInfo.innerHTML = "";
    // Fetch products from the API
    let sortValue = sortBtn.value;
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            // Sort products by price in ascending order
            if (sortValue === "low-high") {
                const sortedLowToHigh = data.sort((a, b) => a.price - b.price);
                console.log('Sorted by price low to high:', sortedLowToHigh);
                showProducts(sortedLowToHigh);
            }
            // Sort products by price in descending order
            else {
                const sortedHighToLow = data.sort((a, b) => b.price - a.price);
                console.log('Sorted by price high to low:', sortedHighToLow);
                showProducts(sortedHighToLow);
            }
        })

        .catch(error => {
            console.error('Error fetching products:', error);
        });
}


const searchProducts = () => {
    const productName = productInput.value.toLowerCase();

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const filteredProducts = data.filter((product) => {
                return product.title.toLowerCase().includes(productName);
            });

            console.log(filteredProducts);

            productInfo.innerHTML = '';

            if (filteredProducts.length > 0) {
                showProducts(filteredProducts);
            } else {
                productInfo.innerHTML = `<h4>No matching products found.</h4>`;
            }
        })
        .catch(() => {
            alert("An error occurred while fetching the products!");
        });
}


const getProductData = () => {
    fetch(url).then((res) => res.json()).then((data) => {
        console.log(data);
        showProducts(data);
    }).catch(() => {
        alert("An error occurred while fetching the products!");
    })
}

const showProducts = (data) => {

    data.forEach((ele) => {
        let div = document.createElement("div");
        let title = document.createElement("h4");
        let price = document.createElement("h4");
        let img = document.createElement("img");
        let buy = document.createElement("button")


        div.className = "product-card";
        title.innerText = ele.title;
        price.innerText = ele.price;
        img.src = ele.image;
        buy.innerText = "Buy";
        buy.className = "buy";
        title.className = "product-title";

        div.append(img, title, price, buy);
        productInfo.append(div);
    })

}

getProductData();