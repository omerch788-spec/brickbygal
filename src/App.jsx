import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import MinifigBuilder from './components/MinifigBuilder'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import LegoBg from './components/LegoBg'

export default function App() {
  return (
    <>
      <LegoBg />
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <MinifigBuilder />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
