// Push only: no fetch handler and no caching, so the console always loads fresh.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));

self.addEventListener('push',e=>{
  let d={};
  try{d=e.data?e.data.json():{};}catch(err){d={};}
  if(!d||typeof d!=='object') d={};
  // Always show a notification: iOS revokes the subscription for silent pushes.
  e.waitUntil(self.registration.showNotification(d.title||'BLO VAULT Ops',{
    body:typeof d.body==='string'?d.body:'',
    tag:typeof d.tag==='string'?d.tag:undefined,
    data:{url:typeof d.url==='string'?d.url:'/ops/'},
    icon:'/img/app-icon.png'
  }));
});

self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const u=e.notification.data&&e.notification.data.url;
  const url=typeof u==='string'&&u.startsWith('/ops/')?u:'/ops/';
  e.waitUntil((async()=>{
    const list=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    const c=list.find(w=>new URL(w.url).pathname.startsWith('/ops'));
    if(c){
      if('navigate' in c){try{await c.navigate(url);}catch(err){}}
      return c.focus();
    }
    return self.clients.openWindow(url);
  })());
});
