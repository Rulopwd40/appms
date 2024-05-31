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
  date:any;
  appointment_time:string;
  
}

export function difference(date:string[]){
  let hours= ['00:00:00', '00:30:00', '01:00:00', '01:30:00', '02:00:00', '02:30:00',
  '03:00:00', '03:30:00', '04:00:00', '04:30:00', '05:00:00', '05:30:00',
  '06:00:00', '06:30:00', '07:00:00', '07:30:00', '08:00:00', '08:30:00',
  '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00',
  '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00',
  '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00',
  '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00',
  '21:00:00', '21:30:00', '22:00:00', '22:30:00', '23:00:00', '23:30:00']
  return hours.filter(x => !date.includes(x));
}