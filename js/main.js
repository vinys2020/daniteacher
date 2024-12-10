document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded", "slide-up");
        observer.unobserve(entry.target);
      }
    });
  });

  const slideUpElements = document.querySelectorAll(".slide-up");
  slideUpElements.forEach(element => {
    observer.observe(element);
  });
});


function scrollToTop() {
  window.scrollTo({
    top: 0,
  });
}

window.addEventListener('scroll', function () {
  var scrollTopButton = document.querySelector('.scroll-top');
  if (this.window.pageYOffset > 200) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
});




function filtrarPorServicio() {
  const filtroServicio = document.getElementById('filtroServicio').value;
  const agenda = JSON.parse(localStorage.getItem('agenda')) || [];

  if (filtroServicio === 'todos') {
    mostrarContactos(agenda);
  } else {
    const contactosFiltrados = agenda.filter(contacto => contacto.servicio === filtroServicio);
    mostrarContactos(contactosFiltrados);
  }
}

function editarContacto(index) {
  const agenda = JSON.parse(localStorage.getItem('agenda')) || [];
  const contacto = agenda[index];

  document.getElementById('nombre').value = contacto.nombre;
  document.getElementById('correo').value = contacto.correo;
  document.getElementById('telefono').value = contacto.telefono;
  document.getElementById('nombreEmpresa').value = contacto.nombreEmpresa;
  document.getElementById('servicio').value = contacto.servicio;
  document.getElementById('mensaje').value = contacto.mensaje;

  agenda.splice(index, 1);
  localStorage.setItem('agenda', JSON.stringify(agenda));
  mostrarContactos(agenda);
}

function eliminarContacto(index) {
  const agenda = JSON.parse(localStorage.getItem('agenda')) || [];
  agenda.splice(index, 1);
  localStorage.setItem('agenda', JSON.stringify(agenda));
  mostrarContactos(agenda);
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('mensaje').value = '';
}


const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_zyvbflr';
   const templateID = 'template_nicnhdf';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});