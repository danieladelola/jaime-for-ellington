import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CalculatorModal = () => {
  const [open, setOpen] = useState(true);
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [mode, setMode] = useState<"standard" | "scientific">("standard");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const safeEval = (expr: string): string => {
    try {
      let processed = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, `(${Math.PI})`)
        .replace(/e(?![x])/g, `(${Math.E})`)
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/\^/g, "**");
      const result = new Function(`"use strict"; return (${processed})`)();
      if (typeof result === "number" && !isNaN(result) && isFinite(result)) {
        return parseFloat(result.toFixed(10)).toString();
      }
      return "Error";
    } catch {
      return "Error";
    }
  };

  const handleInput = (val: string) => {
    if (justEvaluated && /[0-9.]/.test(val)) {
      setExpression(val);
      setDisplay(val);
      setJustEvaluated(false);
      return;
    }
    setJustEvaluated(false);

    if (val === "AC") {
      setExpression("");
      setDisplay("0");
      return;
    }
    if (val === "⌫") {
      const newExpr = expression.slice(0, -1);
      setExpression(newExpr);
      setDisplay(newExpr || "0");
      return;
    }
    if (val === "=") {
      const result = safeEval(expression);
      setDisplay(result);
      setExpression(result === "Error" ? "" : result);
      setJustEvaluated(true);
      return;
    }
    if (val === "%") {
      const result = safeEval(expression + "/100");
      setDisplay(result);
      setExpression(result === "Error" ? "" : result);
      setJustEvaluated(true);
      return;
    }
    if (val === "±") {
      if (expression.startsWith("-")) {
        const newExpr = expression.slice(1);
        setExpression(newExpr);
        setDisplay(newExpr || "0");
      } else {
        setExpression("-" + expression);
        setDisplay("-" + expression);
      }
      return;
    }

    const newExpr = expression + val;
    setExpression(newExpr);
    setDisplay(newExpr);
  };

  const standardButtons = [
    ["AC", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "⌫", "="],
  ];

  const scientificButtons = [
    ["sin(", "cos(", "tan(", "π"],
    ["log(", "ln(", "√(", "e"],
    ["(", ")", "^", "!"],
  ];

  const getButtonStyle = (btn: string) => {
    if (btn === "=") return "bg-primary text-primary-foreground hover:bg-primary/85 font-bold text-lg";
    if (["÷", "×", "-", "+"].includes(btn)) return "bg-secondary text-secondary-foreground hover:bg-secondary/85 font-bold text-lg";
    if (["AC", "±", "%"].includes(btn)) return "bg-muted text-foreground hover:bg-muted/70 font-semibold";
    if (["sin(", "cos(", "tan(", "log(", "ln(", "√(", "π", "e", "(", ")", "^", "!"].includes(btn))
      return "bg-accent/20 text-foreground hover:bg-accent/30 font-medium text-xs";
    return "bg-card text-foreground hover:bg-muted border border-border font-medium";
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
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-card rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div className="flex gap-1">
                <button
                  onClick={() => setMode("standard")}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold transition-all",
                    mode === "standard" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Standard
                </button>
                <button
                  onClick={() => setMode("scientific")}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold transition-all",
                    mode === "scientific" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Scientific
                </button>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Display */}
            <div className="px-5 py-4">
              <div className="bg-muted rounded-xl px-5 py-4 text-right">
                <p className="text-muted-foreground text-xs h-5 truncate font-mono">
                  {expression || " "}
                </p>
                <p className="text-foreground text-3xl font-display font-bold truncate mt-1">
                  {display}
                </p>
              </div>
            </div>

            {/* Scientific buttons */}
            <AnimatePresence>
              {mode === "scientific" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-5 overflow-hidden"
                >
                  <div className="grid grid-cols-4 gap-2 pb-2">
                    {scientificButtons.flat().map((btn) => (
                      <button
                        key={btn}
                        onClick={() => handleInput(btn)}
                        className={cn(
                          "h-10 rounded-lg transition-all duration-150 active:scale-95",
                          getButtonStyle(btn)
                        )}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Standard buttons */}
            <div className="px-5 pb-5">
              <div className="grid grid-cols-4 gap-2">
                {standardButtons.flat().map((btn, i) => (
                  <button
                    key={`${btn}-${i}`}
                    onClick={() => handleInput(btn)}
                    className={cn(
                      "h-14 rounded-xl transition-all duration-150 active:scale-95 text-base",
                      btn === "0" ? "" : "",
                      getButtonStyle(btn)
                    )}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalculatorModal;
