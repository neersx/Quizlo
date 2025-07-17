// src/app/shared/social-share/social-share.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareLinksService } from '../../../services/share-link.service';

@Component({
  selector: 'app-social-share',
  imports: [CommonModule],
  templateUrl: './social-media-share.html',
  styleUrl: './social-media-share.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialMediaShare {
  @Input() url!: string;
  @Input() title = '';
  @Input() text = '';
  @Input() hashtags: string[] = [];

  constructor(private shareSvc: ShareLinksService) {}

  share(network: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp'): void {
    let shareUrl: string;
    switch (network) {
      case 'facebook':
        shareUrl = this.shareSvc.facebookShareUrl(this.url);
        break;
      case 'twitter':
        shareUrl = this.shareSvc.twitterShareUrl(this.url, this.text, this.hashtags);
        break;
      case 'linkedin':
        shareUrl = this.shareSvc.linkedinShareUrl(this.url);
        break;
      case 'whatsapp':
        shareUrl = this.shareSvc.whatsappShareUrl(this.url, this.text);
        break;
    }

    // Use Web Share API if available (mobile)
    if (navigator.share) {
      navigator.share({
        title: this.title,
        text: this.text,
        url: this.url
      }).catch(() => window.open(shareUrl, '_blank', 'noopener,noreferrer'));
    } else {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  }
}
