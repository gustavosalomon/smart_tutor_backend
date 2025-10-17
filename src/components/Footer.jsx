export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-6 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-center gap-3 px-4 text-center">
        {/* 🔹 Logo centrado */}
        <img
          src="/logoipf.png" // 👈 asegurate que el logo esté en /public/logoipf.png
          alt="Smart Tutor Logo"
          className="h-12 w-auto"
        />

        {/* 🔹 Nombre del proyecto */}
        <span className="text-lg font-semibold" style={{ color: "#049c04" }}>
        
        </span>

        {/* 🔹 Texto de copyright */}
        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "#049c04", fontWeight: "600" }}>Smart Tutor</span>. Desarrollado por <span style={{ color: "#049c04", fontWeight: "600" }}>TELECO 2025.</span>
        </div>
      </div>
    </footer>
  );
}
