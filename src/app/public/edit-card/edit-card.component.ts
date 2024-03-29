import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
declare var $: any;

import {EditorConfig, ST_BUTTONS} from 'ngx-simple-text-editor';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent  implements  OnInit{

  selectedColor:any
      FirstName: any
      LastName: any
      CompanyName: any
      JobTitle: any
      ccontent:any
      Email: any
      Address: any
      PhoneNumber: any
      PhoneNumber2: any
      PhoneAllow: any
      ForwardCard: any
      SaveCard: any
      InviteCode: any
      Photo:any
      Logo: any
      ProductImages: any
      YoutubeTitle:any
      YoutubeLink:any
      VimeoTitle:any
      VimeoLink:any
      UmyotubeTitle:any
      UmyotubeLink:any
      LinkButtonTitle:any
      LinkButtonLink:any
      FacebookLink:any
      
      Facebook:any
      Youtube:any
      Linkedin:any
      Twitter:any
      Snapchat:any
      Instagram:any
      Voxer:any
      Line:any
      Pinterest:any
      Whatsapp:any
      Skype:any
      CardTitle:any
      referalCode:any
  
      templateId:any=1
      card_id:any
      ConvertedPhoto:any
     ConvertedLogo:any
     ConvertedProductImage:any
  

  displayStep(stepNumber: number) {
    console.log('display stepp');
    if (stepNumber >= 1 && stepNumber <= 3) {
      $(`.step-${this.currentStep}`).hide()

        


      $(`.step-${stepNumber}`).show() 



      this.currentStep = stepNumber 
    

      this.updateProgressBar()


  
    }
  }
  Form: FormGroup;
  colorOptions: string[] = ['red', 'green', 'yellow', 'olive', 'orange', 'teal', 'blue', 'violet', 'purple', 'pink'];
  
  
  
 
id=localStorage.getItem('user_id')
user_id  = parseInt(this.id, 10);
  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: ST_BUTTONS,
  };
  

  convertDataURLtoFile(dataURL: string, fileName: string): File | null {
    if (!dataURL || typeof dataURL !== 'string' || !dataURL.startsWith('data:image')) {
      console.error('Invalid data URL');
      return null;
    }
  
    const byteString = atob(dataURL.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([ab], { type: 'image/png' });
    return new File([blob], fileName, { type: 'image/png' });
  }
  

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef, private apiService:ApiService,private route:ActivatedRoute,private router: Router,) {
    this.route.params.subscribe((params) => {
      this.card_id = params['id'];
  })
    
      
    this.Form = this.fb.group({
      selectedColor:['red'],
      FirstName: ['John'],
      LastName: ['Doe'],
      Gpa: [''],
      Age: [''],
      Height: [''],
      Weight: [''],
      Grade: [''],
      School: [''],

      CompanyName: ['UMYO Network'],
      JobTitle: ['Affiliate'],
      ccontent: ['Thanks for checking out my virtual business card! I’m excited to introduce you to umyocards because I know you"ll enjoy it as much as I have. umyocards helps me keep track of my prospects, my team, and my time so I can get more accomplished every day. Feel freeto contact me with any questions.'],
      Email: ['team@goumyocards.com'],
      Address: ['umyocards team'],
      PhoneNumber: ['99122301'],
      PhoneNumber2: [''],
      PhoneAllow: [true],
      ForwardCard: [true],
      SaveCard: [true],
      InviteCode: [true],
      Photo: ['assets/images/john-doe-avatar.jpg'],
      Logo: ['assets/images/unmasking-yourself.jpg'],
      ProductImages: ['assets/images/app-devices.jpg'],
      YoutubeTitle:[''],
      YoutubeLink:['https://www.youtube.com/embed/soXhe4aEsTU'],
      VimeoTitle:[''],
      VimeoLink:[''],
      UmyotubeTitle:[''],
      UmyotubeLink:[''],
      LinkButtonTitle:[''],
      LinkButtonLink:[''],
      FacebookLink:[''],
      
      Facebook:['https://www.facebook.com/'],
      Youtube:['https://www.youtube.com/'],
      Linkedin:['https://www.linkedin.com/'],
      Twitter:['https://www.twitter.com/'],
      Snapchat:[''],
      Instagram:['https://www.instagram.com/'],
      Voxer:[''],
      Line:[''],
      Pinterest:['https://www.pinterest.com/'],
      Whatsapp:[''],
      Skype:[''],
      CardTitle:['Title'],



    

    });


    
    
  }


  onPhotoChange(event: any): void {
    const file = event?.target?.files[0];

    if (file) {
      this.Form.patchValue({
        Photo: file,
      });
      this.convertFileToDataURL(this.Form.value.Photo).then((dataUrl) => {
        this.ConvertedPhoto = dataUrl;
      }),
      // Manually trigger change detection
      this.cdr.detectChanges();
    }
  }
  onLogoChange(event: any): void {
    const file = event?.target?.files[0];

    if (file) {
      this.Form.patchValue({
        Logo: file,
      });
      this.convertFileToDataURL(this.Form.value.Logo).then((dataUrl) => {
        this.ConvertedLogo = dataUrl;
      }),
      
      this.cdr.detectChanges();
    }
  }
  onProductImagesChange(event: any): void {
    const file = event?.target?.files[0];

    if (file) {
      this.Form.patchValue({
        ProductImages: file,
      });

      
      this.cdr.detectChanges();
    }
  }
  
  ngOnInit(): void {



    this.currentStep=1
   

    const payload={
      user_id:this.id,
      card_id:this.card_id
    }
    




    this.apiService.getSingleCard(payload).subscribe(
      (response)=>{
          if(response.status=='Success'){
            this.templateId=response.Card.infoFormData.templateId
            this.Form.get('selectedColor').setValue(response.Card.colorTheme);
            this.Form.get('FirstName').setValue(response.Card.infoFormData.firstName);
            this.Form.get('LastName').setValue(response.Card.infoFormData.lastName);
            this.Form.get('CompanyName').setValue(response.Card.infoFormData.companyName);
            this.Form.get('JobTitle').setValue(response.Card.infoFormData.jobTitle);
            this.Form.get('ccontent').setValue(response.Card.infoFormData.aboutText);
            this.Form.get('Email').setValue(response.Card.infoFormData.email);
            this.Form.get('Address').setValue(response.Card.infoFormData.address);
            this.Form.get('PhoneNumber').setValue(response.Card.infoFormData.phoneNumber);
            this.Form.get('PhoneNumber2').setValue(response.Card.infoFormData.alternativePhoneNo);
            this.Form.get('PhoneAllow').setValue(response.Card.infoFormData.phoneTextAllow);
            this.Form.get('ForwardCard').setValue(response.Card.infoFormData.showForwardButton);
            this.Form.get('SaveCard').setValue(response.Card.infoFormData.showSaveButton);
            this.Form.get('InviteCode').setValue(response.Card.infoFormData.showInviteCode);

            this.Form.get('Gpa').setValue(response.Card.infoFormData.gpa);
            this.Form.get('Age').setValue(response.Card.infoFormData.age);
            this.Form.get('Weight').setValue(response.Card.infoFormData.weight);
            this.Form.get('Height').setValue(response.Card.infoFormData.height);
            this.Form.get('Grade').setValue(response.Card.infoFormData.grade);
            this.Form.get('School').setValue(response.Card.infoFormData.school);
            
            this.Form.get('Photo').setValue(this.convertDataURLtoFile(response.Card.change_photo, 'photo'));
            this.Form.get('Logo').setValue(this.convertDataURLtoFile(response.Card.change_logo, 'logo'));
            this.Form.get('ProductImages').setValue('');
            this.Form.get('YoutubeTitle').setValue(response.Card.socialFormData?.youtubeVideos[0]?.youtubeTitle);
            this.Form.get('YoutubeLink').setValue(response.Card.socialFormData?.youtubeVideos[0]?.youtubeLink);
            this.Form.get('VimeoTitle').setValue(response.Card.socialFormData?.vimeoVideos[0]?.vimeoTitle);
            this.Form.get('VimeoLink').setValue(response.Card.socialFormData?.vimeoVideos[0]?.vimeoLink);
            this.Form.get('UmyotubeTitle').setValue(response.Card.socialFormData?.umyotubeVideos[0]?.umyotubeTitle);
            this.Form.get('UmyotubeLink').setValue(response.Card.socialFormData?.umyotubeVideos[0]?.umyotubeLink);
            this.Form.get('LinkButtonTitle').setValue(response.Card.socialFormData?.linkButtons[0]?.linkButtonTitle);
            this.Form.get('LinkButtonLink').setValue(response.Card.socialFormData?.linkButtons[0]?.websiteLink);
            this.Form.get('FacebookLink').setValue(response.Card.FacebookLink);
            this.Form.get('Facebook').setValue(response.Card.socialFormData.facebook);
            this.Form.get('Youtube').setValue(response.Card.socialFormData.youtube);
            this.Form.get('Linkedin').setValue(response.Card.socialFormData.linkedin);
            this.Form.get('Twitter').setValue(response.Card.socialFormData.twitter);
            this.Form.get('Snapchat').setValue(response.Card.socialFormData.snapchat);
            this.Form.get('Instagram').setValue(response.Card.socialFormData.instagram);
            this.Form.get('Voxer').setValue(response.Card.socialFormData.voxerID);
            this.Form.get('Line').setValue(response.Card.socialFormData.lineID);
            this.Form.get('Pinterest').setValue(response.Card.socialFormData.pinterest);
            this.Form.get('Whatsapp').setValue(response.Card.socialFormData.whatsappID);
            this.Form.get('Skype').setValue(response.Card.socialFormData.skypeID);
            this.Form.get('CardTitle').setValue(response.Card.infoFormData.cardTitle);
            

            this.referalCode=response.Card.infoFormData.inviteCode
            
            
          }
          else{
            alert('failed to fetch card')
          }
      },(error)=>{
        alert('failed to fetch card'+error.message)

      }
      )

   

    
    this.displayStep(2);
    $('#create-card-section').find('.step').slice(2).hide();

    const updateProgressBar = () => {
      const progressPercentage = ((this.currentStep - 2) / 4) * 100;
      $('.progress-bar').css('width', progressPercentage + '%');
    };

    // Display step 2 on page load
    

    $('.next-step').click(() => {


      
      if (this.currentStep < 6) {
        $(`.step-${this.currentStep}`).addClass('animate__animated animate__fadeOutLeft');
        this.currentStep++;
        setTimeout(() => {
          $('.step').removeClass('animate__animated animate__fadeOutLeft').hide();
          $(`.step-${this.currentStep}`).show().addClass('animate__animated animate__fadeInRight');
          updateProgressBar();
        }, 500);
      }
    });

    $('.prev-step').click(() => {
      if (this.currentStep > 1) {
        $(`.step-${this.currentStep}`).addClass('animate__animated animate__fadeOutRight');
        this.currentStep--;
        setTimeout(() => {
          $('.step').removeClass('animate__animated animate__fadeOutRight').hide();
          $(`.step-${this.currentStep}`).show().addClass('animate__animated animate__fadeInLeft');
          updateProgressBar();
        }, 500);
      }
    });

    // Initial update of the progress bar
    updateProgressBar();
 const uploadBoxes = document.querySelectorAll('.upload_box');
    uploadBoxes.forEach((box) => {
      box.addEventListener('click', () => {
        const targetId = box.getAttribute('data-target');
        const inputElement = document.getElementById(targetId);

        if (inputElement) {
          inputElement.click();
        }
      });
    });
  
   
    
  }
  currentStep:any

