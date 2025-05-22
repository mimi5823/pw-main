"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, BookOpen, Award, ChevronDown, ChevronUp, CheckCircle, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function BlockchainFundamentalsCohort() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("curriculum");

  const toggleWeek = (weekNum: number) => {
    if (expandedWeek === weekNum) {
      setExpandedWeek(null);
    } else {
      setExpandedWeek(weekNum);
    }
  };

  const cohortData = {
    title: "Blockchain Fundamentals Cohort",
    subtitle: "Master the core concepts of blockchain technology in 4 weeks",
    duration: "4 Weeks",
    format: "1 Module per week",
    commitment: "3-5 hours per week",
    dailyEngagement: "30-60 minutes",
    startDate: "June 15, 2025",
    price: "$499",
    enrollmentStatus: "Open",
    spotsRemaining: 25,
    totalSpots: 50,
    instructor: "Dr. Alex Chen",
    instructorTitle: "Blockchain Researcher & Educator",
    instructorBio: "Dr. Chen has 8+ years of experience in blockchain development and education, having worked with major protocols and taught at leading universities.",
    benefits: [
      "Web3 Cheat Sheet: Your ultimate guide to everything Web3",
      "Exclusive Alpha Opportunities and earning ideas",
      "Access to a thriving community of experts and learners",
      "Unique perks across our ecosystem, available only to DAO members",
      "Rewards in the form of crypto tokens for active members"
    ]
  };

  const weeklySchedule = [
    {
      week: 1,
      title: "Introduction to Blockchain Technology",
      description: "Grasp the foundational concepts of what blockchain is and how it operates.",
      topics: [
        "What is Blockchain? (Defining principles: decentralization, transparency, immutability)",
        "Problems blockchain solves",
        "How a blockchain works (Blocks, chains, basic cryptography)",
        "Distributed Ledger Technology",
        "Types of Blockchains (Public, Private, Consortium)",
        "Key Concepts (Nodes, conceptual mining, basic consensus mechanisms like PoW/PoS)"
      ],
      suggestedPacing: [
        { days: "1-2", duration: "45-60 min/day", focus: "Focus on 'What is Blockchain?' and 'How it Works'" },
        { days: "3", duration: "45-60 min", focus: "Cover 'Types of Blockchains' and 'Key Concepts'" },
        { days: "4", duration: "30-45 min", focus: "Review of the week's material, perhaps with some simple quiz questions" }
      ],
      estimatedTime: "~3 - 4 hours for the week"
    },
    {
      week: 2,
      title: "Cryptocurrencies: The First Application",
      description: "Understanding digital currencies, with a spotlight on Bitcoin and the basics of handling crypto.",
      topics: [
        "What is Cryptocurrency? (Digital vs. traditional currency, role of cryptography)",
        "Bitcoin: The Pioneer (History, significance)",
        "Altcoins: An Overview (Brief intro, e.g., Ethereum as a platform)",
        "Wallets and Exchanges (Conceptual: how to store/acquire, public/private keys simply explained, basic types of exchanges)"
      ],
      suggestedPacing: [
        { days: "1", duration: "45-60 min", focus: "'What is Cryptocurrency?' and its core features" },
        { days: "2", duration: "45-60 min", focus: "Deep dive into Bitcoin" },
        { days: "3", duration: "45-60 min", focus: "Introduction to Altcoins and the concept of Wallets" },
        { days: "4", duration: "30-45 min", focus: "Understanding Exchanges (conceptual) and a review of the week" }
      ],
      estimatedTime: "~3 - 4 hours for the week"
    },
    {
      week: 3,
      title: "The Expanding Blockchain Ecosystem (Web3)",
      description: "Exploring the broader applications and components of the Web3 space beyond just currencies.",
      topics: [
        "Smart Contracts: Automated Agreements (Basic concept, no coding, potential uses)",
        "Decentralized Applications (DApps) (What they are, conceptual differences from traditional apps)",
        "Non-Fungible Tokens (NFTs) (Understanding NFTs, digital ownership, use cases)",
        "Decentralized Autonomous Organizations (DAOs) (Intro to DAOs, community governance)",
        "Introduction to Decentralized Finance (DeFi) (What is DeFi? Simple explanations of lending, borrowing, DEXs, stablecoins)"
      ],
      suggestedPacing: [
        { days: "1", duration: "45-60 min", focus: "Smart Contracts and DApps" },
        { days: "2", duration: "45-60 min", focus: "Focus on NFTs" },
        { days: "3", duration: "45-60 min", focus: "Introduction to DAOs" },
        { days: "4", duration: "60 min", focus: "Introduction to DeFi core concepts" },
        { days: "5", duration: "30-45 min", focus: "Review and connecting how these elements form the Web3 ecosystem" }
      ],
      estimatedTime: "~4 - 5 hours for the week"
    },
    {
      week: 4,
      title: "Blockchain in the Real World & Future Outlook",
      description: "Connecting blockchain concepts to practical applications and considering its future trajectory.",
      topics: [
        "Real-World Use Cases (Examples in supply chain, healthcare, etc. - conceptual)",
        "Understanding the Landscape (Basic overview of blockchain infrastructure, different protocols high-level)",
        "Opportunities and Challenges (Benefits, scalability, regulation, adoption)",
        "Legal and regulatory considerations (awareness)",
        "The Future of Web3 (Speculative overview)"
      ],
      suggestedPacing: [
        { days: "1", duration: "45-60 min", focus: "Explore Real-World Use Cases across different industries" },
        { days: "2", duration: "45-60 min", focus: "Understanding the broader landscape and different protocols" },
        { days: "3", duration: "45-60 min", focus: "Discussing Opportunities, Challenges, and regulatory aspects" },
        { days: "4", duration: "30-45 min", focus: "Contemplating the Future of Web3 and cohort wrap-up" }
      ],
      estimatedTime: "~3 - 4 hours for the week"
    }
  ];

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
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
              {cohortData.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {cohortData.subtitle}
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <motion.div variants={itemVariants} className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-start">
              <Calendar className="w-10 h-10 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Duration</h3>
                <p className="text-gray-300">{cohortData.duration}</p>
                <p className="text-sm text-gray-400 mt-1">{cohortData.format}</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-start">
              <Clock className="w-10 h-10 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Time Commitment</h3>
                <p className="text-gray-300">{cohortData.commitment}</p>
                <p className="text-sm text-gray-400 mt-1">{cohortData.dailyEngagement} on study days</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-start">
              <Users className="w-10 h-10 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Enrollment</h3>
                <p className="text-gray-300">{cohortData.enrollmentStatus}</p>
                <p className="text-sm text-gray-400 mt-1">{cohortData.spotsRemaining} of {cohortData.totalSpots} spots remaining</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-start">
              <BookOpen className="w-10 h-10 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Start Date</h3>
                <p className="text-gray-300">{cohortData.startDate}</p>
                <p className="text-sm text-gray-400 mt-1">Enrollment closes June 10</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-6 text-lg">
              Enroll Now for {cohortData.price}
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg">
              Download Syllabus
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <Tabs value={activeTab} defaultValue="curriculum" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="curriculum" className="space-y-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Curriculum Overview</h2>
              <p className="text-gray-300 mb-8">
                Our Blockchain Fundamentals Cohort is designed to provide a comprehensive introduction to blockchain technology over four weeks. 
                Each week builds upon the previous one, creating a solid foundation of knowledge that will prepare you for more advanced blockchain topics.
              </p>
              
              <div className="space-y-6">
                {weeklySchedule.map((week) => (
                  <div 
                    key={week.week} 
                    className="border border-gray-800 rounded-xl overflow-hidden"
                  >
                    <div 
                      className={`p-6 flex justify-between items-center cursor-pointer ${
                        expandedWeek === week.week ? 'bg-gray-800' : 'bg-gray-900'
                      }`}
                      onClick={() => toggleWeek(week.week)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4">
                          {week.week}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{week.title}</h3>
                          <p className="text-gray-400">{week.description}</p>
                        </div>
                      </div>
                      {expandedWeek === week.week ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    
                    {expandedWeek === week.week && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 bg-gray-900"
                      >
                        <div className="pt-4 border-t border-gray-800">
                          <h4 className="text-lg font-semibold mb-3 text-primary">Topics Covered</h4>
                          <ul className="space-y-2 mb-6">
                            {week.topics.map((topic, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">{topic}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <h4 className="text-lg font-semibold mb-3 text-primary">Suggested Pacing</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {week.suggestedPacing.map((pace, index) => (
                              <div key={index} className="bg-gray-800 rounded-lg p-4">
                                <p className="text-sm text-gray-400">Day{pace.days.includes('-') ? 's' : ''} {pace.days}</p>
                                <p className="text-white font-medium">{pace.duration}</p>
                                <p className="text-sm text-gray-300 mt-2">{pace.focus}</p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-gray-800 rounded-lg p-4 inline-block">
                            <p className="text-sm text-gray-400">Estimated Time</p>
                            <p className="text-white font-medium">{week.estimatedTime}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="instructor" className="space-y-8">
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-6xl font-bold text-white">
                    AC
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h2 className="text-2xl font-bold mb-2">{cohortData.instructor}</h2>
                  <p className="text-primary mb-4">{cohortData.instructorTitle}</p>
                  <p className="text-gray-300 mb-6">
                    {cohortData.instructorBio}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">PhD in Distributed Systems</h4>
                        <p className="text-sm text-gray-400">Stanford University</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Author of "Blockchain Fundamentals"</h4>
                        <p className="text-sm text-gray-400">Published 2023, 10,000+ copies sold</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Taught 5,000+ Students</h4>
                        <p className="text-sm text-gray-400">Across online and in-person courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="benefits" className="space-y-8">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Cohort Benefits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">What You'll Learn</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Fundamental blockchain concepts and terminology</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">How cryptocurrencies work and their relationship to blockchain</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">The broader Web3 ecosystem including NFTs, DAOs, and DeFi</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Real-world applications and the future of blockchain technology</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Critical thinking skills to evaluate blockchain projects and opportunities</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">What You'll Get</h3>
                  <ul className="space-y-4">
                    {cohortData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-gray-800 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="w-6 h-6 text-primary mr-2" />
                  Completion Certificate
                </h3>
                <p className="text-gray-300 mb-4">
                  Upon successful completion of the cohort, you'll receive a verifiable certificate that you can add to your LinkedIn profile and resume.
                  This certificate demonstrates your understanding of blockchain fundamentals and commitment to learning cutting-edge technology.
                </p>
                <div className="flex items-center text-primary">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <Link href="#" className="text-sm hover:underline">View sample certificate</Link>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="space-y-8">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-gray-800 py-2">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Do I need any prior knowledge to join this cohort?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    No prior blockchain knowledge is required. This cohort is designed for beginners who are curious about blockchain technology. 
                    Basic computer literacy and an interest in technology are all you need to get started.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-b border-gray-800 py-2">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Is this a technical or programming-focused course?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    This cohort focuses on conceptual understanding rather than technical implementation. While we'll cover some technical aspects of how 
                    blockchain works, there is no coding or programming required. The course is designed to build a strong foundation of knowledge that can 
                    later be applied to more technical learning if desired.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border-b border-gray-800 py-2">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    What happens if I miss a week or fall behind?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    All course materials remain accessible throughout the cohort and for 6 months afterward. If you fall behind, you can catch up at your own pace. 
                    We recommend trying to stay on schedule to benefit from the community discussions, but the flexible format allows you to learn at a pace that works for you.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border-b border-gray-800 py-2">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Are there any live sessions or is it all self-paced?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    The cohort is primarily self-paced with structured weekly modules. We do offer optional weekly live Q&A sessions with the instructor 
                    where you can ask questions and discuss the material with fellow participants. These sessions are recorded for those who cannot attend live.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="border-b border-gray-800 py-2">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    What can I do after completing this cohort?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    After completing this cohort, you'll have a solid foundation in blockchain technology that will prepare you for more specialized learning. 
                    You might choose to explore technical aspects like smart contract development, focus on specific applications like DeFi, or apply your knowledge 
                    to business use cases. Many graduates use this knowledge to evaluate blockchain projects for investment or to identify opportunities in their current industry.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6" className="border-b border-gray-800 py-2">
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    Is there a refund policy?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Yes, we offer a 7-day satisfaction guarantee. If you're not satisfied with the cohort within the first week, you can request a full refund. 
                    After the first week, refunds are considered on a case-by-case basis.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-8 p-6 bg-gray-800 rounded-xl text-center">
                <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
                <p className="text-gray-300 mb-4">Reach out to our team and we'll be happy to help.</p>
                <Button className="bg-primary hover:bg-primary/90 text-black">Contact Us</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 border border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 md:flex items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your blockchain journey?</h2>
              <p className="text-xl text-gray-300 mb-6">
                Join our next cohort and build the foundation for your future in Web3.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <span className="text-gray-300">{cohortData.spotsRemaining} spots remaining</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-primary mr-2" />
                  <span className="text-gray-300">Starts {cohortData.startDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  <span className="text-gray-300">{cohortData.commitment}</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-6 text-lg w-full md:w-auto">
                Enroll Now for {cohortData.price}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}