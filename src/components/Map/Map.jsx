import { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { LazyMotion, domAnimation, m } from "framer-motion";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import "./Map.css";
import { STORES } from "../../data/storesData";
import { FaMapMarkerAlt, FaMotorcycle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SiWaze } from "react-icons/si";
import { renderToStaticMarkup } from "react-dom/server";

const CENTER = [4.6595, -74.08];

// Función para crear iconos de moto personalizados
const createCustomIcon = (name) => {
  const isAuteco = name.toUpperCase().includes("AUTECO");
  const color = isAuteco ? "#1B3A5E" : "#CC1F25";

  const iconMarkup = renderToStaticMarkup(
    <div
      style={{
        color: color,
        fontSize: "2rem",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
        transition: "transform 0.2s ease",
      }}
    >
      <FaMotorcycle />
    </div>,
  );

  return L.divIcon({
    html: iconMarkup,
    className: "custom-map-icon",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -40],
  });
};

// Función para abrir en Waze
const openWaze = (lat, lng, storeName) => {
  const wazeUrl = `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes&zoom=17&title=${encodeURIComponent(storeName)}`;
  window.open(wazeUrl, "_blank");
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const Map = () => {
  const [activeStore, setActiveStore] = useState(null);
  const mapRef = useRef(null);
  const markerRefs = useRef({});
  const sidebarRef = useRef(null);

  const scrollSidebar = (dir) => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
    }
  };

  const handleStoreClick = (store) => {
    setActiveStore(store.id);
    const map = mapRef.current;
    const marker = markerRefs.current[store.id];

    if (map && marker) {
      // Cerrar cualquier popup abierto previamente
      if (map._popup) {
        map.closePopup();
      }

      // Verificar si el marcador está en un cluster
      const isInCluster = marker._icon === null || marker.__parent;

      if (isInCluster) {
        // Si está en cluster, primero hacemos zoom al nivel del marcador
        const currentZoom = map.getZoom();
        const targetZoom = 16;

        if (currentZoom < targetZoom) {
          // Si el zoom actual es menor al deseado, hacemos zoom progresivo
          map.flyTo(store.position, targetZoom, {
            duration: 1,
            easeLinearity: 0.5,
          });

          // Esperar a que termine el zoom antes de abrir el popup
          setTimeout(() => {
            marker.openPopup();
          }, 1200);
        } else {
          // Si ya estamos en el zoom adecuado, solo movemos el mapa
          map.flyTo(store.position, currentZoom, { duration: 0.8 });
          setTimeout(() => {
            marker.openPopup();
          }, 900);
        }
      } else {
        // Si no está en cluster, comportamiento normal
        map.flyTo(store.position, 16, { duration: 1 });
        setTimeout(() => {
          marker.openPopup();
        }, 1000);
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="map-section">
        <m.h2
          className="section__title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Puntos <span>de Venta</span>
        </m.h2>
        {/* Sidebar */}
        <div className="map-wrapper">
          <div className="map-sidebar-wrapper">
            <button
              className="sidebar-arrow"
              onClick={() => scrollSidebar(-1)}
              aria-label="Anterior"
            >
              <FaChevronLeft />
            </button>

            <div className="map-sidebar" ref={sidebarRef}>
              <p className="sidebar-label">Selecciona una tienda</p>
              {STORES.map((store, i) => (
                <m.button
                  key={store.id}
                  className={`store-item ${activeStore === store.id ? "store-item--active" : ""}`}
                  onClick={() => handleStoreClick(store)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                >
                  <span className="store-icon">
                    <FaMotorcycle />
                  </span>
                  <div className="store-info">
                    <span className="store-name">{store.name}</span>
                    <span className="store-address">{store.address}</span>
                  </div>
                </m.button>
              ))}
            </div>

            <button
              className="sidebar-arrow"
              onClick={() => scrollSidebar(1)}
              aria-label="Siguiente"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Map */}
          <div className="map-container">
            <MapContainer
              center={CENTER}
              zoom={11}
              className="leaflet-map"
              scrollWheelZoom={false}
              ref={mapRef}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Configuración optimizada del cluster */}
              <MarkerClusterGroup
                chunkedLoading
                spiderfyOnMaxZoom={true}
                showCoverageOnHover={false}
                zoomToBoundsOnClick={false}
                disableClusteringAtZoom={15}
              >
                {STORES.map((store) => (
                  <Marker
                    key={store.id}
                    position={store.position}
                    icon={createCustomIcon(store.name)}
                    ref={(el) => {
                      if (el) markerRefs.current[store.id] = el;
                    }}
                  >
                    <Popup closeButton={true} autoPan={false} maxWidth={350}>
                      <div className="popup-content">
                        <h4>{store.name}</h4>
                        {store.image && (
                          <img
                            src={store.image}
                            alt={store.name}
                            className="popup-store-img"
                          />
                        )}
                        
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                            flexDirection: "column",
                          }}
                        >
                          <a
                            href={store.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="popup-link popup-link-directions"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                          >
                            <FaMapMarkerAlt /> Google Maps
                          </a>
                          <button
                            onClick={() =>
                              openWaze(
                                store.position[0],
                                store.position[1],
                                store.name,
                              )
                            }
                            className="popup-link popup-link-directions"
                            style={{
                              background: "#33ccff",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.background = "#29b3e6")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.background = "#33ccff")
                            }
                          >
                            <SiWaze /> Waze
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Map;
