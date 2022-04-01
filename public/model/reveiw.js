import {
    currentUser
} from "../controller/firebase_auth.js";

export class Review {
    constructor(data) {
        if (data) {
            this.stars = Number(data.stars) || 0;
            this.review = data.review.trim();
            this.user = currentUser.email;
            this.productId = data.productId;
        }
    }
    clone() {
        const copyData = this.serialize();
        const review = new Review(copyData);
        review.set_docId(this.docId);
        return review;
    }


    set_docId(id) {
            this.docId = id;
        }
        //  toFirestore data format, etc
    serialize() {
        return {
            stars: this.stars,
            review: this.review,
            user: this.user,
            productId: this.productId
        };
    }
}