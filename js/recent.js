document.addEventListener('DOMContentLoaded', () => {
    const recentPasswords = JSON.parse(localStorage.getItem('recentPasswords') || '[]');
    const recentPasswordsContainer = document.getElementById('recentPasswordsContainer');
    recentPasswords.forEach((passwordData) => {
        const newRecent = document.createElement('div')
            newRecent.classList.add('flex')
            newRecent.innerHTML = `
        <div class="passwordWrapper">
            <p id="newRecentPassword">${passwordData.password}</p>
        </div>
        <img src="./images/copy.png" class="icon">`
            recentPasswordsContainer.appendChild(newRecent)
    })
    document.querySelectorAll('.icon').forEach((button) => {
        button.addEventListener('click', (e) => {
            navigator.clipboard.writeText(e.target.previousElementSibling.querySelector("#newRecentPassword").innerHTML)
        })
    })
    document.addEventListener('keydown', (e) => {
        if (e.key === '1') {
            window.location.href = 'index.html'
        }
    })
})








