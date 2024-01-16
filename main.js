const btnCart = document.querySelector('.container-icon')
const containerCartProducts=document.querySelector('.container-cart-products')


btnCart.addEventListener('click', () =>{
    containerCartProducts.classList.toggle('hidden-cart')
})

/*==================================================================*/

const carInfo=document.querySelector('.cart-product')
const rowProduct=document.querySelector('.row-product')

// lista de todos los contenedores de productos

const productList = document.querySelector('.container-items')

// variable de arreglos de Productos

let allProducts=[]

const valortotal =document.querySelector('.total-pagar')

const countProducts =document.querySelector('#contador-productos')



productList.addEventListener('click', e => {
let product;
let infoProduct;


    if(e.target.classList.contains('btn-add-cart')){ //para buscar en formato true
        /* if(product){
    console.log(product.querySelector('h2').textContent)  MANERA DE CHECAR EL CODIGO 😁
    }*/

    product= e.target.parentElement
    infoProduct={
        cantidad: 1,
        titulo: product.querySelector('h2').textContent,
        precio: product.querySelector('p').textContent,
    };

    const exist = allProducts.some(product => product.titulo === infoProduct.titulo)


    if(exist){
        const products =allProducts.map(product => {
            if(product.titulo === infoProduct.titulo){
                product.cantidad++;
                return product
            }else{
                return product
            }
        })

        allProducts =[...products]
    }else{
        allProducts.push(infoProduct);
    }
    showHTML();
        
    }
// console.log(allProducts)

})

rowProduct.addEventListener('click', (e) =>{
    if(e.target.classList.contains('icon-close')){
        const product= e.target.parentElement
        const title = product.querySelector('p').textContent

        allProducts =allProducts.filter(
            product => product.titulo !== title
            );
    };

    console.log(allProducts)
    showHTML();
})

//funcion para mostrar HTML

const showHTML= () => {

    if(!allProducts.length){
        containerCartProducts.innerHTML=`
            <p class="cart-empty"> El carrito esta vacio</p> `
    }

    //limpiar html

    rowProduct.innerHTML='';

    let total = 0;
    let totalOfProducts =0;

    allProducts.forEach (product => {
    const containerProduct = document.createElement('div')
    containerProduct.classList.add('cart-product')
    containerProduct.innerHTML =`
    
    <div class="info-cart-product">
            <span class="cantidad-producto-carrito">${product.cantidad}</span>
            <p class="titulo-producto-carrito">${product.titulo}</p>
            <span class="precio-producto-carrito">${product.precio}</span>
    </div>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        `

        rowProduct.append(containerProduct);

        total = total + (product.cantidad * parseFloat(product.precio.slice(1)));
        totalOfProducts = totalOfProducts + product.cantidad;

    });
    
    valortotal.innerText = `$${total}`
    countProducts.innerText =totalOfProducts;
    


};