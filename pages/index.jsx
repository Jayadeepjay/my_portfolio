import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { personalData } from '../data/personaldata';
import { skillsData } from '../data/skillsdata';
import { certificatesData } from '../data/certificatesdata';
import { projectsData } from '../data/projectdata';
import ContactSection from './ContactSection';
import CertificateCard from '../components/CertificateCard';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position with smoother detection
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'knowledge', 'contact'];
      const scrollPosition = window.scrollY + 150; // Increased offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Use throttled scroll listener for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
        // Add custom easing for slower, more elegant scrolling
        duration: 2000 // This will be handled by CSS
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* Premium Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              {personalData.name.split(' ').map(name => name[0]).join('')}
            </span>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'certificates', label: 'Certificates' },
              { id: 'knowledge', label: 'Knowledge' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative group font-medium transition-colors ${
                  activeSection === item.id ? 'text-purple-400' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-purple-400 transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a 
              href={personalData.resumeUrl} 
              download
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-purple-500/25"
            >
              Download CV
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-12 md:mb-0"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {personalData.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-purple-300 mb-6">
              {personalData.role}
            </h2>
            <p className="text-lg mb-8 max-w-lg text-white/90">
              {personalData.summary}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:-translate-y-1 mr-4"
              >
                View Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border border-purple-400 hover:bg-purple-900/50 px-6 py-3 rounded-lg font-medium transition-all transform hover:-translate-y-1"
              >
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex space-x-6">
              {Object.entries(personalData.socialLinks).map(([platform, url]) => (
                <motion.a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all transform hover:-translate-y-1 backdrop-blur-sm"
                  aria-label={platform}
                >
                  {platform === 'github' && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {platform === 'linkedin' && (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/30"
          >
            <Image
              src="/profile/mypic.jpg"
              alt={personalData.name}
              width={320}
              height={320}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Who I Am</h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                {personalData.about}
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <span className="font-medium mr-2 text-gray-900 dark:text-white">Location:</span>
                  <span className="text-gray-700 dark:text-gray-300">{personalData.address}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2 text-gray-900 dark:text-white">Email:</span>
                  <span className="text-gray-700 dark:text-gray-300">{personalData.email}</span>
                </div>
                <div className="flex">
                  <span className="font-medium mr-2 text-gray-900 dark:text-white">Phone:</span>
                  <span className="text-gray-700 dark:text-gray-300">{personalData.phone}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl max-h-96 overflow-y-auto custom-scrollbar-section">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">🚀 My Journey</h3>
                <div className="space-y-6">
                  {/* Education */}
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-1">🎓 Education</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2022 - 2026</p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">B.Tech in Computer Science & Engineering (AI & ML)</p>
                    <p className="text-gray-700 dark:text-gray-300">Siddharth Institute of Engineering & Technology</p>
                  </div>
                  {/* Internships */}
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-1">💻 Internships</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      <li><span className="font-medium">Jan 2024</span> – Python Django Internship at Assistive</li>
                      <li><span className="font-medium">2024</span> – Internship at Vault of Codes (AI/ML & Coding Practices)</li>
                    </ul>
                  </div>
                  {/* Hackathons */}
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-1">🏆 Hackathons</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      <li><span className="font-medium">Mar 2025</span> – Participated in Siddharth HackFest 2K25 organized by Microsoft Learn Student Chapter</li>
                    </ul>
                  </div>
                  {/* Certifications */}
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-1">📜 Certifications (Highlights)</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      <li>Artificial Intelligence – Great Learning</li>
                      <li>Python for Beginners – Great Learning</li>
                      <li>The Joy of Computing using Python – NPTEL (IIT Madras)</li>
                      <li>Java for Beginners – Udemy</li>
                      <li>Psychological Aspects of Game Design – edX (LCI Education)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          >
            My Skills
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Technical Skills</h3>
              
              {Object.entries(skillsData).map(([category, skills]) => {
                if (category === 'softSkills') return null;
                
                return (
                  <div key={category} className="mb-3">
                    <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white capitalize">
                      {category.replace(/([A-Z])/g, ' $1')}
                    </h4>
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block px-5 py-2 mb-2 mr-2 rounded-full relative overflow-hidden text-white font-bold shadow-lg border-2 border-transparent bg-gradient-to-r from-purple-500/80 via-indigo-500/80 to-blue-500/80 backdrop-blur-lg text-sm cursor-default transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
                        style={{
                          boxShadow: '0 4px 24px 0 rgba(99,102,241,0.18), 0 2px 8px 0 rgba(167,139,250,0.12)'
                        }}
                      >
                        <span className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-500 opacity-40 blur-lg group-hover:opacity-70 transition-all"></span>
                        <span className="relative z-10 drop-shadow-[0_1.5px_4px_rgba(167,139,250,0.25)]">
                          {skill.name}
                        </span>
                        <style jsx>{`
                          .animate-gradient-move {
                            background-size: 200% 200%;
                            animation: gradientMove 3s linear infinite;
                          }
                          @keyframes gradientMove {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                          }
                        `}</style>
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skillsData.softSkills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="inline-block px-5 py-2 mb-2 mr-2 rounded-full relative overflow-hidden text-white font-bold shadow-lg border-2 border-transparent bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-indigo-500/80 backdrop-blur-lg text-sm cursor-default transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
                    style={{
                      boxShadow: '0 4px 24px 0 rgba(236,72,153,0.15), 0 2px 8px 0 rgba(139,92,246,0.10)'
                    }}
                  >
                    <span className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 opacity-40 blur-lg group-hover:opacity-70 transition-all"></span>
                    <span className="relative z-10 drop-shadow-[0_1.5px_4px_rgba(167,139,250,0.25)]">
                      {skill}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
  <section id="projects" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          >
            My Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-purple-100 dark:border-gray-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight leading-snug drop-shadow-sm">{project.title}</h3>
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed font-medium">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 text-purple-700 dark:text-purple-200 shadow-sm border border-purple-200 dark:border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* View Project button removed as per request */}
                  <div className="flex space-x-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 flex items-center"
                      >
                        <span className="mr-1">📁</span>
                        Code
                      </a>
                    )}
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 flex items-center"
                      >
                        <span className="mr-1">🌐</span>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Project Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={800}
                height={600}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
  <section id="certificates" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          >
            My Certificates
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {certificatesData.map((certificate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-purple-100 dark:border-gray-700 hover:shadow-2xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-400/10 to-indigo-400/10 group-hover:bg-gradient-to-br group-hover:from-purple-400/20 group-hover:via-blue-400/20 group-hover:to-indigo-400/20 transition-colors" />
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-white tracking-tight leading-snug">{certificate.title}</h3>
                  <div className="flex justify-between text-xs md:text-sm text-purple-200 mb-1 font-semibold">
                    <span>{certificate.issuer}</span>
                    <span>{certificate.date}</span>
                  </div>
                  <p className="text-gray-200 mb-2 text-sm md:text-base leading-relaxed">{certificate.description}</p>
                  <motion.button
                    onClick={() => setSelectedCertificate(certificate)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 flex items-center font-medium transition-colors"
                  >
                    <span className="mr-1">📁</span>
                    View Certificate
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Section */}
      {/* Knowledge Section */}
      <section id="knowledge" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white"
          >
            My Knowledge
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Technical Expertise Ladder (vertical scrollable) */}
            <div className="md:w-1/2 max-h-[420px] overflow-y-auto custom-scrollbar-section pr-2">
              {/* Technical Expertise Heading */}
              <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-6 text-center md:text-left w-full">Technical Expertise</h3>
              <div className="relative h-full flex flex-col items-center">
                {/* Central river/ladder line - connect all items */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-indigo-400 rounded-full opacity-70 -translate-x-1/2 z-0" style={{ minHeight: '100%', height: '100%', pointerEvents: 'none' }}></div>
                <div className="space-y-12 pt-2 w-full">
                  {[
                    { label: 'Frontend Development', icon: '🖥️', desc: 'Building beautiful, responsive UIs', side: 'left' },
                    { label: 'Backend Development', icon: '🛠️', desc: 'Robust server-side logic & APIs', side: 'right' },
                    { label: 'Database', icon: '🗄️', desc: 'Efficient data storage & management', side: 'left' },
                    { label: 'Cloud', icon: '☁️', desc: 'Deploying scalable cloud solutions', side: 'right' },
                    { label: 'AI & ML', icon: '🤖', desc: 'Artificial Intelligence & Machine Learning', side: 'left' },
                    { label: 'NLP & AI Apps', icon: '🗣️', desc: 'Natural Language Processing & AI-powered apps', side: 'right' },
                    { label: 'Full-stack + AI', icon: '🧑‍💻', desc: 'Full-stack apps with AI integration', side: 'left' },
                    { label: 'Innovative AI Tools', icon: '🛠️', desc: 'Creating innovative AI solutions', side: 'right' },
                  ].map((item, idx, arr) => (
                    <div key={item.label} className={`flex w-full items-center justify-${item.side === 'left' ? 'start' : 'end'} relative`} style={{ minHeight: 80 }}>
                      {/* Vertical line segment connecting this dot to the next (except for last item) */}
                      {idx < arr.length - 1 && (
                        <span className="absolute left-1/2 top-1/2 w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-indigo-400 opacity-70 -translate-x-1/2 z-0" style={{ height: '100%', top: '50%' }}></span>
                      )}
                      {/* Vertical line segment connecting previous dot to this one (except for first item) */}
                      {idx > 0 && (
                        <span className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-purple-400 via-blue-400 to-indigo-400 opacity-70 -translate-x-1/2 z-0" style={{ height: '50%' }}></span>
                      )}
                      <div className={`w-1/2 ${item.side === 'left' ? 'pr-8' : 'pl-8'} flex ${item.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.08 }}
                          viewport={{ once: true }}
                          className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-6 py-4 flex flex-col items-start gap-2 border border-purple-100 dark:border-gray-700 relative z-10"
                        >
                          <span className="text-2xl mb-1">{item.icon}</span>
                          <span className="font-bold text-gray-900 dark:text-white text-lg">{item.label}</span>
                          <span className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</span>
                        </motion.div>
                      </div>
                      {/* Dot on the river/ladder */}
                      <span className="absolute left-1/2 top-1/2 w-5 h-5 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 rounded-full border-4 border-white dark:border-gray-900 shadow-lg -translate-x-1/2 -translate-y-1/2 z-20"></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right: Areas of Interest Card */}
            <div className="md:w-1/2 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full max-w-md relative rounded-3xl p-1 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 shadow-2xl"
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl px-8 py-7 border border-purple-200 dark:border-gray-800 relative overflow-hidden">
                  {/* Decorative floating shapes */}
                  <span className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-400/30 via-indigo-400/20 to-blue-400/10 rounded-full blur-2xl z-0"></span>
                  <span className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tr from-blue-400/20 via-purple-400/10 to-indigo-400/30 rounded-full blur-2xl z-0"></span>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="block text-4xl mb-2 animate-bounce-slow">🚀</span>
                    <span className="block font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 text-center mb-4 tracking-wide drop-shadow-lg">Areas of Interest</span>
                    <ul className="w-full flex flex-col gap-3 mt-2">
                      <li className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-blue-50/40 dark:from-purple-900/40 dark:via-indigo-900/30 dark:to-blue-900/20 shadow-sm border border-purple-100 dark:border-gray-800">
                        <span className="text-xl">🤖</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">Artificial Intelligence & Machine Learning</span>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-blue-50/40 dark:from-purple-900/40 dark:via-indigo-900/30 dark:to-blue-900/20 shadow-sm border border-purple-100 dark:border-gray-800">
                        <span className="text-xl">🗣️</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">Natural Language Processing (NLP) & AI-Powered Applications</span>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-blue-50/40 dark:from-purple-900/40 dark:via-indigo-900/30 dark:to-blue-900/20 shadow-sm border border-purple-100 dark:border-gray-800">
                        <span className="text-xl">☁️</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">Cloud-Based Scalable Applications</span>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-blue-50/40 dark:from-purple-900/40 dark:via-indigo-900/30 dark:to-blue-900/20 shadow-sm border border-purple-100 dark:border-gray-800">
                        <span className="text-xl">🧑‍💻</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">Full-stack apps with AI integration</span>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-50/80 via-indigo-50/60 to-blue-50/40 dark:from-purple-900/40 dark:via-indigo-900/30 dark:to-blue-900/20 shadow-sm border border-purple-100 dark:border-gray-800">
                        <span className="text-xl">🛠️</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">Innovative AI Tools & Solutions</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <style jsx>{`
                  .animate-bounce-slow {
                    animation: bounce-slow 2.5s infinite;
                  }
                  @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                  }
                `}</style>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

  {/* ...existing code... */}

  {/* Contact Section */}
  <ContactSection />
  {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">{personalData.name}</p>
              <p className="text-gray-400">{personalData.role}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © {currentYear} {personalData.name}. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Designed and developed with ❤️
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCertificate(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                width={800}
                height={600}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}