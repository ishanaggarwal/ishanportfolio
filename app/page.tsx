"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Download,
  Send,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 6, amplitude = 20 }: { children: React.ReactNode, delay?: number, duration?: number, amplitude?: number }) => {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="absolute opacity-10 dark:opacity-5 pointer-events-none"
    >
      {children}
    </motion.div>
  )
}

// Tech Icon Components
const CodeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.5 12L5.5 9L8.5 6L7 4.5L2.5 9L7 13.5L8.5 12ZM15.5 12L18.5 9L15.5 6L17 4.5L21.5 9L17 13.5L15.5 12Z" />
  </svg>
)

const DatabaseIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.58 21 12 21S20 19.21 20 17V7C20 4.79 16.42 3 12 3ZM18 17C18 17.5 15.87 19 12 19S6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16S16.39 15.55 18 14.77V17ZM18 12.45C16.7 13.4 14.42 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11C14.39 11 16.53 10.47 18 9.64V12.45ZM12 9C8.13 9 6 7.5 6 7S8.13 5 12 5S18 6.5 18 7S15.87 9 12 9Z" />
  </svg>
)

const GearIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5C10.07 15.5 8.5 13.93 8.5 12S10.07 8.5 12 8.5S15.5 10.07 15.5 12S13.93 15.5 12 15.5ZM19.43 12.97C19.47 12.65 19.5 12.33 19.5 12S19.47 11.35 19.43 11.03L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.5 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.22 8.95 2.27 9.22 2.46 9.37L4.57 11.03C4.53 11.35 4.5 11.67 4.5 12S4.53 12.65 4.57 12.97L2.46 14.63C2.27 14.78 2.22 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.5 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.5 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.97Z" />
  </svg>
)

const NetworkIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 20C15 19.45 14.55 19 14 19H13V17.5C13 17.22 12.78 17 12.5 17H11.5C11.22 17 11 17.22 11 17.5V19H10C9.45 19 9 19.45 9 20S9.45 21 10 21H14C14.55 21 15 20.55 15 20ZM12 2C10.9 2 10 2.9 10 4S10.9 6 12 6S14 5.1 14 4S13.1 2 12 2ZM21 9H20V8C20 7.45 19.55 7 19 7S18 7.45 18 8V9H17C16.45 9 16 9.45 16 10S16.45 11 17 11H18V12C18 12.55 18.45 13 19 13S20 12.55 20 12V11H21C21.55 11 22 10.55 22 10S21.55 9 21 9ZM7 9H6V8C6 7.45 5.55 7 5 7S4 7.45 4 8V9H3C2.45 9 2 9.45 2 10S2.45 11 3 11H4V12C4 12.55 4.45 13 5 13S6 12.55 6 12V11H7C7.55 11 8 10.55 8 10S7.55 9 7 9Z" />
  </svg>
)

export default function ApplePortfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedExperience, setSelectedExperience] = useState<any>(null)

  // Contact form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null) // 'success' | 'error' | null

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {}

    // First name validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.firstName} ${formData.lastName}`)
      const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

Message:
${formData.message}

