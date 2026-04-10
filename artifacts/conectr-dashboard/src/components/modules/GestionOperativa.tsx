import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MessageSquare, Users, Check, Bell, X, Plus, ChevronRight } from "lucide-react";
import ImpactPills from "@/components/ImpactPills";

interface Reservation {
  id: number;
  name: string;
  time: string;
  guests: number;
  table: string;
  status: "confirmed" | "pending" | "arrived";
  phone: string;
}

interface WaitlistEntry {
  id: number;
  name: string;
  guests: number;
  waitTime: number;
  status: "waiting" | "called" | "seated";
}

export default function GestionOperativa() {
  const [activeTab, setActiveTab] = useState<"reserve" | "nextup">("reserve");
  const [reservations, setReservations] = useState<Reservation[]>([
    { id: 1, name: "Ana Garcia", time: "19:00", guests: 4, table: "Mesa 03", status: "confirmed", phone: "+52 55 8765 4321" },
    { id: 2, name: "Roberto Diaz", time: "19:30", guests: 2, table: "Mesa 07", status: "confirmed", phone: "+52 55 2345 6789" },
    { id: 3, name: "Familia Reyes", time: "20:00", guests: 6, table: "Mesa 12", status: "pending", phone: "+52 55 9876 5432" },
    { id: 4, name: "Patricia Luna", time: "20:30", guests: 2, table: "Mesa 05", status: "arrived", phone: "+52 55 3456 7890" },
  ]);

  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([
    { id: 1, name: "Miguel Torres", guests: 3, waitTime: 12, status: "waiting" },
    { id: 2, name: "Claudia Vega", guests: 2, waitTime: 8, status: "waiting" },
    { id: 3, name: "Jorge Herrera", guests: 5, waitTime: 25, status: "called" },
  ]);

  const [showNewReservation, setShowNewReservation] = useState(false);
  const [smsSent, setSmsSent] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [newGuests, setNewGuests] = useState("2");

  const handleSendSMS = (id: number) => {
    setSmsSent(id);
    setTimeout(() => setSmsSent(null), 3000);
    setReservations(prev => prev.map(r =>
      r.id === id ? { ...r, status: "confirmed" } : r
    ));
  };

  const handleCallNext = (id: number) => {
    setWaitlist(prev => prev.map(w =>
      w.id === id ? { ...w, status: "called" } : w
    ));
  };

  const handleSeat = (id: number) => {
    setWaitlist(prev => prev.map(w =>
      w.id === id ? { ...w, status: "seated" } : w
    ));
  };

  const handleAddWaitlist = () => {
    if (!newName.trim()) return;
    const newEntry: WaitlistEntry = {
      id: Date.now(),
      name: newName,
      guests: parseInt(newGuests),
      waitTime: Math.floor(Math.random() * 20) + 5,
      status: "waiting"
    };
    setWaitlist(prev => [...prev, newEntry]);
    setNewName("");
    setNewGuests("2");
    setShowNewReservation(false);
  };

  const statusColors = {
    confirmed: "text-green-400 bg-green-400/10 border-green-700/40",
    pending: "text-amber-400 bg-amber-400/10 border-amber-700/40",
    arrived: "text-blue-400 bg-blue-400/10 border-blue-700/40",
  };

  const statusLabels = {
    confirmed: "Confirmado",
    pending: "Pendiente",
    arrived: "En mesa",
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">Ecosistema All Inclusive</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
          Reservaciones automaticas, listas de espera digitales, confirmaciones por SMS, captura de datos del cliente,
          rotacion de mesas optimizada, senalizacion digital, presencia web y mas — todo integrado en un solo sistema.
          Tu enfoque: crear experiencias y generar revenue. Lo demas, nosotros lo automatizamos.
        </p>
        <ImpactPills />
        <div className="inline-block bg-amber-900/20 border border-amber-700/40 rounded-2xl px-6 py-3">
          <p className="text-amber-300 font-serif text-base italic">
            "Tu exito es nuestra razon de ser. Si tu restaurante crece, nosotros crecemos contigo."
          </p>
          <p className="text-amber-500/60 text-xs mt-1 text-center">— El equipo de Conect-R</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted/20 rounded-xl w-fit mx-auto">
        {[
          { id: "reserve", label: "Table Reserve", logo: "/logo-table-reserve.jpeg" },
          { id: "nextup", label: "NextUp — Lista de Espera", logo: "/logo-nextup.jpeg" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "reserve" | "nextup")}
            data-testid={`tab-${tab.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-amber-500 text-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <img src={tab.logo} alt={tab.label} className="w-5 h-5 rounded-full object-cover shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "reserve" ? (
          <motion.div
            key="reserve"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Calendar size={20} /> Reservaciones del dia — Viernes 4 Abr
              </h3>
              <div className="text-sm text-muted-foreground">
                {reservations.filter(r => r.status === "confirmed").length} confirmadas
              </div>
            </div>

            <div className="space-y-3">
              {reservations.map((res) => (
                <motion.div
                  key={res.id}
                  layout
                  className="maya-card rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-700/30 rounded-xl flex flex-col items-center justify-center">
                      <Clock size={14} className="text-amber-400" />
                      <span className="text-xs font-bold text-amber-400 mt-0.5">{res.time}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{res.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {res.guests} personas
                        </span>
                        <span>{res.table}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[res.status]}`}>
                      {statusLabels[res.status]}
                    </span>

                    {res.status !== "confirmed" && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSendSMS(res.id)}
                        data-testid={`sms-btn-${res.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs rounded-lg font-medium transition-colors"
                      >
                        <MessageSquare size={12} />
                        {smsSent === res.id ? "Enviado!" : "Confirmar via SMS"}
                      </motion.button>
                    )}

                    {smsSent === res.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1 text-xs text-green-400"
                      >
                        <Check size={14} /> SMS enviado a {res.phone}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Data captured automatically on reservation */}
            <div className="maya-card rounded-xl p-5 border border-amber-800/30">
              <h4 className="text-sm font-semibold text-amber-400 mb-4 flex items-center gap-2">
                <Check size={16} /> Datos capturados automaticamente al reservar
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Nombre completo", value: "Ana Garcia" },
                  { label: "Telefono", value: "+52 55 8765 4321" },
                  { label: "Email", value: "ana@email.com" },
                  { label: "Personas", value: "4 comensales" },
                  { label: "Fecha y hora", value: "Vie 4 Abr 19:00" },
                  { label: "Ocasion especial", value: "Cumpleanos" },
                ].map(item => (
                  <div key={item.label} className="bg-muted/10 border border-border/40 rounded-xl p-3">
                    <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground/70 bg-amber-900/10 border border-amber-800/20 rounded-lg p-3">
                Estos datos se guardan automaticamente en el CRM al momento de la reserva — sin que el staff tenga que ingresarlos manualmente.
              </div>
            </div>

            {/* SMS confirmation simulation */}
            <div className="maya-card rounded-xl p-5">
              <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <Bell size={16} /> Confirmacion SMS automatica
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {[
                  { step: "1", text: "Cliente hace reserva online o por telefono" },
                  { step: "2", text: "Sistema envia SMS: 'Hola Ana, reserva confirmada Vie 19:00 Mesa 03'" },
                  { step: "3", text: "2h antes: recordatorio automatico con link para cancelar o modificar" },
                ].map(item => (
                  <div key={item.step} className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-amber-500 text-black rounded-full text-xs font-bold flex items-center justify-center shrink-0">{item.step}</div>
                    <p className="text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="nextup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Users size={20} /> Lista de Espera Digital — NextUp
              </h3>
              <button
                onClick={() => setShowNewReservation(!showNewReservation)}
                data-testid="add-waitlist-btn"
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-black text-sm rounded-lg font-medium hover:bg-amber-400 transition-colors"
              >
                <Plus size={14} /> Agregar
              </button>
            </div>

            <AnimatePresence>
              {showNewReservation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="maya-card rounded-xl p-4 border border-amber-800/40"
                >
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">Nombre</label>
                      <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Nombre del cliente"
                        data-testid="waitlist-name-input"
                        className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-muted-foreground mb-1 block">Personas</label>
                      <select
                        value={newGuests}
                        onChange={e => setNewGuests(e.target.value)}
                        className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleAddWaitlist}
                      className="px-4 py-2 bg-amber-500 text-black rounded-lg text-sm font-medium"
                    >
                      Agregar
                    </button>
                    <button onClick={() => setShowNewReservation(false)} className="p-2 text-muted-foreground">
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <AnimatePresence>
                {waitlist.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className={`maya-card rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${
                      entry.status === "seated" ? "opacity-40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                        entry.status === "called" ? "bg-amber-500 text-black" :
                        entry.status === "seated" ? "bg-green-600 text-white" :
                        "bg-muted/40 text-muted-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{entry.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-3">
                          <span className="flex items-center gap-1"><Users size={12} /> {entry.guests} personas</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> ~{entry.waitTime} min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {entry.status === "waiting" && (
                        <button
                          onClick={() => handleCallNext(entry.id)}
                          data-testid={`call-btn-${entry.id}`}
                          className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-black text-xs rounded-lg font-medium hover:bg-amber-400 transition-colors"
                        >
                          <Bell size={12} /> Llamar
                        </button>
                      )}
                      {entry.status === "called" && (
                        <>
                          <span className="text-xs text-amber-400 flex items-center gap-1">
                            <Bell size={12} /> Llamado
                          </span>
                          <button
                            onClick={() => handleSeat(entry.id)}
                            data-testid={`seat-btn-${entry.id}`}
                            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg font-medium"
                          >
                            <Check size={12} /> Sentar
                          </button>
                        </>
                      )}
                      {entry.status === "seated" && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Check size={14} /> Sentado
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="maya-card rounded-xl p-5">
              <div className="flex items-start gap-3">
                <ChevronRight size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Sin colas fisicas — gestion digital en tiempo real</h4>
                  <p className="text-sm text-muted-foreground">
                    Cuando un cliente llega sin reservacion, el staff lo agrega a la lista en segundos desde el sistema.
                    El cliente recibe un SMS cuando su mesa esta lista y puede esperar en el bar o en la calle
                    sin perder su lugar — sin papel, sin pizarrones, sin desorden.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
