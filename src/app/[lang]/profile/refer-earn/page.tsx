import { ReferralData } from '@/components/ReferAndEarn/static/refeAndEarn.type';
import SubscribedHomePage from '@/components/ReferAndEarn/SubscribedHomePage';
import UnSubscribedHomePage from '@/components/ReferAndEarn/UnSubscribedHomePage'
import { fetchReferAndEarn } from '@/utils/apiServices'
import React from 'react'

const page = async() => {
    let response:ReferralData= await fetchReferAndEarn();

  return (
    <div>
        <UnSubscribedHomePage data={response}/>
        <SubscribedHomePage data={response}/>
    </div>
  )
}

export default page