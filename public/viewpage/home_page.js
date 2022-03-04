import { MENU, root } from "./elements.js";
import { ROUTE_PATHNAMES } from "../controller/route.js";
import * as Util from './util.js';
import { getProductList } from "../controller/firestore_controller.js";
import { DEV } from "../model/constants.js";

export function addEventListeners() {
  MENU.Home.addEventListener('click', async() => {
    history.pushState(null, null, ROUTE_PATHNAMES.HOME);
    const label = Util.disableButton(MENU.Home);
    await home_page();
    Util.enableButton(MENU.Home, label);
  });
}

export async function home_page() {

  let html = '<h1>Enjoy Shopping</h1>'
  let products;

  try {
    products = await getProductList();

  } catch (e) {
    if (DEV) console.log(e);
    Util.info('Failed to get product list', JSON.stringify(e));

  }

  for (let i = 0; i < products.length; i++) {
    html += buildProductView(products[i], )
  }

  root.innerHTML = '<h1>Home Page</h1>'

}