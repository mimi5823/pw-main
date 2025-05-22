"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for our data structures
type SessionDetail = {
  sessionTitle?: string;
  date?: string;
  type: string;
  description?: string;
  items?: string[];
  footer?: string;
  customContent?: {
    topics: string[];
    pacing: string[];
  };
};

// Define types for cohort schedules
type ScheduleWeek = {
  week: number;
  title: string;
  topics: string[];
  pacing: string[];
};

type CohortSchedule = {
  id: string;
  title: string;
  description: string;
  icon: string;
  startDate: string;
  duration: string;
  schedule: ScheduleWeek[];
};

const scheduleHighlights: CohortSchedule[] = [
  {
    id: 'blockchain-fundamentals',
    title: 'Blockchain Fundamentals',
    description: 'Master the core concepts of blockchain technology in this 4-week cohort designed for beginners. Learn about distributed ledgers, cryptocurrencies, and Web3.',
    icon: '/theory-icon.svg',
    startDate: 'June 15, 2025',
    duration: '4 weeks',
    schedule: [
      {
        week: 1,
        title: "Introduction to Blockchain Technology",
        topics: [
          "What is Blockchain? (Defining principles: decentralization, transparency, immutability)",
          "Problems blockchain solves",
          "How a blockchain works (Blocks, chains, basic cryptography)",
          "Distributed Ledger Technology",
          "Types of Blockchains (Public, Private, Consortium)",
          "Key Concepts (Nodes, conceptual mining, basic consensus mechanisms like PoW/PoS)"
        ],
        pacing: [
          "Days 1-2: Focus on 'What is Blockchain?' and 'How it Works' (45-60 min/day)",
          "Day 3: Cover 'Types of Blockchains' and 'Key Concepts' (45-60 min)",
          "Day 4: Review of the week's material (30-45 min)"
        ]
      },
      {
        week: 2,
        title: "Cryptocurrencies: The First Application",
        topics: [
          "What is Cryptocurrency? (Digital vs. traditional currency, role of cryptography)",
          "Bitcoin: The Pioneer (History, significance)",
          "Altcoins: An Overview (Brief intro, e.g., Ethereum as a platform)",
          "Wallets and Exchanges (Conceptual: how to store/acquire, public/private keys simply explained, basic types of exchanges)"
        ],
        pacing: [
          "Day 1: 'What is Cryptocurrency?' and its core features (45-60 min)",
          "Day 2: Deep dive into Bitcoin (45-60 min)",
          "Day 3: Introduction to Altcoins and the concept of Wallets (45-60 min)",
          "Day 4: Understanding Exchanges and a review of the week (30-45 min)"
        ]
      },
      {
        week: 3,
        title: "The Expanding Blockchain Ecosystem (Web3)",
        topics: [
          "Smart Contracts: Automated Agreements (Basic concept, no coding, potential uses)",
          "Decentralized Applications (DApps) (What they are, conceptual differences from traditional apps)",
          "Non-Fungible Tokens (NFTs) (Understanding NFTs, digital ownership, use cases)",
          "Decentralized Autonomous Organizations (DAOs) (Intro to DAOs, community governance)",
          "Introduction to Decentralized Finance (DeFi) (What is DeFi? Simple explanations of lending, borrowing, DEXs, stablecoins)"
        ],
        pacing: [
          "Day 1: Smart Contracts and DApps (45-60 min)",
          "Day 2: Focus on NFTs (45-60 min)",
          "Day 3: Introduction to DAOs (45-60 min)",
          "Day 4: Introduction to DeFi core concepts (60 min)",
          "Day 5: Review and connecting how these elements form the Web3 ecosystem (30-45 min)"
        ]
      },
      {
        week: 4,
        title: "Blockchain in the Real World & Future Outlook",
        topics: [
          "Real-World Use Cases (Examples in supply chain, healthcare, etc. - conceptual)",
          "Understanding the Landscape (Basic overview of blockchain infrastructure, different protocols high-level)",
          "Opportunities and Challenges (Benefits, scalability, regulation, adoption)",
          "Legal and regulatory considerations (awareness)",
          "The Future of Web3 (Speculative overview)"
        ],
        pacing: [
          "Day 1: Explore Real-World Use Cases across different industries (45-60 min)",
          "Day 2: Understanding the broader landscape and different protocols (45-60 min)",
          "Day 3: Discussing Opportunities, Challenges, and regulatory aspects (45-60 min)",
          "Day 4: Contemplating the Future of Web3 and cohort wrap-up (30-45 min)"
        ]
      }
    ]
  },
  {
    id: 'algorithmic-trading',
    title: 'Algorithmic Trading',
    description: "Learn to build, test, and deploy algorithmic trading strategies in this intensive bootcamp led by industry experts.",
    icon: '/technical-icon.svg',
    startDate: 'July 10, 2025',
    duration: '6 weeks',
    schedule: [
      {
        week: 1,
        title: "Foundations of Algorithmic Trading",
        topics: [
          "Introduction to Market Making",
          "Order Book Mechanics",
          "Exchange Types and Differences",
          "Strategy Types Overview",
          "Setting Up Your Development Environment"
        ],
        pacing: [
          "Day 1-2: Market Making Fundamentals (60 min/day)",
          "Day 3: Exchange Types and Order Books (45 min)",
          "Day 4-5: Strategy Types and Environment Setup (60 min/day)"
        ]
      },
      {
        week: 2,
        title: "Building Your First Trading Bot",
        topics: [
          "Hummingbot Framework Overview",
          "Scripting Basics",
          "Accessing Order Books",
          "Executing Trades",
          "Handling Events"
        ],
        pacing: [
          "Day 1-2: Framework and Scripting (60 min/day)",
          "Day 3-4: Order Books and Trade Execution (60 min/day)",
          "Day 5: Event Handling and Review (45 min)"
        ]
      },
      {
        week: 3,
        title: "Advanced Trading Strategies",
        topics: [
          "Market Making Strategies",
          "Directional Trading",
          "Arbitrage Techniques",
          "Risk Management",
          "Performance Measurement"
        ],
        pacing: [
          "Day 1-2: Market Making Deep Dive (60 min/day)",
          "Day 3: Directional Trading (60 min)",
          "Day 4: Arbitrage Techniques (60 min)",
          "Day 5: Risk Management (45 min)"
        ]
      },
      {
        week: 4,
        title: "Strategy Implementation",
        topics: [
          "Custom Controller Development",
          "Multi-timeframe Support",
          "Statistical Arbitrage",
          "Configuration Management",
          "Testing Methodologies"
        ],
        pacing: [
          "Day 1-2: Controller Development (60 min/day)",
          "Day 3-4: Advanced Features (60 min/day)",
          "Day 5: Testing Your Strategy (45 min)"
        ]
      }
    ]
  },
  {
    id: 'web3-development',
    title: 'Web3 Development',
    description: 'Dive into smart contract development, dApp creation, and blockchain integration in this comprehensive developer-focused cohort.',
    icon: '/demo-icon.svg',
    startDate: 'August 5, 2025',
    duration: '8 weeks',
    schedule: [
      {
        week: 1,
        title: "Web3 Development Fundamentals",
        topics: [
          "Introduction to Web3 Architecture",
          "Blockchain Development Environment Setup",
          "Solidity Basics",
          "Smart Contract Fundamentals",
          "Testing and Debugging"
        ],
        pacing: [
          "Day 1-2: Web3 Architecture and Environment Setup (60 min/day)",
          "Day 3-4: Solidity Basics (60 min/day)",
          "Day 5: Smart Contract Fundamentals (45 min)"
        ]
      },
      {
        week: 2,
        title: "Smart Contract Development",
        topics: [
          "Advanced Solidity Concepts",
          "Contract Security Best Practices",
          "Gas Optimization",
          "Contract Deployment",
          "Interacting with Contracts"
        ],
        pacing: [
          "Day 1-2: Advanced Solidity (60 min/day)",
          "Day 3: Security Best Practices (60 min)",
          "Day 4: Gas Optimization (45 min)",
          "Day 5: Deployment and Interaction (60 min)"
        ]
      },
      {
        week: 3,
        title: "Building Decentralized Applications",
        topics: [
          "Frontend Integration with Web3.js/ethers.js",
          "React for dApps",
          "User Authentication",
          "Wallet Integration",
          "State Management"
        ],
        pacing: [
          "Day 1-2: Frontend Integration (60 min/day)",
          "Day 3: React for dApps (60 min)",
          "Day 4-5: Authentication and Wallet Integration (45 min/day)"
        ]
      },
      {
        week: 4,
        title: "Advanced Web3 Development",
        topics: [
          "Decentralized Storage (IPFS)",
          "Oracles and External Data",
          "Token Standards (ERC20, ERC721, ERC1155)",
          "Layer 2 Solutions",
          "Cross-chain Development"
        ],
        pacing: [
          "Day 1: Decentralized Storage (60 min)",
          "Day 2: Oracles and External Data (45 min)",
          "Day 3-4: Token Standards (60 min/day)",
          "Day 5: Layer 2 and Cross-chain (60 min)"
        ]
      }
    ]
  },
];

