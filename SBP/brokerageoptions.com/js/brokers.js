var toastTrigger = document.getElementById('btn-toast-example')
var toastLiveExample = document.getElementById('toast-example')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}