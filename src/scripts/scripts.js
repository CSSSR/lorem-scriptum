const sendApplication = async ({ email, phone, message }) => {
  await fetch('https://master.com.csssr.cloud/api/submit-form', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      phone,
      message,
      name: 'Первичный запрос с Lorem Scriptum',
      pageName: 'contactUs',
      language: 'en',
    }),
  })
}

const formContainer = document.getElementById('formContainer')
const applicationForm = document.getElementById('applicationForm')
const submitButton = document.querySelector('#applicationForm .applicationForm__submitButton')
const emailField = document.getElementById('applicationFormEmail')
const messageField = document.getElementById('applicationFormMessage')

const getErrorMessage = (field) => {
  let message = null
  const { valueMissing, typeMismatch } = field.validity

  if (valueMissing) {
    message = 'Fill out the field to send a message'
  }

  if (typeMismatch) {
    message = 'Invalid e-mail address'
  }

  return message
}

const setErrorState = (field, message) => {
  field.setCustomValidity(' ')

  field.classList.add('input__type_invalid')
  field.nextSibling.innerText = message
}

const resetErrorState = (field) => {
  if (field.classList.contains('input__type_invalid')) {
    field.setCustomValidity('')

    field.classList.remove('input__type_invalid')
    field.nextSibling.innerText = ''
  }
}

const handleErrorState = (evt) => {
  evt.preventDefault()

  setErrorState(evt.target, getErrorMessage(evt.target))
}

emailField.addEventListener('input', ({ target }) => resetErrorState(target))
messageField.addEventListener('input', ({ target }) => resetErrorState(target))

emailField.addEventListener('invalid', handleErrorState)
messageField.addEventListener('invalid', handleErrorState)

applicationForm.addEventListener('submit', async (evt) => {
  try {
    evt.preventDefault()

    const form = evt.target

    const { email, phone, message } = form.elements

    submitButton.setAttribute('disabled', 'disabled')

    await sendApplication({
      email: email.value.trim(),
      phone: phone.value.trim(),
      message: message.value.trim(),
    })

    formContainer.classList.add('applicationForm--state-success')
  } catch (err) {
    console.error(err)
  } finally {
    submitButton.removeAttribute('disabled')
  }
})

const cookies = document.cookie.split(';').map((item) => item.trim())

const COOKIE_ACCEPTED_KEY = 'COOKIE_ACCEPTED'
const cookiePrivacyAccepted = cookies.includes(COOKIE_ACCEPTED_KEY)

const acceptCookieButton = document.getElementById('acceptCookiePolicy')
const cookieBanner = document.getElementById('cookieBanner')
const copyrightYear = document.getElementById('copyright-year')

const getOneYearOffsetFromDateNow = () => {
  const date = new Date()

  date.setFullYear(date.getFullYear() + 1)

  return date
}

acceptCookieButton.addEventListener('click', () => {
  document.cookie = `${COOKIE_ACCEPTED_KEY}; expires=${getOneYearOffsetFromDateNow()}`

  cookieBanner.classList.add('cookieBanner__isHidden')
})

if (!cookiePrivacyAccepted) {
  cookieBanner.classList.remove('cookieBanner__isHidden')
}

if (copyrightYear) {
  const fullYear = new Date().getFullYear()

  copyrightYear.append(fullYear)
}
