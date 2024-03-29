import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  
  activities:any=[]
  isLoading:boolean=false
  id = localStorage.getItem('user_id')
  user_id  = parseInt(this.id, 10); 
  deleteActivity(activityId: number): void {
    this.isLoading=true
    this.apiService.deleteActivity(this.user_id,activityId).subscribe(
      (response)=>{
        if(response.status=="Success"){
          this.apiService.getActivity(this.user_id).subscribe(
            (response)=>{
              if(response.status=='Success'){
                this.isLoading=false
                this.activities=response.Activity
              }
              else{
                alert("Error getting activity")
                this.isLoading=false
              }
            },
            (error)=>{
              this.isLoading=false
                alert("error fetching activity")
            }
      
          )
        }
        else{
          alert("error deleting activity")
          this.isLoading=false
        }
      },
    (error)=>{
      this.isLoading=false
      alert("error fetching delete activity request")
    }
    )
  }
  formatCreatedAt(created_at: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(created_at);
  return date.toLocaleDateString('en-US', options);
}
  constructor(private apiService:ApiService){
    this.isLoading=true
    
    
    this.apiService.getActivity(this.user_id).subscribe(
      (response)=>{
        if(response.status=='Success'){
          this.isLoading=false
          this.activities=response.Activity
        }
        else{
          alert("Error getting activity")
          this.isLoading=false
        }
      },
      (error)=>{
          alert("error fetching activity")
      }

    )
  }
}
