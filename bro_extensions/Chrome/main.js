const replaceBtn = document.getElementById("replaceBtn");

replaceBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true}, function (tabs) {
        var tab = tabs[0];
        if (tab) {
            execScript(tab);
        } else {
            alert("There are no active tabs")
        }
    })
})

/**
 * Выполняет функцию detectReplaceAD() на веб-странице указанной
 * вкладки и во всех ее фреймах,
 * @param tab {Tab} Объект вкладки браузера
 */
function execScript(tab) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tab.id, allFrames: true},
            func: detectReplaceAD
        },
        onResult
    )
}

/**
 * Определяет тип рекламного банера picture или video
 * Делает запрос на сервер с параметром типа контента
 * Подменяет рекламный контент на полученный с сервера
 *
 *  @return
 */
function detectReplaceAD() {
    if (document.URL.indexOf("facebook") === -1) {
        alert("This is not a Facebook site");
        return;
    }

    const imgs = document.querySelectorAll("img");
    const request = new XMLHttpRequest();
    request.open("GET", "http://127.0.0.1:8000/picture");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            imgs.forEach(img => {
                if (img.height >= 300 && img.width >= 300) {
                    let n_img = new Image(img.width, img.height);
                    n_img.src = JSON.parse(request.responseText);
                    img.parentNode.insertBefore(n_img, img);
                    img.remove();
                }
            })
        }
    });
    request.send();

    const videos = document.querySelectorAll("video");
    request.open("GET", "http://127.0.0.1:8000/video");
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            videos.forEach(video => {
                if (video.clientHeight >= 300 && video.clientWidth >= 300) {
                    const n_video = document.createElement("video");
                    n_video.setAttribute("src", JSON.parse(request.responseText));
                    n_video.setAttribute("controls", "controls");
                    n_video.setAttribute("autoplay", true);
                    video.parentNode.insertBefore(n_video, video);
                    video.remove();
                }
            })
        }
    });
    request.send();

    return true;
}


/**
 *
 */
function onResult(frames) {
    window.close();
}
