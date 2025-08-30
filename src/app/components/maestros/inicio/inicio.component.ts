import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Parametro } from 'src/app/interfaces/sys_parametros';
import { AsignacionesService } from 'src/app/services/asignacion.service';
import { ParametrosService } from 'src/app/services/parametro.service';
import { ParametroComponent } from '../../seguridad/parametros/parametro/parametro.component';
import { Desencriptar } from '../../shared/functions';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class InicioComponent implements OnInit {
  // vencimientos: Vencimiento[];
  fun_id = 3089;
  PermisoEdicionPeriodo = false;
  cantVencimientos = 0;
  cantActualizaciones = 0;
  maxActualizaciones = 0;
  totalDiario = '0';
  mercadoPagoDiario = '0';
  cantVentasDiario = '0';
  totalSemanal = '0';
  mercadoPagoSemanal = '0';
  cantVentasSemanal = '0';
  cantDiasFechaEspecial = '0';
  nombreFechaEspecial = '';
  fecha: any;
  multiAxisDataBar: any;
  multiAxisData: any;
  multiAxisOptions: any;
  data: any;
  chartOptions: any;
  dataPolar: any;
  chartOptionsPolar: any;

  parametrosList: Parametro[];
  parametro1 = {} as Parametro;
  parametro2 = {} as Parametro;
  parametro3 = {} as Parametro;
  parametro4 = {} as Parametro;

  constructor(
    private router: Router,
    private asignacionesService: AsignacionesService,
    private parametrosService: ParametrosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.fecha = new Date();
    //this.llenarPeriodos();
    this.validaPermisos();

    this.multiAxisData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          fill: false,
          borderColor: '#42A5F5',
          yAxisID: 'y',
          tension: 0.4,
          data: [65, 59, 80, 81, 56, 55, 10],
        },
        {
          label: 'Dataset 2',
          fill: false,
          borderColor: '#00bb7e',
          yAxisID: 'y1',
          tension: 0.4,
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.multiAxisOptions = {
      stacked: false,
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: '#495057',
          },
          grid: {
            drawOnChartArea: false,
            color: '#ebedef',
          },
        },
      },
    };

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    this.dataPolar = {
      datasets: [
        {
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            '#42A5F5',
            '#66BB6A',
            '#FFA726',
            '#26C6DA',
            '#7E57C2',
          ],
          label: 'My dataset',
        },
      ],
      labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    };

    this.multiAxisDataBar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          backgroundColor: [
            '#EC407A',
            '#AB47BC',
            '#42A5F5',
            '#7E57C2',
            '#66BB6A',
            '#FFCA28',
            '#26A69A',
          ],
          yAxisID: 'y',
          data: [65, 59, 80, 81, 56, 55, 10],
        },
        {
          label: 'Dataset 2',
          backgroundColor: '#78909C',
          yAxisID: 'y1',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
  }

  validaPermisos() {
    this.asignacionesService
      .TienePermisos(
        Desencriptar(sessionStorage.getItem('usu_id')),
        this.fun_id
      )
      .subscribe((data) => {
        this.PermisoEdicionPeriodo = data;
      });
  }

  llenarPeriodos() {
    this.parametrosService.getList().subscribe((data) => {
      this.parametrosList = data;
      this.parametro1 = this.parametrosList.filter(
        (x) => x.prt_nombre == 'PERIODO_DESDE'
      )[0];
      this.parametro2 = this.parametrosList.filter(
        (x) => x.prt_nombre == 'PERIODO_HASTA'
      )[0];
      this.parametro3 = this.parametrosList.filter(
        (x) => x.prt_nombre == 'MES_INICIO'
      )[0];
      this.parametro4 = this.parametrosList.filter(
        (x) => x.prt_nombre == 'MES_FIN'
      )[0];
    });
  }

  editarParametro(prt_id: any) {
    if (this.PermisoEdicionPeriodo) {
      const ref = this.dialogService.open(ParametroComponent, {
        data: { prt_id, readOnly: false, quick: true },
        showHeader: false,
      });

      //this.llenarPeriodos();
    }
  }

  link(page) {
    if (page == 'periodo1') {
      this.editarParametro(this.parametro1.prt_id);
    }
    if (page == 'periodo2') {
      this.editarParametro(this.parametro2.prt_id);
    }
  }
}
