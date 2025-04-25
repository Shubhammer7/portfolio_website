import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const projects = [
    {
      title: "Movie Recommendation System (myfoodisgettingcold)",
      description: "Developed a machine learning system to predict equipment failures before they occur, reducing downtime by 35%.",
      category: "machine-learning",
      technologies: ["Python", "Scikit-learn", "NearestNeighbors", "Azure"]
    },
    {
      title: "Customer Segmentation Analysis",
      description: "Created a clustering algorithm to identify distinct customer segments for targeted marketing campaigns.",
      category: "data-analysis",
      technologies: ["Python", "Scikit-learn", "K-means", "Tableau"]
    },
    {
      title: "Natural Language Processing Chatbot",
      description: "Built an NLP-powered chatbot for customer support that handles over 80% of routine inquiries.",
      category: "nlp",
      technologies: ["Python", "BERT", "Flask", "React"]
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Designed and implemented a real-time dashboard for monitoring business KPIs and system performance.",
      category: "dashboards",
      technologies: ["D3.js", "React", "Node.js", "WebSockets"]
    },
    {
      title: "Recommendation Engine",
      description: "Developed a collaborative filtering recommendation system for an e-commerce platform.",
      category: "machine-learning",
      technologies: ["Python", "PySpark", "ALS Algorithm", "Redis"]
    },
    {
      title: "Anomaly Detection System",
      description: "Built a system to detect unusual patterns in financial transactions, flagging potential fraud cases.",
      category: "data-analysis",
      technologies: ["Python", "Isolation Forest", "Kafka", "ElasticSearch"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'machine-learning', name: 'Machine Learning' },
    { id: 'data-analysis', name: 'Data Analysis' },
    { id: 'nlp', name: 'NLP' },
    { id: 'dashboards', name: 'Dashboards' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="page-container projects-container"
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
          Projects
        </motion.h1>
        
        <motion.div 
          className="category-filter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={index} 
              className="project-card"
              variants={itemVariants}
            >
              <div className="project-image">
                {/* Placeholder image using div instead of img to avoid 404 errors */}
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  fontSize: '0.9rem'
                }}>
                  {project.title.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
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

export default Projects;