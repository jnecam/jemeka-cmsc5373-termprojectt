import {
    root
} from "./elements.js";

export function product_details_page(product) {

    let html = '<h1>Product details</h1>';

    html += buildProductDetailView();

    root.innerHTML = html;

}

function buildProductDetailView() {
    return `
<div class="row">
        <div class="col-md-8 col-lg-6 mx-auto my-4">
            <div class="row">
                <div class="col-6 px-0">
                    <img src="https://images.unsplash.com/photo-1648663056968-2d3134ba2310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="product image" class="img-fluid">
                </div>
                <div class="col-6 py-3">
                    <p class="text-muted mb-1">
                        <ion-icon name="bookmark"></ion-icon> food</p>
                    <h4 class="text-dark">Product name goes here</h4>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>$450</h2>
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
                        <form action="#" style="width: 150px">
                            <div class="input-group">
                                <button class="btn btn-light border-light" type="button" id="button-addon1">
                                    <ion-icon name="remove"></ion-icon>
                                </button>
                                <input type="text" class="form-control border-light" placeholder="Qty" aria-describedby="button-addon1">
                                <button class="btn btn-light border-light" type="button" id="button-addon1">
                                    <ion-icon name="add"></ion-icon>
                                </button>
                            </div>
                        </form>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aperiam error pariatur consequatur, quidem accusamus reiciendis? Nesciunt explicabo corrupti voluptatibus neque eligendi, a ducimus quas ut dignissimos ipsum
                                reiciendis sapiente!</p>
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