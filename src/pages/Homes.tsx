import SectionHero from '../components/Layout/Home/SectionHero'
import SectionPricing from '../components/Layout/Home/SectionPricing'
import SectionAbout from '../components/Layout/Home/SectionAbout'
import SectionTerapy from '../components/Layout/Home/SectionTerapy'
import Header from '../components/Shared/Header'
import SectionTeam from '../components/Layout/Home/SectionTeam'
import Footer from '../components/Shared/Footer'
import { useEffect } from 'react'

export default function Home() {

    useEffect(() => { sessionStorage.clear() }, [])

    return (
        <>
            <Header />
            <SectionHero />
            <SectionPricing />
            <SectionAbout />
            <span className='section__divider'></span>
            <SectionTerapy />
            <SectionTeam />
            <span className='section__divider'></span>
            <Footer />
        </>
    )
} 