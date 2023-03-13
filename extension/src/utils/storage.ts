function setStorageItem(key: string, value: object) {
  if (chrome?.storage) {
    chrome.storage.local.set({ [key]: value });
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

async function getStorageItem(key: string) {
  if (chrome?.storage) {
    const result = await chrome.storage.local.get(key);
    return result.location;
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

function removeStorageItem(key: string) {
  if (chrome?.storage) {
    chrome.storage.local.remove(key);
  } else {
    localStorage.removeItem(key);
  }
}

export { setStorageItem, getStorageItem, removeStorageItem };
