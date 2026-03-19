import React from 'react'
import TextType from './TextType'
import ShinyText from './ShinyText'
import { Disc3 } from 'lucide-react'

const HeroText = () => {
  return (
    <>
    <TextType className='dark:text-redwood-200/50 text-redwood-800/50 font-bold text-2xl' text={["Discover rare pressings","Discover timeless classics","fresh music drops"]}
                typingSpeed={150}
                  pauseDuration={2000}
                  showCursor
                  cursorCharacter="_"      
                  deletingSpeed={100} />
          <h1 className='text-7xl dark:text-redwood-500  m-5 font-bold'>
            <Disc3 className='inline text-redwood-400 animate-spin m-3' size="4rem" />
            <ShinyText text=' Spin the Sound - Feel the Soul'
                      color="#f2c357"
                      shineColor="#723015"
                      speed={6}
                      pauseOnHover={true}
                      />
        </h1>
    </>
  )
}

export default HeroText