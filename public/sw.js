if(!self.define){let e,c={};const s=(s,a)=>(s=new URL(s+".js",a).href,c[s]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=c,document.head.appendChild(e)}else e=s,importScripts(s),c()})).then((()=>{let e=c[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(c[n])return;let t={};const r=e=>s(e,n),u={module:{uri:n},exports:t,require:r};c[n]=Promise.all(a.map((e=>u[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"b50ba5fb404bf6260cced3a86ab8358b"},{url:"/_next/static/chunks/1014-a18756b727dbafec.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/1014-a18756b727dbafec.js.map",revision:"b03cf25022d1bee390fe123fe1cb9b2f"},{url:"/_next/static/chunks/1487-b1a75fcf577438df.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/1487-b1a75fcf577438df.js.map",revision:"8d73b99a272bb4f78512c521427f977f"},{url:"/_next/static/chunks/1506-0c7eea9dcf5f3f14.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/1506-0c7eea9dcf5f3f14.js.map",revision:"1ecc346d2b7a70045c3a11e257102a06"},{url:"/_next/static/chunks/2042-7ecf36000082234d.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/2042-7ecf36000082234d.js.map",revision:"830408883ffe6a85447c3c9ecbb1ec65"},{url:"/_next/static/chunks/2192-19ca2fb426167a56.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/2192-19ca2fb426167a56.js.map",revision:"32715ac52871131fa374f089aa0a289d"},{url:"/_next/static/chunks/2283-761c0bf965949947.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/2283-761c0bf965949947.js.map",revision:"984a783106b8842642062019ae1eaf0b"},{url:"/_next/static/chunks/2294-fbce23b19ff167d8.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/2294-fbce23b19ff167d8.js.map",revision:"ee91d505973191e05e6367e13de906b9"},{url:"/_next/static/chunks/2994-6e2dfd5c6b4706ee.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/2994-6e2dfd5c6b4706ee.js.map",revision:"dff7021272e027502e6f36878438d495"},{url:"/_next/static/chunks/30-355c18f0bc91fe86.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/30-355c18f0bc91fe86.js.map",revision:"a21a4637a8be19f9cad6ad98f1fe6dd0"},{url:"/_next/static/chunks/3135-d6fdf87340a63036.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/3135-d6fdf87340a63036.js.map",revision:"bbf44bd801e89a92aa641fde6bd35159"},{url:"/_next/static/chunks/3245-89686ce085a2035b.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/3245-89686ce085a2035b.js.map",revision:"131be075c5208153a2ab75122e87eeb3"},{url:"/_next/static/chunks/3901-708e0d1fd67c3474.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/3901-708e0d1fd67c3474.js.map",revision:"c21dccc6d973765b3d92f55a7c6bfbc4"},{url:"/_next/static/chunks/4b7fae2d-d816158ba3a5be99.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/4b7fae2d-d816158ba3a5be99.js.map",revision:"690622036bf6d33033a1a69c8a0d5b07"},{url:"/_next/static/chunks/4c20cb89-06363d5320ef9de3.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/4c20cb89-06363d5320ef9de3.js.map",revision:"fc2edf29a6f85a7218ffdcdd400f9cae"},{url:"/_next/static/chunks/5121-6dfa5c5260103b06.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/5121-6dfa5c5260103b06.js.map",revision:"b7363b2bb50f468b92bd07e243b4b92b"},{url:"/_next/static/chunks/5420-6bf6f85891e285bd.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/5420-6bf6f85891e285bd.js.map",revision:"5c1ca6dc298810beb3628598d3ceab1f"},{url:"/_next/static/chunks/6287-149f5ce85b82159f.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/6287-149f5ce85b82159f.js.map",revision:"06e75f8b4733776f5f6ad35fa8af3958"},{url:"/_next/static/chunks/7722-0f29ed5f3ccd2f44.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/7722-0f29ed5f3ccd2f44.js.map",revision:"51083043bd391f94c8c115aecf8fe4fd"},{url:"/_next/static/chunks/781-347961861ee13ebd.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/781-347961861ee13ebd.js.map",revision:"1a8f775e3e771e32dacef2c698e45ed3"},{url:"/_next/static/chunks/8201-292cb6adea02bc0d.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/8201-292cb6adea02bc0d.js.map",revision:"a979e77d1a25f3839eaf03684dfd050c"},{url:"/_next/static/chunks/8262-52024d3463af03dc.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/8262-52024d3463af03dc.js.map",revision:"f9734686bfb9b846b8705a1fde0a522a"},{url:"/_next/static/chunks/8566-459cc9bb06c2af33.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/8566-459cc9bb06c2af33.js.map",revision:"a695919b78bb309872417e427527fcf7"},{url:"/_next/static/chunks/9553-b21cb06246df9b35.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/9553-b21cb06246df9b35.js.map",revision:"e93ea186f35ab12936540b2f11433ff9"},{url:"/_next/static/chunks/9607-848b5e1ab3b6430b.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/9607-848b5e1ab3b6430b.js.map",revision:"ae0f5874b81b3a9b72a1be6c09f8cc5d"},{url:"/_next/static/chunks/app/%5Bsubdomain%5D/page-986a4e4691d70406.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/%5Bsubdomain%5D/page-986a4e4691d70406.js.map",revision:"386cd52ebc6fd55397bc85d605edbe6f"},{url:"/_next/static/chunks/app/(auth)/error-32d3af36787e4ea2.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(auth)/error-32d3af36787e4ea2.js.map",revision:"f68b515bf9f12f04fbfb4ac085d6f62b"},{url:"/_next/static/chunks/app/(auth)/layout-4314416755ff5fea.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(auth)/loading-80b02be22be8475a.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-d60dcaabfecc3ff3.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-d60dcaabfecc3ff3.js.map",revision:"ccd53a42af3030e8b50adb4434c52575"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-9bca211f01f608a7.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-9bca211f01f608a7.js.map",revision:"dd7c91802f48e0ad11b977351b073c2a"},{url:"/_next/static/chunks/app/(marketing)/cookie-policy/page-a003d9eabfd4940d.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(marketing)/layout-5b795d809f9ae49d.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(marketing)/page-8d3c06ed331f8778.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(marketing)/page-8d3c06ed331f8778.js.map",revision:"91b85afee95efc696e52d8739691e8c1"},{url:"/_next/static/chunks/app/(marketing)/privacy-policy/page-09a42554dfb1317e.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/(marketing)/terms-of-service/page-ca985c8be3414732.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/_not-found/page-309819e3aaccda4b.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/api/questions/route-043706481ece54d0.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/api/sites/%5BsiteId%5D/route-2d84badb2df26a5e.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/api/sites/lookup/%5Bsubdomain%5D/route-270e4e9c66d026a5.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/api/webhooks/auth/route-381ff677d278e061.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/api/webhooks/stripe/route-b9dc81db6d8bc1be.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/dashboard/layout-f9fc74a8bb005d27.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/dashboard/page-633fc1b164392a4f.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/dashboard/page-633fc1b164392a4f.js.map",revision:"65208546c5e146c9b44debbb4cd5ca94"},{url:"/_next/static/chunks/app/dashboard/sites/%5BsiteId%5D/page-fe9f702fb6b979f0.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/dashboard/sites/%5BsiteId%5D/page-fe9f702fb6b979f0.js.map",revision:"2eac4d2c1cc207d0cb0421fbc455793b"},{url:"/_next/static/chunks/app/dashboard/sites/%5BsiteId%5D/settings/page-2b12291c0998b1c0.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/dashboard/sites/%5BsiteId%5D/settings/page-2b12291c0998b1c0.js.map",revision:"5f6962eb86327fcaf2f1661a12342c04"},{url:"/_next/static/chunks/app/demo/page-94eb37c9aee6ed92.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/demo/page-94eb37c9aee6ed92.js.map",revision:"88b5a17c52971ed91fd69254f5835e01"},{url:"/_next/static/chunks/app/demo/quiz/page-035483d62cac0a03.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/demo/quiz/page-035483d62cac0a03.js.map",revision:"0745588ab7e1632df1bdcb35fe8358e7"},{url:"/_next/static/chunks/app/demo/reveal/page-1ef52b0ff06c4072.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/demo/reveal/page-1ef52b0ff06c4072.js.map",revision:"c83abc9ad566cd8f0ecdead9179f6569"},{url:"/_next/static/chunks/app/error-a01bb148e769aa35.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/error-a01bb148e769aa35.js.map",revision:"36ffdd63cceda917f9fce25feda459ef"},{url:"/_next/static/chunks/app/global-error-1ea60b3a6633e967.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/global-error-1ea60b3a6633e967.js.map",revision:"0e501434318db1d67976624dd1d5824a"},{url:"/_next/static/chunks/app/layout-6b08553d1659dc3f.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/layout-6b08553d1659dc3f.js.map",revision:"d97534911d965af1f524046e68d4f159"},{url:"/_next/static/chunks/app/not-found-c481339c1ee8f60b.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/not-found-c481339c1ee8f60b.js.map",revision:"9aa452d40a887f54333a82467700a16b"},{url:"/_next/static/chunks/app/preview/%5BsiteId%5D/page-c873b3027ecd20b1.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/preview/%5BsiteId%5D/page-c873b3027ecd20b1.js.map",revision:"59d79621b2d363331ffe1319c09c26a2"},{url:"/_next/static/chunks/app/preview/%5BsiteId%5D/quiz/page-56363788196b042f.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/preview/%5BsiteId%5D/quiz/page-56363788196b042f.js.map",revision:"434a9c33cf56d021b0b16d28dc130cbf"},{url:"/_next/static/chunks/app/preview/%5BsiteId%5D/reveal/page-c1bd38457a430718.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/preview/%5BsiteId%5D/reveal/page-c1bd38457a430718.js.map",revision:"50ececec9a53a5ec3fabbd8c63c9c159"},{url:"/_next/static/chunks/app/sites/%5BsiteId%5D/page-7bb06ef670eebfcf.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/sites/%5BsiteId%5D/page-7bb06ef670eebfcf.js.map",revision:"9d4766f17d9e4645c42b2abf79c98aa6"},{url:"/_next/static/chunks/app/sites/%5BsiteId%5D/quiz/page-5bb0199046ad482a.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/sites/%5BsiteId%5D/quiz/page-5bb0199046ad482a.js.map",revision:"d47dec981f5b52fa792a580138f5be04"},{url:"/_next/static/chunks/app/sites/%5BsiteId%5D/reveal/page-dab4d41e7c405eca.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/app/sites/%5BsiteId%5D/reveal/page-dab4d41e7c405eca.js.map",revision:"b0ff59ca0d454adfc95e1401286542fc"},{url:"/_next/static/chunks/d2764ad1-27da10dd7c94e692.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/d2764ad1-27da10dd7c94e692.js.map",revision:"28c0db5e0df2778e1903e729b1362869"},{url:"/_next/static/chunks/d73546fd-87998d04aebb73f4.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/d73546fd-87998d04aebb73f4.js.map",revision:"764af0e5c65598b855490bb4b672f883"},{url:"/_next/static/chunks/framework-c579292bc2541748.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/framework-c579292bc2541748.js.map",revision:"96650f19b509430990a037cf6888fce0"},{url:"/_next/static/chunks/main-01785f2af0b06414.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/main-01785f2af0b06414.js.map",revision:"753e49beaa9eee8adc48ea7a9c39c06c"},{url:"/_next/static/chunks/main-app-2d9d2fef872682a2.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/main-app-2d9d2fef872682a2.js.map",revision:"58c7eee40fafb90ef4daee8f8e02d476"},{url:"/_next/static/chunks/pages/_app-77ed2731ac648168.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/pages/_app-77ed2731ac648168.js.map",revision:"c09a0e8520539f5197c9e3dfaa9b28c5"},{url:"/_next/static/chunks/pages/_error-240bbb06ce006372.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/pages/_error-240bbb06ce006372.js.map",revision:"3ff666db10b33b04ce0d4a853fbf8807"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-a94d473f73871b74.js",revision:"vlqG2w1cWVVxcDuyc-mMS"},{url:"/_next/static/chunks/webpack-a94d473f73871b74.js.map",revision:"ed48949051de281fde3ca959159d90ce"},{url:"/_next/static/css/6750f595f75278fc.css",revision:"6750f595f75278fc"},{url:"/_next/static/css/6750f595f75278fc.css.map",revision:"37b47864cf339b8c874566eefad12959"},{url:"/_next/static/css/c4e818bbff268556.css",revision:"c4e818bbff268556"},{url:"/_next/static/css/c4e818bbff268556.css.map",revision:"907e8c505e9a4e1282bd0113684abe13"},{url:"/_next/static/media/474c23a5a1c233e6-s.woff2",revision:"2fed8269d9bc8d14d253a17adcd96a55"},{url:"/_next/static/media/fc885452d822f256-s.p.woff2",revision:"ea6edb4c9fb94a13b0cc003b7b240bd1"},{url:"/_next/static/vlqG2w1cWVVxcDuyc-mMS/_buildManifest.js",revision:"a344ae2e5824bcd771b299499606a7f1"},{url:"/_next/static/vlqG2w1cWVVxcDuyc-mMS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"7d6385890771093edadd23f5efca1612"},{url:"/android-chrome-512x512.png",revision:"2118179373f980504fa9fb4d133b35e4"},{url:"/apple-touch-icon.png",revision:"125f1414c8e69ce523e81ad405effd9e"},{url:"/favicon-16x16.png",revision:"44d55cc6008f7052f500a8325e3e7093"},{url:"/favicon-32x32.png",revision:"6e6cdd5ff4de1645f1cac789fef7700d"},{url:"/favicon.ico",revision:"cb77832570b472b8161feafbe8ccbdce"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/images/dashboard.jpeg",revision:"1f6d83d2a469353f885d9780cef7f6a7"},{url:"/images/reveal.jpeg",revision:"1dac1ffe183e5c1825f77f517b76cf6a"},{url:"/images/screenshot.png",revision:"4cea2e4dd743f94ffb10edf4a8c2451b"},{url:"/images/settings.png",revision:"484ad8392028f299681bdbd8877a6943"},{url:"/logo.png",revision:"2118179373f980504fa9fb4d133b35e4"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/site.webmanifest",revision:"c93ce653f9cae382d54a92cda90ffa8d"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:c,event:s,state:a})=>c&&"opaqueredirect"===c.type?new Response(c.body,{status:200,statusText:"OK",headers:c.headers}):c}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const c=e.pathname;return!c.startsWith("/api/auth/")&&!!c.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
