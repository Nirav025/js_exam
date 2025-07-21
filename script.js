

let productList = JSON.parse(localStorage.getItem("productList"));


let productData = productList || [];

const submitData = document.querySelector("#submitData");

submitData.addEventListener("submit", (e) => {


    e.preventDefault();

    const name = document.querySelector("#name").value;
    const category = document.querySelector("#category").value;
    const price = document.querySelector("#price").value;
    const url = document.querySelector("#url").value;

    let id = productData.length + 1;

    product = {
        id,
        name,
        category,
        price,
        url,
    };

    productData.push(product);

    localStorage.setItem("productList", JSON.stringify(productData));

    alert("Product Added.....")

    location.reload();

    show();
});








let searchItem = "" ;
let sortItem = "" ;




document.querySelector("#searchInput").addEventListener('input', (e) => {
    console.log(e.target.value);
    searchItem = e.target.value;
    show() 
    
})



document.querySelector('#sorting').addEventListener('change', (e) => {
    sortItem = e.target.value;
    show()
})







function show() {


     const filterProduct = productData.filter((product) => {
        return product.name.toLowerCase().includes(searchItem.toLowerCase())
    })



    filterProduct
    .sort((a,b) => {
        console.log(`a = ${a.mobile}, b = ${b.mobile}`);

        if(sortItem == 'asc'){
            return a.price - b.price
        }else if(sortItem == 'desc'){
             return b.price - a.price   
        }
        
    })





    let output = "";

    console.log(productData);

    filterProduct?.forEach((product) => {
        output += `

     <div class="card col-xl-3 col-lg-3 col-md-4 m-4" style="width: 18rem;">

                <img src="${product.url}" class="card-img-top" alt="Product Image">

                <div class="card-body">

                    <h5 class="card-title">Product Name : ${product.name}</h5>
                    
                </div>

                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Category : ${product.category}</li>
                    <li class="list-group-item">Price : ${product.price}</li>
                </ul>

                <div class="card-body">
                   <button class="btn btn-danger"onclick="trash(${product.id})"><i class="fa-solid fa-trash"></i></button>
                   <button class="btn btn-warning" onclick="update(${product.id})"><i class="fa-solid fa-pen"></i></button>
                    
                </div>  
            </div>

    
    `;
    });

    document.querySelector("#showproduct").innerHTML = output;
}

show();






function trash(id) {


    let filteredData = productData.filter((product) => {
        return product.id !== id;
    });

    console.log(filteredData);

    localStorage.setItem("productList", JSON.stringify(filteredData));

    alert("Producrt Deleted...")

    location.reload();
}







function update(id) {


    document.querySelector("#submit").style.display = "none";
    document.querySelector("#update").style.display = "block";


    const name = document.querySelector("#name");
    const category = document.querySelector("#category");
    const price = document.querySelector("#price");
    const url = document.querySelector("#url");







    let updateProduct = productData.find((product) => {


        return product.id === id;


    });

    name.value = updateProduct.name;
    category.value = updateProduct.category;
    price.value = updateProduct.price;
    url.value = updateProduct.url;







    document.querySelector("#update").addEventListener("click", () => {

        alert("Product Updated...")

        const name = document.querySelector("#name").value;
        const category = document.querySelector("#category").value;
        const price = document.querySelector("#price").value;
        const url = document.querySelector("#url").value;


        newproduct = {
            id,
            name,
            category,
            price,
            url,
        };




        let index = productData.findIndex((product) => {
            return product.id === id;
        });


        productData[index] = newproduct

        localStorage.setItem('productList', JSON.stringify(productData))


        show();

        location.reload()


    });



    show();
}
