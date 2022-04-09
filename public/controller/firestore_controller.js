import {
    getFirestore,
    query,
    collection,
    orderBy,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    deleteDoc,
    where,
    doc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js"
import {
    AccountInfo
} from "../model/account_info.js";
import Category from "../model/category.js";
import {
    COLLECTION_NAMES
} from "../model/constants.js";
import {
    Product
} from "../model/product.js";
import {
    ShoppingCart
} from "../model/shopping_cart.js";

const db = getFirestore();

export async function getProductList() {
    const products = [];
    const q = query(collection(db, COLLECTION_NAMES.PRODUCT), orderBy('name'));
    const snapShot = await getDocs(q);

    snapShot.forEach(doc => {
        const p = new Product(doc.data());
        p.set_docId(doc.id);
        products.push(p);
    });
    return products;
}

export async function getCategoryList() {
    const categories = [];
    const q = query(collection(db, COLLECTION_NAMES.CATEGORIES), orderBy('name'));
    const snapShot = await getDocs(q);

    snapShot.forEach(doc => {
        const p = new Category(doc.data());
        p.set_docId(doc.id);
        categories.push(p);
    });
    return categories;
}

export async function checkout(cart) {
    const data = cart.serialize(Date.now());
    await addDoc(collection(db, COLLECTION_NAMES.PURCHASE_HISTORY), data);
}

export async function getPurchaseHistory(uid) {
    const q = query(collection(db, COLLECTION_NAMES.PURCHASE_HISTORY),
        where('uid', '==', uid),
        orderBy('timestamp', 'desc'));
    const snapShot = await getDocs(q);

    const carts = [];
    snapShot.forEach(doc => {
        const sc = ShoppingCart.deserialize(doc.data());
        carts.push(sc);
    });
    return carts;
}

export async function getAccountInfo(uid) {
    const docRef = doc(db, COLLECTION_NAMES.ACCOUNT_INFO, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return new AccountInfo(docSnap.data());
    } else {
        const defaultInfo = AccountInfo.instance();
        const accountDocRef = doc(db, COLLECTION_NAMES.ACCOUNT_INFO, uid);
        await setDoc(accountDocRef, defaultInfo.serialize());
        return defaultInfo;
    }
}

export async function updateAccountInfo(uid, updateInfo) {
    // updateInfo = {key: value}
    const docRef = doc(db, COLLECTION_NAMES.ACCOUNT_INFO, uid);
    await updateDoc(docRef, updateInfo);
}


/**
 * Manage Revies
 * */
export async function addReview(reviewData) {
    const docRef = await addDoc(collection(db, COLLECTION_NAMES.REVIEW), reviewData);
    return docRef.docId;
}

export async function updateReview(reviewData) {
    try {
        const q = query(collection(db, COLLECTION_NAMES.REVIEW), where("uid", "==", reviewData.docId));
        const docRef = doc(db, COLLECTION_NAMES.REVIEW, reviewData.docId);
        await updateDoc(docRef, reviewData);
        return;
    } catch (err) {
        console.log("error: ", err);
        return;
    }
}

/**
 * Delete a review
 * @param {string} docId document id
 * @returns boolean
 */
export async function deleteReview(docId) {
    try {
        // const q = query(collection(db, COLLECTION_NAMES.REVIEW), where("uid", "==", docId));
        const docRef = doc(db, COLLECTION_NAMES.REVIEW, docId);
        await deleteDoc(docRef);
        return true;
    } catch (err) {
        console.log("error: ", err);
        return;
    }
}

/**
 * Delete a review
 * @param {string} docId document id
 * @returns boolean
 */
export async function getReview(docId) {
    try {
        const docRef = query(collection(db, COLLECTION_NAMES.REVIEW), where("uid", "==", docId));
        // const docRef = doc(db, COLLECTION_NAMES.REVIEW, docId);
        await getDoc(docRef);
        const review = {
            stars: doc.data().stars,
            review: doc.data().review,
            user: doc.data().user,
            productId: doc.data().productId,
            docId: doc.id
        };
        return review;
    } catch (err) {
        console.log("error: ", err);
        return;
    }
}

export async function getProductReviews(productId) {
    const q = query(collection(db, COLLECTION_NAMES.REVIEW), where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    const productReviews = [];
    querySnapshot.forEach(doc => {
        productReviews.push({
            stars: doc.data().stars,
            review: doc.data().review,
            user: doc.data().user,
            productId: doc.data().productId,
            docId: doc.id
        });
    });

    return productReviews;
}