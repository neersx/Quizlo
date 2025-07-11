import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { SharedModule } from '../../../shared/sharedmodule';
import { SpkGalleryComponent } from '../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { GalleryItem, Gallery, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { BlogModel, BlogService } from '../blogs.service';
import { FormLoader } from '../../../shared/common/loaders/form-loader/form-loader';
import { GridLoader } from '../../../shared/common/loaders/grid-loader/grid-loader';

const data = [
  {
    srcUrl: './assets/images/media/media-48.jpg',
    previewUrl: './assets/images/media/media-48.jpg',
  },
  {
    srcUrl: './assets/images/media/media-49.jpg',
    previewUrl: './assets/images/media/media-49.jpg',
  },
  {
    srcUrl: './assets/images/media/media-50.jpg',
    previewUrl: './assets/images/media/media-50.jpg',
  },
  {
    srcUrl: './assets/images/media/media-51.jpg',
    previewUrl: './assets/images/media/media-51.jpg',
  },
  {
    srcUrl: './assets/images/media/media-52.jpg',
    previewUrl: './assets/images/media/media-52.jpg',
  },
  {
    srcUrl: './assets/images/media/media-53.jpg',
    previewUrl: './assets/images/media/media-53.jpg',
  },
  {
    srcUrl: './assets/images/media/media-54.jpg',
    previewUrl: './assets/images/media/media-54.jpg',
  },
  {
    srcUrl: './assets/images/media/media-55.jpg',
    previewUrl: './assets/images/media/media-55.jpg',
  },
  {
    srcUrl: './assets/images/media/media-56.jpg',
    previewUrl: './assets/images/media/media-56.jpg',
  },
];

@Component({
  selector: 'app-blog-details',
  imports: [SharedModule, RouterModule, GalleryModule, LightboxModule, OverlayscrollbarsModule, SpkGalleryComponent, CommonModule, GridLoader ],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetails implements OnInit, OnDestroy {
  imageData = data;
  blog: BlogModel = {} as BlogModel;
  items!: GalleryItem[];
  loading: boolean = false;
  blogsLoading: boolean = false;

  formFields = [
    { type: 'input' as const },
    { type: 'input' as const, showError: true },
    { type: 'select' as const },
    { type: 'textarea' as const }
  ];

  constructor(public gallery: Gallery, public lightbox: Lightbox,
    private cdr: ChangeDetectorRef,
    private service: BlogService, private route: ActivatedRoute) {

    this.route.params.subscribe((params) => {
      this.getBlogDetails(params['name']);
    });
  }

  ngOnInit() {
    /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.imageData.map(
      (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );

    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }

  getBlogDetails(urlName: string) {
    this.loading = true;
    this.service.getBlogByName(urlName).subscribe((data) => {
      this.blog = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  blogs = [
    {
      title: "Effective Exam Preparation Techniques",
      urlName: "effective-exam-preparation",
      description: "Discover proven methods to maximize your study time and improve your performance in competitive exams.",
      image: "https://www.sameeraggarwallawclasses.com/wp-content/uploads/2024/06/Ace-Your-Exams-With-Effective-Strategies-from-Top-Performers.jpg",
      author: "Quizlo Ai",
      date: "01, Jul 2025 - 09:00",
      heartColor: 'ri-heart-line text-danger',
      pageStyleClass: 'p-3 pb-0 rounded-5',
      imageClass: 'rounded-3',
      textColor: 'primary',
      avatar: "./assets/images/faces/5.jpg",
      link: "/blogs/blog-details/effective-exam-preparation",
      category: "exam-prep-tips",
      color: 'text-danger'
    },
    {
      title: "Cracking NEET: Tips from Toppers",
      urlName: "cracking-neet-tips",
      description: "Gain valuable insights and strategies directly from NEET toppers to enhance your exam readiness.",
      image: "https://blogcdn.aakash.ac.in/wordpress_media/2025/04/5-Study-Tips-from-NEET-Toppers-1.png",
      author: "Quizlo Ai",
      date: "28, Jun 2025 - 15:00",
      heartColor: 'ri-heart-line text-danger',
      pageStyleClass: 'p-3 pb-0 rounded-5',
      imageClass: 'rounded-3',
      textColor: 'success',
      avatar: "./assets/images/faces/5.jpg",
      link: "/blogs/blog-details/cracking-neet-tips",
      category: "exam-insights",
      color: 'text-primary'
    },
    {
      title: "AI in Education: Transforming Exam Preparation",
      urlName: "ai-in-education",
      description: "Explore how artificial intelligence is revolutionizing the educational landscape, making learning smarter and more efficient.",
      image: "https://miro.medium.com/v2/resize:fit:1024/1*5Kais5SIlrU8ZmBfH5cSEw.jpeg",
      author: "Quizlo Ai",
      date: "25, Jun 2025 - 11:30",
      heartColor: 'ri-heart-line text-danger',
      pageStyleClass: 'p-3 pb-0 rounded-5',
      imageClass: 'rounded-3',
      textColor: 'info',
      avatar: "./assets/images/faces/5.jpg",
      link: "/blogs/blog-details/ai-in-education",
      category: "tech-learning",
      color: 'text-success'
    },
    {
      title: "Stay Motivated During Exam Preparation",
      urlName: "stay-motivated-exam-prep",
      description: "Learn techniques to maintain motivation and effectively manage stress during your exam preparation journey.",
      image: "https://vishalcpaprep.com/cdn/shop/articles/motivated_1445x.jpg?v=1695042093",
      author: "Quizlo Ai",
      date: "22, Jun 2025 - 14:45",
      heartColor: 'ri-heart-line text-danger',
      pageStyleClass: 'p-3 pb-0 rounded-5',
      imageClass: 'rounded-3',
      textColor: 'warning',
      avatar: "./assets/images/faces/5.jpg",
      link: "/blogs/blog-details/stay-motivated-exam-prep",
      category: "motivation",
      color: 'text-danger'
    }
  ];

  categories = [
    { icon: 'ri-brush-fill', label: 'Desiging', count: 13, iconBgColor: 'bg-primary', bgColor: 'bg-primary-transparent', textColor: 'text-fixed-white' },
    { icon: 'ri-pencil-fill', label: 'Modern', count: 36, iconBgColor: 'bg-success', bgColor: 'bg-success-transparent', textColor: 'text-fixed-white' },
    { icon: 'ri-microscope-fill', label: 'Science', count: 15, iconBgColor: 'bg-info', bgColor: 'bg-info-transparent', textColor: 'text-fixed-white' },
    { icon: 'ri-flight-takeoff-fill', label: 'Trips', count: 17, iconBgColor: 'bg-secondary', bgColor: 'bg-secondary-transparent', textColor: 'text-fixed-white' },
    { icon: 'ri-magic-fill', label: 'Beauty', count: 66, iconBgColor: 'bg-secondary', bgColor: 'bg-secondary-transparent', textColor: 'text-fixed-white' },
    { icon: 'ri-shirt-fill', label: 'Styling', count: 33, iconBgColor: 'bg-success', bgColor: 'bg-success-transparent', textColor: 'text-fixed-white' }
  ];

  ngOnDestroy(): void {
   
  }

}

