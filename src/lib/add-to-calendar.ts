import {
  getFestivalGoogleCalendarUrl,
  getFestivalIcsContent,
} from "@/lib/festival-event";

function isIOS(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/** Best add-to-calendar URL for the current device (labnol-style deep links). */
export function getFestivalCalendarUrl(): string {
  if (isIOS()) {
    // Opens Apple Calendar's add-event sheet without a file download.
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(getFestivalIcsContent())}`;
  }

  return getFestivalGoogleCalendarUrl();
}

export function addFestivalToCalendar(): void {
  const url = getFestivalCalendarUrl();

  if (url.startsWith("data:")) {
    window.location.assign(url);
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}
