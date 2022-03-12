import { MENU, root } from "./elements.js";
import { ROUTE_PATHNAMES } from "../controller/route.js";
import { getAccountInfo } from "../controller/firestore_controller.js";
import { currentUser } from "../controller/firebase_auth.js";
import { info } from "./util.js";
import { DEV } from "../model/constants.js";

export let accountInfo = null;

export function addEventListeners() {
  MENU.Profile.addEventListener('click', async() => {
    history.pushState(null, null, ROUTE_PATHNAMES.PROFILE);

    await profile_page();
  });
}

export async function profile_page() {
  if (!currentUser) {
    root.innerHTML = '<h2>Protected Page</h2>'
    return;
  }
  let html = '<h1>Profile Page</h1>';

  if (!accountInfo) {
    html += `
        <h2>Failed to retrieve account info for ${currentUser.email}</h2>
    `;
    root.innerHTML = html;
    return;
  }

  html += `
      <div class="alert alert-primary">
      Email: ${currentUser.email} (Cannot change email as a login name)
      </div>
  `;

  html += `
  <form id=form-update-profile " method="post ">
  <table class="table ">
    <tbody>
      <tr>
        <td width="15% ">Name:</td>
        <td>
          <input type="text " name="name " value="${accountInfo.name} " disabled>
        </td>
      </tr>
      <tr>
        <td width="15% ">Address:</td>
        <td>
          <input type="text " name="name " value="${accountInfo.address} " disabled>
        </td>
     </tr>
     <tr>
      <td width="15% ">City:</td>
      <td>
        <input type="text " name="name " value="${accountInfo.city} " disabled>
      </td>
     </tr>
     <tr>
      <td width="15% ">State:</td>
      <td>
        <input type="text " name="name " value="${accountInfo.state} " disabled>
      </td>
     </tr>
     <tr>
      <td width="15% ">Zip:</td>
      <td>
        <input type="text " name="name " value="${accountInfo.zip} " disabled>
      </td>
     </tr>
     <tr>
      <td width="15% ">Credit Card #:</td>
      <td>
        <input type="text " name="name " value="${accountInfo.creditNo} " disabled>
      </td>
     </tr>
    </tbody>
  </table>
</form> 
  `;

  root.innerHTML = html;


}
export async function readAccountProfile() {
  try {
    accountInfo = await getAccountInfo(currentUser.uid)
  } catch (e) {
    if (DEV) console.log(e);
    info(`Failed to retrieve account info for ${currentUser.email}`, JSON.stringify(e));
    accountInfo = null;
    return;
  }
  MENU.Profile.innerHTML = `
      <img src="${accountInfo.photoURL}" class="rounded-circle" height="30px">
  `;
}