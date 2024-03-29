import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import {
  BsCaretDown,
  BsCaretLeft,
  BsCaretRight,
  BsHouseDoor,
} from "react-icons/bs";
import { BsNewspaper } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { BsPlusLg } from "react-icons/bs";
import { BsChatSquareText } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllPartners } from "@/app/services/getAllPartners";
import { ListboxWrapper } from "../ListboxWrapper";
import { usePathname } from "next/navigation";

type Props = {
  closeSidebar:()=>void;
}
const Sidebar = ({closeSidebar}:Props) => {
  const t = useTranslations("Header");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: getAllPartners,
  });

    
  const pathname = usePathname();
  const locale = useLocale();

  const items = [
    {
      key: 1,
      route: `/${locale}`,
      label: "home",
      icon: <BsHouseDoor />,
    },
    {
      key: 2,
      route: `/${locale}/crypto_news`,
      label: "crypto_news",
      icon: <BsNewspaper />,
    },
    {
      key: 3,
      route: `/${locale}/explanations`,
      label: "explanations",
      icon: <BsNewspaper />,
    },
    {
      key: 4,
      route: `/${locale}/all_articles`,
      label: "posts",
      icon: <GrArticle />,
    },
    {
      key: 5,
      label: "partners",
      icon: <BsPlusLg />,
    },
    {
      key: 6,
      route: `/${locale}/contact_us`,
      label: "contactus",
      icon: <BsChatSquareText />,
    },
    {
      key: 7,
      route: `/${locale}/who_us`,
      label: "whous",
      icon: <FaRegQuestionCircle />,
    }
  ];

  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  return (
    <div className="w-[300px] h-[100vh] bg-content1 border-small px-1 py-2 border-default-200 dark:border-default-100">
      <Listbox
        className="flex flex-col "
        items={items}
        aria-label="Dynamic Actions"
      >
        {(item) => (
          <ListboxItem key={item.key} textValue={item.label}>
            {item.route ? (
              <Link
                onClick={closeSidebar}
                href={item.route}
                className={`hover:text-primary flex items-center justify-start gap-2 text-lg ${pathname === item.route && 'text-primary'}`}
              >
                <span>{item.icon}</span>
                 <span>{t(item.label)}</span>
              </Link>
            ) : (
              <Dropdown className="relative">
                <DropdownTrigger>
                  <span
                    onClick={() => {
                      setOpenDropdown1(false), setOpenDropdown2(false);
                    }}
                    className="hover:text-primary flex gap-1 items-center cursor-pointer text-lg"
                  >
                    <BsPlusLg />
                    {t("partners")}
                  </span>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={data}>
                  <DropdownItem
                    onAction={() => {
                      setOpenDropdown2(false), setOpenDropdown1(!openDropdown1);
                    }}
                    className="text-md flex flex-row justify-between"
                    textValue="platforms"
                  >
                    <span className="text-md flex items-center flex-row justify-between">
                      {t("platforms")}
                      {locale === "ar" ? (
                        openDropdown1 ? (
                          <BsCaretDown className="text-primary" />
                        ) : (
                          <BsCaretLeft className="text-primary" />
                        )
                      ) : openDropdown1 ? (
                        <BsCaretDown className="text-primary" />
                      ) : (
                        <BsCaretRight className="text-primary" />
                      )}
                    </span>
                    {openDropdown1 && (
                      <ListboxWrapper>
                        {data && (
                          <Listbox aria-label="Actions">
                            {data
                              .filter((patner) =>
                                patner.name.includes("Exchange")
                              )
                              .map((obj, idx) => (
                                <ListboxItem key={idx} textValue={obj.name}>
                                  <Link
                                    href={obj.link}
                                    key={idx}
                                    className="flex flex-row justify-between items-center"
                                  >
                                    <span>{obj.name}</span>
                                    <img
                                      className="w-[25px] h-[25px] rounded-3xl"
                                      src={obj.image}
                                      alt=""
                                    />
                                  </Link>
                                </ListboxItem>
                              ))}
                          </Listbox>
                        )}
                      </ListboxWrapper>
                    )}
                  </DropdownItem>
                  <DropdownItem
                    onAction={() => {
                      setOpenDropdown2(!openDropdown2), setOpenDropdown1(false);
                    }}
                    className="text-md flex flex-row"
                    textValue="projects"
                  >
                    <span className="text-md flex items-center flex-row justify-between">
                      {t("projects")}
                      {locale === "ar" ? (
                        openDropdown2 ? (
                          <BsCaretDown className="text-primary" />
                        ) : (
                          <BsCaretLeft className="text-primary" />
                        )
                      ) : openDropdown2 ? (
                        <BsCaretDown className="text-primary" />
                      ) : (
                        <BsCaretRight className="text-primary" />
                      )}
                    </span>
                    {openDropdown2 && (
                      <ListboxWrapper>
                        {data && (
                          <Listbox aria-label="Actions">
                            {data
                              .filter(
                                (patner) => !patner.name.includes("Exchange")
                              )
                              .map((obj, idx) => (
                                <ListboxItem key={idx} textValue={obj.name}>
                                  <Link
                                    href={obj.link}
                                    key={idx}
                                    className="flex flex-row justify-between items-center"
                                  >
                                    <span>{obj.name}</span>
                                    <img
                                      className="w-[25px] h-[25px] rounded-3xl"
                                      src={obj.image}
                                      alt=""
                                    />
                                  </Link>
                                </ListboxItem>
                              ))}
                          </Listbox>
                        )}
                      </ListboxWrapper>
                    )}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
};

export default Sidebar;
