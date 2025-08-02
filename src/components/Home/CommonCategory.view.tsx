import React from 'react'
import Image from 'next/image';
import styles from './static/styles.module.css';
import Link from 'next/link';
// import MobileGreenPlayer from '../../svgs/MobileGreenPlayer';
// import DesktopCrown from '../../svgs/DesktopCrown';
import RightArrowIcon from '@/svgs/RightArrowIcon';
import PremiumCrownIcon from '@/svgs/PremiumIcon';
import RedPlayerIcon from '@/svgs/RedPlayerIcon';
// import DesktopCrown from '../../svgs/DesktopCrown';

type tProps={
    categoryName:string;
    link:string;
    data:any;
    isPopular?:boolean;
}
const CommonCategory = ({categoryName,link,data,isPopular}:tProps) => {
  return (
    <div className={styles.container}>
        <div className={styles.heading_container}>
            <h3 className={styles.heading}>{categoryName}</h3>
            <div className={styles.see_all}>
                সব দেখুন
                <span className={styles.arrow}><RightArrowIcon/></span>
            </div>
        </div>
        <div className={styles.banner_cont +` ${styles.root_banner_cont}` }>
            {data.map((item:any,index:number)=>(
                <Link href={`/audiobook_details/${item?.id}`}>
                    <div className={styles.item_cont} key={index}>
                        {isPopular?
                            <p className={styles.popular}>Most Popular</p>
                        :''}
                        <div className={styles.crown}>
                            <span><PremiumCrownIcon/></span>
                        </div>
                        <picture className={styles.picture}>
                            {/* <Image  alt={categoryName} width={100}/> */}
                            <img className={styles.img} src={item.imgUrl} alt={item.name}/>
                        </picture>
                        <p className={styles.player_count}>
                            <div>
                                <RedPlayerIcon/>
                            </div>
                            <span>{(item?.play_count/1000).toFixed(2)}k</span>
                        </p>
                    </div>
                </Link>
                
            ))}
        </div>
         <div className={styles.mobile_banner_cont}>
            {data?.slice(0,3).map((item:any,index:number)=>(
                <Link href={`/audiobook_details/${item?.id}`}>
                    <div className={styles.item_cont} key={index}>
                        {isPopular?
                            <p className={styles.popular}>Most Popular</p>
                        :''}
                        <div className={styles.crown}>
                            <span>
                                <PremiumCrownIcon/>
                            </span>
                        </div>
                        <picture className={styles.picture}>
                            {/* <Image  alt={categoryName} width={100}/> */}
                            {/* <img className={styles.img} src={item.imgUrl} alt={item.name}/> */}
                            <img className={styles.img} src={item.phone_img_url} alt={item.name}/>
                        </picture>
                        <p className={styles.player_count}>
                            <div>
                                <RedPlayerIcon/>
                            </div>
                            <span>{(item?.play_count/1000).toFixed(2)}k</span>
                        </p>
                    </div>
                </Link>
                
            ))}
        </div>
    </div>
  )
}

export default CommonCategory