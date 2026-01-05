"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCode,
  faServer,
  faDatabase,
  faBrain,
  faVideo,
  faChartLine,
  faFilePdf,
  faArrowUpRightFromSquare,
  faCapsules
} from "@fortawesome/free-solid-svg-icons"
import { Navbar } from "@/components/ui/navbar"

export default function AboutPage() {
  const projects = [
    {
      id: 1,
      category: "Full Stack",
      title: "Pill Scheduler",
      description:
        "PillScheduler is an intelligent, high-performance medication management dashboard that bridges the gap between technical clinical data and patient-friendly care. It integrates official OAuth, NIH RxNav, openFDA, and Google Gemini AI to provide a seamless experience for medication management.",
      icon: faCapsules,
      tags: ["Next.js", "Firebase", "Tailwind CSS", "Lucide React", "Google Gemini API", "NextAuth.js"],
      github: "https://github.com/Sumiksh/PillReminders",
      link: "https://www.youtube.com/watch?v=aWqIIGnwpis",
      gradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      category: "Data Analytics",
      title: "Seattle Airbnb Insights",
      description:
        "An interactive data visualization project analyzing price trends, neighborhood demand, and seasonal availability. Created high-impact dashboards to provide data-driven investment recommendations for the Seattle market.",
      icon: faChartLine,
      tags: ["Tableau", "Analytics", "Visualization"],
      link: "https://public.tableau.com/app/profile/sumiksh.trehan/viz/seattleairbnbrecommendation/Dashboard1",
      gradient: "from-emerald-500/10 to-teal-500/10",
      borderColor: "border-emerald-500/20",
      iconColor: "text-emerald-500",
    },
    {
      id: 3,
      category: "Computer Vision",
      title: "Sports Motion Detection & Tracking",
      description:
        "Built a video processing pipeline using OpenCV and classical computer vision techniques. Features robust motion tracking and object detection designed to analyze player movement across dynamic sports footage.",
      icon: faVideo,
      tags: ["OpenCV", "Python", "Computer Vision"],
      link: "https://github.com/Sumiksh/dps920finalproject.git",
      gradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
      iconColor: "text-purple-500",
    },
    {
      id: 4,
      category: "Machine Learning",
      title: "AI/ML Model Suite",
      description:
        "A collection of predictive models ranging from housing price regression to complex image classification. Implemented using Python, Scikit-learn, and TensorFlow, utilizing KNN and CNN architectures for high accuracy.",
      icon: faBrain,
      tags: ["TensorFlow", "Scikit-learn", "Neural Networks"],
      link: "https://github.com/Sumiksh/aimodels",
      gradient: "from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20",
      iconColor: "text-orange-500",
    },
    {
      id: 5,
      category: "Full Stack",
      title: "E-Commerce Platform",
      description:
        "A scalable web application featuring a decoupled architecture. Built with a React frontend for dynamic UI and a Node.js/Express backend for secure RESTful API management and MongoDB integration.",
      icon: faServer,
      tags: ["MERN Stack", "REST API", "MongoDB"],
      frontend: "https://github.com/Kush10022/pswFrontend.git",
      backend: "https://github.com/BTS-2023-2024/Group_08",
      gradient: "from-indigo-500/10 to-blue-500/10",
      borderColor: "border-indigo-500/20",
      iconColor: "text-indigo-500",
    },
    {
      id: 6,
      category: "Business Intelligence",
      title: "US Population Analytics",
      description:
        "A comprehensive demographic study utilizing Power BI to visualize population trends, migration patterns, and economic indicators across US regions.",
      icon: faDatabase,
      tags: ["Power BI", "Data Modeling", "BI"],
      link: "/USPopulation.pdf",
      isPDF: true,
      gradient: "from-rose-500/10 to-pink-500/10",
      borderColor: "border-rose-500/20",
      iconColor: "text-rose-500",
    },
    {
      id: 7,
      category: "Web Development",
      title: "Legacy Portfolio V1",
      description:
        "A foundational project showcasing my early mastery of responsive design and UI layout. This version represents my transition into full-stack development and serves as the architectural predecessor to my current site.",
      icon: faCode,
      tags: ["React", "Next.js", "Tailwind"],
      link: "https://portfolio-five-gamma-25.vercel.app/",
      github: "https://github.com/Sumiksh/portfolio.git",
      gradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      iconColor: "text-blue-500",
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Projects Grid */}
      <section className="max-w-5xl mx-auto px-6 py-2 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl border ${project.borderColor} bg-gradient-to-br ${project.gradient} p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-${project.iconColor}/10 hover:-translate-y-1`}
            >
              {/* Category Badge */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </span>
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl bg-background/50 backdrop-blur-sm border ${project.borderColor} ${project.iconColor}`}
                >
                  <FontAwesomeIcon icon={project.icon} className="text-lg" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl md:text-2xl font-bold mb-4 text-balance">{project.title}</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 text-pretty">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-background/60 backdrop-blur-sm border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-3">
                {project.isPDF ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background/80 backdrop-blur-sm border ${project.borderColor} ${project.iconColor} hover:bg-background transition-all font-medium text-sm group/btn`}
                  >
                    <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
                    View Report
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="text-xs opacity-50 group-hover/btn:opacity-100 transition-opacity"
                    />
                  </a>
                ) : (
                  <>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background/80 backdrop-blur-sm border ${project.borderColor} ${project.iconColor} hover:bg-background transition-all font-medium text-sm group/btn`}
                      >
                        View Project
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="text-xs opacity-50 group-hover/btn:opacity-100 transition-opacity"
                        />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all font-medium text-sm"
                      >
                        <FontAwesomeIcon icon={faCode} />
                        Source Code
                      </a>
                    )}
                    {project.frontend && (
                      <>
                        <a
                          href={project.frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all font-medium text-sm"
                        >
                          <FontAwesomeIcon icon={faCode} />
                          Frontend
                        </a>
                        <a
                          href={project.backend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-all font-medium text-sm"
                        >
                          <FontAwesomeIcon icon={faServer} />
                          Backend
                        </a>
                      </>
                    )}
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <p className="text-muted-foreground text-lg mb-2">Want to see more?</p>
          <a
            href="https://github.com/Sumiksh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Visit my GitHub profile
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm" />
          </a>
        </div>
      </section>
    </div>
  )
}
