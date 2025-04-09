import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      title: "Senior Data Scientist",
      company: "Tech Company",
      period: "2022 - Present",
      description: [
        "Led a team of 4 data scientists in developing machine learning models for customer behavior prediction, increasing conversion rates by 18%.",
        "Implemented a recommendation system using collaborative filtering that improved user engagement by 23%.",
        "Collaborated with product and engineering teams to integrate ML models into production systems."
      ],
      technologies: ["Python", "TensorFlow", "AWS", "SQL", "Docker"]
    },
    {
      title: "Data Scientist",
      company: "Data Analytics Inc.",
      period: "2020 - 2022",
      description: [
        "Developed predictive models using time series analysis for forecasting business metrics.",
        "Created data pipelines for automated data collection and preprocessing.",
        "Built interactive dashboards using D3.js for data visualization."
      ],
      technologies: ["Python", "Pandas", "Scikit-learn", "D3.js", "PostgreSQL"]
    },
    {
      title: "Machine Learning Intern",
      company: "AI Startup",
      period: "2019 - 2020",
      description: [
        "Implemented natural language processing algorithms for sentiment analysis.",
        "Assisted in developing computer vision models for object detection.",
        "Conducted research on state-of-the-art machine learning techniques."
      ],
      technologies: ["Python", "PyTorch", "NLTK", "OpenCV", "Jupyter"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="page-container experience-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="content-card">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h1>
        
        <motion.div 
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="experience-item"
              variants={itemVariants}
            >
              <div className="experience-header">
                <h2>{exp.title}</h2>
                <span className="experience-period">{exp.period}</span>
              </div>
              <h3 className="company-name">{exp.company}</h3>
              
              <ul className="experience-description">
                {exp.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              
              <div className="tech-stack">
                <h4>Technologies:</h4>
                <div className="tech-tags">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Experience;