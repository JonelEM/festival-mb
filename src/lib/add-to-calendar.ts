import {
  getFestivalGoogleCalendarUrl,
  getFestivalIcsContent,
} from "@/lib/festival-event";

function isIOS(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isIOSSafari(): boolean {
  return isIOS() && !/CriOS|FxiOS|EdgiOS/i.test(navigator.userAgent);
}

/** Google Calendar compose URL (labnol-style deep link). */
export function getFestivalCalendarUrl(): string {
  return getFestivalGoogleCalendarUrl();
}

function openFestivalIcsInAppleCalendar(): void {
  const ics = getFestivalIcsContent();
  const dataUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(ics)}`;

  // Mobile Safari opens the "Add to Calendar" sheet from a new tab.
  // location.assign() navigates the page away; download forces a file save.
  window.open(dataUrl, "_blank", "noopener,noreferrer");
}

export function addFestivalToCalendar(): void {
  if (isIOSSafari()) {
    openFestivalIcsInAppleCalendar();
    return;
  }

  if (isIOS()) {
    // Chrome/Firefox on iOS cannot import ICS into Apple Calendar reliably.
    window.open(getFestivalGoogleCalendarUrl(), "_blank", "noopener,noreferrer");
    return;
  }

  window.open(getFestivalCalendarUrl(), "_blank", "noopener,noreferrer");
}
