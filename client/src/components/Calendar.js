
import React from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";

class Calendar extends React.Component {

  render() {
    return (
      <section>
        <ScheduleComponent>
          <Inject services={[Day, Week, Month, Agenda]}/>
        </ScheduleComponent>
      </section>
    );
  }
}

export default Calendar;
