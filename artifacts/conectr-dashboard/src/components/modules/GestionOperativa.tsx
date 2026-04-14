import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MessageSquare, Users, Check, Bell, X, Plus, ChevronRight } from "lucide-react";
import ImpactPills from "@/components/ImpactPills";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

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
  const { lang } = useLang();
  const T = getT(lang).gestion;

  const [activeTab, setActiveTab] = useState<"reserve" | "nextup">("reserve");
  const [reservations, setReservations] = useState<Reservation[]>([
    { id: 1, name: "Ana Garcia", time: "7:00 PM", guests: 4, table: "Table 03", status: "confirmed", phone: "+52 55 8765 4321" },
    { id: 2, name: "Roberto Diaz", time: "7:30 PM", guests: 2, table: "Table 07", status: "confirmed", phone: "+52 55 2345 6789" },
    { id: 3, name: "Familia Reyes", time: "8:00 PM", guests: 6, table: "Table 12", status: "pending", phone: "+52 55 9876 5432" },
    { id: 4, name: "Patricia Luna", time: "8:30 PM", guests: 2, table: "Table 05", status: "arrived", phone: "+52 55 3456 7890" },
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gold-gradient mb-2">{T.heading}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
          {T.description} <span className="text-amber-400 font-medium">{T.descSales}</span> {T.descAnd}{" "}
          <span className="text-amber-400 font-medium">{T.descClients}</span> {T.descMid}{" "}
          <span className="text-amber-400 font-medium">{T.descWork}</span> {T.descAnd2}{" "}
          <span className="text-amber-400 font-medium">{T.descReviews}</span>.
        </p>
        <ImpactPills />
        <div className="inline-block bg-amber-900/20 border border-amber-700/40 rounded-2xl px-6 py-3">
          <p className="text-amber-300 font-serif text-base italic">{T.quote}</p>
          <p className="text-amber-500/60 text-xs mt-1 text-center">{T.quoteAuthor}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-muted/20 rounded-xl w-fit mx-auto">
        {[
          { id: "reserve", label: T.tabReserve, logo: "/logo-table-reserve.jpeg" },
          { id: "nextup", label: T.tabNextup, logo: "/logo-nextup.jpeg" },
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
                <Calendar size={20} /> {T.reserveTitle}
              </h3>
              <div className="text-sm text-muted-foreground">
                {reservations.filter(r => r.status === "confirmed").length} {T.reserveConfirmed}
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
                          <Users size={12} /> {res.guests} {T.persons}
                        </span>
                        <span>{res.table}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[res.status]}`}>
                      {T.statusLabels[res.status]}
                    </span>

                    {res.status !== "confirmed" && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSendSMS(res.id)}
                        data-testid={`sms-btn-${res.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs rounded-lg font-medium transition-colors"
                      >
                        <MessageSquare size={12} />
                        {smsSent === res.id ? T.smsSent : T.smsBtn}
                      </motion.button>
                    )}

                    {smsSent === res.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1 text-xs text-green-400"
                      >
                        <Check size={14} /> {T.smsSentTo} {res.phone}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="maya-card rounded-xl p-5 border border-amber-800/30">
              <h4 className="text-sm font-semibold text-amber-400 mb-4 flex items-center gap-2">
                <Check size={16} /> {T.dataTitle}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {T.dataFields.map(item => (
                  <div key={item.label} className="bg-muted/10 border border-border/40 rounded-xl p-3">
                    <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground/70 bg-amber-900/10 border border-amber-800/20 rounded-lg p-3">
                {T.dataNote}
              </div>
            </div>

            <div className="maya-card rounded-xl p-5">
              <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <Bell size={16} /> {T.smsFlowTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {T.smsSteps.map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-amber-500 text-black rounded-full text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                    <p className="text-muted-foreground">{text}</p>
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
                <Users size={20} /> {T.waitlistTitle}
              </h3>
              <button
                onClick={() => setShowNewReservation(!showNewReservation)}
                data-testid="add-waitlist-btn"
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-black text-sm rounded-lg font-medium hover:bg-amber-400 transition-colors"
              >
                <Plus size={14} /> {T.addBtn}
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
                      <label className="text-xs text-muted-foreground mb-1 block">{T.nameLabel}</label>
                      <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder={T.namePlaceholder}
                        data-testid="waitlist-name-input"
                        className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-muted-foreground mb-1 block">{T.personsLabel}</label>
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
                      {T.addBtn}
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
                          <span className="flex items-center gap-1"><Users size={12} /> {entry.guests} {T.persons}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> ~{entry.waitTime} {T.waitMin}</span>
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
                          <Bell size={12} /> {T.callBtn}
                        </button>
                      )}
                      {entry.status === "called" && (
                        <>
                          <span className="text-xs text-amber-400 flex items-center gap-1">
                            <Bell size={12} /> {T.calledLabel}
                          </span>
                          <button
                            onClick={() => handleSeat(entry.id)}
                            data-testid={`seat-btn-${entry.id}`}
                            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg font-medium"
                          >
                            <Check size={12} /> {T.seatBtn}
                          </button>
                        </>
                      )}
                      {entry.status === "seated" && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Check size={14} /> {T.seatedLabel}
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
                  <h4 className="text-sm font-semibold text-foreground mb-1">{T.noQueueTitle}</h4>
                  <p className="text-sm text-muted-foreground">{T.noQueueDesc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chamba */}
      <div className="maya-card rounded-2xl p-6 border border-blue-800/30" style={{ background: "linear-gradient(135deg, rgba(30,58,138,0.12), rgba(15,23,42,0.8))" }}>
        <div className="flex items-start gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-blue-700/30 flex items-center justify-center shrink-0 overflow-hidden">
            <img src="/chamba-logo.png" alt="Chamba" className="w-14 h-14 object-contain" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-base font-bold text-blue-300">{T.chambaTitle}</h4>
              <span className="text-xs px-2 py-0.5 bg-blue-500/15 border border-blue-500/30 text-blue-300 rounded-full">{T.chambaBadge}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {T.chambaDesc} <span className="text-blue-300 font-medium">{T.chambaHighlight}</span> {T.chambaDesc2}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {T.chambaFeatures.map(item => (
            <div key={item.title} className="flex gap-3 p-3 bg-blue-900/10 border border-blue-800/20 rounded-xl">
              <span className="text-xl shrink-0">{item.emoji}</span>
              <div>
                <div className="text-xs font-semibold text-blue-200 mb-0.5">{item.title}</div>
                <div className="text-xs text-muted-foreground leading-snug">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
