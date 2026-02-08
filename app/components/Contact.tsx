import React from "react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative max-w-4xl mx-auto text-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-8 rounded-lg shadow-2xl my-20 animate-slide-up"
    >
      <div className="absolute inset-0 opacity-25 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}></div>
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-teal-400">
          Kontakt
        </h2>
        <p className="text-neutral-300 text-lg md:text-xl mb-4">
          Haben Sie Fragen oder möchten Sie ein Projekt besprechen? Kontaktieren
          Sie mich!
        </p>
        <a
          href="mailto:deniz20070206@gmail.com"
          className="mt-6 inline-block px-8 py-3 bg-teal-500 text-black font-bold rounded-full hover:bg-teal-600 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          E-Mail senden
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
