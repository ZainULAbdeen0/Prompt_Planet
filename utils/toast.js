export const showToast = (message, type = "info", duration = 3000) => {
    const toast = document.createElement("div")
    toast.className = `toast toast-${type}`
    toast.innerText = message
  
    document.getElementById("toast-container").appendChild(toast)
  
    setTimeout(() => {
      toast.classList.add("fade-out")
      toast.addEventListener("animationend", () => toast.remove())
    }, duration)
  }
  