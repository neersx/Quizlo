import { Component, Input } from '@angular/core';
import { Gallery,GalleryModule,ImageSize,ThumbnailsPosition } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';

@Component({
  selector: 'spk-gallery',
  standalone: true,
  imports: [GalleryModule,LightboxModule],
  templateUrl: './spk-gallery.component.html',
  styleUrl: './spk-gallery.component.scss'
})
export class SpkGalleryComponent {
@Input() imageData:any=[]
@Input() imageData1:any=[]
@Input() mainClass:any
@Input() colClass:any
@Input() lightboxClass:string=''
@Input() imageTextContent:string=''
@Input() badge:any
@Input() gallerize:boolean=false
constructor(public gallery: Gallery, public lightbox: Lightbox) {}
ngOnInit() {
  /** Basic Gallery Example */

  // Creat gallery items
  // this.items = this.imageData.map(
  //   (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
  // );

  /** Lightbox Example */

  // Get a lightbox gallery ref
  const lightboxRef = this.gallery.ref('lightbox');

  // Add custom gallery config to the lightbox (optional)
  lightboxRef.setConfig({
    imageSize: ImageSize.Cover,
    thumbPosition: ThumbnailsPosition.Top,
  });

  // lightboxRef.load(this.items);
}
}
