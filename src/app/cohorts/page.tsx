"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, Users, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

// Define types for the schedule
type ScheduleItem = {
  week: number;
  title: string;
  topics: string[];
  pacing: string[];
};

// Weekly Schedule Tabs Component
const WeeklyScheduleTabs = ({ schedule }: { schedule: ScheduleItem[] }) => {
  const [activeTab, setActiveTab] = useState("week1");
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="week1">Week 1</TabsTrigger>
        <TabsTrigger value="week2">Week 2</TabsTrigger>
        <TabsTrigger value="week3">Week 3</TabsTrigger>
        <TabsTrigger value="week4">Week 4</TabsTrigger>
      </TabsList>
      
      {schedule.map((week, index) => (
        <TabsContent key={index} value={`week${week.week}`} className="border border-gray-800 rounded-xl p-6 bg-black">
          <div className="mb-4">
            <h4 className="text-xl font-bold text-primary mb-2">Week {week.week}: {week.title}</h4>
            <p className="text-gray-300 mb-4">
              Focus on understanding the core concepts and building a solid foundation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-lg font-semibold mb-3 text-white">Topics Covered</h5>
              <ul className="space-y-2">
                {week.topics.map((topic, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-3 text-white">Suggested Pacing</h5>
              <div className="space-y-3">
                {week.pacing.map((pace, i) => (
                  <div key={i} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
                    <p className="text-gray-300">{pace}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function CohortsPage() {
  const [selectedCohort, setSelectedCohort] = useState('blockchain');

  const cohorts = [
    {
      id: 'blockchain',
      name: 'Blockchain Fundamentals',
      startDate: 'June 15, 2025',
      duration: '4 Weeks',
      spots: '25/30 Filled',
      description: 'A comprehensive introduction to blockchain technology, cryptocurrencies, and the expanding Web3 ecosystem.',
      image: '/blockchain-cohort.jpg',
      level: 'Beginner',
      instructor: 'Dr. Alex Morgan',
      price: '$499',
      featured: true
    },
    {
      id: 'smart-contracts',
      name: 'Smart Contract Development',
      startDate: 'July 10, 2025',
      duration: '6 Weeks',
      spots: '18/25 Filled',
      description: 'Learn to build, test, and deploy smart contracts on Ethereum and other blockchain platforms.',
      image: '/smart-contract-cohort.jpg',
      level: 'Intermediate',
      instructor: 'Sarah Chen',
      price: '$699',
      featured: false
    },
    {
      id: 'defi',
      name: 'DeFi Principles',
      startDate: 'August 5, 2025',
      duration: '5 Weeks',
      spots: '12/20 Filled',
      description: 'Explore decentralized finance protocols, yield farming, liquidity provision, and DeFi security.',
      image: '/defi-cohort.jpg',
      level: 'Intermediate',
      instructor: 'Michael Rodriguez',
      price: '$599',
      featured: false
    },
    {
      id: 'web3-security',
      name: 'Web3 Security',
      startDate: 'September 1, 2025',
      duration: '4 Weeks',
      spots: '15/20 Filled',
      description: 'Master security best practices for blockchain applications, smart contracts, and Web3 infrastructure.',
      image: '/security-cohort.jpg',
      level: 'Advanced',
      instructor: 'Dr. Elena Petrov',
      price: '$799',
      featured: false
    }
  ];

  // Blockchain Fundamentals Cohort Detailed Schedule
  const blockchainSchedule = [
    {
      week: 1,
      title: 'Introduction to Blockchain Technology',
      topics: [
        'What is Blockchain? (Decentralization, transparency, immutability)',
        'Problems blockchain solves',
        'How a blockchain works (Blocks, chains, basic cryptography)',
        'Distributed Ledger Technology',
        'Types of Blockchains (Public, Private, Consortium)',
        'Key Concepts (Nodes, conceptual mining, basic consensus mechanisms)'
      ],
      pacing: [
        'Day 1-2: Focus on "What is Blockchain?" and "How it Works"',
        'Day 3: Cover "Types of Blockchains" and "Key Concepts"',
        'Day 4: Review of the week\'s material with quiz questions'
      ]
    },
    {
      week: 2,
      title: 'Cryptocurrencies: The First Application',
      topics: [
        'What is Cryptocurrency? (Digital vs. traditional currency, cryptography)',
        'Bitcoin: The Pioneer (History, significance)',
        'Altcoins: An Overview (Brief intro to Ethereum as a platform)',
        'Wallets and Exchanges (Conceptual: storage, public/private keys, exchanges)'
      ],
      pacing: [
        'Day 1: "What is Cryptocurrency?" and its core features',
        'Day 2: Deep dive into Bitcoin',
        'Day 3: Introduction to Altcoins and the concept of Wallets',
        'Day 4: Understanding Exchanges and week review'
      ]
    },
    {
      week: 3,
      title: 'The Expanding Blockchain Ecosystem (Web3)',
      topics: [
        'Smart Contracts: Automated Agreements (Basic concept, potential uses)',
        'Decentralized Applications (DApps) (Conceptual differences from traditional apps)',
        'Non-Fungible Tokens (NFTs) (Digital ownership, use cases)',
        'Decentralized Autonomous Organizations (DAOs) (Community governance)',
        'Introduction to Decentralized Finance (DeFi) (Lending, borrowing, DEXs, stablecoins)'
      ],
      pacing: [
        'Day 1: Smart Contracts and DApps',
        'Day 2: Focus on NFTs',
        'Day 3: Introduction to DAOs',
        'Day 4: Introduction to DeFi core concepts',
        'Day 5: Review and connecting Web3 ecosystem elements'
      ]
    },
    {
      week: 4,
      title: 'Blockchain in the Real World & Future Outlook',
      topics: [
        'Real-World Use Cases (Supply chain, healthcare, etc.)',
        'Understanding the Landscape (Blockchain infrastructure, protocols)',
        'Opportunities and Challenges (Benefits, scalability, regulation, adoption)',
        'Legal and regulatory considerations',
        'The Future of Web3 (Speculative overview)'
      ],
      pacing: [
        'Day 1: Explore Real-World Use Cases across different industries',
        'Day 2: Understanding the broader landscape and different protocols',
        'Day 3: Discussing Opportunities, Challenges, and regulatory aspects',
        'Day 4: Contemplating the Future of Web3 and cohort wrap-up'
      ]
    }
  ];

  // Exclusive benefits for cohort members
  const exclusiveBenefits = [
    {
      title: 'Web3 Cheat Sheet',
      description: 'Your ultimate guide to everything Web3',
      icon: <BookOpen className="w-6 h-6 text-primary" />
    },
    {
      title: 'Alpha Opportunities',
      description: 'Exclusive earning ideas and opportunities',
      icon: <Award className="w-6 h-6 text-primary" />
    },
    {
      title: 'Community Access',
      description: 'Join a thriving community of experts and learners',
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      title: 'Ecosystem Perks',
      description: 'Unique perks available only to DAO members',
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Cohort-Based</span> Learning
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join our immersive cohort programs and learn alongside a community of like-minded individuals. 
              Our structured approach ensures you gain practical skills with expert guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                View Schedule
              </Button>
            </div>
          </motion.div>

          {/* Featured Cohorts */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {cohorts.map((cohort) => (
              <motion.div
                key={cohort.id}
                variants={itemVariants}
                className={`bg-gray-900 rounded-xl overflow-hidden border ${
                  cohort.featured ? 'border-primary' : 'border-gray-800'
                } hover:border-primary/70 transition-all duration-300 shadow-xl`}
                onClick={() => setSelectedCohort(cohort.id)}
              >
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <Image
                    src={cohort.image || '/placeholder-cohort.jpg'}
                    alt={cohort.name}
                    fill
                    className="object-cover"
                  />
                  {cohort.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-black px-3 py-1 rounded-full text-xs font-bold z-20">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                      {cohort.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{cohort.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{cohort.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>Starts {cohort.startDate}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{cohort.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      <span>{cohort.spots}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">{cohort.price}</span>
                    <Link 
                      href={`/cohorts/${cohort.id}`}
                      className="text-primary hover:text-primary/80 flex items-center text-sm font-medium"
                    >
                      View Details <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Cohort Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="gradient-text">Blockchain Fundamentals</span> Cohort
            </h2>

            <div className="bg-black rounded-2xl border border-gray-800 overflow-hidden shadow-xl mb-12">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4 text-white">4-Week Immersive Program</h3>
                    <p className="text-gray-300 mb-6">
                      Our Blockchain Fundamentals cohort is designed to give you a comprehensive understanding of blockchain technology, 
                      cryptocurrencies, and the expanding Web3 ecosystem. Perfect for beginners looking to establish a solid foundation.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Start Date</p>
                          <p className="font-medium">June 15, 2025</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Duration</p>
                          <p className="font-medium">4 Weeks</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Class Size</p>
                          <p className="font-medium">30 Students</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Commitment</p>
                          <p className="font-medium">3-5 hours/week</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button size="lg" className="bg-primary text-black hover:bg-primary/90">
                        Apply Now
                      </Button>
                      <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        Download Syllabus
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                      <h4 className="text-lg font-bold mb-4 text-white">What You'll Get</h4>
                      <ul className="space-y-3">
                        {exclusiveBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mt-1 mr-3">{benefit.icon}</div>
                            <div>
                              <p className="font-medium text-white">{benefit.title}</p>
                              <p className="text-sm text-gray-400">{benefit.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Weekly Schedule</h3>
              
              <WeeklyScheduleTabs schedule={blockchainSchedule} />
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Next Cohort?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Spaces are limited to ensure personalized attention and a collaborative learning environment. 
                Secure your spot in our upcoming Blockchain Fundamentals cohort today.
              </p>
              <Button size="lg" className="bg-primary text-black hover:bg-primary/90">
                Apply Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}