import { useState, useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import Search from "./components/Search";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortByField, setSortByField] = useState("petName");
  const [sortByOrder, setSortByOrder] = useState("asc");

  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, [setAppointmentList]);

  const filteredAppointments = appointmentList.filter((item) => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    );
  }).sort((a,b) => {
    const order = (sortByOrder === 'asc') ? 1 : -1;
    return (
      a[sortByField].toLowerCase() < b[sortByField].toLowerCase()
        ? -1 * order
        : 1 * order
    )
  });

  const onDeleteAppointment = (appointmentId) => {
    const aptFilter = appointmentList.filter(appointment => appointment.id !== appointmentId);
    setAppointmentList(aptFilter);
  };

  return (
    <section className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <AddAppointment />
      <Search 
        query={query}
        sortByOrder={sortByOrder}
        sortByField={sortByField}
        onQueryChange={myQuery => setQuery(myQuery)}
        onSortByField={mySort => setSortByField(mySort)}
        onSortByOrder={mySort => setSortByOrder(mySort)} />

      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => {
          return (
            <AppointmentInfo
              key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={onDeleteAppointment}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default App;
