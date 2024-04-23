

import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

import './AboutUs.css'

const AboutUs = () => {


    return (
        <div className='about--page'>

            <header>
                <Header />
                <Navbar />
            </header>

            <div className='about--page--container'>

                <h1 className='heading'>About NiveshKari</h1>
                <p className='content--1'>
                    Welcome to <em><b>Niveshkari</b></em>. At Niveshkari, we are dedicated to providing you with the best, intact and precise news and fundamentals of the company. We aim for an Investor to have the knowledge about the business as well as the fundamentals and trends along with the industry trends of the company and Industry. 
                </p>

                <p className='content--2'>
                    Meet the Visionaries Behind Niveshkari. 
                    Founded by <em><b>Gautam Nainani</b></em> & <em><b>Kshitij Rai</b></em> in 2024. 
                    Niveshkari was born from a shared passion for Share Markets & Overall Finance World. With a combined experience of more than a decade in markets, our founders bring a wealth of expertise and insight to the table. They are pursuing CFA & FMVA on the academics front and have been active in the markets for the last few years & they aim to build a platform for investors where they get knowledge about the industry and business where their money is invested. </p>

                <div className='content--3'> 
                    <p>Developed by:</p>
                    <div className='developers--container'>
                        <div >
                            <span><b>Prasoon Upadhyay</b></span>
                            <div>
                                <span> <a className='social--icons' href='https://www.linkedin.com/in/prasoon-upadhyay-22170a226/' target='_blank'><FaLinkedinIn /></a> </span>
                                <span> <a className='social--icons' href='https://github.com/Prasoon-Upadhyay' target='_blank'> <FiGithub /> </a></span> 
                            </div>
                        </div>
                        <div>
                            <span> <b> Prakhar Rai </b> </span>
                            <div>
                                <span> <a className='social--icons' href='https://www.linkedin.com/in/prakhar-rai-a8b282228/' target='_blank'> <FaLinkedinIn /> </a></span>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>

            <Footer />

        </div>
    )
}

export default AboutUs