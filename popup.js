const bannedList = ["secret"]
const storageKey = "storage"

const addKeyWord = async (inputWord) => {
    let result  = await chrome.storage.local.get([storageKey]); // Returns object with key-value pair.
    const currList = result[storageKey] || []; // Specifies access to content of object with key.
    currList.push(inputWord);
    await chrome.storage.local.set({ [storageKey]: currList });
};

const removeKeyWord = (key) => {
    chrome.storage.local.remove(key);
};

const remove = () => {

};

const retrieveKeyWords = () => {

};

document.addEventListener("DOMContentLoaded", () => {});
