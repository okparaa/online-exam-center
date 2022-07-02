import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute } from 'workbox-routing/registerRoute';
import { openDB } from 'idb';

const localdb = {
    loc_db: openDB("exmdb", 1)
}

async function putItem(key, item) {
    (await localdb.loc_db).put('exms', item, key);
}

async function getItem(key) {
    (await localdb.loc_db).get('exms', key);
}

precacheAndRoute(self.__WB_MANIFEST);

addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        skipWaiting();
    }
});

registerRoute(new RegExp('.*'), (event) => {
    console.log('event', event)
    fetch(event.url)
        .then((response) => {
            var cloneRes = response.clone()
            console.log(cloneRes)
            cloneRes.json()
                .then((body) => {
                    putItem(event.url.pathname, body)
                })
            return response
        })
        .catch((error) => {
            console.warn(`Constructing a fallback response, due to an error while fetching the real response:, ${error}`)
            return getItem(event.url.pathname)
                .then((res) => {
                    let payload = new Response(JSON.stringify(res), {
                        "status": 200,
                        "statusText": "sData"
                    })
                    console.log(payload)
                    return payload
                })
        })
});