---
Sent from your portfolio website
      `)

      const mailtoLink = `mailto:ishanaggarwal7775@gmail.com?subject=${subject}&body=${body}`
      
      // Open email client
      window.location.href = mailtoLink

      // Reset form and show success message
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      })
      setSubmitStatus('success')

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)

    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const projects = [
    {
      title: "LibreChat - Enhanced ChatGPT Clone",
      description: "Full-featured ChatGPT clone with multiple AI providers, advanced features, and secure multi-user system",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rt6a8c59uH4xTdyvlcFZkTLawSvMql.png",
      tech: ["OpenAI", "GPT-4", "Azure", "Groq", "Anthropic", "Gemini", "DALL-E-3", "LangChain", "React", "Node.js"],
      highlights: [
        "Built comprehensive ChatGPT clone supporting 10+ AI providers including OpenAI, Azure, Groq, Anthropic, Vertex AI, and Gemini with seamless model switching",
        "Integrated advanced features: GPT-4 Vision, DALL-E-3 image generation, ChatGPT Plugins, OpenAI Functions, message search, and LangChain for enhanced capabilities",
        "Implemented secure multi-user authentication system with presets and conversation management, designed as completely open-source solution for self-hosting",
      ],
      impact: "10+ AI providers",
    },
    {
      title: "Kubernetes Query Copilot",
      description:
        "AI-powered Kubernetes assistant that translates natural language into kubectl commands through GPT-4",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sVa05GXgYWWL2wOiiNzJcsffXOF4C2.png",
      tech: ["GPT-4", "FastAPI", "Kubernetes", "OpenAI", "Minikube"],
      highlights: [
        "Built an AI-powered Kubernetes assistant that translates natural language into kubectl commands through GPT-4, reducing operations query resolution time by 40%",
        "Integrated FastAPI, caching, and Minikube-based microservices to reduce latency by 32% and enable scalable, low-cost cluster command handling",
      ],
      impact: "40% faster operations",
    },
    {
      title: "Health Key iOS App",
      description:
        "Swift-based iOS application for secure, real-time medical record sharing across patients, hospitals, and insurers",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-v5cNSkXtqe8Hrn8lVaQGayZGXgitvX.png",
      tech: ["Swift", "Firebase", "Firestore", "iOS", "Encryption"],
      highlights: [
        "Developed a Swift-based iOS application for secure, real-time medical record sharing across patients, hospitals, and insurers, scaling to 100+ active users",
        "Embedded Firebase Auth and Firestore for encrypted data exchange, enabling secure login/storage for 200+ users with breach risk lowered by 25%",
      ],
      impact: "200+ active users",
    },
    {
      title: "Cancer Stats Explorer",
      description: "Multi-role DBMS system for cancer statistics with role-based access control for admins, doctors, and patients",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hre7uixmCEiXs6K3fZuhzJBrZ3heES.png",
      tech: ["MySQL", "Node.js", "Express", "React", "JWT", "Role-Based Access"],
      highlights: [
        "Designed comprehensive database management system for cancer statistics with distinct user personas: administrators, doctors, and patients with tailored access controls",
        "Implemented secure role-based authentication and authorization system using JWT tokens, ensuring data privacy and appropriate access levels for each user type",
        "Built intuitive dashboards for each user role: admin panel for system management, doctor interface for patient data analysis, and patient portal for personal health tracking",
      ],
      impact: "3 user personas",
    },
    {
      title: "Kanbas Learning Management System",
      description: "Full-stack online learning portal with dual-role system for students and professors",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EvoWtukJ9rvYVaFl52d2XcsGUzmQtz.png",
      tech: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "Bootstrap"],
      highlights: [
        "Built comprehensive learning management system supporting 500+ concurrent users with student course registration, content access, and interactive quiz-taking capabilities",
        "Developed professor dashboard with content creation tools, quiz builder with multiple question types, and real-time grade tracking, improving engagement by 40%",
        "Implemented role-based authentication system with secure access controls, enabling seamless switching between student and instructor interfaces with personalized dashboards",
      ],
      impact: "500+ users supported",
    },
    {
      title: "Semantic Resume Search API",
      description: "Advanced resume parsing API with vector embeddings and semantic search capabilities",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8rEHLrVvRmW4pGwXwn3UALh6fXnumT.png",
      tech: ["FastAPI", "FAISS", "spaCy", "Tesseract", "Docker"],
      highlights: [
        "Engineered a semantic résumé parsing API to process PDF/DOCX/images and extract entities using Tesseract OCR and spaCy, increasing parsing accuracy by 35%",
        "Implemented 384-dim vector embeddings and FAISS IndexFlatIP for real-time résumé similarity search, with sub-millisecond response and Dockerized setup",
      ],
      impact: "35% better accuracy",
    },
    {
      title: "Real-Time Object Detection & Tracking",
      description: "Traffic monitoring system using YOLOv7 and DeepSORT for multi-object tracking",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E0iOvrBhwkE2y90YFNrwIcjw0confD.png",
      tech: ["YOLOv7", "DeepSORT", "Python", "OpenCV"],
      highlights: [
        "Designed a traffic monitoring system using fine-tuned YOLOv7 and DeepSORT, ensuring robust multi-object tracking across weather and light conditions",
        "Deployed an ROI-based throughput tracker, achieving 27% higher counting accuracy with sub-second inference optimized for real-time surveillance",
      ],
      impact: "27% higher precision",
    },
    {
      title: "Inverse Cooking System",
      description: "Photo-based recipe retrieval system using convolutional autoencoder and FAISS",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mxbw7ffpkGai2dkHhgWGhFDkOQYjJh.png",
      tech: ["Autoencoder", "FAISS", "Image Retrieval", "Python"],
      highlights: [
        "Engineered a photo-based recipe retrieval system using a convolutional autoencoder and FAISS, improving retrieval accuracy by 25% and latency by 30%",
        "Automated food image-to-recipe identification, reducing manual lookup time by 40% through scalable image similarity indexing and classification",
      ],
      impact: "40% time reduction",
    },
    {
      title: "Image Processor",
      description: "MVC-based image editing desktop application with advanced filters and GIMP-style interface",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XWR6q7nmBKhliJA3MtEgO8nQQ4eMpq.png",
      tech: ["Java", "MVC Pattern", "Desktop App", "UI/UX"],
      highlights: [
        "Developed an MVC-based image editing desktop application with advanced filters and a GIMP-style interface, enhancing user experience and speed by 25%",
        "Structured reusable image operations pipeline supporting diverse transformations, delivering responsive editing across varied formats and resolutions",
      ],
      impact: "25% speed improvement",
    },
  ]

  const experiences = [
    {
      title: "Software Engineer",
      company: "Bank of America",
      period: "Jun 2022 – Jul 2023",
      location: "Charlotte, NC",
      description: "Led critical infrastructure modernization and cloud migration initiatives",
      highlights: [
        "Migrated legacy payment-processing system to AWS, cutting monthly infrastructure costs by 25%, and reducing deployment time using Docker, ECS, and Terraform",
        "Built an API gateway with FastAPI integrated with 10+ RESTful services, reducing latency and supporting 10K+ requests/sec with load-balanced HAProxy and Redis",
        "Refactored backend components for trade reconciliation systems with asynchronous programming and PostgreSQL optimizations, which increased throughput by 40%",
        "Implemented observability with ELK stack, Prometheus, and Grafana for alerting, reducing MTTR by 50% via log correlation, dashboards, and SLO/SLA monitoring",
        "Containerized environments using Docker and orchestrated deployments on EKS with autoscaling, node affinity, and spot instances, improving resource utilization",
        "Collaborated closely with TPMs to translate business requirements into technical epics, managing delivery roadmaps and driving sprint planning with 90% success rate",
        "Co-led a $5M cloud project, eliminating infrastructure bottlenecks and boosting developer velocity by 25% through phased AWS migration and SLA-driven execution",
      ],
      colorScheme: "blue",
      branchSide: "left",
      year: "2022-2023",
    },
    {
      title: "Software Engineer Intern",
      company: "Otomashen Inc.",
      period: "Jan 2025 – Apr 2025",
      location: "San Francisco, CA",
      description: "Building cutting-edge Agentic AI systems and scalable cloud infrastructure",
      highlights: [
        "Engineered an Agentic AI recommendation engine using GPT-4, BERT, and RAG, increasing user engagement by 99% through personalized learning pathways",
        "Built scalable backend microservices in Python (FastAPI) integrated with AWS Lambda, S3, and DynamoDB, ensuring 99.99% uptime during user surges (10k+ RPM)",
        "Deployed and orchestrated AI inference services (Kubernetes, Helm) on EKS, optimizing GPU workload distribution and reducing model serving latency by 43%",
        "Created LangChain-based prompt engineering framework for LLM agents using OpenAI APIs, integrating task chaining and memory to increase reasoning accuracy",
        "Developed CI/CD pipelines using GitHub Actions and Terraform to provision IaC, enabling seamless deployment cycles and rollback safety for ML/backend services",
        "Defined AI roadmap and prioritized LLM features via OKRs and stakeholder input; launched 3 pilots that drove 20% adoption by aligning product goals with user needs",
      ],
      colorScheme: "purple",
      branchSide: "right",
      year: "2025",
    },
    {
      title: "Research and Teaching Assistant",
      company: "Northeastern Civic AI Lab",
      period: "Jan 2024 – Dec 2024",
      location: "Boston, MA",
      description: "Developed AI pipelines for civic applications and advanced ML research",
      highlights: [
        "Designed AI pipelines using LangChain and OpenAI APIs for civic apps, reducing manual steps through multi-step reasoning, doc parsing, and autonomous execution",
        "Built vector-based recsys with PyTorch, FAISS, ChromaDB, and Weights & Biases, enabling real-time tracking, experimentation, and reproducibility in ML prototyping",
        "Scoped ML product use cases from partner needs and translated objectives into functional LLM prototypes using LangChain, prompt engineering, and RLHF strategies",
      ],
      colorScheme: "green",
      branchSide: "left",
      year: "2024",
    },
    {
      title: "Software Intern",
      company: "AWC Software Pvt Ltd.",
      period: "Jan 2021 – Jun 2021",
      location: "India",
      description: "Full-stack development and performance optimization",
      highlights: [
        "Re-engineered 10+ Figma mock-ups into React + TypeScript pages with code-splitting, cutting First Contentful Paint by 35% and improving session duration by 20%",
        "Built a Node.js microservice (PostgreSQL, Prisma ORM, Redis cache) to power type-ahead search, achieving low latency at 10k req/min, boosting conversions by 12%",
        "Implemented a CI/CD pipeline (GitHub Actions, Docker, AWS S3/CloudFront) with automated smoke tests, minimizing release lead-time and eliminating rollbacks",
        "Diagnosed and fixed 15+ React/Redux/Webpack defects, eliminating JavaScript runtime errors and boosting Lighthouse Performance from 68→91 within a single sprint",
      ],
      colorScheme: "orange",
      branchSide: "right",
      year: "2021",
    },
  ]

  const getColorClasses = (colorScheme: string): { ring: string; badge: string; bullet: string; branch: string; node: string } => {
    const colors: Record<string, { ring: string; badge: string; bullet: string; branch: string; node: string }> = {
      blue: {
        ring: "ring-blue-500 dark:ring-blue-400",
        badge: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
        bullet: "bg-blue-500 dark:bg-blue-400",
        branch: "border-blue-500 dark:border-blue-400",
        node: "bg-blue-500 dark:bg-blue-400",
      },
      purple: {
        ring: "ring-purple-500 dark:ring-purple-400",
        badge: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
        bullet: "bg-purple-500 dark:bg-purple-400",
        branch: "border-purple-500 dark:border-purple-400",
        node: "bg-purple-500 dark:bg-purple-400",
      },
      green: {
        ring: "ring-green-500 dark:ring-green-400",
        badge: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
        bullet: "bg-green-500 dark:bg-green-400",
        branch: "border-green-500 dark:border-green-400",
        node: "bg-green-500 dark:bg-green-400",
      },
      orange: {
        ring: "ring-orange-500 dark:ring-orange-400",
        badge: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
        bullet: "bg-orange-500 dark:bg-orange-400",
        branch: "border-orange-500 dark:border-orange-400",
        node: "bg-orange-500 dark:bg-orange-400",
      },
    }
    return colors[colorScheme] || colors.blue
  }

  const getProjectRepo = (title: string) => {
    const repoMap: Record<string, string> = {
      "LibreChat - Enhanced ChatGPT Clone": "https://github.com/ishanaggarwal/Librechat",
      "Kubernetes Query Copilot": "https://github.com/ishanaggarwal/query-agent-sample",
      "Health Key iOS App": "https://github.com/ishanaggarwal/Healthkey-iOS-Swift-App",
      "Cancer Stats Explorer": "https://github.com/ishanaggarwal/CancerStatsExplorer",
      "Kanbas Learning Management System": "https://github.com/ishanaggarwal/-kanbas-react-web-app/tree/Final-Project/src",
      "Semantic Resume Search API": "https://github.com/ishanaggarwal/Summarization_proj",
      "Real-Time Object Detection & Tracking": "https://github.com/ishanaggarwal/object-detection-and-tracking",
      "Inverse Cooking System": "https://github.com/ishanaggarwal/inverse-cooking",
      "Image Processor": "https://github.com/ishanaggarwal/Image-Processing-System",
    }
    return repoMap[title] || "https://github.com/ishanaggarwal"
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-['Inter',system-ui,sans-serif] relative overflow-hidden transition-colors duration-500">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <FloatingElement delay={0} duration={8} amplitude={30}>
            <div className="top-20 left-20 text-gray-300 dark:text-gray-600">
              <CodeIcon />
            </div>
          </FloatingElement>

          <FloatingElement delay={1} duration={10} amplitude={25}>
            <div className="top-40 right-32 text-gray-300 dark:text-gray-600">
              <DatabaseIcon />
            </div>
          </FloatingElement>

          <FloatingElement delay={2} duration={7} amplitude={35}>
            <div className="bottom-40 left-16 text-gray-300 dark:text-gray-600">
              <GearIcon />
            </div>
          </FloatingElement>

          <FloatingElement delay={3} duration={9} amplitude={20}>
            <div className="bottom-32 right-20 text-gray-300 dark:text-gray-600">
              <NetworkIcon />
            </div>
          </FloatingElement>

          <FloatingElement delay={1.5} duration={11} amplitude={40}>
            <div className="top-1/2 left-8 text-gray-300 dark:text-gray-600">
              <CodeIcon />
            </div>
          </FloatingElement>

          <FloatingElement delay={4} duration={6} amplitude={28}>
            <div className="top-1/3 right-12 text-gray-300 dark:text-gray-600">
              <GearIcon />
            </div>
          </FloatingElement>

          {/* Floating geometric shapes */}
          <FloatingElement delay={0.5} duration={12} amplitude={15}>
            <div className="top-1/4 left-1/4">
              <div className="w-6 h-6 border border-gray-200 dark:border-gray-700 rotate-45 opacity-20 dark:opacity-10"></div>
            </div>
          </FloatingElement>

          <FloatingElement delay={2.5} duration={8} amplitude={22}>
            <div className="bottom-1/4 right-1/4">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full opacity-20 dark:opacity-10"></div>
            </div>
          </FloatingElement>

          <FloatingElement delay={3.5} duration={10} amplitude={18}>
            <div className="top-3/4 left-1/3">
              <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 opacity-20 dark:opacity-10"></div>
            </div>
          </FloatingElement>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
            >
              Ishan Aggarwal
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["About", "Projects", "Experience", "Contact"].map((item: string) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-black dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 transition-colors duration-500"
              >
                <div className="px-6 py-4 space-y-4">
                  {["About", "Projects", "Experience", "Contact"].map((item: string) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block w-full text-left text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative z-10">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden bg-white dark:bg-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 ring-4 ring-gray-100 dark:ring-gray-700 transition-colors duration-500">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-N6WoqDFO5pM1xU0UJtLVywulk1YSqE.png"
                  alt="Ishan Aggarwal"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight mb-4 leading-tight"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">Software Engineer</span>
              <br />
              <span className="text-gray-600 dark:text-gray-400">& Product Manager</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                {["Agentic AI", "LLMs", "SDE", "Cloud", "TPM", "PM", "Data", "DevOps"].map((skill: string, index: number) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 font-light leading-relaxed max-w-3xl mx-auto px-4 sm:px-0"
            >
              Passionate about building innovative AI solutions and scalable systems that make a difference.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span> 
              Currently pursuing MS in Computer Science at Northeastern University.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800 px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-gray-50 dark:bg-gray-800 relative z-10 transition-colors duration-500">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                About <span className="font-medium">Me</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                A passionate Software Engineer with 3+ years of experience building innovative AI solutions and scalable
                cloud systems. I specialize in transforming complex problems into elegant, user-centric solutions that
                drive real impact.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white dark:bg-gray-900 h-full transition-colors duration-500">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
                      <span className="text-white dark:text-black text-2xl font-bold">3+</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Years Experience</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Building AI/ML solutions and cloud-native systems
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white dark:bg-gray-900 h-full transition-colors duration-500">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
                      <MapPin className="w-8 h-8 text-white dark:text-black" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Boston, MA</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Currently pursuing MS in Computer Science at Northeastern
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white dark:bg-gray-900 h-full transition-colors duration-500">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
                      <span className="text-white dark:text-black text-2xl font-bold">90%</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Success Rate</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Leading cross-functional teams and delivering projects
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-transparent"
                asChild
              >
                <a href="https://drive.google.com/file/d/1QuWReMGajZAAifa7I_ny1BpUV_5-zvGO/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Featured <span className="font-medium">Projects</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                A comprehensive collection of innovative solutions showcasing expertise in AI, cloud computing, and
                modern software development.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Card className="overflow-hidden border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60 transition-all duration-500 bg-white dark:bg-gray-900 h-full">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Modal */}
        <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    <div className="p-8 pr-16">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            {selectedProject.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            {selectedProject.description}
                          </p>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                            {selectedProject.impact}
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          Key Achievements
                        </h4>
                        <div className="space-y-3">
                          {selectedProject.highlights.map((highlight: string, i: number) => (
                            <div key={i} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full font-medium transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-xl font-medium transition-all duration-300 px-8 py-3"
                          asChild
                        >
                          <a href={getProjectRepo(selectedProject.title)} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Experience Modal */}
        <AnimatePresence>
            {selectedExperience && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedExperience(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl mx-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <button
                      onClick={() => setSelectedExperience(null)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    <div className="p-8 pr-16">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div>
                              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{selectedExperience.title}</h3>
                            </div>
                          </div>
                          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{selectedExperience.company}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">{selectedExperience.description}</p>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 lg:text-right lg:ml-6 mt-2 lg:mt-0">
                          <div className="font-medium text-lg mb-1">{selectedExperience.period}</div>
                          <div className="text-base">{selectedExperience.location}</div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          Key Achievements & Responsibilities
                        </h4>
                        <div className="space-y-4">
                          {selectedExperience.highlights.map((highlight: string, i: number) => (
                            <div key={i} className="flex items-start">
                              <div className={`w-2 h-2 ${getColorClasses(selectedExperience.colorScheme).bullet} rounded-full mt-2 mr-3 flex-shrink-0`} />
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          className="border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl font-medium transition-all duration-300 px-8 py-3 bg-transparent"
                          asChild
                        >
                          <a href="https://www.linkedin.com/in/ishanaggarwal1/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 mr-2" />
                            Connect on LinkedIn
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        {/* Experience Section - Tree Layout */}
        <section
          id="experience"
          className="py-32 bg-gray-50 dark:bg-gray-800 relative z-10 transition-colors duration-500"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Professional <span className="font-medium">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Building innovative solutions across leading technology companies
              </p>
            </motion.div>

            {/* Tree Structure */}
            <div className="relative max-w-4xl mx-auto">
              {/* Tree Trunk */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-gray-400 dark:bg-gray-600 h-full rounded-full opacity-30"></div>
              
              {/* Tree Roots */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full opacity-30"></div>

              <div className="space-y-16 sm:space-y-20">
                {experiences.map((exp: any, index: number) => {
                  const colors = getColorClasses(exp.colorScheme)
                  const isLeft = exp.branchSide === "left"
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      {/* Branch Line */}
                      <div className={`absolute top-8 ${isLeft ? 'right-1/2' : 'left-1/2'} w-16 sm:w-24 h-0.5 ${colors.branch} border-t-2 border-dashed`}></div>
                      
                      {/* Branch Node */}
                      <div className={`absolute top-6 ${isLeft ? 'right-1/2 -mr-2' : 'left-1/2 -ml-2'} w-4 h-4 ${colors.node} rounded-full ring-4 ring-white dark:ring-gray-800`}></div>
                      
                      {/* Experience Card */}
                      <div className={`${isLeft ? 'pr-20 sm:pr-32' : 'pl-20 sm:pl-32'}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="cursor-pointer"
                          onClick={() => setSelectedExperience(exp)}
                        >
                          <Card className={`p-6 sm:p-8 border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-gray-900/60 transition-all duration-300 bg-white dark:bg-gray-900 ring-2 ${colors.ring}`}>
                            {/* Year Badge */}
                            <div className={`inline-block px-3 py-1 ${colors.badge} text-xs font-semibold rounded-full mb-4`}>
                              {exp.year}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{exp.title}</h3>
                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{exp.company}</p>
                                <p className="text-gray-600 dark:text-gray-400 mb-3">{exp.description}</p>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-6">
                                <div className="font-medium">{exp.period}</div>
                                <div>{exp.location}</div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {exp.highlights[0]}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                                Click to view all {exp.highlights.length} achievements →
                              </p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Let's <span className="font-medium">Connect</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Ready to discuss your next project or explore opportunities together?
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center transition-colors duration-300">
                        <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Email</p>
                        <a
                          href="mailto:ishanaggarwal7775@gmail.com"
                          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          ishanaggarwal7775@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center transition-colors duration-300">
                        <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Phone</p>
                        <a
                          href="tel:+18579916379"
                          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          +1 (857) 991-6379
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center transition-colors duration-300">
                        <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Location</p>
                        <p className="text-gray-600 dark:text-gray-400">Boston, MA, USA</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-transparent"
                      asChild
                    >
                      <a href="https://github.com/ishanaggarwal" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-transparent"
                      asChild
                    >
                      <a href="https://www.linkedin.com/in/ishanaggarwal1/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-0 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 bg-white dark:bg-gray-900 transition-colors duration-500">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <p className="text-green-800 dark:text-green-200 text-sm">
                          Message sent successfully! Your email client should open shortly.
                        </p>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <p className="text-red-800 dark:text-red-200 text-sm">
                          There was an error sending your message. Please try again.
                        </p>
                      </motion.div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 ${
                            formErrors.firstName ? 'border-red-500 dark:border-red-400' : ''
                          }`}
                          placeholder="John"
                        />
                        {formErrors.firstName && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 ${
                            formErrors.lastName ? 'border-red-500 dark:border-red-400' : ''
                          }`}
                          placeholder="Doe"
                        />
                        {formErrors.lastName && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 ${
                          formErrors.email ? 'border-red-500 dark:border-red-400' : ''
                        }`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white rounded-xl min-h-[120px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 ${
                          formErrors.message ? 'border-red-500 dark:border-red-400' : ''
                        }`}
                        placeholder="Tell me about your project..."
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-xl py-3 font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-100 dark:border-gray-800 relative z-10 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2025 Ishan Aggarwal. Designed with precision and built with passion.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
