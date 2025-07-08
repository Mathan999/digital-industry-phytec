import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const DigitalFactory = () => {
  // State management
  const [activePopup, setActivePopup] = useState(null);
  const [activeTab, setActiveTab] = useState('assessment');
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [progress, setProgress] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Popup data
  const popups = {
    competitive: {
      title: '🎯 Competitive Differentiation',
      text: 'In today\'s hyper-competitive manufacturing landscape, differentiation is not just an advantage—it\'s survival...',
      stats: [
        { number: '40%', label: 'Faster Time-to-Market' },
        { number: '25%', label: 'Quality Improvement' },
        { number: '60%', label: 'Customization Capability' },
      ],
    },
    operational: {
      title: '💰 Operational Excellence',
      text: 'Operational excellence through digital transformation delivers measurable cost reductions...',
      stats: [
        { number: '20-40%', label: 'Cost Reduction' },
        { number: '50%', label: 'Waste Reduction' },
        { number: '35%', label: 'Efficiency Gain' },
      ],
    },
    sustainability: {
      title: '🌱 Sustainability Leadership',
      text: 'Environmental responsibility is no longer optional—it\'s a business imperative...',
      stats: [
        { number: '30%', label: 'Energy Savings' },
        { number: '45%', label: 'Waste Reduction' },
        { number: '25%', label: 'Carbon Footprint Reduction' },
      ],
    },
    'supply-chain': {
      title: '🛡️ Supply Chain Resilience',
      text: 'Recent global disruptions have highlighted the critical importance of supply chain resilience...',
      stats: [
        { number: '70%', label: 'Faster Recovery' },
        { number: '40%', label: 'Inventory Optimization' },
        { number: '85%', label: 'Visibility Improvement' },
      ],
    },
    oee: {
      title: '📊 OEE Improvement',
      text: 'Overall Equipment Effectiveness (OEE) is the gold standard for measuring manufacturing productivity...',
      stats: [
        { number: '85%', label: 'Average OEE' },
        { number: '95%', label: 'Availability' },
        { number: '98%', label: 'Performance Rate' },
      ],
    },
    downtime: {
      title: '⚡ Downtime Reduction',
      text: 'Unplanned downtime is the enemy of manufacturing efficiency...',
      stats: [
        { number: '60%', label: 'Downtime Reduction' },
        { number: '80%', label: 'Predictive Accuracy' },
        { number: '45%', label: 'Maintenance Cost Savings' },
      ],
    },
    quality: {
      title: '🏆 Quality Enhancement',
      text: 'Quality is the cornerstone of manufacturing excellence...',
      stats: [
        { number: '45%', label: 'Quality Improvement' },
        { number: '70%', label: 'Defect Reduction' },
        { number: '90%', label: 'First Pass Yield' },
      ],
    },
    energy: {
      title: '🔋 Energy Savings',
      text: 'Energy efficiency is both an environmental imperative and a significant cost-saving opportunity...',
      stats: [
        { number: '30%', label: 'Energy Reduction' },
        { number: '25%', label: 'Peak Demand Reduction' },
        { number: '40%', label: 'Utility Cost Savings' },
      ],
    },
  };

  // Solutions modal data
  const solutions = {
    manufacturing: {
      title: 'Smart Manufacturing Platform',
      subtitle: 'Intelligent production systems for Industry 4.0',
      icon: '🏭',
      iconClass: 'manufacturing',
      features: [
        'Real-time production monitoring and control',
        'Predictive maintenance and quality assurance',
        'Automated workflow optimization',
        'Integration with existing ERP systems',
        'Advanced machine learning algorithms for efficiency',
      ],
    },
    analytics: {
      title: 'Industrial Analytics Suite',
      subtitle: 'Data-driven insights for manufacturing excellence',
      icon: '📊',
      iconClass: 'analytics',
      features: [
        'Advanced data visualization and reporting',
        'Real-time KPI monitoring and alerts',
        'Predictive analytics for demand forecasting',
        'Custom dashboard creation tools',
        'Multi-source data integration capabilities',
      ],
    },
    iot: {
      title: 'IIoT Connectivity Solutions',
      subtitle: 'Seamless industrial IoT integration',
      icon: '🌐',
      iconClass: 'iot',
      features: [
        'Seamless device connectivity and management',
        'Edge computing capabilities',
        'Secure data transmission protocols',
        'Scalable network architecture',
        'Remote monitoring and diagnostics',
      ],
    },
    ai: {
      title: 'AI-Powered Automation',
      subtitle: 'Intelligent automation solutions',
      icon: '🤖',
      iconClass: 'ai',
      features: [
        'Intelligent process automation',
        'Machine learning model deployment',
        'Adaptive control systems',
        'Anomaly detection and prevention',
        'Continuous learning and optimization',
      ],
    },
    consulting: {
      title: 'Transformation Consulting',
      subtitle: 'Expert advisory on digital transformation',
      icon: '👥',
      iconClass: 'consulting',
      features: [
        'Maturity assessment',
        'Tech roadmap',
        'Change management',
        'ROI optimization',
        'Training programs',
        'Improvement strategies',
      ],
    },
    integration: {
      title: 'System Integration Services',
      subtitle: 'Comprehensive system integration',
      icon: '⚙️',
      iconClass: 'integration',
      features: [
        'Legacy system modernization',
        'API development and management',
        'Cloud migration services',
        'Data synchronization solutions',
        'Custom integration development',
      ],
    },
  };

  // Slideshow data
  const slides = [
    {
      industry: 'Automotive Manufacturing',
      subtitle: 'Smart assembly lines, quality control systems, predictive maintenance for automotive OEMs',
      icon: '🏭',
      features: [
        { icon: '📊', text: 'Real-time production monitoring' },
        { icon: '🤖', text: 'AI-powered quality inspection' },
        { icon: '🔧', text: 'Predictive maintenance systems' },
        { icon: '🚚', text: 'Supply chain optimization' },
      ],
    },
    {
      industry: 'Medical and Healthcare',
      subtitle: 'Advanced medical devices, patient monitoring systems, telemedicine solutions',
      icon: '🏥',
      features: [
        { icon: '💊', text: 'Smart medical device integration' },
        { icon: '📱', text: 'Remote patient monitoring' },
        { icon: '🧬', text: 'AI-driven diagnostics' },
        { icon: '🔒', text: 'HIPAA compliant data security' },
      ],
    },
    {
      industry: 'Energy & Utilities',
      subtitle: 'Smart grid solutions, renewable energy management, efficient power distribution',
      icon: '⚡',
      features: [
        { icon: '🌿', text: 'Renewable energy optimization' },
        { icon: '📈', text: 'Smart grid analytics' },
        { icon: '🔋', text: 'Energy storage management' },
        { icon: '🏠', text: 'Smart home integration' },
      ],
    },
    {
      industry: 'Smart Agriculture',
      subtitle: 'Precision farming, crop monitoring, automated irrigation systems for sustainable agriculture',
      icon: '🌱',
      features: [
        { icon: '🛰️', text: 'Satellite crop monitoring' },
        { icon: '💧', text: 'Precision irrigation systems' },
        { icon: '🌡️', text: 'Environmental sensors' },
        { icon: '📊', text: 'Yield prediction analytics' },
      ],
    },
  ];

  // Handle popup open/close
  const openPopup = (id) => {
    setActivePopup(id);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setActivePopup(null);
    document.body.style.overflow = '';
  };

  // Handle tab switching
  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  // Slideshow functionality
  const totalSlides = slides.length;

  const showSlide = (n) => {
    let index = n;
    if (n > totalSlides) index = 1;
    if (n < 1) index = totalSlides;
    setCurrentSlide(index);
  };

  const changeSlide = (n) => {
    showSlide(currentSlide + n);
    if (isAutoSliding) {
      resetAutoSlide();
    }
  };

  const currentSlideSelect = (n) => {
    showSlide(n);
    if (isAutoSliding) {
      resetAutoSlide();
    }
  };

  const resetAutoSlide = () => {
    setProgress(0);
  };

  const toggleAutoSlide = () => {
    setIsAutoSliding(!isAutoSliding);
  };

  // Auto-slide and progress bar
  useEffect(() => {
    let autoSlideInterval;
    let progressInterval;

    if (isAutoSliding) {
      autoSlideInterval = setInterval(() => {
        setCurrentSlide((prev) => {
          const next = prev + 1 > totalSlides ? 1 : prev + 1;
          return next;
        });
      }, 5000);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (100 / (5000 / 50));
          if (next >= 100) return 0;
          return next;
        });
      }, 50);
    }

    return () => {
      clearInterval(autoSlideInterval);
      clearInterval(progressInterval);
    };
  }, [isAutoSliding]);

  // Handle modal
  const openModal = (type) => {
    setModalData(solutions[type]);
  };

  const closeModal = () => {
    setModalData(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will get back to you soon.');
    e.target.reset();
  };

  // Touch support for slideshow
  const handleTouchStart = (e) => {
    setTouchStart(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].screenX);
    if (touchEnd < touchStart - 50) changeSlide(1); // Swipe left
    if (touchEnd > touchStart + 50) changeSlide(-1); // Swipe right
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/K6NvqTqHcGA?autoplay=1&mute=1&controls=0&loop=1&playlist=K6NvqTqHcGA&modestbranding=1&showinfo=0"
            title="The Digital Factory - Video Background"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="floating-elements absolute inset-0 pointer-events-none">
          {['⚙️', '🤖', '📊', '🔧', '💡', '⚡', '🔬', '🏭', '📡'].map((icon, index) => (
            <motion.div
              key={index}
              className="floating-icon absolute text-2xl sm:text-3xl md:text-4xl text-white/50"
              style={{ left: `${10 * (index + 1)}%` }}
              initial={{ y: 0 }}
              animate={{ y: [-20, 0, -20] }}
              transition={{ repeat: Infinity, duration: 3, delay: index * 0.5 }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Digital Factory
          </motion.h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-3xl mx-auto opacity-90">
            Empowering Manufacturing Through Intelligent Automation, Predictive Insights, and Human Collaboration
          </p>
          <div className="industry-transition max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-6 rounded-3xl border-2 border-white/30">
            <div className="transition-text text-lg sm:text-xl font-bold text-emerald-300 uppercase mb-4">
              The Manufacturing Evolution Pathway
            </div>
            <div className="version-flow flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4">
              <div className="version-box bg-white/15 p-4 rounded-xl border-2 border-white/20 text-center min-w-[180px]">
                Industry 4.0<br />
                <small className="text-sm">Smart Automation</small>
              </div>
              <div className="arrow text-2xl sm:text-3xl text-emerald-400 animate-pulse">→</div>
              <div className="version-box highlight bg-emerald-400/30 p-4 rounded-xl border-2 border-emerald-400 shadow-lg shadow-emerald-400/50 text-center min-w-[180px] scale-105">
                Industry 5.0<br />
                <small className="text-sm">Human-Centric Intelligence</small>
              </div>
            </div>
            <p className="text-base sm:text-lg text-white/90">
              From connected machines to collaborative ecosystems where humans and AI work together to create sustainable, resilient manufacturing
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#what-is" className="btn bg-emerald-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 hover:text-white shadow-md">
              Discover Digital Factory
            </a>
            <a href="#solutions" className="btn btn-secondary border-2 border-emerald-400 text-emerald-400 px-6 py-3 rounded-full font-semibold hover:bg-emerald-400 hover:text-black">
              Explore Solutions
            </a>
          </div>
        </div>
      </section>

      {/* What is Digital Factory Section */}
      <section id="what-is" className="section py-12 sm:py-16 px-4 bg-white rounded-3xl shadow-2xl max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600 text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What is Digital Factory?
        </motion.h2>
        <p className="section-subtitle text-base sm:text-lg text-teal-700 text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          A comprehensive ecosystem that transforms traditional manufacturing through intelligent integration of digital technologies, real-time data analytics, and advanced automation systems
        </p>
        <div className="what-is-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: '🏭',
              title: 'Physical Layer',
              desc: 'Smart machines, industrial sensors, collaborative robots, and automated systems working in harmony with skilled human operators to create adaptive production environments.',
              className: 'physical',
            },
            {
              icon: '💾',
              title: 'Digital Layer',
              desc: 'Real-time data collection, cloud computing, edge processing, digital twin technologies, and comprehensive connectivity infrastructure enabling seamless information flow.',
              className: 'digital',
            },
            {
              icon: '🧠',
              title: 'Intelligence Layer',
              desc: 'AI-powered analytics, machine learning algorithms, predictive maintenance, autonomous decision-making, and continuous optimization driving operational excellence.',
              className: 'intelligence',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`layer-card ${item.className} p-6 bg-cover bg-center rounded-2xl border-4 hover:shadow-2xl hover:shadow-emerald-400/20 hover:-translate-y-2 transition-all duration-400`}
              style={{ backgroundImage: `url(${item.className === 'physical' ? 'https://images.unsplash.com/photo-1518709268805-4e9042af2176' : item.className === 'digital' ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' : 'https://images.unsplash.com/photo-1555255707-c07966088b7b'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={`layer-title ${item.className} text-lg sm:text-xl font-bold flex items-center gap-4 mb-4`} style={{ color: item.className === 'physical' ? '#008542' : item.className === 'digital' ? '#003d7a' : '#00a651' }}>
                <span className="text-3xl">{item.icon}</span> {item.title}
              </div>
              <p className="text-sm sm:text-base text-black">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="core-components mt-8 sm:mt-12 bg-gradient-to-br from-blue-50 to-blue-100 p-6 sm:p-8 rounded-3xl border-4 border-blue-400 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80')] bg-cover bg-center opacity-10"></div>
          <h3 className="text-xl sm:text-2xl font-bold text-blue-800 text-center mb-6 sm:mb-8 relative z-10">
            Digital Factory Core Technologies
          </h3>
          <div className="components-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { icon: '📊', title: 'Time Series Analytics', desc: 'Real-time industrial data processing' },
              { icon: '🔄', title: 'Digital Twins', desc: 'Virtual factory simulation & optimization' },
              { icon: '🤖', title: 'AI Integration', desc: 'Machine learning & predictive intelligence' },
              { icon: '🌐', title: 'IIoT Ecosystem', desc: 'Connected industrial devices & sensors' },
              { icon: '⚡', title: 'Edge Computing', desc: 'Low-latency processing & control' },
              { icon: '🔒', title: 'Cybersecurity', desc: 'Industrial network protection' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="component-item text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="component-icon text-3xl sm:text-4xl mb-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-400">
                  {item.icon}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-blue-800">{item.title}</h4>
                <p className="text-xs sm:text-sm text-blue-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Digital Factory Section */}
      <section className="why-section py-12 sm:py-16 px-4 bg-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="container max-w-7xl mx-auto text-center relative z-10">
          <motion.h2
            className="topics-title text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Digital Factory?
          </motion.h2>
          <p className="section-subtitle text-base sm:text-lg text-teal-700 mb-8 sm:mb-12 max-w-3xl mx-auto">
            The compelling business case for digital transformation in manufacturing
          </p>
          <div className="topics-section mb-12">
            <h3 className="topics-title text-xl sm:text-2xl font-bold text-emerald-600 mb-6 sm:mb-8">Strategic Business Imperatives</h3>
            <div className="topics-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: '🎯', title: 'Competitive Differentiation', popup: 'competitive', bg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
                { icon: '💰', title: 'Operational Excellence', popup: 'operational', bg: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40' },
                { icon: '🌱', title: 'Sustainability Leadership', popup: 'sustainability', bg: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9' },
                { icon: '🛡️', title: 'Supply Chain Resilience', popup: 'supply-chain', bg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="topic-card bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-xl hover:border-emerald-600 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  onClick={() => openPopup(item.popup)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="absolute inset-0 bg-cover bg-center opacity-10 hover:opacity-20 transition-opacity duration-300" style={{ backgroundImage: `url(${item.bg})` }}></div>
                  <div className="topic-icon text-4xl mb-4">{item.icon}</div>
                  <h4 className="topic-title text-base sm:text-lg font-bold text-gray-800">{item.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="roi-section bg-gray-50 p-6 rounded-2xl relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-5"></div>
            <h3 className="roi-title text-xl sm:text-2xl font-bold text-emerald-600 mb-6 sm:mb-8 relative z-10">
              Transformation ROI Metrics
            </h3>
            <div className="roi-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { number: '85%', label: 'OEE Improvement', popup: 'oee' },
                { number: '60%', label: 'Downtime Reduction', popup: 'downtime' },
                { number: '45%', label: 'Quality Enhancement', popup: 'quality' },
                { number: '30%', label: 'Energy Savings', popup: 'energy' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="roi-metric bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md hover:shadow-xl hover:border-emerald-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => openPopup(item.popup)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="roi-number text-2xl sm:text-3xl font-bold text-emerald-600">{item.number}</div>
                  <div className="roi-label text-base sm:text-lg text-gray-800">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Popups */}
        <AnimatePresence>
          {activePopup && (
            <motion.div
              className="popup fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="popup-content bg-white p-6 sm:p-8 rounded-2xl border-2 border-emerald-600 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="popup-close absolute top-4 right-4 text-2xl text-emerald-600 hover:text-red-500 transition-colors"
                  onClick={closePopup}
                >
                  ×
                </button>
                <h3 className="popup-title text-lg sm:text-xl font-bold text-gray-800 mb-4">{popups[activePopup].title}</h3>
                <p className="popup-text text-sm sm:text-base text-gray-600 mb-4">{popups[activePopup].text}</p>
                <div className="popup-stats grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {popups[activePopup].stats.map((stat, index) => (
                    <div key={index} className="popup-stat text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="popup-stat-number text-xl sm:text-2xl font-bold text-emerald-600">{stat.number}</div>
                      <div className="popup-stat-label text-xs sm:text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* How Digital Factory Works Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="header h1 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How Digital Factory Works
          </motion.h2>
          <div className="tabs-container bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="tab-navigation flex flex-col sm:flex-row bg-gray-50 border-b border-gray-200">
              {[
                { name: 'assessment', label: 'Assessment & Planning' },
                { name: 'design', label: 'Design & Validation' },
                { name: 'implementation', label: 'Implementation & Integration' },
                { name: 'optimization', label: 'Optimization & Evolution' },
              ].map((tab, index) => (
                <button
                  key={index}
                  className={`tab-button flex-1 p-4 sm:p-5 text-sm sm:text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 relative transition-all duration-300 ${activeTab === tab.name ? 'active bg-white text-blue-600 shadow-md' : ''}`}
                  onClick={() => openTab(tab.name)}
                >
                  {tab.label}
                  <span className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 ${activeTab === tab.name ? 'w-full' : 'w-0'}`}></span>
                </button>
              ))}
            </div>
            <div className="tab-content p-6 sm:p-8">
              {[
                {
                  id: 'assessment',
                  icon: '🔍',
                  title: 'Assessment & Planning',
                  text: 'We analyze your current digital maturity and create a strategic roadmap for transformation...',
                  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                },
                {
                  id: 'design',
                  icon: '⚙️',
                  title: 'Design & Validation',
                  text: 'We create robust system architectures and validate solutions through pilot projects...',
                  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                },
                {
                  id: 'implementation',
                  icon: '🚀',
                  title: 'Implementation & Integration',
                  text: 'Our phased deployment approach integrates IIoT sensors, MES, ERP, and SCADA systems seamlessly...',
                  image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                },
                {
                  id: 'optimization',
                  icon: '📊',
                  title: 'Optimization & Evolution',
                  text: 'We deploy advanced analytics and AI models for continuous improvement and predictive maintenance...',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                },
              ].map((tab, index) => (
                <motion.div
                  key={index}
                  className={`content-wrapper grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center ${activeTab === tab.id ? 'tab-content active' : 'hidden'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: activeTab === tab.id ? 1 : 0, y: activeTab === tab.id ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="content-image relative rounded-lg overflow-hidden shadow-xl hover:scale-102 transition-transform duration-300 order-2 md:order-1">
                    <img src={tab.image} alt={tab.title} className="w-full h-48 sm:h-64 object-cover" />
                    <div className="image-overlay absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-700/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="content-text p-4 sm:p-6 order-1 md:order-2">
                    <div className="phase-icon text-3xl sm:text-4xl mb-4 animate-bounce">{tab.icon}</div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">{tab.title}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{tab.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem & Partners Section */}
      <section id="ecosystem" className="ecosystem-section py-12 sm:py-16 px-4 bg-emerald-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80')] bg-cover bg-center opacity-3"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2
            className="partner-heading text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technical Ecosystem & Strategic Partners
          </motion.h2>
          <p className="text-base sm:text-lg text-black mb-8 sm:mb-12 max-w-3xl mx-auto">
            Powered by embedded expertise and strategic industry collaborations
          </p>
          <h3 className="partner-title text-xl sm:text-2xl font-bold text-emerald-800 mb-6 sm:mb-8 flex items-center justify-center gap-4">
            <span>🤝</span> Core Technology Partners
          </h3>
        <div className="partner-carousel overflow-hidden relative">
  <div className="carousel-track flex animate-[scroll_40s_linear_infinite]">
    {[
      { logo: 'https://dummyimage.com/200x60/3d9b35/ffffff&text=PHYTEC', name: 'PHYTEC India', desc: 'Embedded Platforms & SOMs' },
      { logo: 'https://dummyimage.com/200x60/006065/ffffff&text=Siemens', name: 'Siemens', desc: 'Industrial Automation' },
      { logo: 'https://dummyimage.com/200x60/0098a1/ffffff&text=Azure', name: 'Microsoft Azure', desc: 'IoT & AI Cloud Platform' },
      { logo: 'https://dummyimage.com/200x60/3d9b35/ffffff&text=Schneider', name: 'Schneider Electric', desc: 'Energy Management' },
      { logo: 'https://dummyimage.com/200x60/006065/ffffff&text=Rockwell', name: 'Rockwell Automation', desc: 'Factory Automation' },
      { logo: 'https://dummyimage.com/200x60/0098a1/ffffff&text=PTC', name: 'PTC ThingWorx', desc: 'Digital Twin Platform' },
    ].concat([
      { logo: 'https://dummyimage.com/200x60/3d9b35/ffffff&text=PHYTEC', name: 'PHYTEC India', desc: 'Embedded Platforms & SOMs' },
      { logo: 'https://dummyimage.com/200x60/006065/ffffff&text=Siemens', name: 'Siemens', desc: 'Industrial Automation' },
      { logo: 'https://dummyimage.com/200x60/0098a1/ffffff&text=Azure', name: 'Microsoft Azure', desc: 'IoT & AI Cloud Platform' },
      { logo: 'https://dummyimage.com/200x60/3d9b35/ffffff&text=Schneider', name: 'Schneider Electric', desc: 'Energy Management' },
      { logo: 'https://dummyimage.com/200x60/006065/ffffff&text=Rockwell', name: 'Rockwell Automation', desc: 'Factory Automation' },
      { logo: 'https://dummyimage.com/200x60/0098a1/ffffff&text=PTC', name: 'PTC ThingWorx', desc: 'Digital Twin Platform' },
    ]).map((partner, index) => (
      <motion.div
        key={index}
        className="carousel-item flex-shrink-0 w-48 sm:w-60 text-center p-4"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <img src={partner.logo} alt={partner.name} className="w-full h-12 sm:h-16 object-contain mb-2 border-2 border-teal-500 bg-white" />
        <h4 className="text-base sm:text-lg font-bold text-emerald-600">{partner.name}</h4>
        <p className="text-xs sm:text-sm text-teal-800">{partner.desc}</p>
      </motion.div>
    ))}
  </div>
</div>
          <div
            className="slideshow-container mt-8 sm:mt-12 relative h-screen flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className={`slide absolute w-full h-full ${currentSlide === index + 1 ? 'active' : ''}`}
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(${
                    index === 0 ? 'https://maycointernational.com/wp-content/uploads/2020/07/how-are-cars-made-1536x1008.jpeg' :
                    index === 1 ? 'https://img.freepik.com/free-photo/3d-coronavirus-vaccine_23-2148963960.jpg' :
                    index === 2 ? 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e' :
                    'https://www-cdn.djiits.com/dps/2604ab4bda369c026b4d94a48d43d9d9.jpg'
                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === index + 1 ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="slide-header bg-emerald-500/85 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center shadow-xl border-b-4 border-white/30 relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMTAgMEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                  <div className="header-content relative z-10 text-center">
                    <div className="company-logo w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 text-2xl backdrop-blur-lg border-2 border-white/30">{slide.icon}</div>
                    <h2 className="slide-title text-2xl sm:text-3xl md:text-4xl font-bold text-white text-shadow-lg">Industry Collaborations</h2>
                  </div>
                </div>
                <div className="slide-content p-8 sm:p-12 flex flex-col items-center justify-center text-center h-[calc(100vh-140px)]">
                  <h3 className="industry-title text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-shadow-xl">{slide.industry}</h3>
                  <p className="industry-subtitle text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-3xl text-shadow-md">{slide.subtitle}</p>
                  <div className="features-grid grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full">
                    {slide.features.map((feat, idx) => (
                      <div key={idx} className="feature-card bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-white/40 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-500/50 transition-all duration-400 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="feature-icon text-3xl sm:text-4xl mb-4 relative z-10 transition-transform duration-300">{feat.icon}</div>
                        <div className="feature-text text-base sm:text-lg font-semibold text-gray-800 relative z-10">{feat.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="nav-container absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-5 z-20">
              <button
                className="nav-button w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500/90 backdrop-blur-lg rounded-full text-white text-xl sm:text-2xl flex items-center justify-center border-2 border-white/30 shadow-xl hover:bg-emerald-600/90 hover:scale-110 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:hover:bg-emerald-500/90 disabled:hover:scale-100"
                onClick={() => changeSlide(-1)}
                disabled={currentSlide === 1}
              >
                ←
              </button>
              <div className="slide-indicator bg-white/95 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-3xl text-sm sm:text-base font-semibold text-gray-700 border border-white/30 shadow-lg">{`${currentSlide} / ${totalSlides}`}</div>
              <button
                className="nav-button w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500/90 backdrop-blur-lg rounded-full text-white text-xl sm:text-2xl flex items-center justify-center border-2 border-white/30 shadow-xl hover:bg-emerald-600/90 hover:scale-110 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:hover:bg-emerald-500/90 disabled:hover:scale-100"
                onClick={() => changeSlide(1)}
                disabled={currentSlide === totalSlides}
              >
                →
              </button>
              <button
                className="control-button w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500/90 backdrop-blur-lg rounded-full text-white text-lg sm:text-xl flex items-center justify-center border-2 border-white/30 shadow-xl hover:bg-emerald-600/90 hover:scale-110 hover:shadow-2xl transition-all duration-300"
                onClick={toggleAutoSlide}
              >
                {isAutoSliding ? '⏸️' : '▶️'}
              </button>
            </div>
            <div className="dots-container absolute top-1/2 right-5 sm:right-8 -translate-y-1/2 flex flex-col gap-4">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`dot w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/40 border-2 border-white/60 cursor-pointer transition-all duration-300 ${currentSlide === index + 1 ? 'active bg-emerald-500/90 border-emerald-600 scale-125 shadow-md shadow-emerald-500/50' : 'hover:bg-emerald-500/70 hover:border-emerald-500/90 hover:scale-110'}`}
                  onClick={() => currentSlideSelect(index + 1)}
                />
              ))}
            </div>
            <div className="progress-bar absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <motion.div
                className="progress-fill h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-12 sm:py-16 px-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2339&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Digital Transformation Timeline
          </motion.h2>
          <p className="text-base sm:text-lg text-black mb-8 sm:mb-12 max-w-3xl mx-auto">
            A proven roadmap for successful digital factory implementation
          </p>
          <div className="timeline-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: '🔍',
                phase: 'Discovery',
                duration: '3-6 months',
                text: 'Digital maturity assessment, technology audit, stakeholder alignment, and strategic roadmap development',
                borderColor: 'border-blue-500',
                textColor: 'text-blue-800',
                bg: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
              },
              {
                icon: '🏗️',
                phase: 'Foundation',
                duration: '6-12 months',
                text: 'Infrastructure setup, pilot implementation, system integration, and workforce training programs',
                borderColor: 'border-emerald-500',
                textColor: 'text-emerald-800',
                bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176',
              },
              {
                icon: '⚡',
                phase: 'Acceleration',
                duration: '12-18 months',
                text: 'Full-scale deployment, advanced analytics implementation, process optimization, and performance monitoring',
                borderColor: 'border-blue-400',
                textColor: 'text-blue-600',
                bg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
              },
              {
                icon: '🚀',
                phase: 'Innovation',
                duration: '18+ months',
                text: 'AI/ML deployment, autonomous operations, continuous innovation, and Industry 5.0 readiness',
                borderColor: 'border-amber-500',
                textColor: 'text-amber-600',
                bg: 'https://images.unsplash.com/photo-1555255707-c07966088b7b',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item p-6 bg-white rounded-2xl border-4 ${item.borderColor} hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="absolute inset-0 bg-cover bg-center opacity-8" style={{ backgroundImage: `url(${item.bg})` }}></div>
                <div className="timeline-icon text-3xl sm:text-4xl mb-4 relative z-10">{item.icon}</div>
                <h3 className={`timeline-phase text-base sm:text-lg font-bold ${item.textColor} mb-2 relative z-10`}>{item.phase}</h3>
                <p className="text-sm sm:text-base text-black mb-2 relative z-10">{item.duration}</p>
                <p className="text-xs sm:text-sm text-black relative z-10">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="hero py-12 sm:py-16 px-4 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="solutions max-w-7xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-800 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Digital Factory Solutions
          </motion.h2>
          <p className="text-base sm:text-lg text-black mb-8 sm:mb-12 max-w-3xl mx-auto">
            Comprehensive offerings designed to accelerate your digital transformation journey
          </p>
          <div className="solutions-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Object.keys(solutions).map((key, index) => (
              <motion.div
                key={index}
                className="solution-card bg-white/5 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-400/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden"
                onMouseEnter={() => openModal(key)}
                onMouseLeave={closeModal}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent left-[-100%] hover:left-[100%] transition-all duration-500"></div>
                <div className={`solution-icon w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl text-white animate-[float_3s_ease-in-out_infinite] ${solutions[key].iconClass} ${index === 1 ? 'delay-500' : index === 2 ? 'delay-1000' : index === 3 ? 'delay-1500' : index === 4 ? 'delay-2000' : index === 5 ? 'delay-2500' : ''}`}>
                  {solutions[key].icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-black hover:text-emerald-500 transition-colors">{solutions[key].title}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {modalData && (
            <motion.div
              className="modal fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.target === e.currentTarget && closeModal()}
            >
              <motion.div
                className="modal-content bg-white p-6 sm:p-8 rounded-2xl max-w-lg w-full relative shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="close absolute top-5 right-5 text-2xl text-gray-400 hover:text-gray-800 transition-colors"
                  onClick={closeModal}
                >
                  ×
                </button>
                <div className="modal-header border-b border-gray-200 pb-4 mb-4 text-center">
                  <div className={`modal-icon w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl text-white ${modalData.iconClass}`}>
                    {modalData.icon}
                  </div>
                  <h2 className="modal-title text-lg sm:text-xl font-bold text-gray-800">{modalData.title}</h2>
                  <p className="modal-subtitle text-sm sm:text-base text-gray-600 mt-2">{modalData.subtitle}</p>
                </div>
                <div className="modal-body">
                  <ul className="modal-features space-y-3">
                    {modalData.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm sm:text-base text-gray-600">
                        <span className="text-emerald-500 font-bold mr-3">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 px-4 bg-gradient-to-br from-slate-800 to-slate-900 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Start Your Digital Transformation
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
              Ready to revolutionize your manufacturing operations? Let's discuss your digital factory journey.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-6 sm:mb-8">Get in Touch</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  <span className="text-sm sm:text-base text-slate-300">contact@digitalfactory.com</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  <span className="text-sm sm:text-base text-slate-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  <span className="text-sm sm:text-base text-slate-300">Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20">
                <h4 className="text-base sm:text-lg font-bold text-white mb-4">Follow Us</h4>
                <div className="flex justify-center space-x-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer" />
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-6 sm:mb-8">Request Consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 text-sm sm:text-base"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 text-sm sm:text-base"
                  required
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 text-sm sm:text-base"
                  required
                />
                <textarea
                  placeholder="Tell us about your manufacturing challenges..."
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 resize-none text-sm sm:text-base"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg hover:shadow-lg font-semibold text-sm sm:text-base transition-all duration-150"
                >
                  Schedule Consultation
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalFactory;