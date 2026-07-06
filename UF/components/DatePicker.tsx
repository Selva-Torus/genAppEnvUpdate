"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGlobal } from "@/context/GlobalContext";
import { Tooltip } from "./Tooltip";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { CommonHeaderAndTooltip } from "./CommonHeaderAndTooltip";
import { useInfoMsg } from "@/app/components/infoMsgHandler";

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
  dateValidation?: "Future" | "FutureOrPresent" | "PastOrPresent" | "Past";
  fillContainer?: boolean;
  contentAlign?: ContentAlign;
  required?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
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
  dateValidation
}) => {
  const { theme, direction, branding, displayFormat } = useGlobal();
  const showToast = useInfoMsg();
  const prevValidationState = useRef(validationState);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  useEffect(() => {
    if (validationState === "invalid" && errorMessage && prevValidationState.current !== "invalid") {
      showToast(errorMessage, "danger");
    }
    prevValidationState.current = validationState;
  }, [validationState, errorMessage, showToast]);

  useEffect(() => {
    if (!isModalOpen) return;
    const rafId = requestAnimationFrame(function tick() {
      if (modalRef.current && wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        modalRef.current.style.top = (rect.bottom + 4) + 'px';
        modalRef.current.style.left = rect.left + 'px';
        modalRef.current.style.width = rect.width + 'px';
      }
      requestAnimationFrame(tick);
    });
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) &&
          wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const getDateString = (val: string | Date | null): string => {
    if (!val) return "";
    if (val instanceof Date) return val.toISOString().split("T")[0];
    if (typeof val === "string") {
      try {
        const date = new Date(val);
        return date.toISOString().split("T")[0];
      } catch {
        return val;
      }
    }
    return "";
  };

  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return "";

    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;

    const [year, month, day] = parts;

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);

    const shortMonths = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const fullMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const weekdays = [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    const date = new Date(Number(year), m - 1, d);

    switch (
      displayFormat?.datePickerProperty?.dateDisplayFormat || "DD-MM-YYYY"
    ) {
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;

      case "DD-MM-YYYY":
        return `${day}-${month}-${year}`;

      case "MM-DD-YYYY":
        return `${month}-${day}-${year}`;

      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;

      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;

      case "YYYY/MM/DD":
        return `${year}/${month}/${day}`;

      case "DD.MM.YYYY":
        return `${day}.${month}.${year}`;

      case "D MMM YYYY":
        return `${d} ${shortMonths[m - 1]} ${year}`;

      case "MMM D, YYYY":
        return `${shortMonths[m - 1]} ${d}, ${year}`;

      case "MMMM D, YYYY":
        return `${fullMonths[m - 1]} ${d}, ${year}`;

      case "D MMMM YYYY":
        return `${d} ${fullMonths[m - 1]} ${year}`;

      case "ddd, D MMM YYYY":
        return `${weekdays[date.getDay()]}, ${d} ${shortMonths[m - 1]} ${year}`;

      case "d,M,yyyy":
        return `${d},${m},${year}`;

      default:
        return `${year}-${month}-${day}`;
    }
  };

  const [dateValue, setDateValue] = useState(getDateString(value));

  useEffect(() => {
    setDateValue(getDateString(value));
  }, [value]);

  const handleSelect = (newValue: string) => {
    setDateValue(newValue);
    onChange?.(newValue);
    onUpdate?.(newValue);
    setIsModalOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateValue("");
    onChange?.("");
    onUpdate?.("");
    setIsModalOpen(false);
  };

  const openPicker = () => {
    if (disabled || readOnly) return;
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }
    if (dateValue) {
      const parts = dateValue.split("-");
      setViewDate({ year: parseInt(parts[0]), month: parseInt(parts[1]) - 1 });
    } else {
      const now = new Date();
      setViewDate({ year: now.getFullYear(), month: now.getMonth() });
    }
    setIsModalOpen(true);
  };

  const setBorderColor = (color: string) => {
    if (wrapperRef.current) wrapperRef.current.style.borderColor = color;
  };

  const getContentAlignClasses = () => {
    switch (contentAlign) {
      case "left":   return "justify-start";
      case "right":  return "justify-end";
      default:       return "justify-center";
    }
  };

  const getTodayStr = () => new Date().toISOString().split("T")[0];

  const getOffsetDateStr = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
  };

  const getMinDate = () => dateValidation === "Future"
    ? getOffsetDateStr(1)
    : dateValidation === "FutureOrPresent"
      ? getTodayStr()
      : undefined;

  const getMaxDate = () => dateValidation === "Past"
    ? getOffsetDateStr(-1)
    : dateValidation === "PastOrPresent"
      ? getTodayStr()
      : undefined;

  const isDateDisabled = (dateStr: string): boolean => {
    const min = getMinDate();
    const max = getMaxDate();
    if (min && dateStr < min) return true;
    if (max && dateStr > max) return true;
    return false;
  };

  const isDark = theme === "dark" || theme === "dark-hc";

  const buildCalendarDays = () => {
    const { year, month } = viewDate;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  const prevMonth = () => {
    setViewDate(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { ...prev, month: prev.month - 1 };
    });
  };

  const nextMonth = () => {
    setViewDate(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { ...prev, month: prev.month + 1 };
    });
  };

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const todayStr = getTodayStr();
  const calendarDays = buildCalendarDays();
  const isRtl = direction === "RTL";

  const datePickerElement = (
    <div
      className={`flex flex-col ${getContentAlignClasses()} ${fillContainer ? "w-full h-full" : ""} overflow-hidden`}
      style={style}
    >
      {label && (
        <label className={`${getContentAlignClasses()} block mb-2 font-medium flex-shrink-0 ${isDark ? "text-gray-200" : "text-gray-700"} ${className}`}>
          {label}
        </label>
      )}

      <div
        ref={wrapperRef}
        onClick={openPicker}
        className={`
          relative flex-1 min-h-0 flex items-center
          border-2 px-2
          ${disabled ? "opacity-50 cursor-not-allowed" : readOnly ? "cursor-default" : "cursor-pointer"}
          ${validationState === "invalid" ? "border-red-500" : isDark ? "border-gray-600" : "border-gray-300"}
          ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
          ${fillContainer ? "w-full h-full" : ""}
          ${getContentAlignClasses()}
          transition-colors
          ${className}
        `}
        style={{ borderRadius: "var(--border-radius)", overflow: "hidden" }}
        onMouseEnter={() => {
          if (!disabled && !readOnly && validationState !== "invalid") setBorderColor(branding.hoverColor);
        }}
        onMouseLeave={() => {
          if (!disabled && !readOnly && validationState !== "invalid") setBorderColor("");
        }}
      >
        <span className={`pointer-events-none select-none flex-1 ${!dateValue ? (isDark ? "text-gray-500" : "text-gray-400") : ""}`}>
          {dateValue ? formatDateDisplay(dateValue) : (displayFormat?.datePickerProperty?.dateDisplayFormat||"DD-MM-YYYY").toLowerCase()}
        </span>

        <svg className="w-4 h-4 opacity-50 flex-shrink-0 ml-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
        </svg>
      </div>

      {isModalOpen && createPortal(
        <>
          <style>{`
            .datepicker-popup {
              animation: datepickerSlideDown 0.2s ease-out;
              transform-origin: top;
            }
            @keyframes datepickerSlideDown {
              from { opacity: 0; transform: translateY(-8px) scaleY(0.95); }
              to { opacity: 1; transform: translateY(0) scaleY(1); }
            }
          `}</style>
          <div
            ref={modalRef}
            className="datepicker-popup fixed z-50 rounded-lg shadow-2xl overflow-hidden"
            style={{
              backgroundColor: branding.brandColor,
              color: "#FFFFFF",
              maxHeight: "50vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-semibold">Select Date</span>
              <button onClick={handleClear} className="text-xs underline hover:opacity-70 transition-opacity" style={{ color: "#FFFFFF" }}>
                Clear
              </button>
            </div>
            <div className="px-3 pb-3">
              <div className="flex items-center justify-between py-1">
                <button onClick={prevMonth} className="p-1 hover:opacity-70 transition-opacity" style={{ color: "#FFFFFF" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points={isRtl ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
                  </svg>
                </button>
                <span className="font-semibold text-xs">{MONTH_NAMES[viewDate.month]} {viewDate.year}</span>
                <button onClick={nextMonth} className="p-1 hover:opacity-70 transition-opacity" style={{ color: "#FFFFFF" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points={isRtl ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-x-1 pb-1">
                {DAY_NAMES.map(name => (
                  <div key={name} className="text-center text-xs font-medium py-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {name}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-x-1 gap-y-1">
                {calendarDays.map((day, i) => {
                  if (day === null) return <div key={`empty-${i}`} />;
                  const dateStr = `${viewDate.year}-${pad(viewDate.month + 1)}-${pad(day)}`;
                  const isSelected = dateStr === dateValue;
                  const isToday = dateStr === todayStr;
                  const disabledDay = isDateDisabled(dateStr);
                  return (
                    <button
                      key={dateStr}
                      disabled={disabledDay}
                      onClick={() => handleSelect(dateStr)}
                      className={`text-xs rounded-full w-8 h-8 flex items-center justify-center mx-auto transition-all duration-150 ${disabledDay ? "opacity-30 cursor-not-allowed" : "hover:opacity-80"} ${isSelected ? "font-bold" : ""}`}
                      style={{
                        backgroundColor: isSelected ? "rgba(255,255,255,0.3)" : "transparent",
                        color: "#FFFFFF",
                        border: isToday && !isSelected ? "1px solid rgba(255,255,255,0.5)" : "none",
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>,
        document.body
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
