import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Features from '../components/Features';
import Tips from '../components/Tips';
import HowItWorks from '../components/HowItWorks';
import VideoSection from '../components/VideoSection';
import Pricing from '../components/Pricing';
import Insight from '../components/Insight';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Welcome = () => {
  return (
    <>
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <Tips />
      <HowItWorks />
      <VideoSection />
      <Pricing />
      <Insight />
      <CTA />
      <Footer />
    </>
  );
};

export default Welcome;
