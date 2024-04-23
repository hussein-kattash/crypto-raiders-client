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
    let title = '';
    if (locale === 'ar') {
      content = data?.content.ar;
      title = data?.title.ar;
    } else if (locale === 'en') {
      content = data?.content.en;
      title = data?.title.en;
    } else {
      content = data.content.ru;
      title = data?.title.ru;
    }

  // Handle HTML tags in the content
  const sanitizedContent = content.replace(/<\/?[^>]+(>|$)/g, '').slice(0,200); // Remove HTML tags


  return {
    title: title,
    description: sanitizedContent,
    alternates: {
      canonical: `/${locale}/post/${id}`,
    },
    twitter:{
      title: title,
      description: sanitizedContent,
      images:[
        {
          url:data?.image,
          width: 1260,
          height:800
        }
      ]
    },
    openGraph: {
      url:`/${locale}/post/${params.id}`,
      title: title,
      description: sanitizedContent,
      siteName:"Cryptoraiders",
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
