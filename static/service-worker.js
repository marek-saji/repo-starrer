// TODO Separate cache for avatars
const CACHE_NAME = 'cache';

function getCache ()
{
    return caches.open(CACHE_NAME);
}

async function getResponseForFetchEvent (event)
{
    const { request } = event;

    const responsePromise = fetch(request);

    if (request.method !== 'GET' && request.url.indexOf('socket.io') !== -1) {
        return responsePromise;
    }
    const cachePromise = getCache();

    Promise
       .all([cachePromise, responsePromise])
       .then(([cache, response]) => {
           cache.put(request, response.clone());
       });

    const response = await Promise.race([
        cachePromise.then(cache => cache.match(request)),
        responsePromise.then(response => response.clone()),
    ]);

    if (!response) {
        return responsePromise;
    }

    return response;
}

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => event.respondWith(getResponseForFetchEvent(event)));
