import { useState, useCallback } from "react";
import { X, Calculator, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TaxCalculatorModalProps {
  open: boolean;
  onClose: () => void;
}

const formatCurrency = (val: number) =>
  val.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

const formatNumberInput = (val: string) => {
  const num = val.replace(/[^0-9]/g, "");
  if (!num) return "";
  return parseInt(num).toLocaleString("en-US");
};

const parseFormattedNumber = (val: string) =>
  parseFloat(val.replace(/,/g, "")) || 0;

const TaxCalculatorModal = ({ open, onClose }: TaxCalculatorModalProps) => {
  const [prevAssessment, setPrevAssessment] = useState("");
  const [prevMillRate, setPrevMillRate] = useState("");
  const [newAssessment, setNewAssessment] = useState("");
  const [newMillRate, setNewMillRate] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const prevAssessedVal = parseFormattedNumber(prevAssessment);
  const prevMillVal = parseFloat(prevMillRate) || 0;
  const newAssessedVal = parseFormattedNumber(newAssessment);
  const newMillVal = parseFloat(newMillRate) || 0;

  const prevTax = (prevAssessedVal * prevMillVal) / 1000;
  const newTax = (newAssessedVal * newMillVal) / 1000;
  const difference = newTax - prevTax;

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!prevAssessment) e.prevAssessment = "Required";
    if (!prevMillRate || prevMillVal <= 0) e.prevMillRate = "Required";
    if (!newAssessment) e.newAssessment = "Required";
    if (!newMillRate || newMillVal <= 0) e.newMillRate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [prevAssessment, prevMillRate, prevMillVal, newAssessment, newMillRate, newMillVal]);

  const handleCalculate = () => {
    if (validate()) setCalculated(true);
  };

  const handleReset = () => {
    setPrevAssessment("");
    setPrevMillRate("");
    setNewAssessment("");
    setNewMillRate("");
    setCalculated(false);
    setErrors({});
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
            className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh] border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-foreground text-lg leading-tight">
                    Tax Impact Comparison
                  </h2>
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

            {/* Helper text */}
            <div className="px-6 pb-3">
              <p className="text-muted-foreground text-xs leading-relaxed bg-muted rounded-lg p-3">
                Compare last year's property tax to the new proposed tax using both assessment and mill rate changes.
              </p>
            </div>

            {/* Two-column inputs */}
            <div className="px-6 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Previous Year Column */}
                <div className="space-y-3 p-4 rounded-xl bg-muted/50 border border-border">
                  <h3 className="font-display font-bold text-foreground text-sm text-center">
                    Previous Year
                    <span className="block text-muted-foreground text-xs font-normal mt-0.5">(2024–2025)</span>
                  </h3>

                  <div>
                    <Label className="text-xs font-medium text-foreground mb-1 block">
                      Property Assessment
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">$</span>
                      <Input
                        value={prevAssessment}
                        onChange={(e) => {
                          setPrevAssessment(formatNumberInput(e.target.value));
                          setCalculated(false);
                          if (errors.prevAssessment) setErrors((p) => ({ ...p, prevAssessment: "" }));
                        }}
                        placeholder="e.g. 250,000"
                        className={cn("pl-7 h-10", errors.prevAssessment && "border-destructive")}
                      />
                    </div>
                    {errors.prevAssessment && <p className="text-destructive text-[10px] mt-0.5">{errors.prevAssessment}</p>}
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-foreground mb-1 block">Mill Rate</Label>
                    <div className="relative">
                      <Input
                        value={prevMillRate}
                        onChange={(e) => {
                          setPrevMillRate(e.target.value);
                          setCalculated(false);
                          if (errors.prevMillRate) setErrors((p) => ({ ...p, prevMillRate: "" }));
                        }}
                        type="number"
                        step="0.01"
                        placeholder="e.g. 37.0"
                        className={cn("h-10 pr-12", errors.prevMillRate && "border-destructive")}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">mills</span>
                    </div>
                    {errors.prevMillRate && <p className="text-destructive text-[10px] mt-0.5">{errors.prevMillRate}</p>}
                  </div>
                </div>

                {/* New Year Column */}
                <div className="space-y-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <h3 className="font-display font-bold text-primary text-sm text-center">
                    New Year
                    <span className="block text-primary/70 text-xs font-normal mt-0.5">(2025–2026)</span>
                  </h3>

                  <div>
                    <Label className="text-xs font-medium text-foreground mb-1 block">
                      Property Assessment
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">$</span>
                      <Input
                        value={newAssessment}
                        onChange={(e) => {
                          setNewAssessment(formatNumberInput(e.target.value));
                          setCalculated(false);
                          if (errors.newAssessment) setErrors((p) => ({ ...p, newAssessment: "" }));
                        }}
                        placeholder="e.g. 350,000"
                        className={cn("pl-7 h-10", errors.newAssessment && "border-destructive")}
                      />
                    </div>
                    {errors.newAssessment && <p className="text-destructive text-[10px] mt-0.5">{errors.newAssessment}</p>}
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-foreground mb-1 block">Mill Rate</Label>
                    <div className="relative">
                      <Input
                        value={newMillRate}
                        onChange={(e) => {
                          setNewMillRate(e.target.value);
                          setCalculated(false);
                          if (errors.newMillRate) setErrors((p) => ({ ...p, newMillRate: "" }));
                        }}
                        type="number"
                        step="0.01"
                        placeholder="e.g. 26.4"
                        className={cn("h-10 pr-12", errors.newMillRate && "border-destructive")}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">mills</span>
                    </div>
                    {errors.newMillRate && <p className="text-destructive text-[10px] mt-0.5">{errors.newMillRate}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="px-6 pb-4 flex gap-3">
              <Button onClick={handleCalculate} className="flex-1 h-11 font-bold text-sm">
                Calculate Tax Impact
              </Button>
              {calculated && (
                <Button onClick={handleReset} variant="outline" className="h-11 text-sm">
                  Reset
                </Button>
              )}
            </div>

            {/* Results */}
            <AnimatePresence>
              {calculated && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="bg-muted rounded-xl p-5 space-y-3">
                      <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider">
                        Tax Comparison Results
                      </h3>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Previous Year Tax (2024–2025)</span>
                          <span className="font-display font-bold text-foreground text-lg">{formatCurrency(prevTax)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">New Year Tax (2025–2026)</span>
                          <span className="font-display font-bold text-primary text-lg">{formatCurrency(newTax)}</span>
                        </div>
                        <div className="h-px bg-border my-1" />
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {difference > 0 ? (
                              <TrendingUp className="w-4 h-4 text-destructive" />
                            ) : difference < 0 ? (
                              <TrendingDown className="w-4 h-4 text-primary" />
                            ) : (
                              <Minus className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="text-sm font-medium text-foreground">
                              {difference > 0
                                ? "Estimated Tax Increase"
                                : difference < 0
                                ? "Estimated Tax Decrease"
                                : "No Change"}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "font-display font-bold text-lg",
                              difference > 0
                                ? "text-destructive"
                                : difference < 0
                                ? "text-primary"
                                : "text-foreground"
                            )}
                          >
                            {difference > 0 ? "+" : ""}
                            {formatCurrency(Math.abs(difference))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaxCalculatorModal;
