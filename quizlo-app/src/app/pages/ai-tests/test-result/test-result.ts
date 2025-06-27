import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SpkReusableTablesComponent } from '../../../@spk/spk-reusable-tables/spk-reusable-tables.component';
import { SharedModule } from '../../../shared/sharedmodule';
import { GalleryModule, Image } from '@ks89/angular-modal-gallery';
import { SpkNftCardComponent } from '../../../@spk/reusable-apps/spk-nft-card/spk-nft-card.component';
import { ApexChartComponent } from '../../../@spk/apex-chart/apex-chart.component';

@Component({
  selector: 'app-test-result',
  imports: [SharedModule,GalleryModule,NgbTooltipModule,SpkNftCardComponent,SpkReusableTablesComponent, ApexChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './test-result.html',
  styleUrl: './test-result.scss'
})
export class TestResult {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
	ngAfterViewInit(): void {
		const swiperEl = this.swiperContainer.nativeElement;
	
		Object.assign(swiperEl, {
		  slidesPerView: 1,
		  spaceBetween: 10,
		  breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			  },
			1110: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			1300: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},

		  },
	  });
  }
  dotsConfig!: false;

  chartOptions:any = {
    series: [{
      name: "Paid",
      type: "column",
      data: [33, 21, 32, 37, 23, 32, 47, 31, 54, 32, 20, 38]
    }, {
      name: "Unpaid",
      type: "area",
      data: [44, 55, 41, 42, 22, 43, 21, 35, 56, 27, 43, 27]
    }, {
      name: "Refunded",
      type: "line",
      data: [30, 25, 36, 30, 45, 35, 64, 51, 59, 36, 39, 51]
    }],
    chart: {
      height: 300,
      type: "line",
      stacked: !1,
      toolbar: {
        show: !1
      },
      zoom: {
        enabled: false
      },
    },
    stroke: {
      width: [0, 0, 2],
      dashArray: [0, 0, 4],
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    },
    xaxis: {
      axisBorder: {
        color: 'rgba(119, 119, 142, 0.05)',
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        color: 'rgba(119, 119, 142, 0.05)',
        width: 6,
        offsetX: 0,
        offsetY: 0
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "10%",
        borderRadius: 3
      }
    },
    legend: {
      position: "top"
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    markers: {
      size: 0
    },
    colors: ['var(--primary-color)', "rgba(244, 110, 244, 0.05)", 'rgb(133, 204, 65)'],
    tooltip: {
      theme: "dark",
    },
  }

  chartOptions1:any = {
    chart: {
      height: 295,
      type: 'radialBar',
      responsive: 'true',
      offsetX: 0,
      offsetY: 15,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        size: 120,
        imageWidth: 50,
        imageHeight: 50,
        track: {
          strokeWidth: '97%',
          // strokeWidth: "0",
        },
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          bottom: 0,
          blur: 3,
          opacity: 0.5
        },
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 30,
          },
          hollow: {
            size: "60%"
          },
          value: {
            offsetY: -10,
            fontSize: '22px',
            color: undefined,
            formatter: function (val:any) {
              return val + "%";
            }
          }
        }
      }
    },
    colors: ['var(--primary-color)'],
    fill: {
      type: "solid",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: .5,
        gradientToColors: ["#b94eed"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      dashArray: 3
    },
    series: [92],
    labels: ["Orders"]
  }

  imagesRect: Image[] = [

    new Image( 0, { img: "./assets/images/nft-images/2.jpg", },
      { img: "./assets/images/nft-images/2.jpg",
    }
    ),
    new Image(1, { img: "./assets/images/nft-images/3.jpg" }),
    new Image(
      2,
      {
        img: "./assets/images/nft-images/4.jpg",
       
      },
      {
        img: "./assets/images/nft-images/4.jpg",
     
      }
    ),
    new Image(
      3,
      {
        img: "./assets/images/nft-images/5.jpg",
       
      },
      { img: "./assets/images/nft-images/5.jpg",
      }
    ),
   
  ];
  cardData1=[
    {
      id:1,
      avatarSize:'xs',
      bodyClass:"card-body",
      imageClass:"overflow-hidden rounded mb-3",
      titleClass:"d-flex align-items-start gap-2 flex-wrap",
      time1:"04hrs : 24m : 38s",
      title:"Abstract Digital Art",
      image:"./assets/images/nft-images/2.jpg",
      image1:"./assets/images/faces/14.jpg",
      name:"Manistics NFT",
      value:"0.015ETH",
      mail:" @manistics454",
      likes1:"1.43k"
    },
    {
        id:2,
        avatarSize:'xs',
        bodyClass:"card-body",
        imageClass:"overflow-hidden rounded mb-3",
        titleClass:"d-flex align-items-start gap-2 flex-wrap",
        time1:"03hrs : 12m : 45s",
        title:"Abstract Digital Art",
        image:"./assets/images/nft-images/3.jpg",
        image1:"./assets/images/faces/2.jpg",
        name:"Manistics NFT",
        value:"0.015ETH",
        mail:" @manistics454",
        likes1:"1.43k"
      },
    {
        id:3,
        avatarSize:'xs',
        bodyClass:"card-body",
        imageClass:"overflow-hidden rounded mb-3",
        titleClass:"d-flex align-items-start gap-2 flex-wrap",
        time1:"05hrs : 03m : 20s",
        title:"CyberCreations",
        image:"./assets/images/nft-images/4.jpg",
        image1:"./assets/images/faces/11.jpg",
        name:"CyberArt NFT ",
        value:"0.014ETH",
        mail:" @cyberartworks154",
        likes1:"1.43k"
      },
      {
        id:4,
        avatarSize:'xs',
        bodyClass:"card-body",
        imageClass:"overflow-hidden rounded mb-3",
        titleClass:"d-flex align-items-start gap-2 flex-wrap",
        time1:"02hrs : 50m : 55s",
        title:"Dreamscapes",
        image:"./assets/images/nft-images/5.jpg",
        image1:"./assets/images/faces/12.jpg",
        name:"GeoNFT NFT",
        value:"0.016ETH",
        mail:" @geonft_designs47",
        likes1:"2.9k"
      },
   
  ]
  nftDetails = [
    { label: 'Artist Name', value: 'Henry Milo' },
    { label: 'Royalty', value: '10% royalty paid to the artist on secondary sales' },
    { label: 'Total Bids', value: '32' },
    { label: 'Current Owner', value: 'Nikki Jones' },
    { label: 'NFT Type', value: 'Digital art work' }
  ];
  nftItems = [
    {
      name: 'Digital Dreamscapes',
      imageUrl: './assets/images/nft-images/4.jpg',
      likes: '18.5k',
      totalLikes: '18,512',
      price: '2.299 ETH',
      oldPrice: '3.299 ETH'
    },
    {
      name: 'Galactic Gardens',
      imageUrl: './assets/images/nft-images/7.jpg',
      likes: '4.2k',
      totalLikes: '4,356',
      price: '1.899 ETH',
      oldPrice: '2.799 ETH'
    },
    {
      name: 'Pixelated Paradise',
      imageUrl: './assets/images/nft-images/10.jpg',
      likes: '9.1k',
      totalLikes: '9,153',
      price: '3.599 ETH',
      oldPrice: '5.499 ETH'
    },
    {
      name: 'Vibrant Voyages',
      imageUrl: './assets/images/nft-images/11.jpg',
      likes: '15.7k',
      totalLikes: '15,789',
      price: '6.499 ETH',
      oldPrice: '9.999 ETH'
    }
  ];
}
