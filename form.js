const registerForm = document.getElementById('registerForm')
const username = document.querySelector('#registerForm input[name="username"]')
const email = document.querySelector('#registerForm input[name="email"]')
const password = document.querySelector('#registerForm input[name="password"]')
const confirmPassword = document.querySelector('#registerForm input[name="confirm_password"]')

// Refactor
function addEventForInput(element, customValidCb) {
    element.addEventListener('input', (event) => {
        const oldHelp = event.currentTarget.parentElement.querySelector('p.help')
        if (oldHelp) {
            oldHelp.remove()
        }
        const help = document.createElement('p')
        help.classList.add('help')
        help.classList.add('is-danger')
        event.currentTarget.parentElement.append(help)
        if (typeof customValidCb == 'function' && !customValidCb(event, help)) {
            return
        }
        if (!event.currentTarget.validity.valid) {
            event.currentTarget.classList.add('is-danger')
            help.innerText = event.currentTarget.validationMessage
            return
        }
        event.currentTarget.classList.remove('is-danger')
        help.remove()
    })

    // element.addEventListener('invalid', (event) => {
    //     event.preventDefault()
    // })
}

addEventForInput(username, (event, help) => {
    if (event.currentTarget.value.includes('admin')) {
        event.currentTarget.classList.add('is-danger')
        help.innerText = 'ไม่อนุญาตให้ใช้ชื่อ admin ภายใน Username'
        return false
    }
    return true
})
addEventForInput(email)
addEventForInput(password, (event, help) => {
    // !ABCabc123
    if (event.currentTarget.validity.patternMismatch) {
        event.currentTarget.classList.add('is-danger')
        help.innerText = 'รหัสผ่านต้องมีตัวอักขระภาษาอังกฤษพิมพ์เล็ก พิมพ์ใหญ่ ต้องมีตัวเลข ต้องมีตัวอักขระพิเศษ และต้องมีตัวอักษรอย่างน้อย 8 ตัว'
        return false
    }
    return true
})
addEventForInput(confirmPassword, (event, help) => {
    if (event.currentTarget.value != password.value) {
        event.currentTarget.classList.add('is-danger')
        help.innerText = 'กรุณาระบุรหัสผ่านยืนยันที่เหมือนกับรหัสผ่านหลัก'
        return false
    }
    return true
})

registerForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(username.value)
    console.log(email.value)
    console.log(password.value)
})
