const API_AUTH_URL_STAGING = 'http://127.0.0.1:8000/api/v1/bookmark/authtoken/'

const handleButtonClick = async (e) => {
    e.preventDefault();

    const username = usernameElement.value
    const password = passwordElement.value

    if(!username) {
        usernameError.innerHTML = "Username cannot be empty"
    }
    else if(!password) {
        passwordError.innerHTML = "Please enter the password"
    }
    else {
        // const tabs = await chrome.tabs.query({active: true})
        // const { url } = tabs[0]
        
        // We make an API call to auth api sending username and password and receive the auth token
        button.innerHTML = "Saving..."

        const resp = await fetch(API_AUTH_URL_STAGING, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: btoa(password)
            })
        })
        
        // TODO: error handling

        const { token } = await resp.json()
        chrome.storage.sync.set({ BkAuthToken: token, username: username }, () => {
            usernameElement.value = ""
            passwordElement.value = ""
            button.innerHTML = "Credentials Saved!"
            usernameElement.classList.add('hide')
            passwordElement.classList.add('hide')
            button.classList.add('width160')
            registerElement.classList.add('hide')
        })
    }
}

const usernameError = document.getElementById("username-error")
const passwordError = document.getElementById("password-error")
const usernameElement = document.getElementById("username")
const passwordElement = document.getElementById("password")
const registerElement = document.getElementById("user-register")
const button = document.getElementById("login-button");

button.addEventListener('click', handleButtonClick)

usernameElement.addEventListener('change', (e) => {
    usernameError.innerHTML = ""
})

passwordElement.addEventListener('change', (e) => {
    passwordError.innerHTML = ""
})
