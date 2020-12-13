import React from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  CellClickEventArgs,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";

class Calendar extends React.Component {
  handleClick = () => {
    alert("huhuh");
  };

  render() {
    return (
      <section className="profile-container scrollable">
        <header className="profile-container__header">
          <nav className="header__nav">
            <input type="text" className="input-element" placeholder="Search" />
          </nav>
          <div className="header__text">
            <h1 className="profile-container__header-title">Hello Bahar</h1>
            <p className="profile-container__header-text">
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p>
          </div>
        </header>
        <ScheduleComponent className = "calendar-container header__text">
          <ViewsDirective>
            <ViewDirective option="Day" onClick={this.handleClick} />
            <ViewDirective option="Month" onClick={this.handleClick} />
            <ViewDirective option="Week"  onSelectSlot={this.handleClick} />
          </ViewsDirective>
          <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
      </section>
    );
  }
}

export default Calendar;

// import * as React from 'react';
// import { ScheduleComponent, ViewsDirective, Inject, Day, WorkWeek, Month, Week, Agenda, ViewDirective } from '@syncfusion/ej2-react-schedule';
// // import { SampleBase } from '../common/sample-base';
// import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
// /**
//  * schedule google calendar integration sample
//  */
// class Calendar extends React.Component{
//     constructor() {
//         super(...arguments);
//         this.calendarId = '5105trob9dasha31vuqek6qgp0@group.calendar.google.com';
//         this.publicKey = 'AIzaSyD76zjMDsL_jkenM5AAnNsORypS1Icuqxg';
//         this.dataManger = new DataManager({
//             url: 'https://www.googleapis.com/calendar/v3/calendars/' + this.calendarId + '/events?key=' + this.publicKey,
//             adaptor: new WebApiAdaptor,
//             crossDomain: true
//         });
//     }
//     onDataBinding(e) {
//         let items = e.result.items;
//         let scheduleData = [];
//         if (items.length > 0) {
//             for (let i = 0; i < items.length; i++) {
//                 let event = items[i];
//                 let when = event.start.dateTime;
//                 let start = event.start.dateTime;
//                 let end = event.end.dateTime;
//                 if (!when) {
//                     when = event.start.date;
//                     start = event.start.date;
//                     end = event.end.date;
//                 }
//                 scheduleData.push({
//                     Id: event.id,
//                     Subject: event.summary,
//                     StartTime: new Date(start),
//                     EndTime: new Date(end),
//                     IsAllDay: !event.start.dateTime
//                 });
//             }
//         }
//         e.result = scheduleData;
//     }
//     render() {
//         return (<div className='schedule-control-section'>
//                 <div className='col-lg-12 control-section'>
//                     <div className='control-wrapper drag-sample-wrapper'>
//                         <div className="schedule-container">
//                             <ScheduleComponent ref={schedule => this.scheduleObj = schedule} width='100%' height='650px' selectedDate={new Date(2018, 10, 14)} readonly={true} eventSettings={{ dataSource: this.dataManger }} dataBinding={this.onDataBinding.bind(this)}>
//                                 <ViewsDirective>
//                                     <ViewDirective option='Day'/>
//                                     <ViewDirective option='Week'/>
//                                     <ViewDirective option='WorkWeek'/>
//                                     <ViewDirective option='Month'/>
//                                     <ViewDirective option='Agenda'/>
//                                 </ViewsDirective>
//                                 <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
//                             </ScheduleComponent>
//                         </div>
//                     </div>
//                 </div>
//             </div>);
//     }
// }

// export default Calendar;
