import { useState, useEffect, useRef, useReducer } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/iconomotos.webp";
import ContactModal from "../ContactModal/ContactModal";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  {
    label: "Marcas",
    isDropdown: true,
    dropdownItems: [
      { label: "Bajaj", to: "/bajaj", color: "var(--mm-accent)" },
      { label: "Auteco", to: "/auteco", color: "var(--mm-accent-2)" },
    ],
  },
  { label: "Financiamiento", to: "/financiamiento" },
  { label: "Encuéntranos", to: "/#mapa", isHash: true },
  { label: "Nosotros", to: "/sobre-nosotros" },
  { label: "PQRSF", to: "/pqrs" },
];

const DESKTOP_BREAKPOINT = 992;

const mobileMenuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const initUiState = () => ({
  mobileOpen: false,
  windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
});

const uiReducer = (state, action) => {
  switch (action.type) {
    case "RESIZE":
      return {
        ...state,
        windowWidth: action.payload,
        mobileOpen: action.payload >= DESKTOP_BREAKPOINT ? false : state.mobileOpen,
      };

    case "TOGGLE_MOBILE":
      return { ...state, mobileOpen: !state.mobileOpen };

    case "CLOSE_MOBILE":
      return { ...state, mobileOpen: false };

    default:
      return state;
  }
};

const Navbar = () => {
  const { pathname } = useLocation();
  const [{ mobileOpen, windowWidth }, dispatch] = useReducer(
    uiReducer,
    null,
    initUiState
  );
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  const dropdownRef = useRef(null);

  /* Cierra el desplegable y el menú móvil al cambiar de ruta (incluido
     el botón "atrás" del navegador). Se ajusta durante el render en lugar
     de en un efecto para evitar renders en cascada. */
  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    if (dropdownOpen) setDropdownOpen(false);
    dispatch({ type: "CLOSE_MOBILE" });
  }

  /* Detectar scroll y resize */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () =>
      dispatch({ type: "RESIZE", payload: window.innerWidth });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Cerrar el desplegable al hacer click fuera o al pulsar Escape */
  useEffect(() => {
    if (!dropdownOpen) return undefined;

    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  /* Bloquear el scroll del body mientras el menú móvil está abierto */
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setDropdownOpen(false);
    dispatch({ type: "CLOSE_MOBILE" });
  };

  const isMobile = windowWidth < DESKTOP_BREAKPOINT;
  const linkClass = ({ isActive }) =>
    `mm-nav-link${isActive ? " mm-nav-link--active" : ""}`;

  return (
    <LazyMotion features={domAnimation}>
      <a className="mm-skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <nav
        className={`mm-navbar ${
          scrolled ? "mm-navbar--scrolled" : "mm-navbar--top"
        }`}
        aria-label="Navegación principal"
      >
        <Link to="/" className="mm-nav-logo" aria-label="MotoCenter — Inicio">
          <img src={logo} alt="MotoCenter" height="52" width="auto" />
        </Link>

        {/* Links desktop */}
        {!isMobile && (
          <ul className="mm-nav-links">
            {NAV_LINKS.map((link) => {
              if (link.isDropdown) {
                return (
                  <li key={link.label} className="mm-nav-item--dropdown" ref={dropdownRef}>
                    <button
                      type="button"
                      className={`mm-nav-link mm-nav-link--dropdown-toggle${
                        dropdownOpen ? " is-open" : ""
                      }`}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      aria-controls="marcas-menu"
                      onClick={() => setDropdownOpen((v) => !v)}
                    >
                      {link.label}
                      <span className="mm-nav-link__arrow" aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <m.ul
                          id="marcas-menu"
                          className="mm-nav-dropdown"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                          {link.dropdownItems.map((item) => (
                            <li key={item.label}>
                              <Link
                                to={item.to}
                                className="mm-nav-dropdown__item"
                                style={{ "--brand-color": item.color }}
                                onClick={closeAll}
                              >
                                <span
                                  className="mm-nav-dropdown__item-bar"
                                  aria-hidden="true"
                                />
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </m.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              /* Los enlaces con ancla (#) no deben marcarse como
                 "página activa": use Link para no duplicar el estado
                 activo de "Inicio". */
              if (link.isHash) {
                return (
                  <li key={link.label}>
                    <Link to={link.to} className="mm-nav-link" onClick={closeAll}>
                      {link.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={link.label}>
                  <NavLink to={link.to} className={linkClass} end={link.to === "/"}>
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}

        {/* CTA desktop */}
        {!isMobile && (
          <button
            type="button"
            className="mm-nav-cta"
            onClick={() => setContactModalOpen(true)}
          >
            Contáctanos
          </button>
        )}

        {/* Hamburger (móvil) */}
        <button
          type="button"
          className={`mm-nav-hamburger${mobileOpen ? " open" : ""}`}
          onClick={() => dispatch({ type: "TOGGLE_MOBILE" })}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span className="mm-nav-hamburger__bar" />
          <span className="mm-nav-hamburger__bar" />
          <span className="mm-nav-hamburger__bar" />
        </button>
      </nav>

      {/* Overlay + menú móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div
              className="mm-nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => dispatch({ type: "CLOSE_MOBILE" })}
            />

            <m.div
              id="mobile-menu"
              className="mm-nav-mobile"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mm-nav-mobile__container">
                <button
                  type="button"
                  className="mm-nav-mobile__close"
                  onClick={() => dispatch({ type: "CLOSE_MOBILE" })}
                  aria-label="Cerrar menú"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>

                <ul className="mm-nav-mobile__list">
                  {NAV_LINKS.flatMap((link) =>
                    link.isDropdown
                      ? link.dropdownItems.map((item) => (
                          <li key={item.label}>
                            <Link
                              to={item.to}
                              className="mm-nav-mobile__link"
                              onClick={closeAll}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))
                      : [
                          <li key={link.label}>
                            <Link
                              to={link.to}
                              className="mm-nav-mobile__link"
                              onClick={closeAll}
                            >
                              {link.label}
                            </Link>
                          </li>,
                        ]
                  )}
                </ul>

                <div className="mm-nav-mobile__footer">
                  <button
                    type="button"
                    className="mm-nav-mobile__link mm-nav-mobile__link--cta"
                    onClick={() => {
                      closeAll();
                      setContactModalOpen(true);
                    }}
                  >
                    Contáctanos
                  </button>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </LazyMotion>
  );
};

export default Navbar;
