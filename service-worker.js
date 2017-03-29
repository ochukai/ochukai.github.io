/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","fbdbcb8751e0fe298ba44bab016df1a0"],["/README.html","2db547f64ba448b331f4f53314b9e334"],["/about/index.html","7698404442964bc3c58e1b2eb6fa44f3"],["/archives/2014/12/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2014/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2015/07/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2015/08/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2015/11/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2015/12/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2015/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/02/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/03/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/04/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/06/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/07/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/11/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/12/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2016/page/2/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2017/01/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2017/02/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2017/03/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/2017/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/page/2/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/page/3/index.html","19852e70f846659502d50c6d87c4aecd"],["/archives/page/4/index.html","19852e70f846659502d50c6d87c4aecd"],["/baseview-in-backbone/index.html","88e320a1e9facce18c3844039f4744ae"],["/battleship-girls/index.html","21f300185db234d860e66cfc1e17c068"],["/categories/backbone/index.html","d31bef8dddd0b9ae9a9ef40d7fb5d813"],["/categories/css-animation/css/index.html","95dbe5de664e7d9df3334a7cbf21b5e6"],["/categories/css-animation/index.html","4fb886c5fd6b77105d947779fac95b0a"],["/categories/css/index.html","2818e42f6258e624648160b80eb87881"],["/categories/form/index.html","46f57a8a96cc6f986ccc3d51c6b80842"],["/categories/form/javascript/index.html","99843610875972652b9fcda5c82b1dff"],["/categories/git/index.html","5b524c1e690bbfda7d8ad40d53b318b8"],["/categories/html/index.html","8864a4d778f9af3e6691b4896c382ad2"],["/categories/ie/index.html","7a6317aef27fe4e4ee129f8650b411bb"],["/categories/index.html","863ab3e6200bea4c6622baa496f098e1"],["/categories/javascript/index.html","388d03ffed78f5a5cb2a86e1d0754315"],["/categories/javascript/object-object/index.html","65f5b8e8b5377fe15bb2580a46671715"],["/categories/linux/index.html","9f3bee773f0a5189a7cf3592855f3b7a"],["/categories/mysql/index.html","e6552b8c64c9a9f7f02701b922c5dee4"],["/categories/promise/index.html","2b10d3c696fb67409cb6a5ec3fea1c00"],["/categories/promise/javascript/index.html","a6cff39766692f352e7ebd1d5e83712c"],["/categories/react/index.html","7b2caa0c452edd2555134e76ddbfa221"],["/categories/react/javascript/index.html","1c15971cc15dcff614f6d8cee93ad310"],["/categories/sass/index.html","94da18c91809b1bb0dce6adc7272887e"],["/categories/svn/index.html","436a1b1726b1bfb2a6fd1cc6a287c99f"],["/categories/webstorm/index.html","dfa8ff4d320a660309e29fb52e43d87b"],["/categories/window/index.html","18f7c52daa67949c7d70bdde9e41bf1b"],["/categories/微信开发/index.html","f2f6a2bb9c44c0d22e76872943eed207"],["/categories/戦艦の女の子/index.html","7ed8da50482d9df2af2a4a36843146ff"],["/categories/文学/index.html","acb8608ac00bad9655f4de8f312f22ac"],["/categories/柏拉图式的爱情/index.html","7fb266b1de2c98d08dc1663fbd88bb7b"],["/categories/生活杂记/index.html","1b5572dbe9f55852d6177708a76e2a7a"],["/change-window-terminal-terminal-font/index.html","58bd0725263a00503d83cd147b397625"],["/correct-ugly-markdown-css-in-webstorm/index.html","d8adaff34e5a06ad8334339959887792"],["/css-animation-queue-list/index.html","6eb3b4a1364e86790ffe44e8e03a98e7"],["/css/main.css","01966486b32c37a777e9b82fabb9f7c3"],["/decorator-in-js/index.html","67bbfcec9de502ba09b5a4dc32762f22"],["/dva-in-action/index.html","20ef6a53d174c20353a14a43771a673c"],["/esekesu-senkanno-onnanoko/index.html","c6edb109183ee49ab041533adfc290b4"],["/fonts/icon.eot","1865f1c7c1739de3a9f13dfdc889f656"],["/fonts/icon.svg","46661d6d65debc63884004fed6e37e5c"],["/fonts/icon.ttf","877cab04d6660cce3c4846da46e72eca"],["/fonts/icon.woff","3435e06582a029962364593b1ca40a7f"],["/for-in-scss/index.html","66086dc2f619fcb44205d41ea82ebbb0"],["/formdata-in-action/index.html","a19094fcbb8c8e9cece8c75703d1e463"],["/git-remember-password-in-window-and-linux/index.html","c5f4051340241efd3512c104ba91a1aa"],["/higashino-keigo/index.html","abb97897223aa67a78d43a5a9e1af14f"],["/ie-css-hack/index.html","9e01d739bf4d5f99e6bce9394393183d"],["/images/aise-broken.png","7c71656465a598071f7733a73afb994d"],["/images/aise-normal.png","ba881ffa93b7d4b7f9e12e9e454f956e"],["/images/decorator-1.png","04cc0cd6c89b9bce8da8ad15201c8292"],["/images/dva-flow.png","e5c57acfd3adbc8163ee628aa839579a"],["/images/font-terminal.png","4eae7b27892e93922fb5ee2900806fcc"],["/images/li-queue-in.png","e8425e9fe180084aa00fac02b0cd47a9"],["/images/promise-1.png","1185a37dcf5718bdb2dfb8672bfdc83f"],["/images/react-redux-flow.png","fb0be85941d3c80d4e322aa66b1a23a8"],["/images/redux-flow.jpg","160fc71ae1371c198b220b2d33e50bac"],["/images/scroll-1.png","e3a1cc4fb1e1f4ec3b5434b54ae9bb6f"],["/images/webstorm-md-css-1.png","57c6be66cc562b2d23a2688c628a8cd7"],["/images/webstorm-save-file.png","2e7b33f23b7f5ed11f9e4dd2fc92d91f"],["/img/bg-1.png","fe3bcc8dece28576f732204fb3f79653"],["/img/bg-ling-1.jpg","fa5f47656142428a8ae64894cfd0e68a"],["/img/wechat.png","f8427d53ed48f20408a788bda5a78684"],["/index.html","3e1f65e16cbf5117d3e30e76784f46ee"],["/js-bind-this/index.html","fd7fa06763c5fdd2546f2875f94fc365"],["/js/jquery-3.1.1.min.js","13062b7699b965d79cd46225ca0b1c14"],["/js/jquery-modal.js","9d83140d0f9c9b02023aa670aec7be40"],["/js/keymaster.js","ff2455f752f77669c4bf95e62f663d13"],["/js/main.js","4a5672ca20dc7b9de7fd92776cd827fe"],["/js/particles.min.js","e97e18d55d109a6a2a20821bfc47a6c7"],["/js/particles.oli.js","3b9e2d59725966145056f7b4a6c00a18"],["/js/scroller.js","93f80816b26197e1c8233a05d7cb4844"],["/kill-process-in-window/index.html","01bb85c852990e88e9a48a7b4005c511"],["/kill-process/index.html","94ddb27acddeddaf597d72c2876d9e73"],["/live2d/z16/z16.1024/texture_00.png","2bebd4b55807881cb8829b5d43ac70c2"],["/live2d/z16/z16.256/texture_00.png","e7cfa7e631e1d4543d11409513957a33"],["/live2d/z16/z16.512/texture_00.png","25e891709f4d0ac69ae9112c16961ca9"],["/menu-with-moved-elfish/index.html","1bf7f47b41c5d639ae57d37fe78c37a8"],["/modify-wamp-mysql-password/index.html","9f8f856542e1d10e60213cad6e24fe0a"],["/navicat-10-1-7-key/index.html","7261675b42947d10872f197d12a65d30"],["/page/2/index.html","3e1f65e16cbf5117d3e30e76784f46ee"],["/page/3/index.html","3e1f65e16cbf5117d3e30e76784f46ee"],["/page/4/index.html","3e1f65e16cbf5117d3e30e76784f46ee"],["/page/5/index.html","3e1f65e16cbf5117d3e30e76784f46ee"],["/page/6/index.html","3e1f65e16cbf5117d3e30e76784f46ee"],["/page/7/index.html","3e1f65e16cbf5117d3e30e76784f46ee"],["/platonism-love/index.html","7dacef282d7a5519381b5a3bdbed3c38"],["/prevent-deep-div-scroll-with-the-top-element/index.html","30d73c1a7d3ffaa3ccdfbe3dc9b65c8f"],["/promise-in-action/index.html","223267342b176842b41832417d311542"],["/protect-yourself-in-network/index.html","cdabfe4109b106d9848745183c84739e"],["/remove-svn-folder/index.html","15cf0d04ee00a2cf2f8c974875f092b0"],["/show-a-default-image-when-the-image-is-broken/index.html","5b0d9cc574072da1fba1cf0ba1f6b44b"],["/splice-in-javascript/index.html","e94f8751d73e97a9b97e63071441bd25"],["/tags/ajax/index.html","d379e76ffd6ba5238a3a0dd697603a7f"],["/tags/amd/index.html","a04196c61991321d981840ba4e83476a"],["/tags/animation/index.html","ca59cee335499fc202c76cca794fe237"],["/tags/array/index.html","2d30e6e0e06e10988202017283a1793f"],["/tags/backbone/index.html","b75af77649fe18d81dd24eb9f0791dd5"],["/tags/base/index.html","35a63b1ff200cadae3cbcf2b816232be"],["/tags/cmd/index.html","86efbe50f8b7dc8159932f82edde3f25"],["/tags/compatible-module/index.html","670b9f7ab5b0d2d0588a52e321717e2e"],["/tags/css-hack/index.html","367a90e909e7100f5aba7f5ba061dc1a"],["/tags/css/index.html","b11ca7d7d006087d42b17f37666e841e"],["/tags/date/index.html","8a7ec5187bd6ab1897b511e51c870bd5"],["/tags/decorator/index.html","bbf62748afe825f9cde185be44c35202"],["/tags/dva/index.html","4aa90b623049afc2098c5933279b591e"],["/tags/font/index.html","5039a9c7f0eb9e53505e299e4d19c046"],["/tags/for/index.html","80a65e258c2f30631ffa6e4021368d66"],["/tags/format/index.html","f42f6a1fcda51268a2f03b89a5fb1491"],["/tags/formdata/index.html","28366706723a8e1a6cb07cee51fe9f32"],["/tags/git/index.html","0fd4faedc55670d468903359a3714121"],["/tags/html/index.html","9b65bf79316f5d3a2392b487c134193b"],["/tags/ie/index.html","060ccf159314322b579b79cabd2a6cb7"],["/tags/image-upload/index.html","685dc1c6a7ae873375c2b8906f227592"],["/tags/imgage-error/index.html","8e54074701d4b019267e4aef3cb23e8d"],["/tags/index.html","2b995ebf63e806bb085e7ce22c99d7e0"],["/tags/js/index.html","6731b4e20d1960d7af859901dfd2f4e0"],["/tags/markdown/index.html","94b1fa2f544662568f95a389a0968f4d"],["/tags/mysql/index.html","4bc4bdfbe3e2c17fde8223a1b966e6db"],["/tags/nav/index.html","8d2bc6d6ab6670c7995c1d3cf517f825"],["/tags/navicat/index.html","40f56621308b3d33f5ca9a376c7edf0f"],["/tags/paswword/index.html","8a06aba00893522d3808c3f41cac22ed"],["/tags/promise/index.html","e011b53077d197dc95bd995addef7d29"],["/tags/react/index.html","0d268c8c5205c4cd14ebd2dd44654420"],["/tags/scss/index.html","0669c2a205932b30f84455ad1cf56a2b"],["/tags/settimeout/index.html","aad0165f06f856fcd820803bcce27a09"],["/tags/slice/index.html","85f19e0de40f341757d750214652135a"],["/tags/splice/index.html","a9a09c0c91c7128dc1ceafd58a6e1758"],["/tags/svn/index.html","79bcc617027d399a2b4a561aed3de1eb"],["/tags/tedx/index.html","58bcdec9083f87e9c18590cdc4b5892b"],["/tags/terminal/index.html","b4ab1066104a3b7b836f2287bfc17ae7"],["/tags/textarea/index.html","4bbef21bd148d9666bdcc9a41a79eb1a"],["/tags/this/index.html","f09bd353aaf144c46a6adbb7ac1982db"],["/tags/ts/index.html","10a73d7a5e78794845ea6e204e9aa1ea"],["/tags/view/index.html","6db4e4609fa9daaa93be791ed373339a"],["/tags/wallpaper/index.html","b34361f11b5df9d08c17c1bd91c5af31"],["/tags/webpack-dev-server/index.html","c80c91fe1e0ebebbd8d126c7ee3712df"],["/tags/webpack/index.html","ba0747e3bb70d58364d5e0bb8b87061b"],["/tags/webstorm/index.html","b941a6f04dad3c03c96a243c2f324e46"],["/tags/webstrom/index.html","9c01a446c70dc8926f58a2ca51f1097f"],["/tags/win10/index.html","5292a6fd7c73922884aff34fd6320824"],["/tags/window/index.html","23fbe4e478fb7905b7fa8edc46f98d40"],["/tags/zepto/index.html","0c76279cda83fd7b65d33c93f43c5cc5"],["/tags/东野圭吾/index.html","3dacac7480251903e533c855f4ab4460"],["/tags/东野圭吾作品全集/index.html","7589506bd44d51ea696bf921bb28956f"],["/tags/中文乱码/index.html","6a00b9fed40b5426f058e7ca2ef25141"],["/tags/在网络暴力中捍卫自己/index.html","4d0cca301dbcc8ed6ae005ce0ad5099f"],["/tags/埃塞克斯/index.html","68bd53e15d953869168edf85ed920f69"],["/tags/建造公式/index.html","49cc0da3e9f5f910a29ca601c210e0a5"],["/tags/微信开发/index.html","f2f6a2bb9c44c0d22e76872943eed207"],["/tags/文学/index.html","acb8608ac00bad9655f4de8f312f22ac"],["/tags/日本文学/index.html","87ca38ba663308c273b00ec90fb83108"],["/tags/柏拉图/index.html","62fd36f064a18bcdcad7f64e28813442"],["/tags/演讲稿/index.html","81934e1c920e4fc2f321170a75cbff8b"],["/tags/爱情/index.html","45a4832cec17f073c746c4e308f8095f"],["/tags/端口占用/index.html","b6f2e55ea80706ffc6d8ca2bb44b3c1b"],["/tags/航母/index.html","ddb983501f0effc1b9baf81d121aaf75"],["/tags/袁姗姗/index.html","f9fb3bb5458dc33f4cd8d832ad7eff8f"],["/tags/记住密码/index.html","3003423ebf5cff69e1e5c8586e6be874"],["/telephone-number-not-recognize-in-wx/index.html","e102e4e95b78327a7254265cb2fb0513"],["/textarea-height-auto-increase/index.html","a4636e207f3bd982cea5fb5680edd81d"],["/ths-difference-between-splice-and-slice/index.html","3e08aae0c0b643eccf558926a97cf8cf"],["/use-js-to-convert-ts-to-data/index.html","5039670ba37bf58762c973070a9ffe95"],["/use-terminal-to-update-win10-key/index.html","d8a5a91b4a2f5f3373c677e0567c1cac"],["/wamp-mysql-chinese-question-mark/index.html","ec170179c82be6b855655bf1db4705bf"],["/webpack-dev-server-vs-webstorm/index.html","92514e90363229b4d05b4f5771f8496d"],["/window-focus-wallpaper/index.html","bb14970cae1ffa59dcce5f9aae5c9836"],["/write-a-compatible-js-module/index.html","a65809fb0f48fd0527e6b45b49cd7728"],["/wrong-clearfix-make-me-crazy/index.html","9ab805222060062f0d2e854bfc836c84"],["/zepto-plugin/index.html","abf2b3435cb14904ebb31cc7ae31a7f4"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







