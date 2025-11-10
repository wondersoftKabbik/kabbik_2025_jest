import TakaIcon from '@/svgs/TakaIcon.svg'
import React from 'react'

const SinglePaymentCard = ({selectedPayment,paymentName,handlePaymentSelect,img,amount}:{selectedPayment:string,handlePaymentSelect:(args:string)=>void,img:string,amount:number,paymentName:string}) => {
  return (
    <div className="flex max-w-[95vw] items-center gap-2 m-1">
        <button
          onClick={() => handlePaymentSelect(paymentName)}
          className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
            selectedPayment === paymentName ? ' bg-white' : 'bg-transparent'
          }`}
        >
          {selectedPayment === paymentName && <div className="w-2 h-2 bg-[#0E1D3F] rounded-full"></div>}
        </button>
        
        <div className="flex-1 bg-gradient-to-r rounded-[8px] from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] px-3">
          <div className="flex items-center justify-between">
            <img 
              src={img??''}
              alt="bKash" 
              className="h-11 md:h-14  w-auto"
            />
            <div className="flex items-center gap-2">
              <span className='w-6 h-6 inline-block'>
                <TakaIcon/>
              </span>
              <span className="text-white text-xl md:text-2xl font-medium">{amount}/-</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SinglePaymentCard