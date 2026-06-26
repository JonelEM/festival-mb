export const festivalEvent = {
  title: "Festival Mariana Bracetti",
  month: 9,
  day: 24,
  startHour: 11,
  startMinute: 0,
  endHour: 22,
  endMinute: 0,
  timezone: "America/Puerto_Rico",
  location: "Calle Balseiro y Añasco, Comunidad Blondet, Río Piedras, PR",
  description:
    "Festival comunitario en Río Piedras. Entrada libre, todas las edades.",
  siteUrl: "https://JonelEM.github.io/festival-mb/",
} as const;

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** Next upcoming Sept 24 on or after today. */
export function getFestivalYear(reference = new Date()): number {
  const year = reference.getFullYear();
  const festivalDay = new Date(year, festivalEvent.month - 1, festivalEvent.day, 23, 59, 59);
  return reference <= festivalDay ? year : year + 1;
}

function formatLocalDateTime(year: number, hour: number, minute: number): string {
  return `${year}${pad(festivalEvent.month)}${pad(festivalEvent.day)}T${pad(hour)}${pad(minute)}00`;
}

function toUtcFromPuertoRico(localYmdHm: string): string {
  const match = localYmdHm.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})00$/);
  if (!match) {
    throw new Error("Invalid local date time");
  }

  const [, year, month, day, hour, minute] = match;
  const utc = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:00-04:00`,
  );

  return `${utc.getUTCFullYear()}${pad(utc.getUTCMonth() + 1)}${pad(utc.getUTCDate())}T${pad(utc.getUTCHours())}${pad(utc.getUTCMinutes())}${pad(utc.getUTCSeconds())}Z`;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function getFestivalGoogleCalendarUrl(year = getFestivalYear()): string {
  const start = toUtcFromPuertoRico(
    formatLocalDateTime(year, festivalEvent.startHour, festivalEvent.startMinute),
  );
  const end = toUtcFromPuertoRico(
    formatLocalDateTime(year, festivalEvent.endHour, festivalEvent.endMinute),
  );

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: festivalEvent.title,
    dates: `${start}/${end}`,
    details: `${festivalEvent.description}\n\n${festivalEvent.siteUrl}`,
    location: festivalEvent.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getFestivalIcsContent(year = getFestivalYear()): string {
  const start = formatLocalDateTime(
    year,
    festivalEvent.startHour,
    festivalEvent.startMinute,
  );
  const end = formatLocalDateTime(year, festivalEvent.endHour, festivalEvent.endMinute);
  const now = new Date();
  const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Festival Mariana Bracetti//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:America/Puerto_Rico",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0400",
    "TZNAME:AST",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:festival-mariana-bracetti-${year}@festival-mb`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${festivalEvent.timezone}:${start}`,
    `DTEND;TZID=${festivalEvent.timezone}:${end}`,
    `SUMMARY:${escapeIcsText(festivalEvent.title)}`,
    `DESCRIPTION:${escapeIcsText(festivalEvent.description)}`,
    `LOCATION:${escapeIcsText(festivalEvent.location)}`,
    `URL:${festivalEvent.siteUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
