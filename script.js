const newsCard1 = document.querySelector("#news1")
const newsCard2 = document.querySelector("#news2")

function UpdateNewsCard(NewsElement, imgPath, NewsHeader, NewsText){
    let img = NewsElement.querySelector("img")
    let header = NewsElement.querySelector("h3")
    let text = NewsElement.querySelector("span")

    img.setAttribute("src", imgPath)
    header.textContent = NewsHeader
    text.textContent = NewsText
}

async function GetData() {
    return fetch("/fixtures/news.json").then(ans => ans.json())
}

async function GetCard(){
    const cardData = fetch("/fixtures/GetCard.json").then(ans => ans.json())
    const UserData = fetch(`/fixtures/User${cardData["userId"]}.json`).then(ans => ans.json())

    return {
        img: cardData["img"],
        userName : UserData["name"],
        userImg : UserData["img"],
        name : cardData["name"],
        currentBet : cardData["currentBet"],
        timeout : cardData["timeout"]
    }
}


GetData().then(ans => {
    let news1 = ans["news1"]
    let news2 = ans["news2"]

    UpdateNewsCard(newsCard1, news1["image"], news1["header"], news1["text"])
    UpdateNewsCard(newsCard2, news2["image"], news2["header"], news2["text"])
})

