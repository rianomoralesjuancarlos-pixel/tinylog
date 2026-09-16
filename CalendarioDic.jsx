import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X,
  ArrowLeft
} from 'lucide-react';
import "../index.css";

export default function CalendarioInteligente() {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('misEventos');
    return saved ? JSON.parse(saved) : {};
  });

  const [usuario, setUsuario] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');

  useEffect(() => {
    const rolActual = (localStorage.getItem("usuario") || "").toLowerCase().trim();
    setUsuario(rolActual);
  }, []);

  const puedeEditar = usuario === "administrador" || usuario === "directivo";

  useEffect(() => {
    localStorage.setItem('misEventos', JSON.stringify(events));
  }, [events]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const openEventModal = (dateStr = null) => {
    if (!puedeEditar) return;
    const defaultDate = dateStr || `${year}-${String(month + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    setSelectedDate(defaultDate);
    setEventTitle('');
    setEventTime('');
    setIsModalOpen(true);
  };

  const saveEvent = () => {
    if (!puedeEditar) return;
    if (!eventTitle.trim()) {
      alert("Por favor escribe un título para el evento");
      return;
    }

    const dayEvents = events[selectedDate] || [];
    const updatedEvents = {
      ...events,
      [selectedDate]: [...dayEvents, { title: eventTitle.trim(), time: eventTime }]
    };

    setEvents(updatedEvents);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  // Generar celdas del calendario
  const renderCalendarDays = () => {
    const days = [];
    
    // Espacios vacíos iniciales
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = events[dateStr] || [];
      const isToday = 
        i === new Date().getDate() && 
        month === new Date().getMonth() && 
        year === new Date().getFullYear();

      days.push(
        <div 
          key={dateStr} 
          onClick={() => openEventModal(dateStr)}
          className={`calendar-day ${isToday ? 'today' : ''} ${!puedeEditar ? 'calendar-disabled' : ''}`}
          title={puedeEditar ? 'Agregar evento' : 'Solo el directivo puede editar el calendario'}
        >
          <span className="day-number">{i}</span>
          <div className="day-events-container">
            {dayEvents.map((ev, idx) => (
              <div key={idx} className="event-pill" title={`${ev.time ? ev.time + ' - ' : ''}${ev.title}`}>
                {ev.time && <span className="event-time">{ev.time}</span>}
                <span className="event-text">{ev.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="dashboard-container">
      {/* Elementos decorativos de fondo */}
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <main className="calendar-main">
        
        {/* ========== BOTÓN VOLVER AL INICIO ========== */}
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          marginBottom: "15px" 
        }}>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate(localStorage.getItem("usuario") === "docente" ? "/pagina-docente" : "/pagina-principal");
            }}
            className="btn-control"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #dee2e6",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            <ArrowLeft size={18} />
            Volver al Inicio
          </button>
        </div>

        <div className="calendar-header-section">
          <div className="calendar-title-wrapper">
            <h1>
              <CalendarIcon className="title-icon" /> Calendario Inteligente
            </h1>
            <p>Gestiona eventos, exámenes y actividades escolares de forma centralizada</p>
          </div>

          <div className="calendar-controls">
            <button onClick={prevMonth} className="btn-control">
              <ChevronLeft size={18} /> Anterior
            </button>
            <button onClick={goToToday} className="btn-control today-btn">
              Hoy
            </button>
            <button onClick={nextMonth} className="btn-control">
              Siguiente <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="calendar-card">
          <h2 className="month-year-title">
            {monthNames[month]} {year}
          </h2>

          <div className="weekdays-grid">
            <span>Dom</span>
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
          </div>

          <div className="days-grid">
            {renderCalendarDays()}
          </div>
        </div>

        <div className="calendar-actions">
          <button onClick={() => openEventModal()} className="btn-primary-modern" disabled={!puedeEditar} style={{ opacity: puedeEditar ? 1 : 0.55, cursor: puedeEditar ? 'pointer' : 'not-allowed' }}>
            <Plus size={20} /> {puedeEditar ? 'Añadir Evento' : 'Solo directivo'}
          </button>
        </div>
      </main>

      {/* Modal para Nuevo Evento */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Nuevo Evento Escolar</h3>
              <button onClick={() => setIsModalOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Fecha seleccionada:</label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                />
              </div>
              
              <div className="form-group">
                <label>Título del evento:</label>
                <input 
                  type="text" 
                  placeholder="Ej: Reunión de padres, Izada de bandera..." 
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label>Hora (opcional):</label>
                <input 
                  type="time" 
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)} 
                />
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setIsModalOpen(false)} className="btn-cancel">
                Cancelar
              </button>
              <button onClick={saveEvent} className="btn-confirm">
                Guardar Evento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Cerrar Sesión */}
      {isLogoutOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>¿Cerrar sesión?</h3>
            <p>¿Estás seguro de que deseas salir de tu cuenta actual?</p>
            <div className="modal-footer">
              <button onClick={() => setIsLogoutOpen(false)} className="btn-cancel">
                Cancelar
              </button>
              <button onClick={handleLogout} className="btn-confirm-danger">
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}