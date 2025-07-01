import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { SpkBlogImageCardComponent } from '../../../@spk/reusable-pages/spk-blog-image-card/spk-blog-image-card.component';
import { SharedModule } from '../../../shared/sharedmodule';

@Component({
  selector: 'app-blogs-list',
  imports: [SharedModule,RouterModule,CarouselModule,SpkBlogImageCardComponent], 
  templateUrl: './blogs-list.html',
  styleUrl: './blogs-list.scss'
})
export class BlogsList {
  customOptions: OwlOptions = {
    loop: true,
    rtl: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 8000,
    autoplay: true,
    autoplayTimeout: 5000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  activeSlides!: SlidesOutputData;

  slidesStore: any[] = [
    {
      src: './assets/images/media/blog/1.jpg',
    },
    {
      src: './assets/images/media/blog/3.jpg',
    },
    {
      src: './assets/images/media/blog/2.jpg',
    },
  ];

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
  }
  blogPosts = [
    {
      imageUrl: './assets/images/media/blog/12.jpg',
      title: 'The Tranquility of Water Bodies',
      description: 'Rivers, lakes, and oceans not only provide sustenance but also offer stunning views.',
      author: 'Charlotte Garcia',
      authorImageUrl: './assets/images/faces/2.jpg',
      date: '19, Mar 2024 - 17:40',
      heartColor: 'ri-heart-line text-danger',
      badge: 'In Offer',
      badgeColor: 'success',
      TextColor:'primary'
    },
    {
      imageUrl: './assets/images/media/blog/10.jpg',
      title: 'Connection Between Flora and Fauna',
      description: 'The relationship between plants and animals is essential for life.',
      author: 'Benjamin Moore',
      authorImageUrl: './assets/images/faces/13.jpg',
      date: '18, Mar 2024 - 13:25',
      heartColor: 'ri-heart-line text-danger',
      badge: '20% Off',
      badgeColor: 'primary',
       TextColor:'info'
    },
    {
      imageUrl: './assets/images/media/blog/13.jpg',
      title: 'Nature\'s Role in Human Inspiration',
      description: 'The beauty of nature has inspired art, literature, and science for centuries.',
      author: 'Amelia Taylor',
      authorImageUrl: './assets/images/faces/6.jpg',
      date: '17, Mar 2024 - 14:50',
      heartColor: 'ri-heart-line text-danger',
      badge: '',
      badgeColor: '',
      TextColor:'secondary'
    },
    {
      imageUrl: './assets/images/media/blog/11.jpg',
      title: 'Protecting the Beauty of Nature',
      description: 'Conservation is essential to preserve the magnificence of nature for future generations.',
      author: 'Ethan White',
      authorImageUrl: './assets/images/faces/10.jpg',
      date: '16, Mar 2024 - 08:35',
      heartColor: 'ri-heart-line text-danger',
      badge: 'In Offer',
      badgeColor: 'info',
      TextColor:'info'
    },
  ]
  
