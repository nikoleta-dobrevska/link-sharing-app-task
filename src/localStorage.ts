import { LOCAL_STORAGE_UPDATED_CUSTOM_EVENT } from "@/constants";

export function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key);
}

export function setLocalStorageItem(key: string, value: string) {
  window.localStorage.setItem(key, value);

  window.dispatchEvent(
    new CustomEvent(LOCAL_STORAGE_UPDATED_CUSTOM_EVENT, { detail: { key } })
  );
}

export function removeLocalStorageItem(key: string) {
  window.localStorage.removeItem(key);

  window.dispatchEvent(
    new CustomEvent(LOCAL_STORAGE_UPDATED_CUSTOM_EVENT, { detail: { key } })
  );
}
