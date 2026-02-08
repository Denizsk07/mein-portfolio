import React from "react";

const Banner = () => {
  return (
    <section id="contact" className="py-20 p-12 mt-20 mb-20 text-center">
      <div className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
         Wenn sie <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Interesse</span> haben mich zu kontaktieren.
        </h2>
        <p className="text-blue-200 mt-4 text-lg md:text-xl mb-8">
          drücken sie auf den unteren Knopf
        </p>
        <a
          href="mailto:deniz20070206@gmail.com"
          className="inline-block mt-6 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
        >
          Kontakt aufnehmen
        </a>
      </div>
    </section>
  );
};

export default Banner;
