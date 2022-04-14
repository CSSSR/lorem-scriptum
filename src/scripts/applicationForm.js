const sendApplication = async (payload) => {
  return await fetch(`${process.env.AMO_API_URL}/api/submit-form`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      name: 'Первичный запрос с Lorem Scriptum',
      pageName: 'contactUs',
      language: 'en',
    }),
  })
}

const formContainer = document.getElementById('formContainer')
const applicationForm = document.getElementById('applicationForm')
const submitButton = document.querySelector(
  '#applicationForm .applicationForm__submitButton'
)
const emailField = document.getElementById('applicationFormEmail')
const messageField = document.getElementById('applicationFormMessage')
const errorSubmit = document.getElementById('errorSubmit')

const errorSubmitMessage = "Couldn't send. Please contact us by email or phone"

const getErrorMessage = (field) => {
  let message = null
  const { valueMissing, typeMismatch } = field.validity

  if (valueMissing) {
    message = 'Fill out the field to send a message'
  }

  if (typeMismatch) {
    message = 'Invalid email address'
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

const validate = (field) => {
  if (field.value.replace(/\s/g, '').length === 0) {
    field.value = ''
    field.checkValidity()

    return false
  }

  return true
}

applicationForm.addEventListener('submit', async (evt) => {
  try {
    evt.preventDefault()

    const form = evt.target

    const { email, phone, message } = form.elements

    if (!validate(message)) return

    submitButton.setAttribute('disabled', 'disabled')

    const response = await sendApplication({
      email: email.value.trim(),
      phone: phone.value.trim(),
      message: message.value.trim(),
    })

    if (response?.status !== 201) {
      errorSubmit.innerText = errorSubmitMessage

      return
    }

    errorSubmit.innerText = ''
    formContainer.classList.add('applicationForm--state-success')
  } catch (err) {
    console.error(err)
  } finally {
    submitButton.removeAttribute('disabled')
  }
})
