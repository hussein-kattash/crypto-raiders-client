import CardDetails from "@/app/components/CardDetails";
import { base_url } from "@/app/services/api-client";
import { Metadata } from "next";
import { useLocale } from "next-intl";
import React from "react";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = useLocale();
  const id = params.id;
  const url = `${base_url}/get-post/` + id;
  const data = await fetch(url).then((res) => res.json());

    // Extract the content based on the locale
    let content = '';
    if (locale === 'ar') {
      content = data?.content.ar;
    } else if (locale === 'en') {
      content = data?.content.en;
    } else {
      content = data.content.ru;
    }

  // Handle HTML tags in the content
  const sanitizedContent = content.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML tags


  return {
    metadataBase:new URL(`https://cryptoraiders.org/${locale}/post/${params.id}`),
    title: locale === 'ar' ? data?.title.ar : locale === 'en' ? data?.title.en : data.title.ru,
    description: sanitizedContent,
    twitter:{
      title: locale === 'ar' ? data?.title.ar : locale === 'en' ? data?.title.en : data.title.ru,
      description: sanitizedContent,
      images:[data?.image]
    },
    openGraph: {
      url:`https://cryptoraiders.org/${locale}/post/${params.id}`,
      title: locale === 'ar' ? data?.title.ar : locale === 'en' ? data?.title.en : data.title.ru,
      description: sanitizedContent,
          images:[data?.image]
        }
  };
}


const PostDetails = () => {
  return(
    <>
      <CardDetails/>
    </>
  )
};

export default PostDetails;
