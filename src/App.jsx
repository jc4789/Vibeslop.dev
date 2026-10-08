import React, { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PitchGenerator from './components/PitchGenerator'
import SlopOMeter from './components/SlopOMeter'
import AutonomousAgents from './components/AutonomousAgents'
import AuraBadge from './components/AuraBadge'
import Soundboard from './components/Soundboard'
import DeploymentGuide from './components/DeploymentGuide'
import Footer from './components/Footer'

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const generatorRef = useRef(null)

  const scrollToPitchGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-fuchsia-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          soundEnabled={soundEnabled}
          onQuickPitch={scrollToPitchGenerator}
        />

        {/* Feature 1: The Pitch Deck Generator */}
        <PitchGenerator
          soundEnabled={soundEnabled}
          generatorRef={generatorRef}
        />

        {/* Feature 2: Slop-O-Meter code morpher */}
        <SlopOMeter
          soundEnabled={soundEnabled}
        />

        {/* Feature 3: Rogue Autonomous Agents Feed */}
        <AutonomousAgents
          soundEnabled={soundEnabled}
        />

        {/* Feature 4: Official Vibe Accreditation Certificate */}
        <AuraBadge
          soundEnabled={soundEnabled}
        />

        {/* Feature 5: Web Audio Soundboard */}
        <Soundboard
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />

        {/* Beginner Guide: Testing & Deploying */}
        <DeploymentGuide
          soundEnabled={soundEnabled}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
