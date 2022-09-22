import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { defaultChartOptions } from "../../../../@vex/utils/default-chart-options";

import { Order } from "src/app/models/order.model";
import { AnalyticsService } from "src/app/service/analytics/analytics.service";

import icGroup from "@iconify/icons-ic/twotone-group";
import icPageView from "@iconify/icons-ic/twotone-pageview";
import icCloudOff from "@iconify/icons-ic/twotone-cloud-off";
import icTimer from "@iconify/icons-ic/twotone-timer";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import { Subscription, forkJoin } from "rxjs";
import { map } from "rxjs/operators";

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

  series: ApexAxisChartSeries = [
    {
      name: "Subscribers",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44],
    },
  ];

  usersByTypeSeries = [];
  usersByTypeOptions = defaultChartOptions({
    chart: {
      type: "donut",
      height: 384,
    },
    responsive: [
      {
        breakpoint: 480,
      },
    ],
    colors: ["#058d38", "#ee731b", "#4E3620"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed() + "%";
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
        horizontal: true
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 90, 100]
      }
    },
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
    },
    dataLabels: {
      enabled: true
    },
  });

  salesSeries: ApexAxisChartSeries = [
    {
      name: "Sales",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87],
    },
  ];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: "area",
      height: 100,
    },
    colors: ["#ff9800"],
  });

  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;

  constructor(
    private cd: ChangeDetectorRef,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.getRecentProducts();
    this.getQuatities();
    this.getUsersByType();
    this.getProductsByType();
    setTimeout(() => {
      const temp = [
        {
          name: "Subscribers",
          data: [55, 213, 55, 0, 213, 55, 33, 55],
        },
        {
          name: "",
        },
      ];
    }, 3000);
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
}
