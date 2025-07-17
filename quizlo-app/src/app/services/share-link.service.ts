// src/app/shared/share-links.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShareLinksService {
  /** URL-encode once for reuse */
  private encode(value: string) {
    return encodeURIComponent(value);
  }

  facebookShareUrl(pageUrl: string): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.encode(pageUrl)}`;
  }

  twitterShareUrl(pageUrl: string, text = '', hashtags: string[] = []): string {
    const h = hashtags.length ? `&hashtags=${this.encode(hashtags.join(','))}` : '';
    const t = text ? `&text=${this.encode(text)}` : '';
    return `https://twitter.com/intent/tweet?url=${this.encode(pageUrl)}${t}${h}`;
  }

  linkedinShareUrl(pageUrl: string): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${this.encode(pageUrl)}`;
  }

  whatsappShareUrl(pageUrl: string, text = ''): string {
    // On desktop WhatsApp Web; on mobile, auto-open app
    const msg = text ? `${text} ${pageUrl}` : pageUrl;
    return `https://api.whatsapp.com/send?text=${this.encode(msg)}`;
  }
}
