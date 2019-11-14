const cacheMaps = {
    cache_file: 'css-js',
    cache_image: 'images'
}

// 监听 install 事件 进行缓存
self.addEventListener('install', () => {
    // 一般注册后，激活需要等到再次刷新页面后激活
    // 可防止出现等待的情况，意味着服务工作线程在安装完后立即激活
    self.skipWaiting()
})

// 运行触发的事件
self.addEventListener('activate', event => {
    event.waitUntil(
        // 若缓存数据更改 就在此更新缓存
        caches.keys()
        .then( cacheNames => {
            return cacheNames.filter( item => !Object.values(cacheMaps).includes(item))
        })
        .then( keys => {
            return Promise.all(keys.map( key => {
                // 删除已更换缓存
                return caches.delete(key)
            }))
        })
        // 更新客户端上的 Service Worker 脚本
        .then(() => self.clients.claim())
    )
})

// 拦截请求，进行缓存判断优化
self.addEventListener('fetch', event => {
    let request = event.request, url = request.url, cacheName
    // 网络优先
    if (/\.(js|css)$/.test(url)) {
        cacheName = cacheMaps.cache_file
        event.respondWith(NetWorkCacheRace(cacheName, request))
    }
    // 缓存优先
    else if (/\.(png|jpg|jpeg|gif|webp)$/.test(url)) {
        cacheName = cacheMaps.cache_image
        event.respondWith(CacheFirst(cacheName, request))
    }
})


// 网络优先，适用于 css js 等文件
function NetFirst(cacheName, request) {
    // 请求网络数据并缓存
    return fetch(request).then( response => {
        let responseCopy = response.clone()
        caches.open(cacheName).then( cache => {
            cache.put(request, responseCopy)
        })
        return response
    }).catch(() => {
        return caches.open(cacheName).then( cache => {
            return cache.match(request)
        })
    })
}

// 缓存优先，适用于图片文件
function CacheFirst(cacheName, request) {
    return caches.open(cacheName).then( cache => {
        return cache.match(request).then( response => {
            let fetchServer = function () {
                return fetch(request).then( newResponse => {
                    cache.put(request, newResponse.clone())
                    return newResponse
                })
            }
            // 如果缓存中有数据则返回，否则请求网络数据
            if (response) {
                return response
            } else {
                return fetchServer()
            }
        })
    })
}

// 根据网络好坏进行缓存区分
function NetWorkCacheRace(cacheName, request) {
    let timer, TIMEOUT = 500
    /**
     * 网络好的情况下给网络请求500ms, 若超时则从缓存中取数据
     * 若网络较差且没有缓存，由于第一个Promise一直处于pending 故此时等待网络请求响应。
     */
    return Promise.race([new Promise((resolve, reject) => {
        timer = setTimeout(() => {
            caches.open(cacheName).then( cache => {
                cache.match(request).then( response => {
                    if (response) {
                        resolve(response)
                    }
                })
            })
        }, TIMEOUT)
    }), fetch(request).then( response => {
        clearTimeout(timer)
        let responseCopy = response.clone()
        caches.open(cacheName).then( cache => {
            cache.put(request, responseCopy)
        })
        return response
    }).catch(() => {
        clearTimeout(timer)
        return caches.open(cacheName).then( cache => {
            return cache.match(request)
        })
    })])
}