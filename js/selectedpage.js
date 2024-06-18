document.addEventListener('DOMContentLoaded', () => {
    const titleContainer = document.querySelector("#titleContainer")
    const recentContainer = document.querySelector("#recentContainer")

    titleContainer.addEventListener('click', () => {
        if (window.location.pathname !== '/index.html') {
            window.location.href = 'index.html'
        }
    })

    recentContainer.addEventListener('click', () => {
        if (window.location.pathname !== '/recent.html') {
            window.location.href = 'recent.html'
        }
    })
})





