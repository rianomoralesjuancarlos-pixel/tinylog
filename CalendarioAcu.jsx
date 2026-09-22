import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const eventosIniciales = {
  "2026-06-16": [{ title: "Reunión de padres", time: "08:00" }],
  "2026-06-20": [{ title: "Actividad escolar", time: "10:00" }],
  "2026-06-24": [{ title: "Entrega de informes", time: "14:00" }],
};

export default function CalendarioAcu() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState(() => {
    const saved = localStorage.getItem("misEventos");
    return saved ? JSON.parse(saved) : eventosIniciales;
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cambiarMes = (cantidad) => {
    setCurrentDate(new Date(year, month + cantidad, 1));
  };

  const renderCalendarDays = () => {
    const days = [];

    for (let index = 0; index < firstDay; index += 1) {
      days.push(<div key={`empty-${index}`} className="calendar-day empty" />);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = events[date] || [];
      const today = new Date();
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

      days.push(
        <div key={date} className={`calendar-day calendar-readonly-day ${isToday ? "today" : ""}`} title="Evento escolar">
          <span className="day-number">{day}</span>
          <div className="day-events-container">
            {dayEvents.map((event, index) => (
              <div key={`${date}-${index}`} className="event-pill" title={`${event.time ? `${event.time} - ` : ""}${event.title}`}>
                {event.time && <span className="event-time">{event.time}</span>}
                <span className="event-text">{event.title}</span>
              </div>
            ))}
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="dashboard-container acu-page calendario-acudiente-page">
      <div className="background-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <main className="calendar-main">
        <div className="back-home-wrapper">
          <button type="button" onClick={() => navigate("/pagina-principal-acudiente")} className="btn-control back-home-button">
            <ArrowLeft size={18} />
            Volver al inicio
          </button>
        </div>

        <div className="calendar-header-section">
          <div className="calendar-title-wrapper">
            <h1><CalendarIcon className="title-icon" /> Calendario escolar</h1>
            <p>Consulta los eventos publicados por la institución.</p>
          </div>

          <div className="calendar-controls">
            <button type="button" onClick={() => cambiarMes(-1)} className="btn-control">
              <ChevronLeft size={18} /> Anterior
            </button>
            <button type="button" onClick={() => setCurrentDate(new Date())} className="btn-control today-btn">
              Hoy
            </button>
            <button type="button" onClick={() => cambiarMes(1)} className="btn-control">
              Siguiente <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <section className="calendar-card" aria-label="Calendario escolar de consulta">
          <h2 className="month-year-title">{monthNames[month]} {year}</h2>
          <div className="weekdays-grid">
            <span>Dom</span><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span>
          </div>
          <div className="days-grid">{renderCalendarDays()}</div>
        </section>

        <p className="calendar-readonly-note">Calendario de solo consulta. Los eventos son administrados por la institución.</p>
      </main>
    </div>
  );
}
