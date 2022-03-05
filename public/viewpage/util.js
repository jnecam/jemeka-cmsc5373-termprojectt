import { modalInfobox } from "./elements.js";

export function currency(value) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}


export function info(title, body, closeModal) {
  if (closeModal) closeModal.hide();
  modalInfobox.title.innerHTML = title;
  modalInfobox.body.innerHTML = body;
  modalInfobox.modal.show();
}

export function disableButton(button) {
  button.disabled = true;
  const originalLabel = button.innerHTML;
  button.innerHTML = 'Wait....';
  return originalLabel;
}

export function enableButton(button, label) {
  if (label) button.innerHTML = label;
  button.disabled = false;
}

//from stackoverflow
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));


}