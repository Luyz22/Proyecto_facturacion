import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { clientesService } from '../../services/clientes.services';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export default class ClientesComponent implements OnInit {
  clientes: any[] = [];
  terminoBusqueda: string = '';
  filtroCategoria: string = '';
  filtroEstado: string = '';
  clienteSeleccionado: any = {};
  crearCliente: any = {};
  editar: boolean = false;

  constructor(private clientesService: clientesService) {}

  ngOnInit(): void {
    this.clientesService.getCliente().subscribe({
      next: (data) => {
        this.clientes = data.clientes;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  get clientesFiltrados() {
    return this.clientes.filter(c => {

      const termino = this.terminoBusqueda.toLowerCase();

      const coincideBusqueda =
        c.nombres.toLowerCase().includes(termino) ||
        c.apellidos.toLowerCase().includes(termino) ||
        c.numero_documento.toLowerCase().includes(termino) ||
        (c.email || '').toLowerCase().includes(termino) ||
        (c.direccion || '').toLowerCase().includes(termino);

      const coincideEstado =
        this.filtroEstado !== '' ? c.estado === Number(this.filtroEstado) : true;

      const coincideTipoDocumento =
        this.filtroCategoria ? c.tipo_documento === this.filtroCategoria : true;

      return coincideBusqueda && coincideEstado && coincideTipoDocumento;
    });
  }

  eliminarCliente(id: number, estado: number) {
    const nuevoEstado = estado === 1 ? 0 : 1;

    const data = {
      id: id,
      estado: nuevoEstado
    };

    Swal.fire({
      title: nuevoEstado === 0 ? '¿Está seguro?' : '¿Desea reactivar este cliente?',
      text: nuevoEstado === 0 ? 'Este cliente será Eliminado' : 'Este cliente será activado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: nuevoEstado === 0 ? 'Sí, inactivar' : 'Sí, activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.inactivar(data).subscribe({
          next: () => {
            Swal.fire(
              nuevoEstado === 0 ? 'Eliminado' : 'Activado',
              `El cliente ha sido ${nuevoEstado === 0 ? 'Eliminado' : 'activado'}.`,
              'success'
            );
            this.obtenerClientes();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar el estado del cliente.', 'error');
          }
        });
      }
    });
  }

  obtenerClientes() {
    this.clientesService.getCliente().subscribe((data) => {
      this.clientes = data.clientes;
    });
  }

  detallesCliente(id_cliente: number): void {
    this.clientesService.detalles(id_cliente).subscribe({
      next: (res) => {
        this.clienteSeleccionado = res.detallesCliente;

        const modalElement = document.getElementById('detallesCliente');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
      },
      error: (err) => console.error('Error al obtener detalles:', err)
    });
  }

  abrirModalCrear() {
    const modalElement = document.getElementById('crearCliente');
    if (modalElement) {
      const modal = new Modal(modalElement)
      modal.show();
    }
  }

  guardarCambios(id_cliente: number) {

    const data = {
      id: id_cliente,
      tipo_documento: this.clienteSeleccionado.tipo_documento,
      numero_documento: this.clienteSeleccionado.numero_documento,
      nombre: this.clienteSeleccionado.nombres,
      apellidos: this.clienteSeleccionado.apellidos,
      email: this.clienteSeleccionado.email,
      telefono: this.clienteSeleccionado.telefono,
      direccion: this.clienteSeleccionado.direccion
    }

    if (!this.clienteSeleccionado.tipo_documento) {
      Swal.fire('Error', 'El campo tipo documento no puede estar vacío.', 'error');
      return;
    }

    if (!this.clienteSeleccionado.numero_documento) {
      Swal.fire('Error', 'El campo numero de documento no puede estar vacío.', 'error');
      return;
    }

    if (!this.clienteSeleccionado.nombres) {
      Swal.fire('Error', 'El campo nombres no puede estar vacío.', 'error');
      return;
    }

    if (!this.clienteSeleccionado.apellidos) {
      Swal.fire('Error', 'El campo apellidos no puede estar vacío.', 'error');
      return;
    }

    console.log("datos:", data)

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Revisa bien si es la informacion correcta para este Cliente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.editarCliente(data).subscribe(
          response => {
            Swal.fire('Cliente Actualizado!', 'Se ha actualizado la informacion del Cliente correctamente.', 'success');
            const modalElement = document.getElementById('detallesCliente');
            if (modalElement) {
              const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
              modalInstance.hide();
            }
            this.obtenerClientes();
            this.editar = false
          },
          error => {
            console.error('Error al cambiar datos Cliente:', error);
            Swal.fire('Error', 'Ocurrio un problema al tratar de cambiar los datos', 'error');
          }
        );
      }
    });
  }

  crearClienteNuevo() {

    const data = {
      tipo_documento: this.crearCliente.tipo_documento,
      numero_documento: this.crearCliente.numero_documento,
      nombres: this.crearCliente.nombres,
      apellidos: this.crearCliente.apellidos,
      email: this.crearCliente.email,
      telefono: this.crearCliente.telefono,
      direccion: this.crearCliente.direccion
    };

    if (!data.tipo_documento) {
      Swal.fire('Error', 'Seleccione un tipo de documento.', 'error');
      return;
    }

    if (!data.numero_documento) {
      Swal.fire('Error', 'Ingrese el número de documento.', 'error');
      return;
    }

    if (!data.nombres) {
      Swal.fire('Error', 'El campo nombres es obligatorio.', 'error');
      return;
    }

    if (!data.apellidos) {
      Swal.fire('Error', 'El campo apellidos es obligatorio.', 'error');
      return;
    }

    if (!data.email) {
      Swal.fire('Error', 'El campo email es obligatorio.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Crear cliente?',
      text: "Confirma que los datos están correctos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.clientesService.crearCliente(data).subscribe(
          response => {
            Swal.fire('Cliente creado', 'El cliente fue registrado correctamente.', 'success');

            const modalElement = document.getElementById('crearCliente');
            if (modalElement) {
              const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
              modalInstance.hide();
            }

            this.obtenerClientes();
            this.limpiarCamposCrear();
          },
          error => {
            console.error('Error al crear cliente:', error);
            Swal.fire('Error', 'No se pudo crear el cliente.', 'error');
          }
        );

      }
    });
  }

  limpiarCamposCrear(){
    this.crearCliente.nombre_usuario = "",
    this.crearCliente.correo = "",
    this.crearCliente.password = "",
    this.crearCliente.rol = ""
  }

}