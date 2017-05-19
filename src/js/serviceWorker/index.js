export default class Worker {
  constructor() {}

  register() {
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(() => {
          console.log("Service Worker Registered")
        })
        .catch((e) => {
          console.log("Service worker registration failed : ", e);
        });
    }
  }
};
