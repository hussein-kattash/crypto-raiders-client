import { useLocale } from "next-intl";
 
export const ListboxWrapper = ({ children }:any) => {
    const Locale = useLocale()
  return (
    <div className={`w-full absolute ${Locale === 'ar' ? 'sm:!left-[-255px] left-[-100px]' : 'right-[-255px]'} sm:!top-0 top-5 bg-content1 z-10 sm:!min-w-[260px] w-[200px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100`}>
      {children}
    </div>
  );
};
