'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Clock, Mail, Phone, Github, Linkedin, Instagram, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactComponent = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const contentRef = useRef(null);
  const successRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    reason: '', // This will be used as email
    message: ''
  });

  const [focusedFields, setFocusedFields] = useState({
    name: false,
    reason: false,
    message: false
  });

  // New states for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Set initial state immediately
      gsap.set([formRef.current, contentRef.current], {
        y: 30,
        opacity: 0,
        visibility: 'visible'
      });

      // Form animation
      gsap.to(formRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            gsap.to(formRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power1.out"
            });
          },
          onLeave: () => {
            gsap.to(formRef.current, {
              y: 30,
              opacity: 0,
              duration: 0.4,
              ease: "power1.in"
            });
          },
          onEnterBack: () => {
            gsap.to(formRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power1.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(formRef.current, {
              y: 30,
              opacity: 0,
              duration: 0.4,
              ease: "power1.in"
            });
          }
        }
      });

      // Content animation with slight delay
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            gsap.to(contentRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power1.out",
              delay: 0.2
            });
          },
          onLeave: () => {
            gsap.to(contentRef.current, {
              y: 30,
              opacity: 0,
              duration: 0.4,
              ease: "power1.in"
            });
          },
          onEnterBack: () => {
            gsap.to(contentRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power1.out",
              delay: 0.2
            });
          },
          onLeaveBack: () => {
            gsap.to(contentRef.current, {
              y: 30,
              opacity: 0,
              duration: 0.4,
              ease: "power1.in"
            });
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Success animation effect
  useEffect(() => {
    if (submitStatus === 'success' && successRef.current) {
      gsap.fromTo(successRef.current, 
        { 
          scale: 0.8, 
          opacity: 0, 
          y: 20 
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "back.out(1.7)" 
        }
      );
    }
  }, [submitStatus]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFocus = (field) => {
    setFocusedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocusedFields(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setSubmitStatus(null);
    setSubmitMessage('');

    // Validate form data
    if (!formData.name.trim() || !formData.reason.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.reason)) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.reason.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Your message has been sent successfully! I\'ll get back to you soon.');
        
        // Reset form data
        setFormData({
          name: '',
          reason: '',
          message: ''
        });
        
        // Reset focused fields
        setFocusedFields({
          name: false,
          reason: false,
          message: false
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Something went wrong. Please try again.');
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus(null);
    setSubmitMessage('');
  };

  return (
    <div  id='contact' className="min-h-screen bg-white dark:bg-black transition-colors duration-300 flex justify-center items-center px-4 sm:px-6">
      <div className="container mx-auto py-8 sm:py-12 md:py-16 max-w-7xl">
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-10"
        >
          {/* Left Side - Form */}
          <div ref={formRef} className="space-y-6 sm:space-y-8 opacity-0">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black dark:text-white mb-3 sm:mb-4">
                Drop Me a Message
              </h2>
              <p className="text-lg sm:text-xl font-light text-gray-600 dark:text-gray-400">
                Feel free to reach out for collaborations, questions, or just a friendly chat!
              </p>
            </div>

            {/* Success Message */}
{submitStatus === 'success' && (
  <div 
    ref={successRef}
    className="bg-transparent dark:bg-gray-900/20 border border-gray-300 dark:border-gray-700 rounded-lg p-6 mb-6"
  >
    <div className="flex items-center mb-3">
      <CheckCircle className="w-6 h-6 text-gray-700 dark:text-gray-300 mr-3" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Message Sent Successfully!
      </h3>
    </div>
    <p className="text-gray-700 dark:text-gray-300 mb-4">
      {submitMessage}
    </p>
    <button
      onClick={resetForm}
      className="text-sm text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white font-medium underline"
    >
      Send another message
    </button>
  </div>
)}

{/* Error Message */}
{submitStatus === 'error' && (
  <div className="bg-transparent dark:bg-gray-800/30 border border-gray-400 dark:border-gray-600 rounded-lg p-4 mb-6">
    <div className="flex items-center">
      <AlertCircle className="w-5 h-5 text-gray-800 dark:text-gray-200 mr-3" />
      <p className="text-gray-900 dark:text-gray-100">
        {submitMessage}
      </p>
    </div>
  </div>
)}

            {/* Form - Hide when success */}
            {submitStatus !== 'success' && (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Name Field */}
                <div className="relative pb-2">
                  <label
                    htmlFor="name"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      focusedFields.name || formData.name
                        ? 'text-sm text-black dark:text-white -top-6'
                        : 'text-base sm:text-lg text-gray-500 dark:text-gray-400 top-3 sm:top-4'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 sm:py-4 text-base sm:text-lg text-black dark:text-white transition-colors duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Email Field */}
                <div className="relative pb-2">
                  <label
                    htmlFor="email"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      focusedFields.reason || formData.reason
                        ? 'text-sm text-black dark:text-white -top-6'
                        : 'text-base sm:text-lg text-gray-500 dark:text-gray-400 top-3 sm:top-4'
                    }`}
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    onFocus={() => handleFocus('reason')}
                    onBlur={() => handleBlur('reason')}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 sm:py-4 text-base sm:text-lg text-black dark:text-white transition-colors duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Message Field */}
                <div className="relative pb-2">
                  <label
                    htmlFor="message"
                    className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                      focusedFields.message || formData.message
                        ? 'text-sm text-black dark:text-white -top-6'
                        : 'text-base sm:text-lg text-gray-500 dark:text-gray-400 top-3 sm:top-4'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    disabled={isSubmitting}
                    required
                    rows="3"
                    className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white outline-none py-3 sm:py-4 text-base sm:text-lg text-black dark:text-white transition-colors duration-300 resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 border border-black dark:border-white text-black dark:text-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-full font-light tracking-wide text-sm sm:text-base flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black dark:disabled:hover:text-white disabled:hover:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Side - Content */}
          <div 
            ref={contentRef}
            className="md:border-l border-gray-300 dark:border-gray-600 md:pl-12 lg:pl-16 flex flex-col justify-start space-y-6 sm:space-y-8 mt-8 md:mt-0 opacity-0"
          >
            <div className="mb-8 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-black dark:text-white mb-3 sm:mb-4">
               Reach out anytime
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light">
                -my contact info and social profiles are just below.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-normal text-black dark:text-white mb-1">
                      Response Time
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      I typically respond within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-normal text-black dark:text-white mb-1">
                      Email
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base break-all">
                      adithya1755@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-normal text-black dark:text-white mb-1">
                      Phone
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      +91 63741-39422
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Buttons */}
              <div className="pt-4 sm:pt-6 pb-2 sm:pb-4">
                <h4 className="text-lg sm:text-xl font-normal text-black dark:text-white mb-4">
                  Social profiles link:
                </h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="https://www.linkedin.com/in/adithyanagamuneendran/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:scale-105 transition-all duration-300 group"
                  >
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white group-hover:text-white dark:group-hover:text-black" />
                  </a>
                  <a
                    href="https://github.com/Adhi1755"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:scale-105 transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white group-hover:text-white dark:group-hover:text-black" />
                  </a>
                  <a
                    href="https://instagram.com/adithya._.77"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:scale-105 transition-all duration-300 group"
                  >
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white group-hover:text-white dark:group-hover:text-black" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;