const navLinks = [
  { href: "#programa", label: "Programa" },
  { href: "#faq", label: "Preguntas" },
  { href: "#auspiciadores", label: "Auspiciadores" },
  { href: "#apoya", label: "Apoya el festival" },
];

export function SiteHeader() {
  return (
    <header>
      <div className="header-inner">
        <div className="wordmark">
          Junta comunitaria de Río Piedras
        </div>
        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
