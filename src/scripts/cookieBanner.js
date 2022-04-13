const COOKIE_ACCEPTED_KEY = 'COOKIE_ACCEPTED'

const acceptCookieButton = document.getElementById('acceptCookiePolicy')
const cookieBanner = document.getElementById('cookieBanner')

acceptCookieButton.addEventListener('click', () => {
  localStorage.setItem(COOKIE_ACCEPTED_KEY, true)

  cookieBanner.classList.add('cookieBanner__isHidden')
})

if (!localStorage.getItem(COOKIE_ACCEPTED_KEY)) {
  cookieBanner.classList.remove('cookieBanner__isHidden')
}
