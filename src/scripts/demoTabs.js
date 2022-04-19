const tabsButton = document.querySelectorAll('[data-tab-id]')
const tabs = document.querySelectorAll('.tab')

const setActiveTab = (evt) => {
  const { tabId } = evt.target.dataset

  const tab = document.getElementById(tabId)

  tabs.forEach((tab) => tab.classList.remove('active'))

  tab.classList.add('active')
}

if (tabsButton) {
  tabsButton.forEach((button) => {
    button.addEventListener('click', setActiveTab)
  })
}
