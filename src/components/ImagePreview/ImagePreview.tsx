import './ImagePreview.css'
import { FaTrash } from "react-icons/fa";
import { VscEmptyWindow } from "react-icons/vsc"; 


const ImagePreview = ( { images, setImages }: { images: File[] | [], setImages: React.Dispatch<React.SetStateAction<File[] | []>> }) => { 
    
    
    const imgPreviewed = images.map(img => <div className='img--container'>
            <img className='preview--image' src={URL.createObjectURL(img)} />
            <div className="img--meta">
                <span>{img.name}</span><FaTrash onClick = { () => setImages(images.filter(image => img !== image )) } className='img--remove' />
            </div>
        </div>)
        
    const content = images.length > 0 ? imgPreviewed :  <h1>No Images Selected <VscEmptyWindow /> </h1> 

    return ( 
            <div className='preview--container'> 
                {content} 
            </div> 
    )
}

export default ImagePreview