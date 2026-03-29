CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text,
  full_description text,
  event_date date NOT NULL,
  event_time time,
  location text,
  featured_image text,
  status text NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published events" ON public.events
  FOR SELECT TO public USING (status = 'published');

CREATE POLICY "Authenticated users can manage events" ON public.events
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();