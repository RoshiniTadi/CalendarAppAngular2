import { Component } from '@angular/core';
import * as moment from 'moment';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import  {FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms'
import { splitAtColon } from '@angular/compiler/src/util';
// import { Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private fb:FormBuilder){
    this.initDateRange();
  }
  public isReserved = null;
  public dateForm:FormGroup;
public width:string='';
  public date;
  public selectedColour:string='';
  public selectedFont:string='';
  public date1;
  public current:string;
  public next:string;
  public dateNext;
  public daysArr;
  public daysArrNext;
 public formatString='MM/DD/YYYY'
ngOnInit()
{ this.current=moment().format('MMMM')+" "+moment().format('YYYY');
  this.next=moment().add(1,'M').format('MMMM')+" "+moment().add(1,'M').format('YYYY');
  this.date=moment();
  this.date1=this.date;
  this.daysArr=this.createCalendar(this.date);
  this.dateNext=this.date1.add(1,'M');
  this.daysArrNext=this.createCalendar(this.dateNext);
}
createCalendar(month)
{
  let firstDay=moment(month).startOf('M');
  let days=Array.apply(null,{length:month.daysInMonth()})
  .map(Number.call,Number)
  .map((n)=>{
  return moment(firstDay).add(n,'d');
  });
  
for(let n=0;n<firstDay.weekday();n++)
{
days.unshift(null);
}
return days;
}
public nextMonth()
{ 
  this.date=this.dateNext;
  
  this.daysArr=this.createCalendar(this.date);
  this.current=this.dateNext.format('MMMM')+" "+this.dateNext.format('YYYY');
  this.dateNext.add(1,'M');
 
  this.daysArrNext=this.createCalendar(this.dateNext);
   this.next=this.dateNext.format('MMMM')+" "+this.dateNext.format('YYYY');

  
}
public previousMonth()
{
  this.dateNext=this.date;
  
  this.daysArrNext=this.createCalendar(this.dateNext);
  this.next=this.date.format('MMMM')+" "+this.date.format('YYYY');
  this.date.subtract(1,'M');
 
  this.daysArr=this.createCalendar(this.date);
  this.current=this.date.format('MMMM')+" "+this.date.format('YYYY');
  
 
  
}
public initDateRange() {
  return (this.dateForm = this.fb.group({
    dateFrom: [null, Validators.required],
    dateTo: [null, Validators.required]
  }));
}
public reserve() {
  if (!this.dateForm.valid) {
    return;
  }
  let dateFromMoment = this.dateForm.value.dateFrom;
  let dateToMoment = this.dateForm.value.dateTo;
  this.isReserved = `Selected from ${dateFromMoment} to ${dateToMoment}`;
}

public isSelected(day) {
  if (!day) {
    return false;
  }
  let dateFromMoment = moment(this.dateForm.value.dateFrom, this.formatString );
  let dateToMoment = moment(this.dateForm.value.dateTo, this.formatString);
  if (this.dateForm.valid) {
    return (
      dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
    );
  }
  if (this.dateForm.get('dateFrom').valid) {
    return dateFromMoment.isSame(day);
  }
}

public selectedDate(day) {
  let dayFormatted = day.format(this.formatString);
  if (this.dateForm.valid) {
    this.dateForm.setValue({ dateFrom: null, dateTo: null });
    return;
  }
  if (!this.dateForm.get('dateFrom').value) {
    this.dateForm.get('dateFrom').patchValue(dayFormatted);
  } else {
    this.dateForm.get('dateTo').patchValue(dayFormatted);
  }
}
public todayCheck(day) {
  if (!day) {
    return false;
  }
  return moment().format('L') === day.format('L');
}
public selectEventHandler(event:any)
{
  this.selectedColour=event.target.value;
}
public selectEventHandler1(event:any)
{
  this.selectedFont=event.target.value;
}
public selectEventHandler2(event:any)
{
  this.formatString=event.target.value;
}
public selectEventHandler3(event:any)
{
  this.width=event.target.value;
}
public getColor()
{
  return this.selectedColour;
}
public getFont()
{
    return this.selectedFont;
}
public getFormat()
{
    return this.formatString;
}
public getWidth()
{
    return this.width;
}
}
