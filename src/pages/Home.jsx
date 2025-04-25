import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className="name"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Shubham Ghag
      </motion.h1>
      
      <motion.div 
        className="title-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="title">Data Scientist & Data Analyst</h2>
        <p className="subtitle">Building intelligent systems that matter</p>
      </motion.div>
      
      <motion.p 
        className="background-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Background: Visualization of the Central Limit Theorem
      </motion.p>
    </motion.div>
  );
};

export default Home;