check(){
  console.log(this.Form.value.Photo);
  
}


 
  

  updateProgressBar() {
    const progressPercentage = ((this.currentStep - 2) / 4) * 100;
    $('.progress-bar').css('width', progressPercentage + '%');
  }
  
 

  convertFileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          resolve(event.target.result);
        } else {
          reject(new Error('Failed to convert file to data URL.'));
        }
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  }

  
   saveCard(){
    
    
    
    const SocialFormData={
      facebook:this.Form.value.Facebook, 
      twitter:this.Form.value.Twitter, 
      youtube:this.Form.value.Youtube, 
      instagram:this.Form.value.Instagram, 
      linkedin:this.Form.value.Linkedin, 
      pinterest:this.Form.value.pinterest, 
      skypeID:this.Form.value.pinterest, 
      whatsappID:this.Form.value.pinterest, 
      snapchat:this.Form.value.pinterest, 
      lineID:this.Form.value.pinterest, 
      voxerID:this.Form.value.pinterest, 

      youtubeVideos:[{youtubeTitle:this.Form.value.YoutubeTitle,youtubeLink:this.Form.value.YoutubeLink}], 
      vimeoVideos:[{vimeoTitle:this.Form.value.VimeoTitle,vimeoLink:this.Form.value.VimeoLink}], 
      umyotubeVideos:[{umyoutubeTitle:this.Form.value.UmyotubeTitle,umyotubeLink:this.Form.value.UmyotubeLink}], 
      linkButtons:[{youtubeTitle:'',youtubeLink:this.Form.value.YoutubeLink}], 
    }

const infoFormData={
  templateId:this.templateId,
    cardTitle:this.Form.value.CardTitle,
    firstName:this.Form.value.FirstName,
    lastName:this.Form.value.LastName,
    email:this.Form.value.email,
    phoneNumber:this.Form.value.PhoneNumber,
    alternativePhoneNo:this.Form.value.PhoneNumber2,
    companyName:this.Form.value.CompanyName,
    jobTitle:this.Form.value.JobTitle,
    address:this.Form.value.Address,
    aboutText:this.Form.value.ccontent,
    phoneTextAllow:this.Form.value.PhoneAllow,
    showSaveButton:this.Form.value.SaveCard,
    showForwardButton:this.Form.value.ForwardCard,
    showInviteCode:this.Form.value.InviteCode,
    inviteCode:this.referalCode,
}
 

    const formData={
      buttonColor:this.Form.value.selectedColor,
      cardTitle:this.Form.value.CardTitle,
      change_logo:null,
      change_photo:null,
      colorTheme:this.Form.value.selectedColor,
      user_id:this.id,
      card_id:this.card_id,
      infoFormData:JSON.stringify(infoFormData),
      socialFormData: JSON.stringify(SocialFormData),


    }

    if(this.ConvertedPhoto!=null || ''){
      formData.change_photo = this.ConvertedPhoto;
    }
    else{
      formData.change_photo = this.Form.value.photo;
    }
    if(this.ConvertedLogo!=null || ''){
      formData.change_logo = this.ConvertedLogo;
    }
    else{
      formData.change_logo = this.Form.value.logo;
    }


  


  
  

  this.apiService.updateCard(formData).subscribe(
    (response)=>{
      if(response.status!='Failed'){
        alert("Card Updated! ")
        this.router.navigate(['/cards']);
      }
      else{
        alert("Failed! "+ response.message)

      }

    },(error)=>{
alert("Failed! " + error)
    }
  )

  

  
} 

}