const weeklySchedule = [
  {
    week: 0,
    title: 'Preparation',
    details: [
      {
        type: 'Prework',
        description:
          'Begin your journey by completing the Intro to Algo Trading course, which will establish the foundational knowledge needed for the bootcamp. The course includes hands-on coding challenges to get you comfortable with the basics of algorithmic trading before the live sessions begin.',
      },
    ],
  },
  {
    week: 1,
    title: 'Foundations',
    details: [
      {
        sessionTitle: 'Introduction to Market Making',
        date: 'Tuesday September 9, 2025',
        type: 'Theory',
        description:
          "Your journey begins with understanding the fundamentals of trading bots. We'll explore order book mechanics including the difference between makers and takers, and how queue priority affects your trades. You'll learn about different exchange types (spot vs. perpetual, centralized vs. decentralized) and gain insights into strategy types like directional trading strategies, market making strategies, and more that form the basis of algorithmic trading.",
      },
      {
        sessionTitle: 'The Hummingbot Open Source Framework',
        date: 'Wednesday September 10, 2025',
        type: 'Technical',
        description:
          "Dive into the technical architecture of Hummingbot with a comprehensive overview of the framework including core components, connector design, strategy implementation, and complementary services. You'll set up your development environment and learn scripting basics such as accessing order books, retrieving candle data, executing trades, and handling events. The session concludes with an introduction to the powerful StrategyV2 framework, covering executors and controllers.",
      },
      {
        sessionTitle: 'Pure Market Making Strategies',
        date: 'Thursday September 11, 2025',
        type: 'Theory',
        description:
          "Explore the concept of market making in depth, learning how to select ideal markets for your strategies. You'll study the influential Avellaneda & Stoikov paper that forms the theoretical foundation for many modern market making approaches. The session covers essential aspects of measuring profitability and implementing risk management techniques to protect your capital while maximizing returns.",
      },
      {
        sessionTitle: 'StrategyV2 Controllers',
        date: 'Friday September 12, 2025',
        type: 'Technical',
        description:
          "This hands-on session focuses on implementing advanced trading strategies through Hummingbot's controller system. You'll work with directional controllers including Bollinger Bands and MACD indicators, and even code a new controller from scratch during the live session. The class also covers market making controllers that operate around mid-price with dynamic spreads, as well as generic controllers for arbitrage and cross-exchange market making.",
      },
      {
        type: 'Week 1 Homework',
        description:
          'Choose a strategy type as your focus area and complete the corresponding course materials and coding challenges. Begin designing your own trading strategy using the provided Design Template, laying the groundwork for your final project.',
      },
    ],
  },
  {
    week: 2,
    title: 'Advanced Techniques',
    details: [
      {
        sessionTitle: 'Advanced Market Making Strategies',
        date: 'Tuesday September 16, 2025',
        type: 'Theory',
        description:
          'Elevate your trading expertise by exploring sophisticated strategies including arbitrage, cross-exchange market making, and grid trading approaches. This session will help you develop the critical thinking needed to select the optimal strategy for different market conditions and trading objectives, giving you a comprehensive toolkit for algorithmic trading.',
      },
      {
        sessionTitle: 'Coding Custom Strategies',
        date: 'Wednesday September 17, 2025',
        type: 'Technical',
        description:
          "Enhance your trading algorithms with practical coding exercises to add multi-timeframe support to directional strategies. You'll develop a statistical arbitrage controller from scratch and learn how to create configurations that run multiple controllers within the same bot instance, maximizing efficiency and creating sophisticated trading systems.",
      },
      {
        sessionTitle: 'The Business of Market Making',
        date: 'Thursday September 18, 2025',
        type: 'Theory',
        description:
          'Transition from technical concepts to business applications by exploring market maker business models including liquidity mining,market making-as-a-service, and token loans with embedded options. Learn to identify lucrative opportunities and potential pitfalls while mastering the art of scaling your operations through bot management. The session concludes with critical operational security practices to protect your assets and trading systems.',
      },
      {
        sessionTitle: 'Running Hummingbot in Production',
        date: 'Friday September 19, 2025',
        type: 'Technical',
        description:
          "Prepare for real-world deployment with a deep dive into setting up Hummingbot for production use. You'll learn how to securely deploy the full stack of Backend API, Dashboard, and Broker services, including security best practices. The session covers deploying bots on cloud providers and using the Quants-Lab research repository to interact with the Backend API for managing configurations, monitoring account balances, and controlling bot operations.",
      },
      {
        type: 'Week 2 Homework',
        description:
          "Complete your strategy design template and begin implementing your custom controller. Analyze the notebooks in the Hummingbot quants-lab repository to improve your strategy's analytical foundation. Set up your production environment and deploy a bot running at least three different controller configurations to gain practical deployment experience.",
      },
    ],
  },
  {
    week: 3,
    title: 'Implementation & Coaching',
    details: [
      {
        type: 'Personalized Office Hours',
        description:
          'Week 3 is dedicated to intensive implementation of your trading strategy with personalized support. Daily office hours with our expert instructors provide one-on-one guidance as you build your custom trading controller. These sessions offer the perfect opportunity to troubleshoot challenges, refine your approach, and ensure your strategy is market-ready.',
      },
      { sessionTitle: 'Office Hours with Mike', date: 'Tuesday September 23, 2025', type: 'Coaching' },
      { sessionTitle: 'Office Hours with Fede', date: 'Wednesday September 24, 2025', type: 'Coaching' },
      { sessionTitle: 'Office Hours with Mike', date: 'Thursday September 25, 2025', type: 'Coaching' },
      { sessionTitle: 'Office Hours with Fede', date: 'Friday September 26, 2025', type: 'Coaching' },
      {
        type: 'Week 3 Homework',
        description:
          "Complete the implementation of your custom trading controller and create a 5-minute video presentation that demonstrates your strategy in action. Your video should explain the strategy's concept, implementation details, and show it running in a production environmentpreparing you for the final Demo Day presentation.",
      },
    ],
  },
  {
    week: 4,
    title: 'Culmination & Certification',
    details: [
      {
        sessionTitle: 'Demo Day',
        date: 'Tuesday September 30, 2025',
        type: 'Presentation',
        description:
          "The culmination of your Botcamp journey arrives with Demo Day, where each participant's video presentation will be showcased to the entire cohort. This celebration of achievement gives you the opportunity to present your trading strategy to peers and instructors while learning from the diverse approaches of fellow participants. The session concludes with students voting for the Cohort MVP, recognizing exceptional innovation and execution in strategy development.",
      },
      {
        type: 'Official Certification',
        description:
          "Upon completing Demo Day, you'll be officially certified as a Hummingbot Market Maker. This prestigious recognition includes:",
        items: [
          'Addition to the official Hummingbot Certified Developers List',
          'Digital certification badge for your LinkedIn profile and resume',
          'Priority access to Hummingbot ecosystem opportunities and partnerships',
        ],
        footer:
          'Certification types include Market Maker, Strategy V2 Developer, and Script Developer based on your final project implementation.',
      },
    ],
  },
];

