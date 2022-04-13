const copyrightYear = document.getElementById('copyright-year')

if (copyrightYear) {
  const fullYear = new Date().getFullYear()

  copyrightYear.append(fullYear)
}
