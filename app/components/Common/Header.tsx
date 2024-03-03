"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import Link from "next/link";
import LocaleSwitcherSelect from "../LocaleSwitcherSelect";
import { useLocale, useTranslations } from "next-intl";
import { BsHouseDoor } from "react-icons/bs";
import { BsNewspaper } from "react-icons/bs";
import { GrArticle } from "react-icons/gr";
import { BsPlusLg } from "react-icons/bs";
import { BsChatSquareText } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getAllPartners } from "../../services/getAllPartners";
import { ListboxWrapper } from "../ListboxWrapper";
import { BsCaretLeft, BsCaretRight, BsCaretDown } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Header = () => {
  let t = useTranslations("Header");
  const header = useRef<any>();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: getAllPartners,
  });
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  const locale = useLocale();

  return (
    <div ref={header} className="w-full fixed z-[100] h-[83px] top-0 bg-content1 flex justify-between items-center px-[5%] py-2 border-b">
      <div className="w-[90px] flex justify-between xl:!justify-start items-center">
        <Link href={"/"}>
          <Image src="/logo.png" alt="Cryptoraiders" className="w-24" />
        </Link>
      </div>
      <div
        className={`xl:hidden sidebar_ flex absolute top-[83px] z-[20] ${
          openSidebar
            ? locale === "ar"
              ? "right-0"
              : "left-0"
            : locale === "ar"
            ? "right-[-300px]"
            : "left-[-300px]"
        }`}
      >
        <Sidebar closeSidebar={()=>setOpenSidebar(false)}/>
      </div>
      <div className="w-[70%] xl:flex hidden justify-center px-8">
        <div className="flex flex-row items-center justify-around w-full">
          <Link
            href="/"
            className="hover:text-primary duration-500 flex gap-1 items-center"
          >
            <BsHouseDoor /> {t("home")}
          </Link>
          <Link
            href="/crypto_news"
            className="hover:text-primary duration-500 flex gap-1 items-center"
          >
            <BsNewspaper /> {t("crypto_news")}
          </Link>
          <Link
            href="/explanations"
            className="hover:text-primary duration-500 flex gap-1 items-center"
          >
            <BsNewspaper /> {t("explanations")}
          </Link>
          <Link
            href="/all_articles"
            className="hover:text-primary duration-500 flex gap-1 items-center"
          >
            <GrArticle /> {t("posts")}
          </Link>
          <Dropdown className="relative">
            <DropdownTrigger>
              <span
                onClick={() => {
                  setOpenDropdown1(false), setOpenDropdown2(false);
                }}
                className="hover:text-primary flex gap-1 items-center cursor-pointer text-md"
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
                          .filter((patner) => patner.name.includes("Exchange"))
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
                          .filter((patner) => !patner.name.includes("Exchange"))
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
          <Link
            href="/contact_us"
            className="hover:text-primary duration-500 flex gap-1 items-center"
          >
            <BsChatSquareText /> {t("contactus")}
          </Link>
          <Link
            href="/who_us"
            className="hover:text-primary duration-500 flex gap-1 items-center"
          >
            <FaRegQuestionCircle /> {t("whous")}
          </Link>
          <Link
            href="https://t.me/Gue7araa"
            className="duration-500 text-lg p-2 rounded-lg hover:!text-white bg-primary font-bold"
          >
            FOR BUSINESS
          </Link>
        </div>
      </div>
      <div className="xl:!w-[180px] w-[280px]  flex  items-center justify-end gap-2">
        <Button
          onClick={() => setOpenSidebar(!openSidebar)}
          className="xl:hidden flex"
          isIconOnly
          color="primary"
          aria-label="Like"
        >
          {!openSidebar && <FaBars className="text-xl" />}
          {openSidebar && <IoClose className="text-3xl" />}
        </Button>
        <LocaleSwitcherSelect />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
