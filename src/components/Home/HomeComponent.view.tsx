import React from 'react'
import { THomeProps } from './static/home.types'
import Hero from './Hero.view';

const HomeComponent = (props:THomeProps) => {
    const {homeData,topBannerData,promoData,dict}=props;
  return (
    <div>
        <div>
            <Hero slidingData={topBannerData}/>
        </div>
    </div>
  )
}

export default HomeComponent