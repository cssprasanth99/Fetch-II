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

const sortProducts = () => {

    let sortOption = sortBtn.value;
    let priceArr = [];
    let sortedData;
    console.log(sortOption);
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (sortOption === "low-high") {
                sortedData = data.filter((ele) => {
                    console.log(ele.price);
                    priceArr.push(ele.price);
                })
            }
        }).catch(() => {
            alert("An error occurred while fetching the products!");
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