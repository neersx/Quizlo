import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { SpkProfileReusableCardComponent } from '../../../@spk/reusable-pages/spk-profile-reusable-card/spk-profile-reusable-card.component';
import { SpkNgSelectComponent } from '../../../@spk/reusable-ui-elements/spk-ng-select/spk-ng-select.component';
import { SpkGalleryComponent } from '../../../@spk/spk-reusable-plugins/spk-gallery/spk-gallery.component';
import { SharedModule } from '../../../shared/sharedmodule';
import { UserProfileModel } from '../user-profile.model';
import { ProfileService } from '../user-profile.service';

@Component({
  selector: 'app-edit-profile',
  imports: [ FormsModule,
    NgbNavModule,
    AsyncPipe,SharedModule,NgbNavModule,NgSelectModule,NgbDropdownModule,SpkProfileReusableCardComponent,SpkNgSelectComponent,SpkGalleryComponent,
    GalleryModule,LightboxModule, OverlayscrollbarsModule,SpkNgSelectComponent,FormsModule,ReactiveFormsModule, EditProfile],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfile implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  profileForm = this.fb.group({
    userName:     ['', Validators.required],
    firstName:    ['', Validators.required],
    lastName:     ['', Validators.required],
    designation:  [''],
    email:        ['', [Validators.required, Validators.email]],
    phone:        [''],
    address:      [''],
    city:     [''],
    country:  [''],
    github:       [''],
    twitter:      [''],
    linkedin:     [''],
    portfolio:    [''],
    about:        [''],
    // skills:       [[]] as any,      // expecting string[]
  });

  @Input() user!: UserProfileModel;


  constructor(private cdr : ChangeDetectorRef) { } 

  ngOnInit() { 
      const user = this.user;
      this.profileForm.patchValue({
        userName:    user.userName,
        firstName:   user.firstName,
        lastName:    user.lastName,
        designation: user.designation,
        email:       user.email,
        phone:       user.phoneNumber,       // assuming phoneNumber in DTO
        address:     user.address,          // adjust if you have separate address field
        city:        user.city,
        country:     user.country,
        github:      user.githubUrl,         // adjust names to match your DTO
        twitter:     user.twitter,
        linkedin:    user.linkedin,
        portfolio:   user.portfolioUrl,      // adjust or remove if not in DTO
        about:       user.about,
        // skills:      user.skills?.split(',') ?? []
      });

    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const dto = {
      firstName:   this.profileForm.value.firstName,
      lastName:    this.profileForm.value.lastName,
      designation: this.profileForm.value.designation,
      email:       this.profileForm.value.email,
      phoneNumber: this.profileForm.value.phone,
      address:     this.profileForm.value.address,
      // split back your composite fields if needed
      city:        this.profileForm.value.city,
      country:     this.profileForm.value.country,
      github:      this.profileForm.value.github,
      twitter:     this.profileForm.value.twitter,
      linkedin:    this.profileForm.value.linkedin,
      // portfolioUrl: this.profileForm.value.portfolio,
      about:       this.profileForm.value.about,
      // skills:      (this.profileForm.value.skills as string[]).join(','),
    };

    this.profileService.updateProfile(dto).subscribe({
      next: () => alert('Profile updated successfully'),
      error: err => console.error(err)
    });
  }


}
