const bannedList = ["secret"]
const storageKey = "storage"

const addKeyWord = async (inputWord) => {
    let currList = await getKeyWords();
    currList.push(inputWord);
    await chrome.storage.local.set({ [storageKey]: currList });
};

const removeKeyWord = async (inputWord) => {
    let currList = await getKeyWords();
    const newList = currList.filter((word) => word !== inputWord);
    await chrome.storage.local.set({ [storageKey]: newList });
};

async function getKeyWords() {
    let result  = await chrome.storage.local.get([storageKey]); // Returns object with key-value pair.
    return result[storageKey] || []; // Specifies access to content of object with key.
}

document.addEventListener("DOMContentLoaded", () => {});
