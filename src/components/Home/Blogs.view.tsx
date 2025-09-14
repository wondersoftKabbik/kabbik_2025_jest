import { BlogInfo } from '@/helpers/commonTypes'
import { TBlogsProps } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from "./static/blogs.module.css";
import RightArrow from '@/svgs/RightArrow'
import CalenderIcon from '@/svgs/calenderIcon'
import { formatDate } from '@/helpers/commonFunction'
import UserIcon from '@/svgs/UserIcon'

const Blogs = ({blogs}:TBlogsProps) => {
    
    return (
    <div>
        <div>
            <div  className="blog mb-5">
                <Link href={`/blogs/${blogs.list[0].slug}`}>
                    <div className={`${styles.blogWrapper} rounded flex text-white`}>
                        <div className={' max-w-[70%] p-2'}>
                            <img
                                src={blogs.list[0].featured_image}
                                alt={blogs.list[0].alter_text_for_featured_image}
                            />
                        </div>
                        <div className=''>
                            <div className='flex items-center justify-between px-2.5 mt-3'>
                                <div className='flex bg-silicon py-1.5 px-2 rounded-[4px] items-center  bg-secon'>
                                    <span className='w-6 h-6 inline-block'>
                                        <CalenderIcon />
                                    </span>
                                    <p>{formatDate(blogs.list[0]?.publish_date,'bn')}</p>
                                </div>
                                
                            </div>
                            <div className={styles.content}>
                                <h1 className={styles.title}>{blogs.list[0].title}</h1>
                                <p className={styles.excerpt+" mt-9"}>{blogs.list[0].excerpt}</p>
                                <div className='btn-gradient-2 mt-9 w-[150px] py-2 rounded-[3px] text-center text-[13px]'>
                                    বিস্তারিত পড়ুন
                                    <span className='w-10 h-2 inline-block '>
                                        <RightArrow color={'white'}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <div
            className={`${styles.blogsContainer}`}
            style={{ color: "white" }}
        >
            {blogs.list.length ? (
            <div className={`${styles.blogsWrapper}`}>
                {blogs.list?.slice(0,3).map((blog) => (
                    <div key={blog.id} className="blog">
                        <Link href={`/blogs/${blog.slug}`}>
                            <div className={`${styles.blogWrapper} rounded`}>
                            <div className={styles.featureImageContainer}>
                                <img
                                    src={blog.featured_image}
                                    alt={blog.alter_text_for_featured_image}
                                />
                            </div>
                            <div className='flex items-center justify-between px-2.5 mt-3'>
                                <div className='flex items-center  '>
                                    <span className='w-6 h-6 inline-block'>
                                        <CalenderIcon />
                                    </span>
                                    <p>{formatDate(blog?.publish_date,'bn')}</p>
                                </div>
                                <div className='flex items-center px-3 '>
                                    <span className='w-4 h-4 inline-block'>
                                        <UserIcon />
                                    </span>
                                    <p>{blog?.author}</p>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h1 className={styles.title}>{blog.title}</h1>
                                {/* <p className={styles.excerpt}>{blog.excerpt}</p> */}
                                <div className='btn-gradient-2 w-[150px] py-2 rounded-[3px] text-center text-[13px]'>
                                    বিস্তারিত পড়ুন
                                    <span className='w-10 h-2 inline-block '>
                                        <RightArrow color={'white'}/>
                                    </span>
                                </div>
                            </div>
                            </div>
                        </Link>
                    </div>
                ))}
                {blogs.list?.slice(0,1).map((blog) => (
                    <div key={blog.id} className="blog">
                        <Link href={`/blogs/${blog.slug}`}>
                            <div className={`${styles.blogWrapper} rounded`}>
                            <div className={styles.featureImageContainer}>
                                <img
                                    src={blog.featured_image}
                                    alt={blog.alter_text_for_featured_image}
                                />
                            </div>
                            <div className='flex items-center justify-between px-2.5 mt-3'>
                                <div className='flex items-center  '>
                                    <span className='w-6 h-6 inline-block'>
                                        <CalenderIcon />
                                    </span>
                                    <p>{formatDate(blog?.publish_date,'bn')}</p>
                                </div>
                                <div className='flex items-center px-3 '>
                                    <span className='w-4 h-4 inline-block'>
                                        <UserIcon />
                                    </span>
                                    <p>{blog?.author}</p>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h1 className={styles.title}>{blog.title}</h1>
                                {/* <p className={styles.excerpt}>{blog.excerpt}</p> */}
                                <div className='btn-gradient-2 w-[150px] py-2 rounded-[3px] text-center text-[13px]'>
                                    বিস্তারিত পড়ুন
                                    <span className='w-10 h-2 inline-block '>
                                        <RightArrow color={'white'}/>
                                    </span>
                                </div>
                            </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            ) : (
            <div style={{ marginTop: "300px", textAlign: "center" }}>
                No blogs posted yet
            </div>
            )}
        </div>
    </div>
  )
}

export default Blogs