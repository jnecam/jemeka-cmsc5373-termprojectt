import {
    MENU,
    root
} from "./elements.js";
import {
    ROUTE_PATHNAMES
} from "../controller/route.js";
import * as Util from './util.js';
import {
    getCategoryList,
    getProductList
} from "../controller/firestore_controller.js";
import {
    DEV
} from "../model/constants.js";
import {
    currentUser
} from "../controller/firebase_auth.js";
import {
    cart
} from "./cart_page.js";
import {
    product_details_page
} from "./product_details.js";

// Global variables
var products, categories;

export function addEventListeners() {
    MENU.Home.addEventListener('click', async() => {
        history.pushState(null, null, ROUTE_PATHNAMES.HOME);
        const label = Util.disableButton(MENU.Home);
        await home_page();
        Util.enableButton(MENU.Home, label);
    });
}

export async function home_page() {

    let html = '<h1>Enjoy Shopping</h1>';

    try {
        products = await getProductList();
        categories = await getCategoryList();

        if (cart && cart.getTotalQty() != 0) {
            cart.items.forEach(item => {
                const p = products.find(e => e.docId == item.docId);
                if (p) p.qty = item.qty;
            });
        }

    } catch (e) {
        if (DEV) console.log(e);
        Util.info('Failed to get product list', JSON.stringify(e));

    }

    for (let i = 0; i < products.length; i++) {
        html += buildProductView(products[i], i);
    }

    root.innerHTML = html;

    const productForms = document.getElementsByClassName('form-product-qty');
    for (let i = 0; i < productForms.length; i++) {
        productForms[i].addEventListener('submit', e => {
            e.preventDefault();
            const p = products[e.target.index.value];
            const submitter = e.target.submitter;
            if (submitter == 'DEC') {
                cart.removeItem(p);
                if (p.qty > 0) --p.qty;
            } else if (submitter == 'INC') {
                cart.addItem(p);
                p.qty = p.qty == null ? 1 : p.qty + 1;
            } else {
                if (DEV) console.log(e);
                return;
            }
            const updateQty = (p.qty == null || p.qty == 0) ? 'Add' : p.qty;
            document.getElementById(`item-count-${p.docId}`).innerHTML = updateQty;
            MENU.CartItemCount.innerHTML = `${cart.getTotalQty()}`;
        });
    }

    handleProductNameClickEvents();

}

function buildProductView(product, index) {
    const category = categories.find(cat => cat.docId === product.categoryId);
    return `
    <div class="card" style="width: 18rem; display: inline-block">
        <img src="${product.imageURL}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p>Category ${category.name}</p>
        <div class="card-text">
        <p class="text-primary product__name" data-product-id="${product.docId}">${Util.currency(product.price)}</p>
        <p> ${product.summary}</p>
       <br>
        </div>
        <div class="container pt-3 bg-light ${currentUser ? 'd-block' : 'd-none'}">
            <form method="post" class="form-product-qty">
                <input type="hidden" name="index" value="${index}">
                <button class="btn btn-outline-danger" type="submit" 
                onclick="this.form.submitter='DEC'">&minus;
                </button> 
                <div id="item-count-${product.docId}"
                  class="container rounded text-center text-white bg-primary d-inline-block w-50">
                ${product.qty == null || product.qty == 0 ? 'Add' : product.qty}
                </div>
                <button class="btn btn-outline-danger" type="submit" 
                onclick="this.form.submitter='INC'">&plus;
                </button> 
            </form>
        </div>
      </div>
    </div>
  `;
}

function handleProductNameClickEvents() {
    const productNames = Array.from(document.querySelectorAll('.product__name'));
    productNames.forEach(item => item.addEventListener('click', event => {
        const productId = event.currentTarget.dataset.productId;
        const product = products.find(p => p.docId === productId);
        product_details_page(product);
    }));
}

// function handleProductNameClickEvents() {
//   const productNames = Array.from(document.querySelectorAll('.product__name'));
//   productNames.forEach(item => item.addEventListener('click', event => {
//     const productId = event.currentTarget.dataset.productId;
//     const product = products.find(p => p.docId === productId);
//     product_details_page(product);
//   }));
// }