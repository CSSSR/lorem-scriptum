const sendApplication = async (payload) => {
  await fetch('https://master.com.csssr.cloud/api/submit-form', {
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
