export interface UserR {
    username: string;
    name: string;
    lastname: string;
    is_admin: boolean;
  }
export interface UserC{
    email:any;
    password: any;
}
export interface TodayAppointment{
  appointment_time:string;
}
export interface UserAppointment{
  date:Date;
  appointment_time:string;
  
}