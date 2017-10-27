export default class Worker {
  register() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(() => {
          console.log("Service Worker Registered"); // eslint-disable-line
        })
        .catch((e) => {
          console.log("Service worker registration failed : ", e); // eslint-disable-line
        });
    }
  }
}
