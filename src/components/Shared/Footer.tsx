import './Footer.css'

const Footer = () => {

   return (
      <footer className='reveal'>

         <div className="banner reveal">
            <div className="banner__data">
               <h2>Venha fazer parte desse movimento!</h2>
               <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <button>Faça seu cadastro!</button>
         </div>

         <div className="content reveal">
            <div className="content__data">
               <h1>FisioMov</h1>
               <span>@ 2023</span>
            </div>
            <div className="content__data">
               <h2>Site</h2>
               <a href='#hero'>Início</a>
               <a href='#about'>Sobre Nós</a>
               <a href='#team'>Nosso Time</a>
            </div>
            <div className="content__data">
               <h2>Links</h2>
               <a href='https://www.instagram.com/arq_fisio/' target='_blank'>@fisioMov</a>
               <a href='https://www.instagram.com/arq_fisio/' target='_blank'>WhatsApp</a>
               <a href='https://www.instagram.com/arq_fisio/' target='_blank'>Facebook</a>
            </div>


         </div>

      </footer>
   )
}

export default Footer