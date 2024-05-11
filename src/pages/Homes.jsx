import SectionHero from '../components/Layout/SectionHero'
import SectionPricing from '../components/Layout/SectionPricing'
import SectionAbout from '../components/Layout/SectionAbout'
import SectionTerapy from '../components/Layout/SectionTerapy'
import Header from '../components/Shared/Header'

export default function Home() {

    return (
        <>
            <Header />
            <SectionHero />
            <SectionPricing />
            <SectionAbout />
            <span className='section__divider'></span>
            <SectionTerapy />
        </>
    )
} 