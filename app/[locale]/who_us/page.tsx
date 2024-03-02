import React from 'react'
import AboutUS  from '@/app/components/WhoUS/AboutUS';
import SocialMediaChannel from '@/app/components/WhoUS/SocialMediaChannel';
import TeamMembers from '@/app/components/WhoUS/TeamMembers';
import Partners from '@/app/components/Partners';

const WhoUs = () => {
  return (
    <div>
      <AboutUS/>
      <TeamMembers/>
      <SocialMediaChannel/>
      <Partners/>
    </div>
  )
}

export default WhoUs;