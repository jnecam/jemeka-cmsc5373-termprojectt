import {
    currentUser
} from "../controller/firebase_auth.js";
import {
    addReview,
    deleteReview,
    getProductReviews,
    updateReview
} from "../controller/firestore_controller.js";
import {
    CART_SUBMITTER,
    CRUD_MODE
} from "../model/constants.js";
import {
    Review
} from "../model/reveiw.js";
import {
    cart
} from "./cart_page.js";

import {
    MENU,
    reviewModal,
    root
}
from "./elements.js";
import {
    updateCart
} from "./home_page.js";
import {
    disableButton,
    enableButton
} from "./util.js";

var globalProduct, globalProductReviews, currentReview;

export async function product_details_page({
    categories,
    product
}) {

    globalProduct = product;
    globalProductReviews = await getProductReviews(product.docId);
    console.log('globalProductReviews: ', globalProductReviews);
    // console.log('product: ', product);

    let html = '<h1>Product details</h1>';

    html += buildProductDetailView(product, categories);

    root.innerHTML = html;

    // handle product cart form event listener

    handleProductCartFormEvent(globalProduct);
    handleReviewButtonEvent();
    handleCommentEvents();

}

function buildProductDetailView(product, categories) {
    const category = categories.find(cat => cat.docId === product.categoryId);
    const stars = renderStarRating();
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
                            ${stars.content}
                            <span class="text-secondary">${stars.averageRating} / 5</span>
                        </div>
                    </div>
                    <div class = "mb-3 justify-content-between ${currentUser ? 'd-lg-flex' : 'd-none'}">
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
                            <div class="my-2 ${currentUser ? 'd-block' : 'd-none'}">
                                <button class="btn btn-sm btn-secondary" id="btn-review">Review product</button>
                            </div>
                                <!-- comment -->
                            <div id="comments-container">
                                ${renderProductComments()}
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

function renderStarRating() {
    const totalRating = globalProductReviews.reduce((total, review) => total + review.stars, 0);
    const averageRating = Math.round(totalRating / globalProductReviews.length);
    let stars = '';
    for (let count = 0; count < averageRating; count++) {
        stars += '<ion-icon name="star"></ion-icon>';
    }
    for (let count = 0; count < (5 - averageRating); count++) {
        stars += '<ion-icon name="star-outline"></ion-icon>';
    }
    return {
        content: stars,
        averageRating
    };
}

function renderProductComments() {
    let html = '';
    globalProductReviews.forEach((review, reviewIndex) => {
        let extra = '';

        if (currentUser && currentUser.email === review.user) {
            console.log('matching values');
            extra = `
                <button class="btn btn-link text-sm p-0 m-0 d-inline-flex align-items-center justify-content-center edit-comment-btn" data-index="${reviewIndex}">
                    <ion-icon name="pencil" size="small"></ion-icon>
                    edit
                </button>
                <button class="btn btn-link text-sm text-danger p-0 m-0 d-inline-flex align-items-center justify-content-center delete-comment-btn" data-index="${reviewIndex}">
                    <ion-icon name="trash" size="small"></ion-icon>
                    <span>delete</span>
                </button>
            `;
        }

        html += `
            <div class="d-flex my-2">
                <div class="flex-shrink-0">
                    <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user image" width="50" height="50">
                </div>
                <div class="flex-grow-1 ms-3 text-muted">
                    <p class="mb-0">
                        <strong class="small">${review.user}</strong><br>
                        ${review.review}
                    </p>
                    ${extra}
                </div>
            </div>
        `;
    });

    return html;
}

function rerenderProductComments() {
    const commentsContainer = document.querySelector('#comments-container');
    commentsContainer.innerHTML = '';
    commentsContainer.innerHTML = renderProductComments();
    handleCommentEvents();
    // handleCoreEventListeners();
}

function handleCommentEvents() {
    const editButtons = Array.from(document.querySelectorAll('.edit-comment-btn'));
    const deleteButtons = Array.from(document.querySelectorAll('.delete-comment-btn'));

    editButtons.forEach(button => button.addEventListener('click', async event => {
        event.preventDefault();
        // @ts-ignore
        reviewModal.form.reset();
        reviewModal.form.dataset.crudeMode = CRUD_MODE.EDIT;

        // @ts-ignore
        const reviewIndex = event.target.dataset.index;
        currentReview = globalProductReviews.at(reviewIndex);

        /* set form values */
        // @ts-ignore
        reviewModal.form.review.value = currentReview.review;

        // check the appropriate star
        if (currentReview.stars > 0) {
            const activeButton = reviewModal.form.querySelector(`input[value="${currentReview.stars}"]`);
            // @ts-ignore
            activeButton.checked = true;
        }

        reviewModal.modal.show();
        handleReviewFormEvent();
    }));

    deleteButtons.forEach(button => button.addEventListener('click', async event => {
        event.preventDefault();

        // @ts-ignore
        const reviewIndex = event.currentTarget.dataset.index;
        currentReview = globalProductReviews.at(reviewIndex);

        const shouldDelete = confirm("Are you sure you want to delete this comment?");
        if (shouldDelete) {
            try {
                console.log('current review: ', currentReview);
                await deleteReview(currentReview.docId);
                // remove review from global review state
                globalProductReviews = globalProductReviews
                    .filter(review => review.docId !== currentReview.docId);

                // recompute average rating of the product
                // rerender reviews
                rerenderProductComments();
            } catch (err) {
                console.log('Error deleting review: ', err);
            }
        }

    }));
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

function handleReviewButtonEvent() {
    const reviewButton = document.querySelector('#btn-review');
    reviewButton.addEventListener('click', event => {
        event.preventDefault();
        reviewModal.form.dataset.crudeMode = CRUD_MODE.CREATE;
        reviewModal.title.textContent = "Create new product review";
        reviewModal.modal.show();
        handleReviewFormEvent();
    });
}

function handleReviewFormEvent() {
    const reviewForm = document.querySelector('#review-modal-form');
    const submitButton = reviewForm.querySelector('button');
    // @ts-ignore
    const crudMode = reviewForm.dataset.crudMode;

    reviewForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        // @ts-ignore
        const formData = {
            // @ts-ignore
            stars: event.currentTarget.stars.value,
            // @ts-ignore
            review: event.target.review.value,
            productId: globalProduct.docId
        };
        const reviewData = new Review(formData);
        try {
            const buttonLabel = disableButton(submitButton);

            if (crudMode === CRUD_MODE.EDIT) {
                const serializedData = {
                    ...reviewData.serialize(),
                    docId: globalProduct.docId
                };
                await updateReview(serializedData);
                globalProductReviews = await getProductReviews(globalProduct.docId);
                return;
            } else {
                await addReview(reviewData.serialize());
                globalProductReviews.unshift({
                    ...formData,
                    user: currentUser.email
                });
            }

            // @ts-ignore
            reviewForm.reset();
            enableButton(submitButton, buttonLabel);
            reviewModal.modal.hide();
            rerenderProductComments();
        } catch (err) {
            console.log('error: ', err);
        }
    });
}