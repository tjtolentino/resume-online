/**
 * RESUME DATA CONFIGURATION
 * ==============================================================================
 * To update your resume, simply edit the values in this file!
 * All fields are plain text, lists, or structured objects.
 * Changes will automatically reflect in the web resume and print view.
 * ==============================================================================
 */

const RESUME_DATA = {
  personal: {
    name: "THRISTAN JERICHO TOLENTINO",
    title: "Senior Infrastructure Administrator / Full Stack Developer",
    subtitle: "Cloud Administrator/Engineer • Systems Automation • Web and Application Development",
    location: "Novaliches, Quezon City, Philippines",
    phone: "0905-808-8301",
    email: "jobs@tj.tolentino.email",
    linkedin: "linkedin.com/in/thristanjericho",
    linkedinUrl: "https://www.linkedin.com/in/thristanjericho",
    yearsOfExperience: "15+",
  },

  // Key performance indicators highlighted at the top of the executive view
  metrics: [
    {
      value: "15+",
      label: "Years Experience",
      desc: "Enterprise IT, Cloud & Automation",
      icon: "calendar"
    },
    {
      value: "100+",
      label: "Servers Migrated",
      desc: "On-premises to Azure (HA & Clusters)",
      icon: "cloud"
    },
    {
      value: "99.98%",
      label: "Uptime Maintained",
      desc: "Zero outages for 2+ consecutive years",
      icon: "activity"
    },
    {
      value: "CAD $200K",
      label: "Annual Savings",
      desc: "90% backup cost reduction achieved",
      icon: "dollar-sign"
    },
    {
      value: "300K+",
      label: "Automated Tasks",
      desc: "Supported by resilient Windows environments",
      icon: "cpu"
    },
    {
      value: "9,000+",
      label: "Azure Resources",
      desc: "Restructured for cost transparency",
      icon: "layers"
    }
  ],

  summary: "Senior Infrastructure Administrator / Full Stack Developer with 15+ years of experience designing, migrating, automating, and supporting enterprise IT infrastructure. Led the migration of 100+ servers to Azure and engineered highly available Windows environments supporting 300,000+ automated tasks. Proven record of maintaining 99.98% infrastructure availability, reducing backup costs by 90% with projected annual savings of CAD$200K, and automating complex operational processes with PowerShell, C#, and Python. Strong background in Azure, Windows Server, Active Directory, disaster recovery, high availability, infrastructure automation, and technical leadership.",

  competencies: [
    {
      category: "Cloud & Infrastructure",
      icon: "cloud",
      skills: [
        "Azure",
        "Azure Site Recovery",
        "Azure Infrastructure",
        "Intune",
        "Active Directory",
        "Windows Server",
        "Linux",
        "Office 365",
        "File Servers",
        "DFS",
        "Failover Clustering",
        "SFTP"
      ]
    },
    {
      category: "Automation & DevOps",
      icon: "terminal",
      skills: [
        "PowerShell",
        "Python",
        "C#",
        ".NET",
        "Terraform",
        "Git",
        "Batch Scripting",
        "Docker"
      ]
    },
    {
      category: "High Availability & DR",
      icon: "shield",
      skills: [
        "High Availability",
        "Disaster Recovery",
        "Storage Replica",
        "Failover Clustering",
        "Azure Site Recovery",
        "Backup & Recovery"
      ]
    },
    {
      category: "Web & Application Infrastructure",
      icon: "server",
      skills: [
        "IIS",
        "Apache",
        "NGINX",
        "SSL/TLS",
        "SSH",
        "Web Farms"
      ]
    },
    {
      category: "Monitoring & Operations",
      icon: "activity",
      skills: [
        "New Relic",
        "Infrastructure Monitoring",
        "Root-Cause Analysis",
        "Incident Response"
      ]
    },
    {
      category: "Data & Collaboration",
      icon: "database",
      skills: [
        "SQL",
        "Power BI",
        "SharePoint",
        "Confluence"
      ]
    }
  ],

  experience: [
    {
      company: "Manulife Business Processing Services",
      location: "Quezon City / Global Operations",
      period: "2017 – 2025",
      isCurrentOrRecent: true,
      roles: [
        {
          title: "Systems Administrator > Senior Infrastructure Administrator",
          period: "2017 – 2025",
          highlights: [
            {
              text: "Led the successful migration of 100+ servers from on-premises to Azure, including high-availability (HA) file clusters, web farms, SFTP clusters, and Certificate Authority (CA) clusters.",
              tags: ["Azure", "Migration", "High Availability", "Failover Clustering", "SFTP", "SSL/TLS"]
            },
            {
              text: "Maintained a 99.98% average monthly uptime with zero outages for over two years for high-utilization infrastructure by implementing automated remediation and proactive root-cause analysis.",
              tags: ["High Availability", "Monitoring", "Automation", "Root-Cause Analysis"]
            },
            {
              text: "Executed backup solution optimizations resulting in a 90% cost reduction, generating a projected annual savings of CAD$200K.",
              tags: ["Backup & Recovery", "Azure", "Cost Optimization"]
            },
            {
              text: "Restructured ownership of 9,000+ Azure resources to improve cost attribution, financial transparency, and accountability.",
              tags: ["Azure", "Governance", "Cost Management"]
            },
            {
              text: "Established infrastructure operating standards and security-compliance procedures for critical global infrastructure.",
              tags: ["Security", "Compliance", "Infrastructure Standards"]
            },
            {
              text: "Streamlined and administered team SharePoint and Confluence platforms, ensuring adherence to company security protocols.",
              tags: ["SharePoint", "Confluence", "Collaboration"]
            },
            {
              text: "Mentored junior team members through coaching and project engagement, resulting in their successful transition into leadership roles.",
              tags: ["Technical Leadership", "Mentoring"]
            },
            {
              text: 'Developed "SkriptSked", a C# app to automate the scheduling and execution of PowerShell scripts across multiple remote hosts, enhancing operational efficiency.',
              badge: "Tool: SkriptSked",
              tags: ["C#", ".NET", "PowerShell", "Automation"]
            },
            {
              text: "Engineered a resilient Windows Server environment with high-availability and Disaster Recovery (DR) capabilities supporting 300,000+ automated tasks.",
              tags: ["Windows Server", "Disaster Recovery", "High Availability", "Task Automation"]
            },
            {
              text: "Deployed Varonis Security System to a global infrastructure consisting of 40+ Windows Servers to support enterprise security applications and monitoring of thousands of servers.",
              tags: ["Varonis", "Windows Server", "Security", "Infrastructure Monitoring"]
            }
          ]
        }
      ]
    },
    {
      company: "TeleTech Philippines",
      location: "Philippines / Global Operations",
      period: "2009 – 2017",
      isCurrentOrRecent: false,
      roles: [
        {
          title: "Systems Software Engineer > Senior Systems Software Engineer",
          period: "2015 – 2017",
          highlights: [
            {
              text: 'Developed "Defender Fixer" to resolve workstation compatibility issues for remote applicants, preserving thousands of potential jobs and ensuring business continuity for work-at-home programs.',
              badge: "Tool: Defender Fixer",
              tags: ["Software Engineering", "Automation", "Work-at-Home", "Business Continuity"]
            },
            {
              text: 'Developed "SnapLog", a .NET application to help diagnose system and network connectivity issues of remote employees.',
              badge: "Tool: SnapLog",
              tags: [".NET", "C#", "Diagnostics", "Network Troubleshooting"]
            },
            {
              text: "Served as lead consultant for the G2AD project, automating employee login and access provisioning allowing accounts and their corresponding accesses be made available within 24 hours.",
              tags: ["Active Directory", "Access Provisioning", "Consulting", "Automation"]
            }
          ]
        },
        {
          title: "Associate Administrator > Supervisor, Systems Administration",
          period: "2012 – 2015",
          highlights: [
            {
              text: "Accelerated the career progression of 80% of the team into higher roles, leveraging their collective achievements and successful project completions.",
              tags: ["Leadership", "People Management", "Mentoring"]
            },
            {
              text: 'Developed "HireLines" (Applicant Queuing System) and "Agent Issue Tracker" web apps to centralize data and automate tracking for multiple global sites.',
              badge: "Tools: HireLines & Agent Issue Tracker",
              tags: ["Web Applications", "IIS", "SQL", "Process Automation"]
            }
          ]
        },
        {
          title: "Regional Technology Support Associate > Senior Specialist, Desktop Support",
          period: "2010 – 2012",
          highlights: [
            {
              text: "Recovered a 300+ seat site from a major outage in under 24 hours, restoring production capabilities ahead of schedule.",
              tags: ["Incident Response", "Disaster Recovery", "Rapid Remediation"]
            },
            {
              text: "Developed a power-saving script that reduced site power consumption by 20%.",
              tags: ["PowerShell", "Batch Scripting", "Energy Efficiency"]
            },
            {
              text: 'Created "Avaya Launcher" to secure and standardize softphone settings for 6,000+ workstations, built "NetSense" for automated physical network disconnection detection and logging, and "Network Toolbox" for centralized deployment of scripts for IT.',
              badge: "Tools: Avaya Launcher, NetSense & Network Toolbox",
              tags: ["Scripting", "Network Management", "Automation", "Standardization"]
            }
          ]
        },
        {
          title: "Senior Technical Support Associate",
          period: "2009 – 2010",
          highlights: [
            {
              text: 'Developed "Comet", a web-based customer status inquiry system for Telstra to improve tier 1 agents’ handling time during their calls.',
              badge: "Tool: Comet",
              tags: ["Web Development", "Efficiency", "Customer Support Systems"]
            }
          ]
        }
      ]
    },
    {
      company: "eTelecare Global Solutions",
      location: "Philippines",
      period: "2006 – 2009",
      isCurrentOrRecent: false,
      roles: [
        {
          title: "Level 2 Resolutions Specialist",
          period: "2006 – 2009",
          highlights: [
            {
              text: "Managed technical escalations and remote support; pioneered the Total Resolutions Program for Dell Small Business, establishing a career-long focus on continuous improvement and systematic problem-solving.",
              tags: ["Technical Escalations", "Continuous Improvement", "Root-Cause Analysis"]
            }
          ]
        }
      ]
    },
    {
      company: "STI College Santa Rosa",
      location: "Laguna, Philippines",
      period: "2000 – 2003",
      isCurrentOrRecent: false,
      roles: [
        {
          title: "Systems Support Assistant",
          period: "2000 – 2003",
          highlights: [
            {
              text: "Maintained computer labs and managed student accounts via Active Directory while providing foundational hardware and software support.",
              tags: ["Active Directory", "Systems Administration", "Hardware Support"]
            }
          ]
        }
      ]
    }
  ],

  certifications: [
    {
      name: "AZ-900 - Azure Fundamentals",
      issuer: "Microsoft",
      badge: "Azure Fundamentals",
      category: "Cloud"
    },
    {
      name: "AI-900 - Azure AI Fundamentals",
      issuer: "Microsoft",
      badge: "Azure AI",
      category: "AI & Cloud"
    },
    {
      name: "AZ-100 - Azure Infrastructure and Deployment",
      issuer: "Microsoft",
      badge: "Azure Deployment",
      category: "Cloud"
    },
    {
      name: "ITIL v4 Foundation Certified",
      issuer: "AXELOS",
      badge: "ITIL v4",
      category: "Governance"
    },
    {
      name: "Cloud Support Engineering (DevOps)",
      issuer: "Philippine Coding Camp",
      badge: "DevOps",
      category: "DevOps"
    },
    {
      name: "Introduction to AI",
      issuer: "Google",
      badge: "AI Essentials",
      category: "AI & Cloud"
    },
    {
      name: "PowerShell Expert Training: PS Fundamentals & PowerShell for System Admins",
      issuer: "Microsoft",
      badge: "PowerShell Expert",
      category: "Automation"
    },
    {
      name: "Technical Writing – A Guide to Effective Office Communications",
      issuer: "GovLearn.PH",
      badge: "Technical Writing",
      category: "Communication"
    },
    {
      name: "Full Stack Software Developer Professional Certificate",
      issuer: "Mapua Malayan",
      badge: "Full Stack Dev",
      category: "DevOps"
    },
    {
      name: "SharePoint Administration",
      issuer: "Microsoft Training",
      badge: "SharePoint",
      category: "Infrastructure"
    },
    {
      name: "Intune Workshop",
      issuer: "Specialized Training",
      badge: "Intune",
      category: "Infrastructure"
    },
    {
      name: "Microsoft Active Directory Administration",
      issuer: "Specialized Training",
      badge: "Active Directory",
      category: "Infrastructure"
    },
    {
      name: "TESDA: Computer Hardware Servicing II",
      issuer: "TESDA",
      badge: "TESDA NC II",
      category: "Hardware"
    }
  ],

  awards: [
    { year: "2024", title: "IS Stars of Excellence Awardee", organization: "Manulife" },
    { year: "2024", title: "ACE Gemstone Projects - Quality Improvement", organization: "Manulife" },
    { year: "2024", title: "Outstanding Achievement Group Award", organization: "Manulife" },
    { year: "2019", title: "Q4 IS Shining Star", organization: "Manulife" },
    { year: "2019", title: "Q4 Top Performer", organization: "Manulife" },
    { year: "2018", title: "IS Top Performer", organization: "Manulife" },
    { year: "2018", title: "Hall of Fame (Q1, Q2)", organization: "Manulife" },
    { year: "2016", title: "Top Performing Employee (Q1, Q2)", organization: "TeleTech" },
    { year: "2012", title: "Best G&A Employee", organization: "TeleTech" },
    { year: "2011 & 2012", title: "TeleTech Recognition Program Awardee", organization: "TeleTech" },
    { year: "2007", title: "Most Technically Proficient Employee", organization: "eTelecare" }
  ],

  education: {
    institution: "STI College Santa Rosa",
    location: "Santa Rosa, Laguna, Philippines",
    degrees: [
      {
        title: "Bachelor of Science in Computer Science",
        year: "2003"
      },
      {
        title: "Associate in Computer Studies",
        period: "2000 – 2003"
      }
    ],
    honors: [
      "Graduated First Honor, Best in Academics, Visual Arts and Computer Application",
      "Recognized as Best Programmer of the Year and Student Achiever of the Year",
      "IBM ACM International Collegiate Programming Competition representative (2003, 2004)",
      "TESDA IT Skills Competition Marathon: 1st Place Regional, 3rd Place National (Open Category)",
      "STI Regional Cluster Champion: INTO Programming contests (2002–2004) and IT Matters contest (2002)"
    ]
  }
};

// Export for node/bun environments if imported, or attach to window for browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RESUME_DATA;
} else if (typeof window !== 'undefined') {
  window.RESUME_DATA = RESUME_DATA;
}
