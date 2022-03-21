

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


// grab the channel link and video url 
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  if (request.message=="execute-reloading") {
    // get the urls from storage
    getCurrentTab().then(tab=>{
      chrome.scripting.executeScript({
        target:{tabId:tab.id},
        func:navigation_handler
      })

    })
    
  }
  sendResponse({});
  return true;
})

chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
  let youtube_watch_url_regex=/https:\/\/www.youtube.com\/watch\?v=*/gi
  if (youtube_watch_url_regex.test(tab.url)) {
    // now check it's status
    if (tab.status=='complete') {
      console.log('START RELOADING.............');
      // send popupjs file to start reloading...
      chrome.runtime.sendMessage({message:'start-reloading'})
    }
  }

})
// function that navigate the page
function navigation_handler() {
  // window.location.reload(true)
  chrome.storage.local.get('links_Obj',res=>{
    let {channel_url,videoUrl}=JSON.parse(res.links_Obj)
    window.location.href=channel_url
    window.location.href=videoUrl
    
    // Add this line:
  })
 
}
// // get the current tab and store it in 
// chrome.runtime.onMessage.addListener(async (request,sender,sendResponse)=>{
//   try {
//     if (request.message='reload-this-page') {
//       let currentTab= await getCurrentTab()
//       console.log('Now Url: '+currentTab.url);
//     }
    
//   } catch (error) {
//     console.log(error.message);
//   }
  
// })