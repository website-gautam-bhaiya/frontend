 
 
import { SyntheticEvent, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import './PublishPage.css'
import useNews from '../../hooks/useNews'; 
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import ImagePreview from '../../components/ImagePreview/ImagePreview';

const PublishPage = () => {

    const { auth, err, setErr } = useAuth();
    const { postArticle } = useNews();
    const [images, setImages] = useState<File[] | []>([]) 
    const [ isQuarterly, setIsQuarterly ]= useState<boolean>(false)
    const navigate = useNavigate();

    useEffect( () => {

        if(!auth.isLoggedIn) {
            navigate('/')
        }

        return () => {
            setErr( { message: "", isErr: false, statusCode: 200, type: "" } ) 
        }

    }, [auth])

    const handleChange = (e: SyntheticEvent) => { 
        const target = e.target as HTMLInputElement;

        if( target.files !== null)
        setImages([...images, target.files[target.files.length - 1] ])
    }; 
    
    const handleCategoryChange = (event: SyntheticEvent) => {

        const target = event.target as HTMLInputElement;

        if( target.value === 'Quarterly Results')
        {
            setIsQuarterly(true)
            return
        }

        setIsQuarterly(false)
    }
 
    

    const handleSubmit = async  (event: SyntheticEvent) => {
        
        
        const formData = new FormData()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = event.target as { [key: string]: any}

        console.log(target);
        
        formData.append('title', target[0].value)
        formData.append('author', target[1].value)
        formData.append('preview', target[2].value)

        for(let i = 0; i < images.length; i++) {
            formData.append('articleImages', images[i])
        }
 
        formData.append('imageCover', target[3].value)
        formData.append('body', target[5].value)
        formData.append('categories', target[6].value)
        
        if (isQuarterly) { 
            formData.append('subCategory', target[7].value)
        }
        
        
        
        event.preventDefault(); 
        const isSuccess = await postArticle(formData)
        if(isSuccess) {
            navigate('/')
        }
         
        
    } 
    
    return (

        <div className='publish--page'>
            <Header />
            <Navbar />
            <div> 
                <form onSubmit={handleSubmit} className="publish--form">
                    <input className='publish--input' placeholder="Enter title here..."/>
                    <input value={auth.user.name} className='publish--input' disabled placeholder="Author's Name"/>
                    <input className='publish--input' placeholder="Enter preview here..."/>
                    <input className='publish--input' placeholder="Enter link for cover image..."/>
                    <input onChange={handleChange} type='file'  name="myImage" accept='image/*'  />
                    <ImagePreview  images={images} setImages = {setImages}/>
                    <textarea placeholder="Start typing here..." >
                    </textarea>
    
        
                    <select onChange={handleCategoryChange} >
                        <option>Market Movers</option>
                        <option>Quarterly Results</option>
                        <option>Industry Analysis</option>
                        <option>Budget</option>
                        <option>News</option>
                    </select>

                    <select style={{'display': isQuarterly ? 'block' : 'none'}} >
                        <option>Quarter - I</option>
                        <option>Quarter - II</option>
                        <option>Quarter - III</option>
                        <option>Quarter - IV</option>
                    </select>
                    
                    <div>
                        <label className='err--label'>{err.message}</label>
                    </div>
                    <button className='post--btn'>Post</button>
                </form>
            </div>
            
        </div>
        )
}

export default PublishPage