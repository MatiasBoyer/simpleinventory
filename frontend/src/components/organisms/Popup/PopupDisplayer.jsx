import React, { useEffect, useState, useCallback } from 'react';
import Popup from './Popup';

export default function PopupDisplayer() {
  const [popups, setPopups] = useState([]);

  // Handler for popup:add event
  const handlePopup = useCallback((e) => {
    const { children, title, onAccept, onCancel } = e.detail;
    setPopups((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        children,
        title,
        onAccept,
        onCancel,
      },
    ]);
  }, []);

  useEffect(() => {
    document.addEventListener('popup:add', handlePopup);
    return () => {
      document.removeEventListener('popup:add', handlePopup);
    };
  }, [handlePopup]);

  const closePopup = (id) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
        popups.length > 0 ? 'opacity-100 z-[9999]' : 'opacity-0 -z-[9999]'
      }`}
      style={{ pointerEvents: popups.length > 0 ? 'auto' : 'none' }}
    >
      {popups.map((popup) => (
        <Popup
          key={popup.id}
          title={popup.title}
          onAccept={() => {
            const popupDiv = document.querySelector(
              `[data-popup-id='${popup.id}']`
            );
            let values = {};
            if (popupDiv) {
              const inputs = popupDiv.querySelectorAll('input[id]');
              inputs.forEach((input) => {
                values[input.id] = input.value;
              });
            }
            if (typeof popup.onAccept === 'function') popup.onAccept(values);
            closePopup(popup.id);
          }}
          onCancel={() => {
            const popupDiv = document.querySelector(
              `[data-popup-id='${popup.id}']`
            );
            let values = {};
            if (popupDiv) {
              const inputs = popupDiv.querySelectorAll('input[id]');
              inputs.forEach((input) => {
                values[input.id] = input.value;
              });
            }
            if (typeof popup.onCancel === 'function') popup.onCancel(values);
            closePopup(popup.id);
          }}
        >
          <div data-popup-id={popup.id}>{popup.children}</div>
        </Popup>
      ))}
    </div>
  );
}
