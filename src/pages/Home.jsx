import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import TrustBadges from '../components/TrustBadges';
import Services from '../components/Services';
import TreatmentProcess from '../components/TreatmentProcess';
// import ExpertProfiles from '../components/ExpertProfiles';
// import VideoTestimonials from '../components/VideoTestimonials';
import Reviews from '../components/Reviews';
import SuccessStories from '../components/SuccessStories';
import ConsultationForm from '../components/ConsultationForm';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <TrustBadges />
      <Services />
      <TreatmentProcess />
      {/* <ExpertProfiles /> */}
      {/* <VideoTestimonials /> */}
      <Reviews />
      <SuccessStories />
      <ConsultationForm />
      <FAQ />
    </>
  );
}