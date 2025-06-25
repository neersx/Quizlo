export let SalesData : any = { 
    chart: {
        type: 'line',
        height: 30,
        width: 100,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: 'var(--primary-color)',
            opacity: 0.5
        }
    },
    grid: {
        show: false,
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 1.7,
        dashArray: 0,
    },
    fill: {
        gradient: {
            enabled: false
        }
    },
    series: [{
        name: 'Value',
        data: [14, 58, 20, 94, 25, 55, 35, 55]
    }],
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        show: false,
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        }
    },
    colors: ['var(--primary-color)'],
 }
 export let profitData : any = { 
    ...SalesData,
     dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 0,
                left: 0,
                blur: 3,
                color: 'rgb(133, 204, 65)',
                opacity: 0.6
            },
    colors: ['rgb(133, 204, 65)'],
 }
 export let RevenueData : any = { 
    ...SalesData,
    colors: ['rgb(40, 200, 235)'],
 }
 export let CustomersData : any = { 
    ...SalesData,
    colors: ['rgb(244, 110, 244)'],
 }
 export let SalesAnalysisData : any = { 
    series: [{
        name: 'sales',
        type: 'column',
        data: [55, 75, 95, 115, 132, 150, 170, 195, 212, 242, 260, 280],
    }, {
        name: 'revenue',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
        dataLabels: {
            enabled: false,
        },
    }],
    chart: {
        height: 375,
        type: 'line',
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 4,
            color: ["rgba(255,255,255,0)", "rgb(244, 110, 244)"],
            opacity: 0.6,
        },
        toolbar: {
            show: false,
        },
        zoom:{
            enabled: false,
        },
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        background: {
            enabled: false,
            foreColor: '#fff',
        },
        formatter: function (val:any) {
            return val + "%";
        },
        offsetY: -10,
        style: {
            fontSize: '12px',
            colors: ["#8c9097"]
        }
    },
    stroke: {
        curve: 'smooth',
        width: [0, 2],
    },
    plotOptions: {
        bar: {
            columnWidth: "20%",
            borderRadius: 5,
        }
    },

    colors: ["var(--primary-color)", "rgb(244, 110, 244)"],
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0,
            inverseColors: false,
            gradientToColors: ["var(--primary-color)"],
            opacityFrom: [0.6, 1],
            opacityTo: [1, 1],
            stops: [0, 90, 100]
        }
    },
    labels: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0', '2.1', '2.2'],
    yaxis: [{

    }, {
        opposite: true,
    }],
 }
 export let TotalSalesData : any = { 
    series: [{
        name: 'Total Projects',
        data: [44, 42, 57, 86, 58, 55, 70, 65, 35],
    }, {
        name: 'On Going',
        data: [-34, -22, -37, -56, -21, -35, -60, -68, -42],
    }],
    chart: {
        stacked: true,
        type: 'bar',
        height: 240,
        zoom:{
            enabled: false,
        },
    },
    grid: {
        show: false,
        borderColor: '#f2f6f7',
    },
    colors: ["rgba(244, 110, 244,1)", "var(--primary-color)"],
    plotOptions: {
        bar: {
            columnWidth: '20%',
            borderRadius: 3,
            borderRadiusApplication: 'around',
            borderRadiusWhenStacked: 'all',

        }
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
        position: 'top',
    },
    yaxis: {
        Show: false,
        labels: {
            show: false,
        }
    },
    xaxis: {
        show: false,
        type: 'day',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        axisBorder: {
            show: false,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
    }
 }
 export let SalesRevenueData : any = { 
    series: [{
        name: 'sales',
        type: 'column',
        data: [200, 170, 250, 240, 220, 280, 170, 155, 130, 242, 160, 80],
    }, {
        name: 'revenue',
        type: 'line',
        data: [13, 15, 25, 17, 19, 22, 11, 10, 9, 22, 8, 5],
        dataLabels: {
            enabled: false,
        },
    }],
    chart: {
        height: 356,
        type: 'line',
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 4,
            color: ["rgba(255,255,255,0)", "rgb(244, 110, 244)"],
            opacity: 0.4,
        },
        zoom:{
            enabled: false,
        },
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        background: {
            enabled: false,
            foreColor: '#fff',
        },
        formatter: function (val:any) {
            return val + "%";
        },
        offsetY: -10,
        style: {
            fontSize: '12px',
            colors: ["#8c9097"]
        }
    },
    stroke: {
        curve: 'smooth',
        width: [0, 2],
    },
    plotOptions: {
        bar: {
            columnWidth: "30%",
            borderRadius: 5,
        }
    },

    colors: ["var(--primary-color)", "rgb(244, 110, 244)"],
    labels: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0', '2.1', '2.2'],
    yaxis: [{

    }, {
        opposite: true,
    }],
 }
 export let TotalSalesData1 : any = { 
    chart: {
        height: 300,
        type: 'radialBar',
        responsive: 'true',
        offsetX: 0,
        offsetY: 10,
        zoom:{
            enabled: false,
        },
    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
                margin: 0,
                size: '68%',
                background: '#fff',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
            },
        }
    },
    colors: ["var(--primary-color)"],
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: "#fff",
        width: 0,
        dashArray: 0,
    },
    series: [85],
    labels: ["Total Sales"]
  }

  export let SaleRevenueData : any = {
    series: [{
        name: "Views",
        data: [20, 15, 38, 20, 24, 19, 53, 19, 21, 18, 36, 18, 60, 20]
    }],
    chart: {
        height: 200,
        type: 'line',
        zoom: {
            enabled: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 2,
            left: 0,
            blur: 5,
            color: 'rgb(228, 66, 228)',
            opacity: 0.9
        },
        toolbar: { show: false }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: true,
        position: "top",
        offsetX: 0,
        offsetY: 8,
        markers: {
            width: 5,
            height: 5,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    stroke: {
        curve: 'smooth',
        width: '2',
    },
    grid: {
        borderColor: '#f5f4f4',
        strokeDashArray: 3
    },
    colors: ["rgb(244, 110, 244)"],
    annotations: {
        points: [
            {
                x: 281, // Index of the first data point
                y: 35,
                marker: {
                    size: 5,
                    fillColor: '#fff',
                    strokeColor: 'rgb(244, 110, 244)',
                    strokeWidth: 3,
                },
                label: {
                    borderColor: 'transparent',
                    offsetY: 0,
                    style: {
                        color: '#fff',
                        background: 'rgb(244, 110, 244)',
                    },
                },
            },
        ]
    },
    yaxis: {
        labels: {
            formatter: function (y:any) {
                return y.toFixed(0) + "";
            }
        }
    },
    xaxis: {
        type: 'week',
        categories: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.1', '1.2', '1.3', '1.4'],
        axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            width: 6,
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            rotate: -90
        }
    }
   }
   export let audienceReportData : any = {
    series: [
        {
            name: 'Views',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 45, 35]
        },
        {
            name: 'Followers',
            type: 'column',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 27]
        },
        {
            name: 'sales',
            type: 'column',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 27]
        },
    ],
    chart: {
        toolbar: {
            show: false
        },
        height: 280,
        zoom:{
            enabled: false,
        },
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: [2, 2, 2],
        colors: ['transparent']
    },
    legend: {
        show: true,
        position: "top",
        offsetX: 0,
        offsetY: 8,
        markers: {
            width: 5,
            height: 5,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    xaxis: {
        axisBorder: {
            color: '#e9e9e9',
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "45%",
            borderRadius: '2'
        }
    },
    colors: ["var(--primary-color)", 'rgb(40, 200, 235)', 'rgb(244, 110, 244)'],
   }
   export let TotalRevenuedata1 : any = {
    series: [{
        name: 'Sales',
        data: [20, 30, 25, 50, 25, 30, 20, 35],
    }, {
        name: 'Profit',
        data: [13, 23, 20, 25, 20, 23, 13, 15]
    }],
    chart: {
        type: 'bar',
        height: 250,
        stacked: true,
        toolbar: {
            show: true
        },
        zoom: {
            enabled: false
        }
    },
    grid: {
        borderColor: '#f2f5f7',
    },
    colors: ["var(--primary-color)", "rgb(244, 110, 244)"],
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "45%",
            borderRadius: "5",
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr',
            'May', 'Jun', 'jul', 'Aug'
        ],
        labels: {
            show: true,
            style: {
                colors: "#8c9097",
                fontSize: '11px',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-label',
            },
        }
    },
    legend: {
        show: true,
        position: "bottom",
        offsetX: 0,
        offsetY: 8,
        markers: {
            width: 5,
            height: 5,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                colors: "#8c9097",
                fontSize: '11px',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-label',
            },
        }
    }
   }
   export let TransactionsData : any = {
    series: [
        {
            name: "New Customers",
            data: [12, 20, 16, 21, 15, 22],
        },
        {
            name: "Return Customers",
            data: [20, 12, 14, 12, 20, 15],
        },
    ],
    chart: {
        type: "line",
        height: 150,
        toolbar: {
            show: false
        },
        zoom:{
            enabled: false,
        },
    },
    colors: [
        "var(--primary-color)",
        "rgb(244, 110, 244)"
    ],
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    stroke: {
        curve: 'smooth',
        width: [2, 2]
    },
    yaxis: {
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: function (y:any) {
                return y.toFixed(0) + "";
            },
        },
    },
    xaxis: {
        show: false,
        type: "month",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        labels: {
            show: false,
        },
    },
   }