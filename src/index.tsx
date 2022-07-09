import { h } from "preact";
import App from "./components/app";
import { Workbox } from "workbox-window";

if (typeof window !== 'undefined') {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            const wb = new Workbox("/sw.js");
            const updateButton = document.querySelector("#app-update");
            // const updateButtonDiv = document.querySelector("#app-update-div");
            // wb.addEventListener("waiting", (event: any) => {
            // updateButtonDiv?.classList.remove("hide");
            updateButton?.addEventListener("click", () => {
                //     // Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
                wb.addEventListener("controlling", (event: any) => {
                    window.location.reload();
                });

                wb.messageSW({ type: "SKIP_WAITING" });
            });
            // });
            console.log("yea, we have service worker registered")
            wb.register();
        })
    }
}
if (typeof window !== 'undefined') {
    self.addEventListener('fetch', (event) => {
        console.log('okpara event', event);
    });
}

export default App;