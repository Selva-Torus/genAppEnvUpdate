"use client";

import React, { useState, useRef, useEffect } from "react";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { CommonHeaderAndTooltip } from "./CommonHeaderAndTooltip";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { FiCalendar, FiX, FiEdit2, FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import dayjs from "dayjs";

type ContentAlign = "left" | "center" | "right";

interface DatePickerProps {
  readOnly?: boolean;
  disabled?: boolean;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
  value?: string | Date | null;
  onChange?: (date: string) => void;
  onUpdate?: (date: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
  validationState?: "invalid" | undefined;
  errorMessage?: string;
  fillContainer?: boolean;
  contentAlign?: ContentAlign;
  required?: boolean;
  showTime?: boolean;
}

/* ---------------------------------- helpers ---------------------------------- */

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n: number) => n.toString().padStart(2, "0");

function daysInMonth(year: number, month: number) {
  // month can be negative/>11, Date() normalizes it
  return new Date(year, month + 1, 0).getDate();
}

// Monday-first weekday index (0 = Mon ... 6 = Sun)
function mondayIndex(date: Date) {
  const d = date.getDay(); // 0 = Sun
  return (d + 6) % 7;
}

function buildCalendarGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = mondayIndex(firstOfMonth);
  const totalDays = daysInMonth(year, month);
  const prevMonthDays = daysInMonth(year, month - 1);

  const cells: { day: number; currentMonth: boolean; date: Date }[] = [];

  for (let i = startOffset - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    cells.push({ day, currentMonth: false, date: new Date(year, month - 1, day) });
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push({ day, currentMonth: true, date: new Date(year, month, day) });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay, currentMonth: false, date: new Date(year, month + 1, nextDay) });
    nextDay++;
  }
  return cells;
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getAlignClass(align: ContentAlign) {
  switch (align) {
    case "left":
      return "items-start";
    case "right":
      return "items-end";
    case "center":
    default:
      return "items-center";
  }
}

/* --------------------------------- wheel column -------------------------------- */

const ITEM_HEIGHT = 32;

interface WheelColumnProps {
  values: (number | string)[];
  selected: number | string;
  onSelect: (v: number | string) => void;
  isDark: boolean;
  width?: number;
}

const formatWheelValue = (v: number | string) => (typeof v === "number" ? pad(v) : v);

