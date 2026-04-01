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

const DEFAULT_CURRENT_RATE = 37.0;
const DEFAULT_PROPOSED_RATE = 26.4;
const CURRENT_YEAR = new Date().getFullYear();
const BASE_YEARS = Array.from({ length: CURRENT_YEAR - 2010 + 1 }, (_, i) => 2010 + i);

const TaxCalculatorModal = ({ open, onClose }: TaxCalculatorModalProps) => {
  const [propertyValue, setPropertyValue] = useState("");
  const [currentRate, setCurrentRate] = useState(DEFAULT_CURRENT_RATE.toString());
  const [proposedRate, setProposedRate] = useState(DEFAULT_PROPOSED_RATE.toString());
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR.toString());
  const [customYearInput, setCustomYearInput] = useState("");
  const [extraYears, setExtraYears] = useState<number[]>([]);
  const [showRateInfo, setShowRateInfo] = useState(false);

  const years = useMemo(() => {
    const all = new Set([...BASE_YEARS, ...extraYears]);
    return Array.from(all).sort((a, b) => a - b);
  }, [extraYears]);

  const addCustomYear = () => {
    const y = parseInt(customYearInput);
    if (!y || customYearInput.length !== 4 || y < 1900 || y > 2100) return;
    if (!years.includes(y)) setExtraYears((prev) => [...prev, y]);
    setSelectedYear(y.toString());
    setCustomYearInput("");
  };

  const assessed = parseFloat(propertyValue.replace(/,/g, "")) || 0;
  const current = parseFloat(currentRate) || 0;
  const proposed = parseFloat(proposedRate) || 0;

  const currentTax = (assessed * current) / 1000;
  const proposedTax = (assessed * proposed) / 1000;
  const difference = proposedTax - currentTax;

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  const formatInput = (val: string) => {
    const num = val.replace(/[^0-9]/g, "");
    if (!num) return "";
    return parseInt(num).toLocaleString("en-US");
  };

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
            className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-y-auto max-h-[90vh] border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-foreground text-lg leading-tight">Tax Calculator</h2>
                  <p className="text-muted-foreground text-xs">Ellington Property Tax Estimator</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rate badges */}
            <div className="px-6 pb-3">
              <div className="flex gap-3">
                <div className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-center">
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-medium">Current Mill Rate</p>
                  <p className="font-display font-bold text-foreground text-xl">{current.toFixed(1)}</p>
                </div>
                <div className="flex-1 bg-primary/10 rounded-lg px-4 py-2.5 text-center">
                  <p className="text-primary text-[10px] uppercase tracking-wider font-medium">Proposed Rate</p>
                  <p className="font-display font-bold text-primary text-xl">{proposed.toFixed(1)}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="px-6 py-4 space-y-4">
              {/* Year selector */}
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Tax Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="h-10 relative z-[110]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[200]">
                    {years.map((y) => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">
                  Assessed Property Value
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                  <Input
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(formatInput(e.target.value))}
                    placeholder="e.g. 250,000"
                    className="pl-7 h-12 text-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Label className="text-sm font-medium text-foreground">Current Rate</Label>
                    <button
                      onClick={() => setShowRateInfo(!showRateInfo)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      value={currentRate}
                      onChange={(e) => setCurrentRate(e.target.value)}
                      type="number"
                      step="0.1"
                      className="h-10 pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">mills</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1.5 block">Proposed Rate</Label>
                  <div className="relative">
                    <Input
                      value={proposedRate}
                      onChange={(e) => setProposedRate(e.target.value)}
                      type="number"
                      step="0.1"
                      className="h-10 pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">mills</span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {showRateInfo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground text-xs bg-muted rounded-lg p-3 leading-relaxed">
                      A <strong>mill rate</strong> is the amount of tax per $1,000 of assessed property value.
                      For example, a mill rate of 37.0 means $37 in tax for every $1,000 of assessed value.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results */}
            {assessed > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 pb-6"
              >
                <div className="bg-muted rounded-xl p-5 space-y-3">
                  <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider">
                    Estimated Property Tax — {selectedYear}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Current Tax</span>
                      <span className="font-display font-bold text-foreground text-lg">{formatCurrency(currentTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">New Tax</span>
                      <span className="font-display font-bold text-primary text-lg">{formatCurrency(proposedTax)}</span>
                    </div>
                    <div className="h-px bg-border my-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm font-medium">
                        {difference < 0 ? "Estimated Tax Decrease" : difference > 0 ? "Estimated Tax Increase" : "Difference"}
                      </span>
                      <span
                        className={cn(
                          "font-display font-bold text-lg",
                          difference < 0 ? "text-primary" : difference > 0 ? "text-destructive" : "text-foreground"
                        )}
                      >
                        {difference <= 0 ? "" : "+"}
                        {formatCurrency(difference)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaxCalculatorModal;
