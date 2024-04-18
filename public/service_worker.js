
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request === 'getInfo') {
        chrome.storage.local.get(['data']).then((result) => {
            sendResponse(result.data); // Envía la información cuando se solicite
        })
        return true
    }
    else {
        chrome.storage.local.set({'data': request?.info })
    }
  }
)