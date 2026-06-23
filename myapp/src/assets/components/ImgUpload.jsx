import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useDropzone} from 'react-dropzone'
import {MdCancel} from 'react-icons/md'
function ImgUpload({getimage}) {
let [files,setFiles]=useState([])

    let onDrop=(acceptedFile)=>{
    if(acceptedFile.length+files.length>5){
        alert("You can upload 5 img")
        return
    }
    let fileurl=acceptedFile.map(file=>({file,
        preview:URL.createObjectURL(file)}))
       setFiles((existingImg) => [...existingImg, ...fileurl]);
    }
    console.log(files)
     const {getRootProps, getInputProps} = useDropzone({onDrop,
        multiple:true,
        accept:"Image/*"
     })
  useEffect(() => {
  if (files.length > 0) {
    getimage(files);
  }
}, [files]);

     let ImgcancelHandler=(index)=>{
    let remainingImg=files.filter((file,i)=>i!==index)
    setFiles(remainingImg)
     }
  return (
    <>
    <div className='container-drop'>
    <div {...getRootProps()} className='img-control' >
      <input {...getInputProps()} />
      {
          <p className='upload-p'><i class="fa-solid fa-cloud-arrow-up"></i> Upload Img</p>
      }
    </div>
    <div>
        {
            files.map((imgfile,index)=><>
            <div className='file-img'>
            <img src={imgfile.preview} className='student-img'></img>
            <button className='cancel-btn' onClick={()=>ImgcancelHandler(index)}>
                <MdCancel/>
            </button>
            </div>
            </>)
        }
    </div>
    </div>
    </>
  )
}

export default ImgUpload
