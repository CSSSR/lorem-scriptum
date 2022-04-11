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
