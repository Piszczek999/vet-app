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
      <div className="bg-gray-100 w-4/5 m-auto p-[20px] rounded-xl">
        {children}
      </div>
    </div>
  );
}