const WheelColumn: React.FC<WheelColumnProps> = ({ values, selected, onSelect, isDark, width = 40 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedIndex = values.findIndex((v) => v === selected);

  // Keep the wheel scrolled to whatever is actually selected. This only
  // reacts to real value changes (e.g. a click elsewhere, or the value
  // prop being reset), not to the user's own free-scrolling.
  useEffect(() => {
    if (containerRef.current && selectedIndex >= 0) {
      containerRef.current.scrollTop = selectedIndex * ITEM_HEIGHT;
    }
  }, [selectedIndex]);

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" });
    onSelect(values[index]);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-y-scroll"
      style={{ height: ITEM_HEIGHT * 3, width, scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
    >
      <div style={{ height: ITEM_HEIGHT }} />
      {values.map((v, i) => (
        <div
          key={i}
          onClick={() => scrollToIndex(i)}
          className={`flex items-center justify-center cursor-pointer select-none ${
            v === selected
              ? isDark
                ? "text-white font-semibold text-base"
                : "text-gray-900 font-semibold text-base"
              : isDark
              ? "text-gray-500 text-sm"
              : "text-gray-400 text-sm"
          }`}
          style={{ height: ITEM_HEIGHT, scrollSnapAlign: "center" }}
        >
          {formatWheelValue(v)}
        </div>
      ))}
      <div style={{ height: ITEM_HEIGHT }} />
    </div>
  );
};

/* --------------------------------- main component -------------------------------- */

export const DateAndTime: React.FC<DatePickerProps> = ({
  readOnly = false,
  disabled = false,
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = "top",
  value = "",
  onChange,
  onUpdate,
  onBlur,
  className = "",
  label,
  style,
  validationState,
  errorMessage,
  fillContainer = true,
  contentAlign = "center",
  required = false,
  showTime = true,
}) => {
  const { theme, branding, displayFormat } = useGlobal();
  const showToast = useInfoMsg();
  const prevValidationState = useRef(validationState);
  const containerRef = useRef<HTMLDivElement>(null);

  const dateFormat = displayFormat?.datePickerProperty?.dateDisplayFormat || "DD-MM-YYYY";
  const timeFormat = displayFormat?.timePickerProperty?.timeDisplayFormat || "HH:mm:ss";

  React.useEffect(() => {
    if (validationState === "invalid" && errorMessage && prevValidationState.current !== "invalid") {
      showToast(errorMessage, "danger");
    }
    prevValidationState.current = validationState;
  }, [validationState, errorMessage]);

  const isDark = theme === "dark" || theme === "dark-hc";

  const parseValue = (val: string | Date | null): Date | null => {
    if (!val) return null;
    const d = val instanceof Date ? val : new Date(val);
    return isNaN(d.getTime()) ? null : d;
  };

  const initial = parseValue(value);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initial);
  const [hour12, setHour12] = useState<number>(initial ? (initial.getHours() % 12 || 12) : 12);
  const [minute, setMinute] = useState<number>(initial ? initial.getMinutes() : 0);
  const [second, setSecond] = useState<number>(initial ? initial.getSeconds() : 0);
  const [ampm, setAmpm] = useState<"AM" | "PM">(initial && initial.getHours() >= 12 ? "PM" : "AM");
  const [viewMonth, setViewMonth] = useState<Date>(initial ?? new Date());
  const [step, setStep] = useState<"closed" | "date" | "time">("closed");

  // sync when the value prop changes externally
  useEffect(() => {
    const v = parseValue(value);
    setSelectedDate(v);
    if (v) {
      setHour12(v.getHours() % 12 || 12);
      setMinute(v.getMinutes());
      setSecond(v.getSeconds());
      setAmpm(v.getHours() >= 12 ? "PM" : "AM");
      setViewMonth(v);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // close popup on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setStep("closed");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const buildJsDate = (date: Date, h12: number, m: number, s: number, ap: "AM" | "PM") => {
    let h24 = h12 % 12;
    if (ap === "PM") h24 += 12;
    const d = new Date(date);
    d.setHours(h24, m, s, 0);
    return d;
  };

  const buildCombined = (date: Date | null, h12: number, m: number, s: number, ap: "AM" | "PM") => {
    if (!date) return "";
    if (!showTime) return dayjs(date).format("YYYY-MM-DD");
    return dayjs(buildJsDate(date, h12, m, s, ap)).format("YYYY-MM-DDTHH:mm:ss");
  };

  const emit = (date: Date | null, h12: number, m: number, s: number, ap: "AM" | "PM") => {
    const combined = buildCombined(date, h12, m, s, ap);
    onChange?.(combined);
    onUpdate?.(combined);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    emit(date, hour12, minute, second, ampm);
    setStep(showTime ? "time" : "closed");
  };

  const handleTimePartChange = (part: "hour" | "minute" | "second" | "ampm", val: number | "AM" | "PM") => {
    let h = hour12, m = minute, s = second, a = ampm;
    if (part === "hour") { h = val as number; setHour12(h); }
    if (part === "minute") { m = val as number; setMinute(m); }
    if (part === "second") { s = val as number; setSecond(s); }
    if (part === "ampm") { a = val as "AM" | "PM"; setAmpm(a); }
    emit(selectedDate, h, m, s, a);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    setStep("closed");
    onChange?.("");
    onUpdate?.("");
  };

  const toggleOpen = () => {
    if (disabled || readOnly) return;
    setStep((prev) => (prev === "closed" ? "date" : "closed"));
  };

  const displayText = () => {
    if (!selectedDate) return "";
    const dateStr = dayjs(selectedDate).format(dateFormat);
    if (!showTime) return dateStr;
    const timeStr = dayjs(buildJsDate(selectedDate, hour12, minute, second, ampm)).format(timeFormat);
    return `${dateStr} ${timeStr}`;
  };

  const grid = buildCalendarGrid(viewMonth.getFullYear(), viewMonth.getMonth());
  const today = new Date();

  const hourValues = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteValues = Array.from({ length: 60 }, (_, i) => i);
  const secondValues = Array.from({ length: 60 }, (_, i) => i);

  const borderColorClass =
    validationState === "invalid" ? "border-red-500" : isDark ? "border-gray-600" : "border-gray-300";

  const datePickerElement = (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${getAlignClass(contentAlign)} ${fillContainer ? "w-full" : ""}`}
      style={style}
    >
      {label && (
        <label className={`block mb-2 font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onClick={toggleOpen}
        className={`flex items-center border-2 px-3 py-2 gap-2 transition-colors ${borderColorClass} ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${
          fillContainer ? "w-full" : ""
        } ${className}`}
        style={{ borderRadius: "var(--border-radius, 6px)" }}
      >
        <span className={`flex-1 text-sm truncate ${!selectedDate ? (isDark ? "text-gray-500" : "text-gray-400") : ""}`}>
          {selectedDate ? displayText() : "Select Date"}
        </span>
        {selectedDate && !disabled && !readOnly && (
          <FiX size={16} className="opacity-60 hover:opacity-100 shrink-0" onClick={handleClear} />
        )}
        {!disabled && !readOnly && (
          <FiEdit2
            size={14}
            className="opacity-60 hover:opacity-100 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
          />
        )}
        {!selectedDate && <FiCalendar size={16} className="opacity-60 shrink-0" />}
      </div>

      {step !== "closed" && (
        <div
          className={`absolute z-50 top-full left-0 mt-1 rounded-md shadow-lg border p-3 ${
            isDark ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"
          }`}
          style={{ minWidth: 280 }}
          onClick={(e) => e.stopPropagation()}
        >
          {step === "date" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`flex items-center gap-1 text-base font-semibold ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                  {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                  <FiChevronDown size={16} className="opacity-70" />
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                    className={isDark ? "text-gray-300" : "text-gray-500"}
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                    className={isDark ? "text-gray-300" : "text-gray-500"}
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-xs mb-1">
                {WEEKDAYS.map((wd) => (
                  <div
                    key={wd}
                    className={`text-center py-1 font-medium ${
                      wd === "Sa" || wd === "Su" ? "text-red-500" : isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {wd}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1 text-sm">
                {grid.map((cell, i) => {
                  const isWeekend = cell.date.getDay() === 0 || cell.date.getDay() === 6;
                  const selected = isSameDay(cell.date, selectedDate);
                  const isToday = isSameDay(cell.date, today);
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleDayClick(cell.date)}
                      className={`h-7 w-7 mx-auto rounded-md flex items-center justify-center relative ${
                        !cell.currentMonth ? "opacity-30" : ""
                      } ${
                        selected
                          ? isDark
                            ? "text-white font-semibold"
                            : "text-gray-900 font-semibold"
                          : isWeekend
                          ? "text-red-500"
                          : isDark
                          ? "text-gray-200"
                          : "text-gray-700"
                      } hover:opacity-80`}
                      style={selected ? { backgroundColor: isDark ? "#4b4f80" : "#c7cffa" } : undefined}
                    >
                      {cell.day}
                      {isToday && !selected && (
                        <span
                          className={`absolute bottom-0 h-1 w-1 rounded-full ${isDark ? "bg-gray-400" : "bg-gray-500"}`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "time" && (
            <div>
              <div className={`text-sm font-semibold mb-3 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                Set time
              </div>
              <div className="relative flex items-center justify-center">
                <div
                  className="pointer-events-none absolute left-0 right-0 border-y"
                  style={{ top: ITEM_HEIGHT, height: ITEM_HEIGHT, borderColor: isDark ? "#4b5563" : "#e5e7eb" }}
                />
                <WheelColumn values={hourValues} selected={hour12} onSelect={(v) => handleTimePartChange("hour", v as number)} isDark={isDark} />
                <div className="flex items-center" style={{ height: ITEM_HEIGHT * 3 }}>
                  <span className={`font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>:</span>
                </div>
                <WheelColumn values={minuteValues} selected={minute} onSelect={(v) => handleTimePartChange("minute", v as number)} isDark={isDark} />
                <div className="flex items-center" style={{ height: ITEM_HEIGHT * 3 }}>
                  <span className={`font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>:</span>
                </div>
                <WheelColumn values={secondValues} selected={second} onSelect={(v) => handleTimePartChange("second", v as number)} isDark={isDark} />
                <div style={{ width: 12 }} />
                <WheelColumn values={["AM", "PM"]} selected={ampm} onSelect={(v) => handleTimePartChange("ampm", v as "AM" | "PM")} isDark={isDark} width={36} />
              </div>
              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  onClick={() => setStep("date")}
                  className={`text-xs px-3 py-1 rounded ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("closed");
                    onBlur?.({} as React.FocusEvent<HTMLInputElement>);
                  }}
                  className="text-xs px-3 py-1 rounded text-white"
                  style={{ backgroundColor: branding?.selectionColor || "#6366f1" }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <CommonHeaderAndTooltip
      needTooltip={needTooltip}
      tooltipProps={tooltipProps}
      headerText={headerText}
      headerPosition={headerPosition}
      className={className}
      fillContainer={fillContainer}
      required={required}
    >
      {datePickerElement}
    </CommonHeaderAndTooltip>
  );
};
