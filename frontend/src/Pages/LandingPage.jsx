import React, { useRef } from 'react'
import { BookOpenCheck, DollarSign, GroupIcon, LucideGroup, LucideHome, PhoneCall, SaveOffIcon, ScanFaceIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
function LandingPage() {
const benefitsRef=useRef(null)
const howworkRef=useRef(null)
const aboutmeRef=useRef(null)
const homeref=useRef(null)
const navigate=useNavigate()
const scrollToSection = (ref) => {
  ref.current.scrollIntoView({ behavior: 'smooth' });
}


  return (
    <div className='p-2 bg-[#242424]'>
{/* navbar */}
<div className='fixed top-0 left-0 w-full z-50 bg-blue-600  border-b shadow-md'>
        <div className='flex justify-between items-center p-4 max-w-7xl mx-auto'>
          <div className='bg-white p-2 rounded-xl cursor-pointer'>
            <h1 className=' text-xl font-bold text-blue-600 ' onClick={()=>scrollToSection(homeref)}>SkillShare</h1>
          </div>
          <div className='flex text-white  gap-6 items-center'>
            <h1 className='shadow-white rounded-xl px-1 font-serif cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]' onClick={()=>scrollToSection(benefitsRef)}>Benefits</h1>
            <h1 className='shadow-white rounded-xl px-1 p-2 font-serif cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]' onClick={()=>scrollToSection(howworkRef)}>How it Works</h1>
            <h1 className='shadow-white rounded-xl px-1 p-2 font-serif cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]' onClick={()=>scrollToSection(aboutmeRef)}>About Me</h1>
          </div>
          <div>
            <button onClick={()=>navigate('/login')} className='p-2 bg-slate-700 text-white rounded-2xl font-serif font-semibold'>Login/Signup</button>
          </div>
          
        </div>
      </div>

{/* ABoout website */}
<div  ref={homeref} className="pt-24"> {/* Add top padding */}
  <div className='flex justify-center'>
    <h1 className='text-center text-green-600 text-4xl font-serif mt-20 '>Connect, Learn, and Grow Together</h1>
  </div>
  <div className='text-center mt-5'>
    <p className='text-white font-serif '>SkillShare is a platform where you can register your skills and what you want to learn. <br />
    Connect with others who share your interests and learn ft-onn each other!</p>
  </div>
<div className='mt-10 text-center'>
  <button onClick={()=>navigate('/login')} className='bg-blue-500 p-2 px-14 rounded-2xl font-serif font-bold text-xl text-white'>Get Started</button>
</div>
</div>

{/* benefits section */}

<div ref={benefitsRef} className='bg-slate-50 mt-20 rounded-md' >
<div className='flex justify-center mt-40'>
  <h1 className='text-center mt-20 text-3xl font-serif mb-10 font-bold'>why to choose SkillShare?</h1>
</div>
{/* benefits container */}
<div className='p-8  flex justify-between rounded-lg gap-4'>
  {/*  */}
  <div className='border p-4 rounded-xl'>
<div className='flex gap-3 items-center'>
  <BookOpenCheck className='bg-blue-300 text-white p-1 rounded-xl' size={40}/>
  <h2 className='font-bold text-lg'>learn From Peers</h2>
</div>
<div className='mt-4'>
  <h1 className='text-gray-700 font-thin'>Connect with people who have the skills you
want to learn and learn in a more personal,
engaging way.</h1>
</div>
  </div>

  {/*  */}
  <div className='border p-4 rounded-xl'>
<div className='flex gap-3 items-center'>
  <GroupIcon className='bg-blue-300 text-white p-1 rounded-xl' size={40}/>
  <h2 className='font-bold text-lg'>Teach & Earn</h2>
</div>
<div className='mt-4'>
  <h1 className='text-gray-700 font-thin'>Share your expertise with others who want to
learn your skills and build your teaching
portfolio.</h1>
</div>
  </div>
  {/*  */}
  <div className='border p-4 rounded-xl'>
<div className='flex gap-3 items-center'>
  <LucideHome className='bg-blue-300 text-white p-1 rounded-xl' size={40}/>
  <h2 className='font-bold text-lg'>Safe Environment</h2>
</div>
<div className='mt-4'>
  <h1 className='text-gray-700 font-thin'>Connect with people who have the skills you
want to learn and learn in a more personal,
engaging way.</h1>
</div>
  </div>
</div>

</div>


{/* how it works */}

<div ref={howworkRef} className='mt-20 mb-10'>
<h1 className='text-center text-4xl  font-serif text-white'>How SkillShare Works ?</h1>
<div className='flex items-center gap-10 p-20'>
  <div className=''>
    <img className='w-[600px] rounded-xl h-[400px]' src="https://cdn.dribbble.com/userupload/14940721/file/original-2fa5f23014a4231a5d200ef9c1913419.png" alt="" />
  </div>
  <div className='flex flex-col gap-4'>
    <div className='flex gap-3 border p-2 bg-white rounded-lg items-center'>
      <div className='rounded-full p-1'>
        <h1 className='bg-gray-300 px-2 rounded-full text-red-700'>1</h1>
      </div>
      <div>
        <h1 className='text-xl font-bold'>Mention Your Skill</h1>
        <p className='text-gray-700 font-serif'>Create your profile and list the skills you're  proficient in. <br /> Be specific about
        what you can teach others.</p>
      </div>
    </div>
    {/*  */}
    <div className='flex gap-3 border p-2 bg-white rounded-lg items-center'>
      <div className='rounded-full p-1'>
        <h1 className='bg-gray-300 px-2 rounded-full text-red-700'>1</h1>
      </div>
      <div>
        <h1 className='text-xl font-bold'>Mention What You Want to Learn</h1>
        <p className='text-gray-700 font-serif'>Add the skills you're interested in acquiring. The more details you provide, the
        tter matches we can find.</p>
      </div>
    </div>
    {/*  */}
    <div className='flex gap-3 border p-2 bg-white rounded-lg items-center'>
      <div className='rounded-full p-1'>
        <h1 className='bg-gray-300 px-2 rounded-full text-red-700'>1</h1>
      </div>
      <div>
        <h1 className='text-xl font-bold'>Connect with Matches</h1>
        <p className='text-gray-700 font-serif'>Our system will show you people who want to leam what you know and can
        teach what you want to learn.</p>
      </div>
    </div>
    {/*  */}
    <div className='flex gap-3 border p-2 bg-white rounded-lg items-center'>
      <div className='rounded-full p-1'>
        <h1 className='bg-gray-300 px-2 rounded-full text-red-700'>1</h1>
      </div>
      <div>
        <h1 className='text-xl font-bold'>Start Learning & Teaching</h1>
        <p className='text-gray-700 font-serif'>Message Your matches,set-up learning sessions and begin your skill sharing journey</p>
      </div>
    </div>

  </div>
</div>
</div>


{/* About Me */}

<div ref={aboutmeRef} className='bg-white rounded-lg'>
  <div className='flex justify-center'>
<h1 className='text-center text-3xl mt-10 mb-10 font-bold font-serif'>About The Developer?</h1>
  </div>
  <div className='flex p-10 items-center gap-8'>
    <div> <img src="https://avatars.githubusercontent.com/u/157037723?v=4" className='rounded-full' alt="" /></div>
    <div>
    <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Hi, I'm the developer behind SkillShare</h3>
    <p className='text-gray-600 mb-6'>
  SkillShare is a full-stack web application built to connect learners and mentors seamlessly. <br />
  I developed the platform using the MERN stack – React.js for the frontend, Node.js and Express.js <br /> for the backend, and MongoDB for the database.
</p>

<p className='text-gray-600 mb-6'>
  The application features secure authentication using JWT (JSON Web Tokens), <br /> allowing users to sign up, log in, and manage sessions securely. <br />
  I implemented RESTful APIs for core functionalities like user management, content display, <br /> and interaction between users.
</p>

<p className='text-gray-600 mb-6'>
  On the frontend, React Router enables smooth navigation across different sections like Benefits, <br /> How It Works, and About. <br />
  Tailwind CSS is used for styling, ensuring a responsive and modern UI across devices.
</p>

<p className='text-gray-600 mb-6'>
  This project enhanced my skills in full-stack development, state management, <br /> API integration, authentication, and UI/UX design best practices.
</p>

              
    </div>
  </div>
</div>




      <div className='p-10 rounded-md mt-4 flex justify-between mb-10 '>
        <div className='text-white'>
          <div className='bg-white inline-block text-black p-2 rounded-lg'>
            <h1 className='text-xl font-bold font-serif'>SkillShare</h1>
          </div>

            <p className='ml-2 mt-4 text-md'>SkillShare Hub is a community-driven platform where people <br /> learn and share skills they’re passionate about — from tech and design to music and more. <br /> Whether you're here to teach or learn, we've got something for everyone. Let’s grow together!

</p>
        </div>
        <div className='text-white mr-20'>
            <div className=' underline text-xl font-bold flex gap-4 cursor-pointer items-center'>
<h2><PhoneCall/></h2>
            <h2>Contact Me</h2>
            </div>
            <div className='mt-4 cursor-pointer'>
            <p>Gmail: kaushalrauniyar1@gmail.com</p>
            <p>Phone-N.O: 8235914724</p>

            </div>
        </div>

      </div>

    </div>
  )
}

export default LandingPage
