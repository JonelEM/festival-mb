import {
  getFestivalGoogleCalendarUrl,
  getFestivalIcsContent,
} from "@/lib/festival-event";

function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}

export function addFestivalToCalendar(): void {
  if (isAndroid()) {
    window.open(getFestivalGoogleCalendarUrl(), "_blank", "noopener,noreferrer");
    return;
  }

  const blob = new Blob([getFestivalIcsContent()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "festival-mariana-bracetti.ics";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
