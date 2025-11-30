import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacturasService } from '../../services/facturas.services';
import { clientesService } from '../../services/clientes.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export default class FacturacionComponent implements OnInit {
  factura: {
    numero: string;
    id_cliente: number | null;
    fecha: string;
    total: number | null;
    subtotal: number | null;
    impuesto: number | null;
    estado: string;
  } = {
    numero: '',
    id_cliente: null,
    fecha: '',
    total: null,
    subtotal: null,
    impuesto: null,
    estado: 'PENDIENTE'
  };

  clientes: any[] = [];
  listadoFacturas: any[] = [];
  estadisticas: any = {};

  constructor(
    private facturasService: FacturasService,
    private clientesService: clientesService
  ) {}

  ngOnInit(): void {
    this.cargarFacturas();
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientesService.getCliente().subscribe({
        next: (res: any) => {
        this.clientes = res.clientes || [];
        },
        error: () => Swal.fire('Error', 'No se pudieron cargar los clientes', 'error')
    });
   }

  cargarFacturas() {
    this.facturasService.getFacturas().subscribe({
      next: (res: any) => {
        this.estadisticas = res.data.estadisticas;
        this.listadoFacturas = res.data.listado;
      },
      error: () => Swal.fire('Error', 'No se pudo cargar la información', 'error')
    });
  }

  guardarFactura() {
    if (!this.factura.numero || this.factura.id_cliente == null || !this.factura.fecha || this.factura.total == null) {
      Swal.fire('Aviso', 'Debe llenar todos los campos obligatorios', 'warning');
      return;
    }

    const impuestoRate = 0.19;
    this.factura.subtotal = parseFloat((this.factura.total! / (1 + impuestoRate)).toFixed(2));
    this.factura.impuesto = parseFloat((this.factura.total! - this.factura.subtotal).toFixed(2));

    this.facturasService.crearFactura(this.factura).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Factura creada correctamente', 'success');
        this.cargarFacturas();
        this.cerrarModal();
      },
      error: () => Swal.fire('Error', 'No se pudo crear la factura', 'error')
    });
  }

  eliminarFactura(id: number) {
    Swal.fire({
      title: '¿Eliminar factura?',
      text: 'Esto no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.facturasService.eliminarFactura({ id }).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'La factura ha sido eliminada', 'success');
            this.cargarFacturas();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar la factura', 'error')
        });
      }
    });
  }

  marcarPagada(id_factura: number) {
  const data = { id_factura: id_factura, estado: 'PAGADA' };

  Swal.fire({
    title: '¿Marcar como pagada?',
    text: 'La factura será marcada como PAGADA.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, marcar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.facturasService.actualizarEstado(data).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'La factura ahora está PAGADA', 'success');
          this.cargarFacturas();
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar el estado', 'error')
      });
    }
  });
  }

  cerrarModal() {
    const modal = document.getElementById('facturModal');
    if (modal) {
      (window as any).bootstrap.Modal.getOrCreateInstance(modal).hide();
    }
  }
}

