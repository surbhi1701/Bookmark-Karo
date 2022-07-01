const API_URL = 'https://jsonplaceholder.typicode.com/posts/1'
const API_BOOKMARK_URL_STAGING = 'http://127.0.0.1:8000/api/v1/bookmark/add/'
const ERROR_TEXT = 'Something went wrong, please try again.'

let authToken = ''

const handleButtonClick = async (e) => {
    e.preventDefault()
    errorElement.innerHTML = ""
    button.classList.add('disabled')

    const tabs = await chrome.tabs.query({active: true})
    const { url } = tabs[0]
    
    console.log("button clicked!", contextElement.value, url)
    
    try {
        // API call stuff here
        const resp = await fetch(API_BOOKMARK_URL_STAGING, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                context: contextElement.value,
                link: url,
                token: authToken
            })
        });
        
        console.log(resp)
        if(resp.status == 201) {
            button.classList.remove('disabled')
            button.classList.add('added')
            button.innerHTML = "Added"
        }
        else if(resp.status == 200) {
            button.classList.add('already-added')
            button.innerHTML = "Bookmark already exists!"
        }
        else {
            throw(ERROR_TEXT)
        }
    }
    catch (e) {
        console.log(e)
        button.classList.remove('disabled')
        errorElement.innerHTML = e
    }

    // cleanup
    contextElement.value = ""
}

const openOptionsPage = () => {
    chrome.runtime.openOptionsPage()
}

const errorElement = document.getElementById("error-text")
const contextElement = document.getElementById("context");
const saveCredentialWarningElement = document.getElementById("save-credential-warning")
const button = document.getElementById("save-button");
const userElement = document.getElementById("user")
const registerElement = document.getElementById("user-register")

chrome.storage.sync.get(['BkAuthToken', 'username'], function(items) {
    
    userElement.innerHTML = `Hi ${items.username || 'Anonymous'}`
    registerElement.addEventListener('click', openOptionsPage)
    
    if(items.BkAuthToken) {
        authToken = items.BkAuthToken
        console.log(authToken)
        button.addEventListener('click', handleButtonClick)
    }
    else {
        contextElement.classList.add('hide')
        saveCredentialWarningElement.classList.remove('hide')
        button.innerHTML("Save credentials now")
        button.addEventListener('click', openOptionsPage)
    }
})


    
