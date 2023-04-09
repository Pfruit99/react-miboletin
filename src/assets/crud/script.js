// eslint-disable-next-line no-undef
$(document).ready(function () {
  // eslint-disable-next-line no-undef
  tablaprofesores = $("#tablaprofesores").DataTable({
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  // eslint-disable-next-line no-undef
  tablaDias = $("#tablaDias").DataTable({
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  // eslint-disable-next-line no-undef
  tablaCurso = $("#tablaCurso").DataTable({
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  // eslint-disable-next-line no-undef
  tablaAsignatura = $("#tablaAsignatura").DataTable({
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  // eslint-disable-next-line no-undef
  tablaEstudiante = $("#tablaEstudiante").DataTable({
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  // eslint-disable-next-line no-undef
  tablaInstitucion = $("#tablaInstitucion").DataTable({
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  // eslint-disable-next-line no-undef
  tablaRector = $("#tablaRector").DataTable({
    language: {
      decimal: "",
      emptyTable: "No hay información",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
      infoFiltered: "(Filtrado de _MAX_ total entradas)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Entradas",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Sin resultados encontrados",
      paginate: {
        first: "Primero",
        last: "Ultimo",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  //docentes

  // eslint-disable-next-line no-undef
  $("#btnNuevo").click(function () {
    // eslint-disable-next-line no-undef
    $("#formusuario").trigger("reset");

    // eslint-disable-next-line no-undef
    $(".modal-header").css("background-color", "#28a745");
    // eslint-disable-next-line no-undef
    $(".modal-title").text("Nuevo profesor");

    // eslint-disable-next-line no-undef
    $("#modalCRUD").modal("show");
  });
  // eslint-disable-next-line no-undef
  $("#modalCRUD").modal("hide");
});

//editar y borrar, para tabla dinamica

//boton editar
// eslint-disable-next-line no-undef
$(document).on("click", ".btnEditar", function () {
  // eslint-disable-next-line no-undef
  fila = $(this).closest("tr");
  // eslint-disable-next-line no-undef
  id = parseInt(fila.find("td:eg(0)").text());
  // eslint-disable-next-line no-undef
  alert(id);

  // eslint-disable-next-line no-undef
  $(".modal-header").css("background-color", "#007bff");
  // eslint-disable-next-line no-undef
  $(".modal-title").text("Editar profesor");

  // eslint-disable-next-line no-undef
  $("#modalCRUD").modal("show");
});

// eslint-disable-next-line no-undef
$(document).on("click", ".btnBorrar", function () {
  // eslint-disable-next-line no-undef
  fila = $(this).closest("tr");
  // eslint-disable-next-line no-undef
  id = parseInt(fila.find("td:eg(0)").text());
  // eslint-disable-next-line no-undef
  alert(id);

  // eslint-disable-next-line no-undef
  $(".modal-header").css("background-color", "#BB2D3B");
  // eslint-disable-next-line no-undef
  $(".modal-title").text("Borrar profesor");

  // eslint-disable-next-line no-undef
  $("#modalCRUD").modal("show");
});

//validacion de campos de formulario bootstrap

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  //   "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
