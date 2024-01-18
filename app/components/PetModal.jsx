import "react-calendar/dist/Calendar.css";

export default function PetModal({ onClose, isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={(event) => event.target === event.currentTarget && onClose()}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          width: "80%",
          margin: "auto",
          padding: 20,
          border: "2px solid #000",
          borderRadius: 10,
          boxShadow: "2px solid black",
          color: "black",
        }}
      >
        {children}
      </div>
    </div>
  );
}
