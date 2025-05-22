import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

function UserProfile() {
    const {user,backendurl,setuser,usertoken }=useContext(AppContext)
    const [isedit,setisedit]=useState(false)
    const [image,setimage]=useState(null)
    const [skill,setskill]=useState([])
    const [learn,setlearn]=useState([])
    const [name,setname]=useState('')
    const [description, setdescription] = useState('')

    useEffect(() => {
        if (user) {
            setskill(user.skill||[])
            setlearn(user.learn||[])
            setname(user.name||'')
            setdescription(user.description||'')
        }
    }, [user]);

    const handleSkillDelete=(itemindex)=>{
        setskill(prev=>prev.filter((_,index)=>index!==itemindex))
    };

 const handleLearnDelete=(itemindex)=>{
        setlearn(prev=>prev.filter((_,index)=>index!==itemindex))
    };

    const handleAddSkill=(e)=>{
        if (e.key==='Enter')
             {
            e.preventDefault();
            const value=e.target.value.trim()
  if (value==='') return; 
       const exists=skill.some(item => 
                item.toLowerCase()===value.toLowerCase()
            )
            if (!exists) {
                setskill(prev=>[...prev,value])
                e.target.value = ''
            } else {
                toast.error('This skill already exists');
            }
        }
    }

    const handleAddLearn=(e)=>{
        if(e.key==='Enter') {
            e.preventDefault()
            const value=e.target.value.trim();
            if (value==='') return            
            const exists=learn.some(item=>item.toLowerCase() === value.toLowerCase())
            if (!exists) {
                setlearn(prev=>[...prev,value])
                e.target.value=''
            }
             else{
                toast.error('This learning item already exists')
            }
        }}

    const cleanArrays=()=>{
        setskill(prev=>prev.filter(item=>item.trim()!==''))
        setlearn(prev=>prev.filter(item=>item.trim()!==''))
    }
const handleSave=async()=>{
        try {
            cleanArrays();
            if(!name.trim())
                 {
                toast.error('name cannot be empty')
                return
            }
            const formData=new FormData();
            formData.append('name',name.trim());
            formData.append('description',description.trim());
            formData.append('userid',user._id);
            formData.append('skill',JSON.stringify(skill));
            formData.append('learn',JSON.stringify(learn));
            if (image) 
                {
                formData.append('image',image);
            }
            const {data}=await axios.post(backendurl+'/updateinfo', formData, {
                headers: {
                    token: usertoken
                }
            });
            if (data.success) 
                {
                setuser(prev=>({...prev,name:name.trim(),description:description.trim(),
                    skill,learn,image:image?URL.createObjectURL(image):prev.image
                }))
                setisedit(false);
                toast.success('Updated Successfully')
            } else {
                toast.error(data.message)
            }
        } 
        catch(error)
        {
            toast.error(error.message);
        }
    }
    return (
        <div className='bg-white'>
            {/* image part */}
            <div className='flex justify-center cursor-pointer'>
                {isedit ?
                    <label htmlFor='image' className='cursor-pointer'>
                        <img className='w-[200px] h-[200px] rounded-full object-cover' src={image?URL.createObjectURL(image):user.image}/>
                        <input type="file" onChange={(e) => e.target.files[0] && setimage(e.target.files[0])} 
                            className='mt-20' id="image" accept="image/*" hidden />
                    </label>
                    :
                    <img src={user.image} className='w-[200px] h-[200px] rounded-full object-cover'/>
                }
            </div>
    <hr className='mt-2 mb-2' />
            <div className='p-6'>
                {/* Name */}
                <div className='flex gap-4 items-center'>
                    <h1 className='text-xl mt-1'>Name: </h1>
                    {isedit ?
                        <input  type="text" value={name} onChange={(e) => setname(e.target.value)} className='border-2 rounded-xl p-1' required/>
                        :
          <p className='border-2 rounded-xl p-1 text-xl'>{user.name}</p>
                    }
                </div>
                <hr className='mt-2 mb-2' />

                {/* Email */}
                <h1 className='text-xl mt-1'>Email: {user.email}</h1>
                <hr className='mt-2 mb-2' />
                {/* Skills */}
                <div className='mb-4'>
                    <h1 className='text-xl mt-2'>Skills:</h1>
                    <ul className='list-disc list-inside'>
      {skill.filter(item=>item.trim()!=='').map((item,index)=>(
             <li key={index} className='mt-1 ml-6 text-blue-700 text-lg'>{item}
            {isedit && (<button className="text-red-500 ml-2"  onClick={()=>handleSkillDelete(index)} aria-label={`Remove ${item}`}> X</button>
                                )}
                            </li>
                        ))}
                    </ul>
                    {isedit && (
                        <input  type="text"  placeholder='Addenw  skill & Enter'  onKeyDown={handleAddSkill}   className='border mt-2 p-1 w-full max-w-md' />
                    )}
                </div>
                <hr className='mt-2 mb-2' />
                {/* Learning */}
                <div className='mb-4'>
                    <h1 className='text-xl mt-2'>Want to learn:</h1>
                    <ul className='list-disc list-inside'>
                        {learn.filter(item=>item.trim()!=='').map((item,index)=>(
                            <li key={index} className='mt-1 ml-6 text-blue-700 text-lg'>
                                {item}
                                {isedit && ( <button  className="text-red-500 ml-2"  onClick={()=>handleLearnDelete(index)}  aria-label={`Remove ${item}`} >X</button>
                                )}
                            </li>
                        ))}
                    </ul>
                    {isedit && (
                        <input  type="text"  placeholder='add new  learning & enter' onKeyDown={handleAddLearn}   className='border mt-2 p-1 w-full max-w-md' />
                    )}
                </div>
                <hr className='mt-2 mb-2' />
                {/* Description */}
                <div className='mb-4'>
                    <h1 className='text-xl mt-2 font-bold'>Description</h1>
                    {isedit ?
                        <textarea 
                            className='border ml-10 mt-3 p-2 w-full h-[200px] outline-none rounded-xl' value={description} onChange={(e) => setdescription(e.target.value)}  placeholder='Tell us about yourself...'/>
                        :
                        <div>
                            <h2 className='ml-8 text-gray-600 text-lg font-serif'>
                                {user.description||'No description added yet'}
                            </h2>
                        </div>
                    }
                </div>
                <hr className='mt-2 mb-2' />
                {/* Button */}
                <div className='flex justify-center mt-8 mb-8 gap-4'>
                    {isedit ? (
                        <>
                            <button className='bg-green-600 p-2 rounded-lg font-bold text-2xl font-serif text-white hover:bg-green-700 transition'  onClick={handleSave} >
                                Save
                            </button>
                            <button 
                                className='bg-gray-600 p-2 rounded-lg font-bold text-2xl font-serif text-white hover:bg-gray-700 transition'
                                onClick={() => setisedit(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button 
                            className='bg-purple-600 p-2 rounded-lg font-bold text-2xl font-serif text-white hover:bg-purple-700 transition'
                            onClick={() => setisedit(true)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;