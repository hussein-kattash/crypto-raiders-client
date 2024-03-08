"use cleint";
import {
  Select,
  SelectItem,
} from "@nextui-org/react";
import { locales } from "@/config";

import React, { useTransition } from "react";
import { useLocale, useTranslations} from "next-intl";
// import {usePathname} from "next/navigation"
import { usePathname,useRouter} from "@/navigation";

// import startT
const LocaleSwitcherSelect = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e:any)=>{
    router.replace(pathname,{locale:e.target.value})
  }
    

  return (
    <Select
    label={t("select")}
    className="sm:!w-[140px] w-[130px]"
    size="sm"
    variant="bordered"
    onChange={handleChange}
    selectedKeys={[locale]}
  >
    {locales.map((locale) => (
      <SelectItem key={locale} textValue={t(locale)}>
         <div className="flex justify-start items-center gap-2">
          {locale === 'en' && <img className="w-5" src="/us.png"/>}
          {locale === 'ru' && <img className="w-5" src="/russian.png"/>}
          {locale === 'ar' && <img className="w-5" src="/arabic.png"/>}
          <span className="sm:!text-sm text-xs">{t(locale)}</span>
         </div>
      </SelectItem>
    ))}
  </Select>
  );
};

export default LocaleSwitcherSelect;
