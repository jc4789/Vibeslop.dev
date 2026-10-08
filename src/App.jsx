import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Session from './components/Session'
import Meter from './components/Meter'
import PitchGenerator from './components/PitchGenerator'
import Pricing from './components/Pricing'
import Review from './components/Review'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <a
        href="#session"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to the session
      </a>
      <Navbar />
      <main>
        <Hero />
        <Session />
        <Meter />
        <PitchGenerator />
        <Pricing />
        <Review />
      </main>
      <Footer />
    </div>
  )
}
