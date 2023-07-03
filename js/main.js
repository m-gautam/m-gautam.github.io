// make sure service workers are supprted

console.log('service worker example');

if('serviceWorker' in navigator){    // navigator is js inbuilt object
    navigator.serviceWorker
        .register('../sw_cached_pages.js')
        .then(reg => console.log('service worker  registered'))
        .catch(err => console.log('Error: ', err))
}