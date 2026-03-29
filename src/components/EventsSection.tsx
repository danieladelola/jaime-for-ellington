import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface EventData {
  id: string;
  title: string;
  short_description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  featured_image: string | null;
}

const EventsSection = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from("events")
        .select("id, title, short_description, event_date, event_time, location, featured_image")
        .eq("status", "published")
        .order("event_date", { ascending: true })
        .limit(6);
      if (data) setEvents(data as unknown as EventData[]);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading || events.length === 0) return null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return { day: d.getDate(), month: d.toLocaleString("default", { month: "short" }).toUpperCase(), full: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) };
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-primary font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3">What's Happening</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Join us at upcoming town events, meetings, and community gatherings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => {
            const date = formatDate(event.event_date);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-500"
              >
                {event.featured_image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.featured_image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center shadow-lg">
                      <p className="text-2xl font-display font-bold leading-none">{date.day}</p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold mt-0.5">{date.month}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-primary/20" />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-center shadow-lg">
                      <p className="text-2xl font-display font-bold leading-none">{date.day}</p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold mt-0.5">{date.month}</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {date.full}</span>
                    {event.event_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.event_time}</span>}
                    {event.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>}
                  </div>
                  {event.short_description && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {event.short_description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
