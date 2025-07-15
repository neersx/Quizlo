import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TruncateWordsPipe } from '../../../utils/pipes/truncate-words.pipe';

@Component({
  selector: 'spk-blog-image-card',
  standalone: true,
  imports: [RouterModule,CommonModule, TruncateWordsPipe],
  templateUrl: './spk-blog-image-card.component.html',
  styleUrl: './spk-blog-image-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpkBlogImageCardComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() imageClass: string = '';
  @Input() pageStyleClass: string = '';
  @Input() description?: string = '';
  @Input() TextColor: string = '';
  @Input() author: string = '';
  @Input() authorImageUrl: string = '';
  @Input() date: string = '';
  @Input() readMoreLink: string = '';
  @Input() heartColor: string = '';  // Color for the heart icon, can be 'text-danger' or 'text-muted'
  @Input() badge: string = ''; // Optional offer or discount badge
  @Input() badgeColor: string = ''; 
  @Input() link: string = ''; 

  constructor( private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdr.detectChanges();
  }

}
