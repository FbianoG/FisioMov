import SectionHero from '../components/Layout/SectionHero'
import SectionPricing from '../components/Layout/SectionPricing'
import SectionAbout from '../components/Layout/SectionAbout'
import SectionTerapy from '../components/Layout/SectionTerapy'
import Header from '../components/Shared/Header'
import SectionTeam from '../components/Layout/SectionTeam'
import Footer from '../components/Shared/Footer'

export default function Home() {

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