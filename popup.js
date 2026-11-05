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

async function renderKeywords(){
    const box = document.getElementById("keywordList"); // get effected element
    box.innerHTML = ""; // clean wipe of elements

    let list = await getKeyWords();
    list.forEach((keyword) => {
        // Create div for each keyword
        const keywordBox = document.createElement("div");
        keywordBox.textContent = keyword;

        // Remove button, styling, appended to container.
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-sm ml-2";
        keywordBox.appendChild(removeButton);

        removeButton.addEventListener("click", async () => {
            await removeKeyWord(keyword);
            renderKeywords(); // redraw the list
        });

        // add created div to main keyword container
        box.appendChild(keywordBox);
    });
}

async function addKeyWordButton(){
    const input = document.getElementById("addField");
    const button = document.getElementById("addButton");
    
    button.addEventListener("click", async () => {
        await addKeyWord(input.value); // Calls addKeyWord to input value in field.
        input.value = "";
        renderKeywords();
    });
}

addKeyWordButton();
renderKeywords();