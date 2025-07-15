import { CommonModule, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, makeStateKey, OnDestroy, OnInit, PLATFORM_ID, TransferState } from '@angular/core';
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
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

const BLOG_KEY = makeStateKey<any>('blog');

@Component({
  selector: 'app-blog-details',
  imports: [SharedModule, RouterModule, GalleryModule, LightboxModule, OverlayscrollbarsModule, SpkGalleryComponent, CommonModule, GridLoader ],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetails implements OnInit, OnDestroy {
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

  constructor(public gallery: Gallery, 
    public lightbox: Lightbox,
    private titleService: Title,
    private metaService: Meta,
    private state: TransferState,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: BlogService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.state.hasKey(BLOG_KEY)) {
      this.blog = this.state.get(BLOG_KEY, null as any);
    } else {
      this.loading = true;   
       const blogName : string | null = this.route.snapshot.paramMap.get('name');
      this.service.getBlogByName(blogName).subscribe((data) => {
        this.blog = data;
        this.setMetaTags(this.blog);
        this.loading = false;
        if (isPlatformServer(this.platformId)) {
          this.state.set(BLOG_KEY, data);
        }
        this.cdr.detectChanges();
      });
    }
  }

  openCommentModal(blog: any) {
    
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

  private setMetaTags(blog: BlogModel): void {
    this.titleService.setTitle(blog.title);
    
    this.metaService.updateTag({ name: 'description', content: blog.summary });
    this.metaService.updateTag({ name: 'keywords', content: blog.tags });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: blog.title });
    this.metaService.updateTag({ property: 'og:description', content: blog.summary });
    this.metaService.updateTag({ property: 'og:image', content: blog.image.includes('http')? blog.image : `${environment.baseUrl}/${blog.image}` });
    this.metaService.updateTag({ property: 'og:url', content: `https://quizloai.com/blogs/blog-details/${blog.link}` });

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: blog.title });
    this.metaService.updateTag({ name: 'twitter:description', content: blog.summary });
    this.metaService.updateTag({ name: 'twitter:image', content: blog.image.includes('http')? blog.image : `${environment.baseUrl}/${blog.image}` });
  }

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

