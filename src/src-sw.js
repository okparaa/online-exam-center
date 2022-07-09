import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute } from 'workbox-routing/registerRoute';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { openDB } from 'idb';

const matchAnsCb = ({ url }) => {
    return url.pathname.includes('/v2/assmnts/ans')
}
const matchExamCb = ({ url }) => {
    return url.pathname.includes('/v2/assmnts/exam')
}

addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        skipWaiting();
    }
});

registerRoute(
    /\.(?:js|css|webp|png|jpe?g)$/,
    new StaleWhileRevalidate()
);
registerRoute(
    /(\/|\.html)$/,
    new NetworkFirst()
);

registerRoute(matchAnsCb, ({ url, event }) => {
    fetch(event.request)
        .then(async (response) => {
            var cloneRes = response.clone()
            console.log('cloneRes', cloneRes)
            const localdb = {
                loc_db: await openDB("exmdb", 1, {
                    upgrade(db) {
                        db.createObjectStore('exms');
                    },
                })
            }
            const body = await cloneRes.json();
            await localdb.loc_db.put('exms', body, url.pathname)
            await localdb.loc_db.put('exms', false, 'dirty')
            console.log('ujunwa', body);
            return response
        })
        .catch(async (error) => {
            console.warn(`Constructing a fallback response, due to an error while fetching the real response:, ${error}`)
            const localdb = {
                loc_db: await openDB("exmdb", 1, {
                    upgrade(db) {
                        db.createObjectStore('exms');
                    },
                })
            }
            const resp = await localdb.loc_db.get('exms', url.pathname)
            const options = { status: 200, type: 'cors', ok: true, statusText: "OK" }
            let response = new Response(JSON.stringify(resp), options);
            Object.defineProperty(response, 'url', { value: event.request.url })
            Object.defineProperty(response, 'type', { value: 'cors' })
            console.log('ujuokpara', response);
            return response

        })
}, 'POST');

registerRoute(matchExamCb, ({ url, event }) => {
    console.log('ifeanyi', event, url);
    fetch(event.request)
        .then(async (response) => {
            const localdb = {
                loc_db: await openDB("exmdb", 1, {
                    upgrade(db) {
                        db.createObjectStore('exms');
                    },
                })
            }
            const body = await cloneRes.json();
            await localdb.loc_db.put('exms', body, url.pathname)
            await localdb.loc_db.put('exms', false, 'dirty')
            console.log('uju nwa', body);
            return response
        })
        .catch(async (error) => {
            console.warn(`Constructing a fallback response, due to an error while fetching the real response:, ${error}`)
            const localdb = {
                loc_db: await openDB("exmdb", 1, {
                    upgrade(db) {
                        db.createObjectStore('exms');
                    },
                })
            }
            const resp = await localdb.loc_db.get('exms', url.pathname)
            const options = { status: 200, type: 'cors', ok: true, statusText: "OK" }
            let response = new Response(JSON.stringify(resp), options);
            Object.defineProperty(response, 'url', { value: event.request.url })
            Object.defineProperty(response, 'type', { value: 'cors' })
            console.log('uju okpara', response);
            return response
        })
});

precacheAndRoute(self.__WB_MANIFEST);