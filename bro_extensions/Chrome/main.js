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
    if (document.URL.indexOf('facebook') === -1) {
        alert('This is not a Facebook site');
        return;
    }

    let new_img_url = '';
    const request = new XMLHttpRequest();
    request.open('GET', 'http://127.0.0.1:8000/picture');
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            new_img_url = request.responseText;
        }
    });
    request.send();

    const imgs = document.querySelectorAll("img");
    // const video = document.querySelectorAll("video");

    imgs.forEach(img => {
        if (img.height >= 500 && img.width >= 500) {
            img.src = new_img_url;
        }
    })

    return true;
}


/**
 *
 */
function onResult(frames) {
    window.close();
}
