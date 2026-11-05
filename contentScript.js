const storageKey = "storage"


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab)  => {
    // "tab" parameter by chrome : contains url
    let title = changeInfo.title;
    if (!title) return;
    let url = tab.url;
    let keyWords = await getKeyWords();


    const isMatch = keyWords.some((word) =>
        title.toLowerCase().includes(word.toLowerCase()) 
        || url.toLowerCase().includes(word.toLowerCase()));

    if(isMatch){
        chrome.history.deleteUrl({url: tab.url});
    }
})

async function deleteHistoryForKeyWords(){
    let keyWords = await getKeyWords();
    keyWords.forEach((keyword) => {
        chrome.history.search({startTime: 0, text: keyword, maxResults: 1000000}, (results) => {
            results.forEach((result) => {
                chrome.history.deleteUrl({url: result.url});
            });
        });
    });
}

async function getKeyWords() {
    let result  = await chrome.storage.local.get([storageKey]);
    return result[storageKey] || []
}
