import { useState, useMemo } from "react";
import { X, Calculator, Info, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaxCalculatorModalProps {
  open: boolean;
  onClose: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const BASE_YEARS = Array.from({ length: CURRENT_YEAR - 2010 + 1 }, (_, i) => 2010 + i);

const TaxCalculatorModal = ({ open, onClose }: TaxCalculatorModalProps) => {
  const [assessedCurrent, setAssessedCurrent] = useState("");
  const [millRateCurrent, setMillRateCurrent] = useState("26.4");
  const [assessedPrevious, setAssessedPrevious] = useState("");
  const [millRatePrevious, setMillRatePrevious] = useState("37.0");
  const [previousYear, setPreviousYear] = useState((CURRENT_YEAR - 1).toString());
  const [customYearInput, setCustomYearInput] = useState("");
  const [extraYears, setExtraYears] = useState<number[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  const years = useMemo(() => {
    const all = new Set([...BASE_YEARS, ...extraYears]);
    return Array.from(all).sort((a, b) => a - b);
  }, [extraYears]);

  const addCustomYear = () => {
    const y = parseInt(customYearInput);
    if (!y || customYearInput.length !== 4 || y < 1900 || y > 2100) return;
    if (!years.includes(y)) setExtraYears((prev) => [...prev, y]);
    setPreviousYear(y.toString());
    setCustomYearInput("");
  };

  const formatNum = (val: string) => {
    const num = val.replace(/[^0-9]/g, "");
    if (!num) return "";
    return parseInt(num).toLocaleString("en-US");
  };

  const parse = (val: string) => parseFloat(val.replace(/,/g, "")) || 0;

  const currentTax = (parse(assessedCurrent) * parse(millRateCurrent)) / 1000;
  const previousTax = (parse(assessedPrevious) * parse(millRatePrevious)) / 1000;
  const difference = currentTax - previousTax;

  const fmt = (v: number) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  const hasResult = parse(assessedCurrent) > 0 && parse(assessedPrevious) > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh] border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 sticky top-0 bg-card z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-foreground text-lg leading-tight">
                    Property Tax Estimator
                  </h2>
                  <p className="text-muted-foreground text-xs">Year-over-Year Comparison</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-5">
              {/* Current Year Section */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                <h3 className="font-display font-bold text-primary text-sm uppercase tracking-wider">
                  Current Year — {CURRENT_YEAR}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-foreground mb-1 block">
                      Assessed Value
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">$</span>
                      <Input
                        value={assessedCurrent}
                        onChange={(e) => setAssessedCurrent(formatNum(e.target.value))}
                        placeholder="250,000"
                        className="pl-7 h-10 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Label className="text-xs font-medium text-foreground">Mill Rate</Label>
                      <button
                        onClick={() => setShowInfo(!showInfo)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Info className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        value={millRateCurrent}
                        onChange={(e) => setMillRateCurrent(e.target.value)}
                        type="number"
                        step="0.1"
                        className="h-10 pr-12 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">mills</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-card rounded-lg px-3 py-2">
                  <span className="text-muted-foreground text-sm">Estimated Tax</span>
                  <span className="font-display font-bold text-primary text-lg">{fmt(currentTax)}</span>
                </div>
              </div>

              {/* Previous Year Section */}
              <div className="rounded-xl border border-border bg-muted/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider">
                    Previous Year — {previousYear}
                  </h3>
                  <Select value={previousYear} onValueChange={setPreviousYear}>
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={y.toString()}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom year entry */}
                <div className="flex gap-2">
                  <Input
                    value={customYearInput}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                      setCustomYearInput(v);
                    }}
                    placeholder="Add year (e.g. 2008)"
                    className="h-8 text-xs flex-1"
                    onKeyDown={(e) => e.key === "Enter" && addCustomYear()}
                  />
                  <button
                    onClick={addCustomYear}
                    disabled={customYearInput.length !== 4}
                    className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1 disabled:opacity-40 hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-medium text-foreground mb-1 block">
                      Assessed Value
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">$</span>
                      <Input
                        value={assessedPrevious}
                        onChange={(e) => setAssessedPrevious(formatNum(e.target.value))}
                        placeholder="250,000"
                        className="pl-7 h-10 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-foreground mb-1 block">Mill Rate</Label>
                    <div className="relative">
                      <Input
                        value={millRatePrevious}
                        onChange={(e) => setMillRatePrevious(e.target.value)}
                        type="number"
                        step="0.1"
                        className="h-10 pr-12 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">mills</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-card rounded-lg px-3 py-2">
                  <span className="text-muted-foreground text-sm">Estimated Tax</span>
                  <span className="font-display font-bold text-foreground text-lg">{fmt(previousTax)}</span>
                </div>
              </div>

              {/* Info tooltip */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground text-xs bg-muted rounded-lg p-3 leading-relaxed">
                      A <strong>mill rate</strong> is the tax per $1,000 of assessed value.
                      Formula: <em>Assessed Value × Mill Rate ÷ 1,000</em>.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result */}
              {hasResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-5 space-y-3 border-2"
                  style={{
                    borderColor: difference > 0 ? "hsl(var(--destructive))" : "hsl(var(--primary))",
                    background: difference > 0 ? "hsl(var(--destructive) / 0.05)" : "hsl(var(--primary) / 0.05)",
                  }}
                >
                  <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider">
                    {difference >= 0 ? "Estimated Tax Increase" : "Estimated Tax Decrease"}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">{CURRENT_YEAR} Tax</span>
                      <span className="font-display font-bold text-foreground">{fmt(currentTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">{previousYear} Tax</span>
                      <span className="font-display font-bold text-foreground">{fmt(previousTax)}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between items-center">
                      <span className="text-foreground text-sm font-medium">Difference</span>
                      <span
                        className={cn(
                          "font-display font-bold text-xl",
                          difference > 0 ? "text-destructive" : difference < 0 ? "text-primary" : "text-foreground"
                        )}
                      >
                        {difference > 0 ? "+" : ""}
                        {fmt(difference)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaxCalculatorModal;