const WeekIcon = ({ weekNumber }: { weekNumber: number }) => {
  let actualIconSrc = `/week-1-icon.svg`; // default to week-1-icon.svg
  if (weekNumber === 0) actualIconSrc = `/week-0-icon.svg`;
  else if (weekNumber === 1) actualIconSrc = `/week-1-icon.svg`;
  else if (weekNumber === 2) actualIconSrc = `/week-2-icon.svg`;
  else if (weekNumber === 3) actualIconSrc = `/week-3-icon.svg`;
  else if (weekNumber === 4) actualIconSrc = `/week-4-icon.svg`;

  return (
    <div className="relative w-10 h-10 md:w-12 md:h-12 mr-4 md:mr-5 flex-shrink-0 rounded-full bg-black p-2 border border-gray-800">
      <Image 
        src={actualIconSrc} 
        alt={`Week ${weekNumber}`} 
        width={40} 
        height={40}
        className="drop-shadow-md"
      />
    </div>
  );
};

export default function CohortScheduleSection() {
  // State to track the selected cohort - default to blockchain-fundamentals
  const [selectedCohort, setSelectedCohort] = useState<string | null>('blockchain-fundamentals');

  // Find the selected cohort data
  const selectedCohortData = scheduleHighlights.find(cohort => cohort.id === selectedCohort);

  // Transform selected cohort schedule data to match weeklySchedule format
  const transformedSchedule = React.useMemo(() => {
    if (!selectedCohortData) return [];
    
    // Create a preparation week first
    const prepWeek = {
      week: 0,
      title: 'Preparation',
      details: [
        {
          type: 'Prework',
          description: `Get ready for your ${selectedCohortData.title} journey by reviewing the recommended resources and setting up your development environment. This preparation will help you make the most of the cohort experience.`,
        }
      ]
    };
    
    // Create weeks from the cohort data
    const cohortWeeks = selectedCohortData.schedule.map(weekData => ({
      week: weekData.week,
      title: weekData.title,
      details: [
        {
          type: `Week ${weekData.week}`,
          // Create structured details instead of a single text block
          description: '',
          // Add custom rendering data
          customContent: {
            topics: weekData.topics,
            pacing: weekData.pacing
          }
        }
      ]
    }));
    
    // Combine preparation week with cohort weeks
    return [prepWeek, ...cohortWeeks];
  }, [selectedCohortData]);

  // The schedule to display - always use transformedSchedule
  const displaySchedule = transformedSchedule;

  // Handle cohort card click
  const handleCohortClick = (cohortId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default navigation
    // If clicking the same cohort again, deselect it
    if (selectedCohort === cohortId) {
      setSelectedCohort(null);
    } else {
      setSelectedCohort(cohortId);
    }
  };

  return (
    <div className="py-20 md:py-28 bg-black text-white relative overflow-hidden -mt-1 mb-0">
      {/* Background effect */}
      <div className="absolute inset-0 bg-black"></div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-15"></div>
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Upcoming Cohorts
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-base md:text-xl text-gray-300 mb-6 leading-relaxed">
            Join our intensive cohort-based learning experiences designed to give you hands-on skills in blockchain technology and algorithmic trading. Our structured programs combine theory, practical application, and community support.
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            All cohorts include live sessions, interactive Q&A, and lifetime access to recordings and course materials. Limited spots available to ensure personalized attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {scheduleHighlights.map((highlight) => (
            <div
              key={highlight.id}
              onClick={(e) => handleCohortClick(highlight.id, e)}
              className={`bg-black backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center 
                border ${selectedCohort === highlight.id ? 'border-primary' : 'border-gray-800'} 
                shadow-lg w-full md:w-[95%] mx-auto transition-all duration-300 group cursor-pointer
                hover:border-primary/30`}
            >
              <div className={`relative w-16 h-16 mb-4 rounded-full bg-black flex items-center justify-center p-2 
                border ${selectedCohort === highlight.id ? 'border-primary' : 'border-gray-800'} 
                group-hover:border-primary/50 transition-colors`}>
                <Image 
                  src={highlight.icon} 
                  alt={highlight.title} 
                  width={40} 
                  height={40} 
                  className="drop-shadow-lg" 
                />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-heading group-hover:text-primary/80 transition-colors">{highlight.title}</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">{highlight.description}</p>
              <div className="mt-auto pt-4 border-t border-gray-800 w-full flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-400">{highlight.startDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-400">{highlight.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected cohort title if one is selected */}
        <AnimatePresence mode="wait">
          {selectedCohort && selectedCohortData && (
            <motion.div 
              key={`title-${selectedCohort}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">{selectedCohortData.title} Schedule</h3>
              <p className="text-gray-300">A {selectedCohortData.duration} journey starting {selectedCohortData.startDate}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weekly Schedule Section - Shows either default or selected cohort schedule */}
        {displaySchedule.map((weekData) => (
          <div key={weekData.week} className="mb-6 last:mb-0 bg-black rounded-md p-4 md:p-6 border border-gray-900 backdrop-blur-sm relative shadow-md">
            {weekData.week !== 0 && (
              <div className="absolute left-[2.5rem] -top-8 w-px h-8 bg-gradient-to-b from-transparent to-primary/50"></div>
            )}
            <div className="flex items-center mb-6 bg-black p-3 rounded-lg border border-gray-800 shadow-md">
              <WeekIcon weekNumber={weekData.week} />
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-1 block">
                  {weekData.week === 0 ? 'Preparation' : `Week ${weekData.week}`}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-primary font-heading">
                  {weekData.title}
                </h3>
              </div>
            </div>
            <div className="pl-0 md:pl-20 relative">
              {weekData.details.length > 1 && (
                <div className="absolute left-[5px] md:left-[calc(5rem+5px)] top-[1rem] bottom-[1rem] w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent -translate-x-1/2"></div>
              )}
              <Accordion type="single" collapsible className="w-full">
                {weekData.details.map((detail: SessionDetail, index) => (
                  <AccordionItem key={index} value={`week-${weekData.week}-detail-${index}`} className="border-b border-gray-800/30 last:border-b-0 relative mb-2 last:mb-0">
                    <AccordionTrigger className="py-4 text-left hover:no-underline group pl-8 md:pl-16 rounded-lg hover:bg-gray-900/50 transition-colors">
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className={`text-lg md:text-xl font-bold font-heading transition-colors ${
                              detail.type && !detail.sessionTitle && detail.type.toLowerCase().includes('homework') ? 'text-yellow-400 group-hover:text-yellow-300' :
                              detail.type && !detail.sessionTitle && detail.type.toLowerCase().includes('office hours') ? 'text-orange-300 group-hover:text-orange-200' :
                              detail.type && !detail.sessionTitle && detail.type.toLowerCase().includes('certification') ? 'text-fuchsia-300 group-hover:text-fuchsia-200' :
                              'text-foreground group-hover:text-primary'
                            }`}>
                            <span className="relative">{detail.sessionTitle || detail.type}</span>
                          </h4>
                          <div className="flex items-center mt-2 sm:mt-0 flex-shrink-0">
                            {detail.date && <p className="text-xs font-medium text-gray-400 mr-4 whitespace-nowrap">{detail.date}</p>}
                            {detail.type && (
                              <span
                                className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${
                                  detail.type === 'Theory'
                                    ? 'bg-sky-900/30 text-sky-200'
                                    : detail.type === 'Technical'
                                    ? 'bg-emerald-900/30 text-emerald-200'
                                    : detail.type === 'Coaching'
                                    ? 'bg-orange-900/30 text-orange-200'
                                    : detail.type === 'Presentation'
                                    ? 'bg-fuchsia-900/30 text-fuchsia-200'
                                    : detail.type.toLowerCase().includes('homework')
                                    ? 'bg-yellow-900/30 text-yellow-200'
                                    : detail.type.toLowerCase().includes('office hours')
                                    ? 'bg-orange-900/30 text-orange-200'
                                    : detail.type.toLowerCase().includes('certification')
                                    ? 'bg-fuchsia-900/30 text-fuchsia-200'
                                    : 'bg-gray-800/40 text-gray-200'
                                }`}
                              >
                                {detail.type}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8 md:pl-16 pb-5 pt-2 text-gray-300 text-sm md:text-base leading-relaxed">
                      <div className="bg-black p-4 py-5 md:p-5 rounded-md border border-gray-900 shadow-inner max-w-full overflow-visible">
                        {detail.customContent ? (
                          <div className="space-y-8">
                            <div className="bg-black rounded-xl p-5 border border-gray-800 shadow-md">
                              <h5 className="text-lg font-semibold mb-4 text-primary flex items-center">
                                <span className="bg-primary/20 p-1.5 rounded-md mr-3">
                                  <Calendar className="w-5 h-5 text-primary" />
                                </span>
                                Topics Covered
                              </h5>
                              <ul className="space-y-3 pl-2">
                                {detail.customContent.topics.map((topic, i) => (
                                  <li key={i} className="flex items-start group transition-all duration-200 hover:translate-x-1">
                                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-gray-200 group-hover:text-white transition-colors">{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-black rounded-xl p-5 border border-gray-800 shadow-md">
                              <h5 className="text-lg font-semibold mb-4 text-primary flex items-center">
                                <span className="bg-primary/20 p-1.5 rounded-md mr-3">
                                  <Clock className="w-5 h-5 text-primary" />
                                </span>
                                Suggested Pacing
                              </h5>
                              <div className="space-y-3">
                                {detail.customContent.pacing.map((pace, i) => (
                                  <div key={i} className="bg-black rounded-lg p-3.5 border border-gray-800 hover:border-primary/30 transition-colors shadow-sm">
                                    <p className="text-gray-200">{pace}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="bg-black rounded-xl p-5 border border-gray-800 shadow-md">
                              <p className="whitespace-normal text-gray-200 leading-relaxed">{detail.description}</p>
                              {detail.items && (
                                <ul className="list-none mt-4 space-y-3">
                                  {detail.items.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start group transition-all duration-200 hover:translate-x-1">
                                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                      <span className="text-gray-200 group-hover:text-white transition-colors whitespace-normal">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                            {detail.footer && <p className="mt-3 text-sm text-gray-400 italic whitespace-normal">{detail.footer}</p>}
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}
      </div>
      
      {/* Wave transition to next section */}
      <div className="absolute bottom-0 left-0 w-full">
        <Image 
          src="/wave-pattern.svg" 
          alt="Wave transition" 
          width={1440} 
          height={120}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}