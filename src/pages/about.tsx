import React from 'react'

const about = () => {
  return (
      <div className="col-md-6 offset-md-3 mt-5 mb-12">
          <div>
              <p className='text-[22px] text-[#2566EB] font-semibold'>Introduction</p>
<p className='pt-1 text-justify'>My name is Oyedele Musa Funso, a Software Engineer based in Lagos, Nigeria. I have close to 2 years of professional experience in software development. I major on MERN stack. 
I single-handedly built the Image Compressor using JavaScript as the main language and Tailwindcss for the styling.</p>
          </div>
          <div className='pt-4'>
              <p className='text-[22px] text-[#2566EB] font-semibold'>Story of How The Project Was Inspired</p>
              <p className='pt-1 text-justify'>The Silicon Valley series inspired me to embark on this project. It was an eye-opening series, especially for aspiring software engineers like me. In the show, a team of young software engineers develops an algorithm that can compress massive data in less than 5 minutes. This helps save costs and energy.</p>
              <p></p>
          </div>
          <div>
          <div className='pt-4'>
              <p className='text-[22px] text-[#2566EB] font-semibold'>Technology & Architecture</p>
              <p className='font-semibold pt-1 text-[18px]'>Technology</p>
              <p className='font-semibold'>Programming Language: <span className='font-normal'>JavaScript</span></p>
              <p className='font-semibold'>Frameworks and Libraries: <span className='font-normal'>NextJs and TailwindCSS</span></p>
              <p className='font-semibold'>Database: <span className='font-normal'>MongoDB</span></p>
          </div>
          <div className='pt-2'>
            <p className='font-semibold pt-1 text-[18px]'>Architecture</p>
            <p className='font-semibold'>Monolithic: <span className='font-normal'>It is a monolithic type of project that combines both the client-side and server-side within a single application.</span></p>
          </div>
          </div>

          <div className='pt-4'>
              <p className='font-semibold text-[#2566EB] text-[22px]'>Contact me</p>
              <p className='pt-1'>Tel: <a href="tel:+234810609197"><span className='text-[#2566EB]'>+234-810-609-197</span></a></p>
            <p className='pt-1'>Email: <a href="mailto:musaoyedele3@gmail.com"><span className='text-[#2566EB]'>musaoyedele3@gmail.com</span></a></p>

              <div className='text-[#2566EB] pt-2 text-[22px] flex'>                  
        <a href="https://github.com/mfoyedele" className="fa fa-github mr-3"></a>
        <a href="https://www.linkedin.com/in/musa-funso-oyedele-14b262195" className="fa fa-linkedin mr-3"></a>
        <a href="https://twitter.com/realfunso" className="fa fa-twitter"></a>
              </div>
          </div>
      </div>
  )
}

export default about