  blogPosts1 = [
    {
      title: "The Calming Sounds of Nature",
      description: "The gentle rustling of leaves, flowing rivers, and soothing melodies of wildlife create a natural symphony. These sounds help us reconnect with the earth and find inner peace.",
      image: "./assets/images/media/blog/4.jpg",
      author: "Sophia Johnson",
      date: "23, Mar 2024 - 10:30",
       heartColor: 'ri-heart-line text-danger',
       pageStyleClass:'p-3 pb-0 rounded-5',
       imageClass:'rounded-3',
       TextColor:'primary',
      avatar: "./assets/images/faces/5.jpg",
      link: "/pages/blog/blogdetails"
    },
    {
      title: "Nature's Ever-Changing Canvas",
      description: "Each season paints nature in different hues, offering vibrant blossoms in spring, lush greenery in summer, golden foliage in autumn, and tranquil snow in winter.",
      image: "./assets/images/media/blog/5.jpg",
      author: "William Brown",
      date: "22, Mar 2024 - 16:50",
       heartColor: 'ri-heart-line text-danger',
       pageStyleClass:'p-3 pb-0 rounded-5',
       imageClass:'rounded-3',
       TextColor:'primary',
      avatar: "./assets/images/faces/14.jpg",
      link: "/pages/blog/blogdetails"
    },
    {
      title: "The Diversity of Natural Habitats",
      description: "From dense forests to expansive deserts, nature's variety is awe-inspiring. Each habitat supports unique forms.",
      image: "./assets/images/media/blog/8.jpg",
      author: "Olivia Martinez",
      date: "21, Mar 2024 - 11:15",
       heartColor: 'ri-heart-line text-danger',
       pageStyleClass:'p-3 pb-0 rounded-5',
       imageClass:'rounded-3',
       TextColor:'primary',
      avatar: "./assets/images/faces/7.jpg",
      link: "/pages/blog/blogdetails"
    },
    {
      title: "The Role of Animals in Nature's Balance",
      description: "Animals play a crucial role in maintaining ecosystems, from pollination to soil aeration. Their movement.",
      image: "./assets/images/media/blog/9.jpg",
      author: "James Wilson",
      date: "20, Mar 2024 - 09:05",
       heartColor: 'ri-heart-line text-danger',
       pageStyleClass:'p-3 pb-0 rounded-5',
       imageClass:'rounded-3',
       TextColor:'primary',
      avatar: "./assets/images/faces/15.jpg",
      link: "/pages/blog/blogdetails"
    }
  ];
  categories = [
    {
      name: "Nature Life",
      icon: "ri-leaf-fill",
      badgeClass: "badge bg-primary-transparent",
      count: 12,
      iconBg: "bg-primary",
    },
    {
      name: "Tourism & Trips",
      icon: "ri-flight-takeoff-fill",
      badgeClass: "badge bg-success-transparent",
      count: 36,
      iconBg: "bg-success",
    },
    {
      name: "Technology",
      icon: "ri-global-fill",
      badgeClass: "badge bg-info-transparent",
      count: 45,
      iconBg: "bg-info",
    },
    {
      name: "Data Networking",
      icon: "ri-cloud-fill",
      badgeClass: "badge bg-secondary-transparent",
      count: 124,
      iconBg: "bg-secondary",
    },
    {
      name: "Modern Living",
      icon: "ri-home-wifi-fill",
      badgeClass: "badge bg-warning-transparent",
      count: 16,
      iconBg: "bg-warning",
    }
  ];

  comments = [
    {
      avatar: "./assets/images/media/blog/5.jpg",
      name: "Isabella Thomas",
      message: "From dense forests to expansive deserts",
      timestamp: "26, Mar 2024 - 15:37"
    },
    {
      avatar: "./assets/images/media/blog/6.jpg",
      name: "Justin Roy",
      message: "Rivers, lakes, and oceans",
      timestamp: "25, Mar 2024 - 14:20"
    },
    {
      avatar: "./assets/images/media/blog/8.jpg",
      name: "Emily Davis",
      message: "The relationship between plants and animals",
      timestamp: "24, Mar 2024 - 12:45"
    },
    {
      avatar: "./assets/images/media/blog/9.jpg",
      name: "William Brown",
      message: "The beauty of nature has inspired art",
      timestamp: "22, Mar 2024 - 16:50"
    }
  ];
  users = [
    {
      avatar: "./assets/images/media/blog/11.jpg",
      name: "Jack Diamond",
      description: "To generate Lorem Ipsum"
    },
    {
      avatar: "./assets/images/media/blog/12.jpg",
      name: "Dhruva Gen",
      description: "Generators on the Internet"
    },
    {
      avatar: "./assets/images/media/blog/10.jpg",
      name: "Henry Milo",
      description: "Always free from repetition"
    },
    {
      avatar: "./assets/images/media/blog/13.jpg",
      name: "Peter Paul",
      description: "Lorem Ipsum is not simply text"
    },
    {
      avatar: "./assets/images/media/blog/12.jpg",
      name: "Fahad Rafi",
      description: "Electronic typesetting, remaining"
    },
    {
      avatar: "./assets/images/media/blog/5.jpg",
      name: "Khanu Milo",
      description: "Trending habits"
    }
  ];
}
