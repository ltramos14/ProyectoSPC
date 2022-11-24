import { Component, OnDestroy, OnInit } from "@angular/core";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { defaultChartOptions } from "../../../../@vex/utils/default-chart-options";

import { Order } from "src/app/models/order.model";
import { AnalyticsService } from "src/app/service/analytics/analytics.service";

import icGroup from "@iconify/icons-ic/twotone-group";
import icNature from "@iconify/icons-ic/twotone-nature";
import icCloudOff from "@iconify/icons-ic/twotone-cloud-off";
import icTimer from "@iconify/icons-ic/twotone-timer";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import { Subscription, forkJoin } from "rxjs";

@Component({
  selector: "spc-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn<Order>[] = [
    {
      label: "",
      property: "status",
      type: "badge",
    },
    {
      label: "PRODUCTO",
      property: "name",
      type: "text",
    },
    {
      label: "$ SUBTOTAL",
      property: "subtotal",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: "CANTIDAD",
      property: "quantity",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: "FECHA",
      property: "orderDate",
      type: "text",
      cssClasses: ["text-secondary"],
    },
  ];

  tableData = [];

  productsQuantity: number;
  usersQuantity: number;
  usersToVerify: number;
  pqrsToResponse: number;

  subscriptions: Subscription[] = [];

  usersByTypeSeries = [];
  usersByTypeOptions = defaultChartOptions({
    chart: {
      type: "donut",
      height: 384,
    },
    colors: ["#058d38", "#ee731b", "#4E3620"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%";
      },
    },
    labels: ["Productores", "Consumidores", "Transportadores"],
    legend: {
      show: true,
      itemMargin: {
        horizontal: 4,
        vertical: 4,
      },
    },
  });

  productsByTypeSeries: ApexAxisChartSeries = [{
    data: []
  }];
  productsByTypeOptions = defaultChartOptions({
    grid: {
      show: true,
      strokeDashArray: 3,
      padding: {
        left: 16
      }
    },
    chart: {
      type: 'bar',
      height: 350,
      sparkline: {
        enabled: false
      },
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000']
      }
    },
    colors: ['#FFC107', '#E91E63', '#6366F1', '#009688', '#FF5722'],
    labels: [
      "Frutas",
      "Hortalizas",
      "Tubérculos",
      "Granos",
      "Hierbas y aromáticas",
    ],
    xaxis: {
      type: 'category',
      labels: {
        show: true
      },
      categories: [
        "Frutas",
        "Hortalizas",
        "Tubérculos",
        "Granos",
        "Hierbas y aromáticas",
      ]
    },
    yaxis: {
      reversed: true,
      axisTicks: {
        show: true
      },
      labels: {
        show: true
      },
    },
    legend: {
      show: true,
      itemMargin: {
        horizontal: 4,
        vertical: 4
      }
    }
  });

  topMunicipalitiesSeries: ApexAxisChartSeries = [{
    data: [],
  }];

  topMunicipalitiesOptions = defaultChartOptions({
    grid: {
      show: true,
      strokeDashArray: 3,
      padding: {
        left: 16
      }
    },
    chart: {
      type: 'bar',
      height: 350,
      sparkline: {
        enabled: false
      },
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        distributed: true
      }
    },
    labels: [],
    colors: ['#009688', '#F44336', '#9C27B0', '#E91E63', '#A5978B', '#FF9800', '#4CAF50', '#9E9E9E', '#673AB7', '#FF5722', '#00BCD4'],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000']
      }
    },
    xaxis: {
      type: 'category',
      labels: {
        show: true
      },
    },
    yaxis: {
      axisTicks: {
        show: true
      },
      labels: {
        show: true
      },
    },
    legend: {
      show: true,
      itemMargin: {
        horizontal: 4,
        vertical: 4
      }
    }
  })

  activeOrdersSeries = [];
  activeOrdersOptions = defaultChartOptions({
    chart: {
      type: "radialBar",
      height: 350,
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    colors: ["#FF9800", "#4CAF50", "#9E9E9E"],
    labels: ["Pendientes de pago", "Pagados", "En camino"],
    legend: {
      show: true,
        floating: true,
        fontSize: "12px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
    },
  });


  icGroup = icGroup;
  icNature = icNature;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;

  constructor(
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.getRecentProducts();
    this.getQuatities();
    this.getUsersByType();
    this.getProductsByType();
    this.getTopMunicipalities();
    this.getActiveOrders();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getRecentProducts() {
    this.subscriptions.push(
      this.analyticsService
        .getRecentProducts()
        .subscribe((data) => (this.tableData = data))
    );
  }

  getQuatities() {
    this.subscriptions.push(
      forkJoin(
        this.analyticsService.getProductsQuatity(),
        this.analyticsService.getUsersQuatity(),
        this.analyticsService.getAdminNews()
      ).subscribe((res) => {
        this.productsQuantity = res[0].products;
        this.usersQuantity = res[1].users;
        this.usersToVerify = res[2].users;
        this.pqrsToResponse = res[2].pqrs;
      })
    );
  }

  getUsersByType() {
    this.subscriptions.push(
      this.analyticsService.getUsersByType().subscribe((res) => {
        Object.keys(res).forEach((key) => {
          this.usersByTypeSeries.push(res[key]);
        });
      })
    );
  }

  getProductsByType() {
    this.subscriptions.push(
      this.analyticsService.getProductByType().subscribe((res) => {
        Object.keys(res).forEach((key) => {
          this.productsByTypeSeries[0].data.push(res[key]);
        });
      })
    )
  }

  getTopMunicipalities() {
    this.subscriptions.push(
      this.analyticsService.getTopMunicipalities().subscribe((res) => {
        res.forEach((municipality, i) => {
          this.topMunicipalitiesSeries[0].data.push(municipality.quantity);
          this.topMunicipalitiesOptions.labels.push(municipality.name as never);
        });
           
      })
    )
  }

  getActiveOrders() {
    this.subscriptions.push(
      this.analyticsService.getActiveOrders().subscribe((res) => {
        Object.keys(res).forEach((key) => {
          this.activeOrdersSeries.push(res[key]);
        });
      })
    )
  }

}
