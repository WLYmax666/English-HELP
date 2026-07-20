const C='eh-v1'
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['.','index.html','manifest.json','icon-192.png','icon-512.png','favicon.svg'])).then(()=>self.skipWaiting()))})
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))))})
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(r=>{caches.open(C).then(c=>c.put(e.request,r.clone()));return r})))})