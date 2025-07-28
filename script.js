// Animaciones y efectos interactivos para el blog

document.addEventListener("DOMContentLoaded", () => {
  // Efecto de aparición gradual para las tarjetas
  const cards = document.querySelectorAll(".topic-card")

  // Observador de intersección para animaciones
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  // Aplicar observador a las tarjetas
  cards.forEach((card) => {
    observer.observe(card)
  })

  // Efecto de hover mejorado para las tarjetas
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Smooth scroll para navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Efecto de typing para el título principal
  const title = document.querySelector("header h1")
  if (title) {
    const text = title.textContent
    title.textContent = ""
    let i = 0

    function typeWriter() {
      if (i < text.length) {
        title.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 500)
  }

  // Contador de visitas (simulado)
  let visitCount = localStorage.getItem("visitCount") || 0
  visitCount++
  localStorage.setItem("visitCount", visitCount)

  // Mostrar contador en consola
  console.log(`Visitas al blog: ${visitCount}`)
})

// Función para copiar código al portapapeles
function copyCode(button) {
  const codeBlock = button.nextElementSibling
  const code = codeBlock.textContent

  navigator.clipboard.writeText(code).then(() => {
    button.textContent = "¡Copiado!"
    setTimeout(() => {
      button.textContent = "Copiar"
    }, 2000)
  })
}

// Función para alternar tema oscuro/claro
function toggleTheme() {
  document.body.classList.toggle("dark-theme")
  const isDark = document.body.classList.contains("dark-theme")
  localStorage.setItem("darkTheme", isDark)
}

// Cargar tema guardado
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("darkTheme")
  if (savedTheme === "true") {
    document.body.classList.add("dark-theme")
  }
})

// Función para buscar contenido
function searchContent(query) {
  const articles = [
    {
      title: "Recurrencia y Árboles",
      url: "recurrencia-arboles.html",
      keywords: ["recursion", "arboles", "algoritmos"],
    },
    {
      title: "Fundamentos de Programación",
      url: "fundamentos-programacion.html",
      keywords: ["variables", "funciones", "control"],
    },
    { title: "Arreglos", url: "arreglos.html", keywords: ["arrays", "ordenamiento", "busqueda"] },
    { title: "POO", url: "poo.html", keywords: ["clases", "herencia", "polimorfismo"] },
    { title: "Microeconomía", url: "microeconomia.html", keywords: ["oferta", "demanda", "optimizacion"] },
  ]

  const results = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.keywords.some((keyword) => keyword.includes(query.toLowerCase())),
  )

  return results
}
