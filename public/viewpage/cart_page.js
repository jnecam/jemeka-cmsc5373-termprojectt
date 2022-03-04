import { MENU, root } from "./elements.js";
import { ROUTE_PATHNAMES } from "../controller/route.js";


export function addEventListeners() {
  MENU.Cart.addEventListener('click', async() => {
    history.pushState(null, null, ROUTE_PATHNAMES.CART);

    await cart_page();
  });
}

export async function cart_page() {
  root.innerHTML = '<h1>Cart Page</h1>'
}