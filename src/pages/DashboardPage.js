import React from "react";
import { motion } from "framer-motion";

const DashboardPage = () => {
  return (
    <div className="p-6">
      <motion.div
        className="mb-6 bg-gradient-to-r from-[#175FFF] to-blue-600 p-6 rounded-lg shadow-lg text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">Willkommen zurück, Admin!</h1>
        <p className="mt-2 text-lg">Hier sind Ihre aktuellen Statistiken:</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="glass p-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold text-gray-300">Gesamtfahrzeuge</h2>
          <p className="text-4xl font-bold text-[#175FFF]">256</p>
        </motion.div>
        <motion.div
          className="glass p-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold text-gray-300">Neue Fahrzeuge</h2>
          <p className="text-4xl font-bold text-green-500">32</p>
        </motion.div>
        <motion.div
          className="glass p-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold text-gray-300">Benutzer</h2>
          <p className="text-4xl font-bold text-red-500">120</p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
