import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import Chart from "chart.js/auto"

interface Transaccion {
  tipo: string
  descripcion: string
  monto: number
  fecha: Date
  estado: string
}

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export default class DashboardComponent implements OnInit {
  nombreUsuario = ""

  // Métricas Principales
  ingresosTotales = 125650.5
  gastosTotales = 45230.75
  saldoNeto = 80419.75
  clientesActivos = 47
  clientesNuevos = 8
  comprasRegistradas = 156
  valorCompras = 98500.0
  facturasPendientes = 12
  montoFacturasPendientes = 35420.0

  // Transacciones Recientes
  transacionesRecientes: Transaccion[] = [
    {
      tipo: "Ingreso",
      descripcion: "Pago cliente Acme Corp",
      monto: 15000,
      fecha: new Date("2024-11-25"),
      estado: "Completado",
    },
    {
      tipo: "Gasto",
      descripcion: "Compra de inventario",
      monto: 5230,
      fecha: new Date("2024-11-24"),
      estado: "Completado",
    },
    {
      tipo: "Ingreso",
      descripcion: "Venta de producto",
      monto: 8500,
      fecha: new Date("2024-11-23"),
      estado: "Completado",
    },
    {
      tipo: "Gasto",
      descripcion: "Servicios de hosting",
      monto: 150,
      fecha: new Date("2024-11-22"),
      estado: "Pendiente",
    },
    {
      tipo: "Ingreso",
      descripcion: "Consultoría realizada",
      monto: 6200,
      fecha: new Date("2024-11-21"),
      estado: "Completado",
    },
  ]

  ngOnInit(): void {
    this.nombreUsuario = sessionStorage.getItem("nombre") || "Administrador"
    this.crearGraficos()
  }

  private crearGraficos(): void {
    new Chart("gastosChart", {
      type: "doughnut",
      data: {
        labels: ["Salarios", "Servicios", "Inventario", "Marketing", "Otros"],
        datasets: [
          {
            data: [18000, 8500, 12000, 4500, 2230],
            backgroundColor: ["#dc3545", "#ffc107", "#0dcaf0", "#6f42c1", "#6c757d"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })

    new Chart("comparisonChart", {
      type: "bar",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Noviembre"],
        datasets: [
          {
            label: "Ingresos",
            data: [95000, 102000, 115000, 108000, 125000, 125650],
            backgroundColor: "#198754",
          },
          {
            label: "Gastos",
            data: [42000, 48000, 51000, 45000, 52000, 45230],
            backgroundColor: "#dc3545",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "$" + value.toLocaleString(),
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }
}
