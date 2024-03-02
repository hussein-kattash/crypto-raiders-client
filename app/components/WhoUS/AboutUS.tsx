"use client"
import { useTranslations } from 'next-intl';
import React from 'react'

const AboutUS = () => {
  let t = useTranslations("whous");
  return (
    <div className='mt-8'>
       <div className=''>
         <div>
            <h2 className='border-b border-primary w-[90px]'>{t("title")}</h2>
         </div>
         <div className='flex flex-col gap-4 mt-6'>
         <p>{t("text1")}</p>
         <p>{t("text2")}</p>
         <p>{t("text3")}</p>
         </div>
       </div>
    </div>
  )
}

export default AboutUS;
