'use strict';

importScripts('libs/sw-toolbox.min.js');

toolbox.precache(["index.html","css/style.css"]);

toolbox.router.get('/img/*', toolbox.cacheFirst);

toolbox.router.get('/*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});