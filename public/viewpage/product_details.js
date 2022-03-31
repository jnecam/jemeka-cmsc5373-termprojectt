import {
    CART_SUBMITTER
} from "../model/constants.js";
import {
    cart
} from "./cart_page.js";

import {
    MENU,
    root
}
from "./elements.js";
import {
    updateCart
} from "./home_page.js";

export function product_details_page({
    categories,
    product
}) {

    let html = '<h1>Product details</h1>';

    html += buildProductDetailView(product, categories);

    root.innerHTML = html;

    // handle product cart form event listener
    handleProductCartFormEvent(product);

}

function buildProductDetailView(product, categories) {
    const category = categories.find(cat => cat.docId === product.categoryId);
    let total = 0;
    return `
    <div class="row">
        <div class="col-md-10 col-lg-8 mx-auto my-4">
            <div class="row bg-white">
                <div class="col-6 px-0">
                    <img src="${product.imageURL}" alt="${product.imageName}" class="img-fluid">
                </div>
                <div class="col-6 py-3 ">
                    <p class="text-muted mb-1">
                        <ion-icon name="bookmark"></ion-icon> ${category.name}</p>
                    <h4 class="text-dark">${product.name}</h4>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>$${product.price}</h2>
                        <div class="text-warning">
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                    </div>
                    <div class="mb-3 d-lg-flex justify-content-between">
                        <button class="btn btn-warning mb-lg-2">
                            <ion-icon name="cart"></ion-icon>
                            Add to cart
                        </button>
                        <div id="card style="width: 150px">
                            <form action="#" id="product-cart__form" class="input-group">
                                <button name="removeButton" class="btn btn-light border-light" type="submit"
                                id="button-addon1" onClick="${total = updateCart(CART_SUBMITTER.INC, product)}">
                                    <ion-icon name="remove"></ion-icon>
                                </button>
                                <input type="text" class="form-control border-light" name="qty" placeholder="Qty" aria-describedby="button-addon1" value="${total}" min="0">
                                <button class="btn btn-light border-light" type="submit" name="addButton" id="button-addon1" onClick="() => {total = updateCart(CART_SUBMITTER.INC, product)}">
                                    <ion-icon name="add"></ion-icon>
                                </button>
                            </form>
                        </div>
                    </div>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="home" aria-selected="true">Description</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab" aria-controls="profile" aria-selected="false">Reviews</button>
                        </li>
                    </ul>
                    <div class="tab-content px-2 py-3" id="myTabContent">
                        <div class="tab-pane fade show active text-secondary" id="description" role="tabpanel" aria-labelledby="home-tab">
                            <p>${product.summary}</p>
                        </div>
                        <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="profile-tab">
                            <!-- comment -->
                            <div class="d-flex my-2">
                                <div class="flex-shrink-0">
                                    <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user image" width="50" height="50">
                                </div>
                                <div class="flex-grow-1 ms-3 text-muted">
                                    <p class="mb-0">
                                        <strong class="small">Bless Darah</strong><br> This is some content from a media component. You can replace this with any content and adjust it as needed.
                                    </p>
                                    <button class="btn btn-link text-sm p-0 m-0 d-inline-flex align-items-center justify-content-center">
                                        <ion-icon name="pencil" size="small"></ion-icon>
                                        edit
                                    </button>
                                    <button class="btn btn-link text-sm text-danger p-0 m-0 d-inline-flex align-items-center justify-content-center">
                                        <ion-icon name="trash" size="small"></ion-icon>
                                        <span>delete</span>
                                    </button>
                                </div>
                            </div>
                            <!-- end comment -->

                            <!-- comment -->
                            <div class="d-flex my-2">
                                <div class="flex-shrink-0">
                                    <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user image" width="50" height="50">
                                </div>
                                <div class="flex-grow-1 ms-3 text-muted">
                                    <p class="mb-0">
                                        <strong class="small">Bless Darah</strong><br> This is some content from a media component. You can replace this with any content and adjust it as needed.
                                    </p>
                                    <button class="btn btn-link text-sm p-0 m-0 d-inline-flex align-items-center justify-content-center">
                                        <ion-icon name="pencil" size="small"></ion-icon>
                                        edit
                                    </button>
                                    <button class="btn btn-link text-sm text-danger p-0 m-0 d-inline-flex align-items-center justify-content-center">
                                        <ion-icon name="trash" size="small"></ion-icon>
                                        <span>delete</span>
                                    </button>
                                </div>
                            </div>
                            <!-- end comment -->

                            <!-- comment -->
                            <div class="d-flex my-2">
                                <div class="flex-shrink-0">
                                    <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user image" width="50" height="50">
                                </div>
                                <div class="flex-grow-1 ms-3 text-muted">
                                    <p class="mb-0">
                                        <strong class="small">Bless Darah</strong><br> This is some content from a media component. You can replace this with any content and adjust it as needed.
                                    </p>
                                    <div class="d-none">
                                        <button class="btn btn-link text-sm p-0 m-0 d-inline-flex align-items-center justify-content-center">
                                            <ion-icon name="pencil" size="small"></ion-icon>
                                            edit
                                        </button>
                                        <button class="btn btn-link text-sm text-danger p-0 m-0 d-inline-flex align-items-center justify-content-center">
                                            <ion-icon name="trash" size="small"></ion-icon>
                                            <span>delete</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <!-- end comment -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function handleProductCartFormEvent(product) {
    const cartForm = document.querySelector('#product-cart__form');
    // @ts-ignore
    const addButton = cartForm.addButton;
    // @ts-ignore
    const removeButton = cartForm.removeButton;

    addButton.addEventListener('click', event => {
        event.preventDefault();
        cart.addItem(product);
        // @ts-ignore
        const result = Number(cartForm.qty.value) + 1;
        // @ts-ignore
        cartForm.qty.value = result < 1 ? 0 : result;
        // document.getElementById(`item-count-${product.docId}`).innerHTML = result.toString();
        MENU.CartItemCount.innerHTML = `${cart.getTotalQty()}`;
    });
    removeButton.addEventListener('click', event => {
        event.preventDefault();
        cart.removeItem(product);
        // @ts-ignore
        const result = Number(cartForm.qty.value) - 1;
        // @ts-ignore
        cartForm.qty.value = result < 1 ? 0 : result;
        // document.getElementById(`item-count-${product.docId}`).innerHTML = result.toString();
        MENU.CartItemCount.innerHTML = `${cart.getTotalQty()}`;
    });

    cartForm.addEventListener('submit', event => {
        event.preventDefault();
    });
}