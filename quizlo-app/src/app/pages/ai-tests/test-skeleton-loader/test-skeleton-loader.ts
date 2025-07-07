import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/sharedmodule';

@Component({
  selector: 'app-test-skeleton-loader',
  imports: [CommonModule, SharedModule],
  templateUrl: './test-skeleton-loader.html',
  styleUrl: './test-skeleton-loader.scss'
})
export class TestSkeletonLoader {
  @Input() variant: 'default' | 'wave' | 'pulse' | 'building' = 'default';
  @Input() totalQuestions: number = 1;
  @Input() displayFooter: boolean = false;
  @Input() displayHeader: boolean = true;
  @Input() displayProgress: boolean = false;

  currentQuestionIndex: number = 0;
  progressWidth: number = 0;
  progressBarWidth: number = 0;
  skeletonQuestions: any[] = [];
  Math = Math;

  constructor() {
    this.generateSkeletonQuestions();
    this.startProgressAnimation();
    this. startTestProgressAnimation();
  }

  generateSkeletonQuestions() {
    this.skeletonQuestions = Array.from({ length: this.totalQuestions }, (_, i) => ({
      id: i + 1,
      options: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, j) => ({
        id: j + 1,
        width: Math.random() * 40 + 10 // Random width between 40-80%
      }))
    }));
  }

  startProgressAnimation() {
    const interval = setInterval(() => {
      this.progressWidth += 0.67; // Approximately 10 seconds to complete
      
      // Update current question index based on progress
      this.currentQuestionIndex = Math.floor((this.progressWidth / 100) * this.totalQuestions);
      
      if (this.progressWidth >= 100) {
        clearInterval(interval);
        this.progressWidth = 100;
        this.currentQuestionIndex = this.totalQuestions - 1;
      }
    }, 100);
  }

  startTestProgressAnimation() {
    const interval = setInterval(() => {
      this.progressBarWidth += 2.67; // Approximately 10 seconds to complete
      
      // Update current question index based on progress
      this.currentQuestionIndex = Math.floor((this.progressBarWidth / 100) * this.totalQuestions);
      
      if (this.progressBarWidth >= 100) {
        clearInterval(interval);
        this.progressBarWidth = 100;
        this.currentQuestionIndex = this.totalQuestions - 1;
      }
    }, 100);
  }
}
