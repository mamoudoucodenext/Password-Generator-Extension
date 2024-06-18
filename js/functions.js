export function makePassword(characters, passwordLength) {
    let password = ''
    for (let i = 0; i < passwordLength; i++) {
        password+= characters[Math.floor(Math.random() * (characters.length))]
    }
    return password
}
export function addRecentToStorage(password) {
    const timestamp = new Date().toDateString();
    const recentPasswords = JSON.parse(localStorage.getItem('recentPasswords') || '[]');
    if (recentPasswords.length > 9) {
        recentPasswords.shift()
    }
    recentPasswords.push({ password, timestamp });
    localStorage.setItem('recentPasswords', JSON.stringify(recentPasswords));
}

export function renderSettings() {
    const settings = JSON.parse(localStorage.getItem('settings') || '[]')
    settings.forEach((setting) => {
        if (setting.checked) {
            document.querySelector(`#${setting.id}`).checked = true
        }
    })
}

export function updateSettings(box) {
    const settings = JSON.parse(localStorage.getItem('settings') || '[]')
    const existingSettingIndex = settings.findIndex(item => item.id === box.id);
    if (existingSettingIndex !== -1) {
        settings[existingSettingIndex].checked = box.checked;
    } else {
        settings.push({id: box.id, checked: box.checked });
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}



