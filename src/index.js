function LoadProducts(url) {
    document.querySelector("main").innerHTML = "";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            products.map(function (product) {
                var card = document.createElement("div");
                card.className = "card m-2 p-2";
                card.style.width = "200px";
                card.innerHTML = `
                <img src=${product.image} class="card-img-top" height="150">
                <div class="card-header" style="height:140px">
                    <p>${product.title}</p>
                </div>
                <div class="card-body">
                    <dl>
                        <dt>Price</dt>
                        <dd>${product.price}</dd>
                        <dt>Rating</dt>
                        <dd> <span class="bi bi-star-fill text-success"></span> ${product.rating.rate} [${product.rating.count}]</dd>
                    </dl>
                </div>
                <div class="card-footer">
                    <button onclick="AddToCartClick(${product.id})" class="btn btn-danger w-100">
                        <span class="bi bi-cart3"> </span> Add to Cart
                    </button>
                </div>
             `;
                document.querySelector("main").appendChild(card);
            })
        })
}
function LoadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
        .then(function (response) {
            return response.json();
        })
        .then(function (categories) {
            categories.unshift("all");
            categories.map(function (category) {
                var option = document.createElement("option");
                option.text = category.toUpperCase();
                option.value = category;

                document.getElementById("lstCategories").appendChild(option);
            })
        })
}
function bodyload() {
    LoadProducts("https://fakestoreapi.com/products");
    LoadCategories();
    GetCartCount();
}
function CategoryChanged() {
    var categoryName = document.getElementById("lstCategories").value;
    if (categoryName == "all") {
        LoadProducts("https://fakestoreapi.com/products");
    } else {
        LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}
var cartItems = [];
function GetCartCount() {
    document.getElementById("cartCount").innerHTML = cartItems.length;
}
function AddToCartClick(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (product) {
            cartItems.push(product);
            alert(`Add to Cart\n${product.title}\nAdded to Cart`);
            GetCartCount();
        })
}
function LoadCartItems() {
    document.querySelector("tbody").innerHTML = "";
    for (var item of cartItems) {
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPreview = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;
        tdPreview.innerHTML = `<img width="50" height="50" src=${item.image}>`;

        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPreview);

        document.querySelector("tbody").appendChild(tr);
    }
}