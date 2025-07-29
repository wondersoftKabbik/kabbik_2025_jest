import React from 'react'
import styles from '@/components/ui/static/styles.module.css';
import { spinnerClassNames } from './static/tailwind.classes';

const CommonButton = (props:TCommonBtnProps) => {
  const {isLoading,disabled,children,handleClick,className} = props;
  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={className ?? `${styles.commounBtnBg} px-5 py-0.5 rounded flex items-center justify-center`}
    >
      {isLoading?
      <div className={spinnerClassNames()}></div>
      :''}
      {children}
    </button>
  )
}

export default CommonButton