import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import './PrivacyTermsPage.css'

const PrivacyTermsPage = () => {
    return (
        <div className='privacy--terms--page'>
            <header>
                <Header />
                <Navbar />
            </header>

            <div className='privacy--terms--page--container'>

                <h1 className='heading'>Privacy Policy & Terms</h1>
                <p className='content--1'>
                    <em><b>NiveshKari</b></em> &nbsp; Ltd. recognizes the importance of maintaining the privacy of every user who visits our website. We value your privacy and appreciate your trust in us. We are committed to be transparent about the data we collect about you, how it is used and with whom it is shared. 
                    This Privacy Policy applies when you use/visit our website, mobile or tablet application, or any other online service that links or refers to it. It does not govern or apply to information collected or used by <em><b>NiveshKari</b></em> &nbsp;.
 
                </p>

                <p className='content--2'> 
                    By accessing and/or using the website, you signify your agreement to accept this privacy policy. 
                    If you do not agree with any or all of the following terms of the privacy policy, please do not access and/or use the website. 
                    Providing information to us is your choice. You understand that any data, information, content or information that you submit to the website will be stored on <em><b>NiveshKari</b></em> &nbsp; server for the purposes of making the website available to you. Please do not submit to the website any data, information, content or information which would include any personal information and sensitive personal data or information that you do not wish to be made available to <em><b>NiveshKari</b></em> &nbsp;. If you do not agree with any or all of the terms of this privacy policy, please do not provide any information to us. If at any time you wish to discontinue your access to the website, you are free to do so.
                </p>

                <p className='content--3'> 
                    We reserve the right, at our sole discretion, to change or modify this privacy policy at any time without prior notice. 
                    Such changes and/or modifications shall become effective immediately upon being posted/published on the website herein.
                    Please review the privacy policy from time-to-time. 
                    Your continued use of the website following the posting of changes and/or modifications will constitute your acceptance of any revised privacy policy. NiveshKari retains the right at any time to deny or suspend access to all or part of the website to anyone who NiveshKari &nbsp; believes has violated any condition of this privacy policy.

                </p> 

            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default PrivacyTermsPage
