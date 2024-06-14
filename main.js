  import { makePassword } from "./js/functions.js"
  import { addRecentToStorage } from "./js/functions.js"
  import { renderSettings } from "./js/functions.js"
  import { updateSettings } from "./js/functions.js"
  
  document.addEventListener('DOMContentLoaded', () => { 
        const generatePasswordButton = document.querySelector("#generatePassword")
        const passwordOutput = document.querySelector("#passwordOutput")
        const clipboardCheckbox = document.querySelector("#clipboardCheckbox")
        const pwLength = document.querySelector("#length")
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(:nth-child(6)):not(:nth-child(7))');
        const autoclose = document.querySelector("#autoclose")
        const charArrays = {
         digits: [
            ...Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i))
        ],
        uppercase: [
            ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
        ],

        lowercase: [
            ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))
        ],
        specialChars: [
            ...Array.from({ length: 15 }, (_, i) => String.fromCharCode(33 + i))
        ]
    }
        // focus button on extension open
        generatePasswordButton.focus()
        // update password length text on button     
        generatePasswordButton.innerHTML =  `Generate password of length ${pwLength.value}`
        pwLength.addEventListener('input', () => {
            generatePasswordButton.innerHTML = `Generate password of length ${pwLength.value}`
        })
        // update settings in local storage every time checkbox is checked/unchecked
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                updateSettings(checkbox)
            })
        })

        // generate and display password
        function generatePassword() {
             // check for password character sets
            let charArray = []
            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    if (charArrays.hasOwnProperty(checkbox.id)) {
                        charArray.push(...charArrays[checkbox.id])
                    } else return
                }
            })
            if (charArray.length === 0) {
                passwordOutput.innerHTML = 'At least one checkbox must be checked'
                return
            }
            if (pwLength.value == 0) {
                passwordOutput.innerHTML = 'Length must be greater than 0'
                return
            } else passwordOutput.innerHTML = makePassword(charArray, pwLength.value)

            if (clipboardCheckbox.checked) {
                navigator.clipboard.writeText(passwordOutput.innerHTML)
                document.querySelector("#copyConfirm").classList.remove('hidden')
            } else document.querySelector("#copyConfirm").classList.add('hidden')

            // add password to local storage
            addRecentToStorage(passwordOutput.innerHTML)
            if (autoclose.checked) setTimeout(() => {
                window.close()
            }, 200);
        }
        generatePasswordButton.onclick = generatePassword
        document.addEventListener('keydown', (e) => {
            if (e.key === 'G' && e.shiftKey === true) {
                generatePassword()
            }
        })
        document.addEventListener('keydown', (e) => {
            if (e.key === '2') {
                window.location.href = 'recent.html'
            }
        })

        renderSettings()        
})   