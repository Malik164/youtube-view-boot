// channel link url
// on filling channel link able all other form fields
let delay_time=0
// click the start button and get the current url
startBtn.addEventListener('click',()=>{
    // validate all fields before
    if (channel_link.value.trim()<1 || videoId.value.trim()<1 || delay.value.trim()<1) {
        alert('Please Fill all the fields!')
        return
    }
    // from videoid make youtube watch url
    let videoUrl=new URL('https://www.youtube.com/watch')
    videoUrl.searchParams.set("v",videoId.value.trim())
    let channel_url = new URL(channel_link.value.trim())
    delay_time=parseInt(delay.value.trim())
    let links_Obj={
        videoUrl,channel_url
    }
    chrome.storage.local.set({"links_Obj":JSON.stringify(links_Obj)})
    chrome.runtime.sendMessage({message:'execute-reloading'})
    // grab the channel link videoId 
    // chrome.runtime.sendMessage({message:'reload-this-page'})

})
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    if (request.message=="start-reloading") {
      // get the urls from storage
      console.log('start reloading');
      console.log(sender.url);
    //   countDown(delay_time)
    }
    sendResponse({});
    return true;
  })
  
function countDown(delay_time) {
    let t= delay_time
    setInterval(() => {
        // chrome.browserAction.setBadgeText({text:''+t})
        t--;
        if (t<1) {
            reload_handler()
            t=delay_time
        }
    }, 1000);
}

function reload_handler() {
    chrome.runtime.sendMessage({message:'execute-reloading'})
}
// stop button handler
stopBtn.addEventListener('click',()=>{
    window.location.reload(true)
})
function resetAll() {
    delay_time=0
    // chrome.browserAction.setBadgeText({text:''})
}
document.addEventListener('DOMContentLoaded',()=>{
   resetAll()
})