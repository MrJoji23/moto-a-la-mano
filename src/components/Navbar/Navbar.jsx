import { useState, useEffect, useRef, useReducer} from "react";
import { Link, useNavigate } from "react-router-dom";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/iconomotos.webp";
import ContactModal from "../ContactModal/ContactModal";
import "./Navbar.css";

// ── Scroll suave a sección (solo si ya estás en "/") ──
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const NAV_LINKS = [
  { label: "Inicio", to: "/", isScrollToTop: true },
  {
    label: "Marcas",
    isDropdown: true,
    dropdownItems: [
      { label: "Bajaj", to: "/bajaj" },
      { label: "Auteco", to: "/auteco" },
    ],
  },
  { label: "Financiamiento", to: "/financiamiento" },
  { label: "ENCUÉNTRANOS", to: "/#mapa", sectionId: "mapa" },
  { label: "NOSOTROS", to: "/sobre-nosotros" },
  { label: "PQRSF", to: "/pqrs" },
];

const HOVER_COLORS = ["#CC1F25", "#1B3A5E"];

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
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
        mobileOpen: action.payload >= 992 ? false : state.mobileOpen,
      };
 
    // Abre o cierra el menú hamburguesa
    case "TOGGLE_MOBILE":
      return { ...state, mobileOpen: !state.mobileOpen };
 
    // Cierra el menú hamburguesa 
    case "CLOSE_MOBILE":
      return { ...state, mobileOpen: false };
 
    default:
      return state;
  }
};

const Navbar = () => {
  const [{mobileOpen, windowWidth}, dispatch] = useReducer(
    uiReducer,
    null,
    initUiState
  );
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Detectar scroll y resize de ventana
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => {
      dispatch({ type: "RESIZE", payload: window.innerWidth});
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Cerrar menú móvil al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileOpen && !e.target.closest(".mm-navbar")) {
        dispatch({type: "CLOSE_MOBILE"});
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileOpen]);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // ── Manejador central para links con sección ──
  const handleNavClick = (e, { sectionId, isScrollToTop }) => {
    if (isScrollToTop) {
      e.preventDefault();
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (sectionId) {
      e.preventDefault();
      if (window.location.pathname === "/") {
        scrollToSection(sectionId);
      } else {
        navigate("/");
        setTimeout(() => scrollToSection(sectionId), 100);
      }
    }
  };

// antes de navegar/scrollear, evitando que el layout shift cancele el scroll
  const handleMobileNavClick = (e, link) => {
    e.preventDefault();
    dispatch({type: "CLOSE_MOBILE"});
    setTimeout(() => {
      if (link.isScrollToTop) {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (link.sectionId) {
        if (window.location.pathname === "/") {
          scrollToSection(link.sectionId);
        } else {
          navigate("/");
          setTimeout(() => scrollToSection(link.sectionId), 100);
        }
      } else {
        navigate(link.to);
      }
    }, 350);
  };

  const isMobile = windowWidth < 992;

  return (
    <LazyMotion features={domAnimation}>
      <>
        <nav
          className={`mm-navbar ${scrolled ? "mm-navbar--scrolled" : "mm-navbar--top"}`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="mm-nav-logo"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
              dispatch({type: "CLOSE_MOBILE"});
            }}
          >
            <img src={logo} alt="MegaMoto Group" />
          </Link>

          {/* ── Links desktop ── */}
          {!isMobile && (
            <ul className="mm-nav-links">
              {NAV_LINKS.map((link, i) => {
                // Dropdown "Marcas"
                if (link.isDropdown) {
                  return (
                    <li
                      key={link.label}
                      className="mm-nav-item--dropdown"
                      ref={dropdownRef}
                    >
                      <button
                        className={`mm-nav-link mm-nav-link--dropdown-toggle ${dropdownOpen ? "is-open" : ""}`}
                        onClick={() => setDropdownOpen((v) => !v)}
                        style={{
                          "--hover-color": HOVER_COLORS[i % HOVER_COLORS.length],
                        }}
                        aria-expanded={dropdownOpen}
                      >
                        {link.label}
                        <span className="mm-nav-link__arrow" aria-hidden="true" />
                      </button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <m.ul
                            className="mm-nav-dropdown"
                            initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.94 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            style={{ transformOrigin: "top center" }}
                          >
                            {link.dropdownItems.map((item) => (
                              <li key={item.label}>
                                <Link
                                  to={item.to}
                                  className="mm-nav-dropdown__item"
                                  onClick={(e) => {
                                    setDropdownOpen(false);
                                    handleNavClick(e, item);
                                  }}
                                  style={{
                                    "--hover-color":
                                      item.label.toLowerCase() === "bajaj"
                                        ? HOVER_COLORS[0]
                                        : HOVER_COLORS[1],
                                  }}
                                >
                                  <span className="mm-nav-dropdown__item-bar" />
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

                // Link normal
                return (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="mm-nav-link"
                      style={{
                        "--hover-color": HOVER_COLORS[i % HOVER_COLORS.length],
                      }}
                      onClick={(e) => handleNavClick(e, link)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* CTA Desktop */}
          {!isMobile && (
            <m.button
              className="mm-nav-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setContactModalOpen(true)}
            >
              Contáctanos
            </m.button>
          )}

          {/* ── Hamburger (móvil) ── */}
          <button
            className={`mm-nav-hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => dispatch({type: "TOGGLE_MOBILE"})}
            aria-label="Menú"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* ── Overlay y menú móvil (fuera del nav para evitar clipping) ── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Overlay oscuro detrás del menú */}
              <m.div
                className="mm-nav-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => dispatch({type: "CLOSE_MOBILE"})}
              />

              <m.div
                className="mm-nav-mobile"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mm-nav-mobile__container">
                  {/* Botón de cerrar */}
                  <button
                    className="mm-nav-mobile__close"
                    onClick={() => dispatch({type: "CLOSE_MOBILE"})}
                    aria-label="Cerrar menú"
                  >
                    <span>×</span>
                  </button>

                  {NAV_LINKS.map((link, i) => {
                    // Si es dropdown, renderizar cada item por separado
                    if (link.isDropdown) {
                      return link.dropdownItems.map((item, j) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="mm-nav-mobile__link"
                          style={{
                            "--hover-color":
                              HOVER_COLORS[(i + j) % HOVER_COLORS.length],
                          }}
                          onClick={(e) => {
                            handleMobileNavClick(e, item);
                          }}
                        >
                          {item.label}
                        </Link>
                      ));
                    }

                    // Link normal
                    return (
                      <Link
                        key={link.label}
                        to={link.to}
                        className="mm-nav-mobile__link"
                        style={{
                          "--hover-color": HOVER_COLORS[i % HOVER_COLORS.length],
                        }}
                        onClick={(e) => {
                          handleMobileNavClick(e, link);
                        }}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <button
                    className="mm-nav-mobile__link mm-nav-mobile__link--cta"
                    onClick={() => {
                      dispatch({type: "CLOSE_MOBILE"});
                      setContactModalOpen(true);
                    }}
                  >
                    Contáctanos
                  </button>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>

        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
      </>
    </LazyMotion>
  );
};

export default Navbar;
