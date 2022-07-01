// const ACTIVE_TAB_ID = 0;
// const API_URL = 'https://swc.iitg.ac.in/swc_journeys'
// const BOOKMARK_END_POINT = '/bookmarksection/bookmarkApi/'

// // -------------------for console debug-------------------
// console.log("Hello! from the service worker")

// chrome.runtime.onMessage.addListener(
//     async function(request, sender, sendResponse) {
//         const { sender, receiver, message } = request
//         const tabs = await chrome.tabs.query({active: true})
//         const { url } = tabs[0]
//         if(receiver === 'background') {
//             if(sender === 'options') {
//                 // call auth api
//                 chrome.cookies.set({
//                     url: url,
//                     name: 'BkLoginToken',
//                     value: 'some xyz cookie'
//                 }, (cookie) => {
//                     console.log(JSON.stringify(cookie));
//                     console.log(chrome.extension.lastError);
//                     console.log(chrome.runtime.lastError);
//                     sendResponse("call auth api message received and processed")
//                 })
//                 // chrome.runtime.sendMessage({
//                 //     sender: 'background',
//                 //     receiver: 'popup',
//                 //     message: 'login token saved'
//                 // }, (response) => {console.log(response)})
                
//             }
//         }
//     }
// )