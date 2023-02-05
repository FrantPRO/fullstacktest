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

    const images = document.querySelectorAll("img");
    fetch("http://127.0.0.1:8000/picture")
        .then((response) => response.json())
        .then((data) =>
            images.forEach(image => {
                if (image.height >= 300 && image.width >= 300) {
                    let new_image = new Image(image.width, image.height);
                    new_image.src = data;
                    image.parentNode.insertBefore(new_image, image);
                    image.remove();
                }
            })
        );

    const videos = document.querySelectorAll("video");
    fetch("http://127.0.0.1:8000/video")
        .then((response) => response.json())
        .then((data) =>
            videos.forEach(video => {
                if (video.clientHeight >= 300 && video.clientWidth >= 300) {
                    const n_video = document.createElement("video");
                    n_video.setAttribute("src", data);
                    n_video.setAttribute("controls", "controls");
                    n_video.setAttribute("autoplay", true);
                    video.parentNode.insertBefore(n_video, video);
                    video.remove();
                }
            })
        );

    return true;
}


/**
 *
 */
function onResult(frames) {
    window.close();
}
