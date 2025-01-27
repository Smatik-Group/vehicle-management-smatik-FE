import React from "react";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#001E3C] via-[#0A2540] to-[#12263F] text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-72 h-72 bg-blue-600 opacity-20 rounded-full blur-2xl animate-pulse delay-1500"></div>
        <div className="absolute bottom-20 left-28 w-80 h-80 bg-blue-800 opacity-30 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16">
        <div className="mb-12 text-center">
          <img
            src="/assets/carlano.svg"
            alt="Carlano Logo"
            className="h-24 mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg leading-tight">
            Willkommen bei <span className="text-[#175FFF]">Carlano</span>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Die ultimative interne Softwarelösung der <span className="font-semibold text-white">Smatik Group</span> – entwickelt für höchste Effizienz und Präzision.
          </p>
        </div>

        <section className="mt-16 max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-12">
            Carlano Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              {
                title: "Personenwagen",
                description:
                  "Effizientes und benutzerfreundliches Management Ihrer Fahrzeugflotte.",
              },
              {
                title: "Wohnmobile",
                description:
                  "Organisieren Sie Ihre Wohnmobile mit leistungsstarken Funktionen.",
              },
              {
                title: "Nutzfahrzeuge",
                description:
                  "Optimieren Sie Ihre gewerblichen Fahrzeugprozesse mit Leichtigkeit.",
              },
              {
                title: "Intuitive Benutzeroberfläche",
                description:
                  "Ein modernes und klares Dashboard für maximale Effizienz.",
              },
              {
                title: "Höchste Sicherheitsstandards",
                description:
                  "Ihre Daten werden mit modernsten Technologien geschützt.",
              },
              {
                title: "Interner Support",
                description:
                  "Direkte Unterstützung durch unser erfahrenes Team der Smatik Group.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/10 rounded-lg shadow-lg hover:scale-105 transform transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#175FFF] mb-6">
            Exklusiv entwickelt für den internen Gebrauch
          </h2>
          <p className="text-gray-300 text-lg md:text-xl">
            Carlano ist eine private Softwarelösung, maßgeschneidert für die Anforderungen der Smatik Group.
          </p>
        </section>

        <footer className="mt-16 text-gray-400 text-sm">
          <div className="flex flex-col items-center">
            <img
              src="/assets/smatik.svg"
              alt="Smatik Group Logo"
              className="h-12 mb-4"
            />
            <p>
              © 2025 Smatik Group - Alle Rechte vorbehalten. Entwickelt für den
              internen Gebrauch.
            </p>
            <p className="mt-2 font-semibold text-white">Powered by Smatik</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
