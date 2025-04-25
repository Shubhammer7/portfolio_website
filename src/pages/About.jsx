import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      className="page-container about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="content-card">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          About Me
        </motion.h1>
        
        <motion.div 
          className="about-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bio-section">
            <h2>Background</h2>
            <p>
            I'm a Data Scientist with extensive experience in developing machine learning solutions and optimizing data pipelines across diverse environments. 
            With expertise in Python, TensorFlow, PyTorch, and cloud technologies (AWS, GCP), I transform complex datasets into actionable insights that drive measurable business outcomes. 
            My work has reduced ETL latency by 75%, improved model accuracy to 85%, and decreased cloud computing costs by 25% through strategic optimizations.
            </p>
            <p>
            My approach combines technical expertise in predictive modeling and MLOps with strong collaborative skills, 
            allowing me to bridge the gap between data science and business objectives. From implementing recommendation engines handling 5K+ predictions per second to establishing scalable A/B testing frameworks that enhanced conversion rates by 18%, 
            I deliver solutions that create meaningful impact.
            </p>
          </div>
          
          <div className="skills-section">
            <h2>Skills & Expertise</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Programming</h3>
                <ul>
                  <li>Python</li>
                  <li>R</li>
                  <li>SQL</li>
                  <li>JavaScript</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3>Machine Learning</h3>
                <ul>
                  <li>Supervised Learning</li>
                  <li>Neural Networks</li>
                  <li>NLP</li>
                  <li>Computer Vision</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3>Tools & Frameworks</h3>
                <ul>
                  <li>TensorFlow</li>
                  <li>PyTorch</li>
                  <li>Scikit-learn</li>
                  <li>D3.js</li>
                </ul>
              </div>
              
              <div className="skill-category">
                <h3>Cloud & Big Data</h3>
                <ul>
                  <li>AWS</li>
                  <li>GCP</li>
                  <li>Spark</li>
                  <li>Hadoop</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="education-section">
            <h2>Education</h2>
            <div className="education-item">
              <h3>Master's in Applied Economics</h3>
              <p>University Of San Francisco, 2024</p>
            </div>
            
            <div className="education-item">
              <h3>Bachelor's in Economics</h3>
              <p>University of Mumbai, 2021</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;