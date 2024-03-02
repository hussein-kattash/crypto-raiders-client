"use client";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { GrContact } from "react-icons/gr";
import emailjs from '@emailjs/browser';
import { RiMailSendLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  let t = useTranslations("Contact");
  const success = () => toast.success(t("success"), {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });;
  
    const failed = () => toast.error(t("failed"), {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });;
  const items = ["cooperation", "problem", "ads", "consultation"];
  const [loading, setLoading] = useState(false);
  const insialValue = {
    user_email:"",
    reason:"",
    message:""
  }
  const [messageInfo, setMessageInfo] = useState({
    user_email: "",
    reason:"",
    message: "",
  });

  const form:any = useRef();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm('service_9e4ibcm', 'template_jwfrvl9', form.current, {
        publicKey: 'EucXh6ItZsmPlel6c',
      })
      .then(
        () => {
          setLoading(false);
          setMessageInfo(insialValue);
          success();
        },
        (error) => {
           failed();
        },
      );
  };

 
  return (
    <div className="mt-10">
      <ToastContainer/>
      <div className="flex items-center gap-3">
        <h2 className="text-3xl">{t("title")}</h2>
        <GrContact className="text-3xl text-primary" />
      </div>
      <div className="mt-10 md:!text-xl text-md text-justify flex justify-center lg:!w-[60%] w-[100%] mx-auto">
        <span>
          {t("text1")}{" "}
          <Link className="underline hover:text-primary" href={"https://t.me/Gue7araa"}>
            {t("here")}
          </Link>{" "}
          <span>{t("text2")}</span>
        </span>
      </div>
      <form
        className="lg:!w-[60%] w-[100%] mx-auto mt-6 flex flex-col gap-6"
        onSubmit={handleSubmit}
        ref={form}
      >
        <Input
          isRequired
          name="user_email"
          type="email"
          label={`${t("email")}`}
          placeholder="example@gmail.com"
          className="w-[100%]"
          size="sm"
          value={messageInfo.user_email}
          onChange={(e) =>
            setMessageInfo({ ...messageInfo, user_email: e.target.value })
          }
        />
        <Select
          name="reason"
          value={messageInfo.reason}
          onChange={(e) =>
            setMessageInfo({ ...messageInfo, reason: e.target.value })
          }
          label={t("select")}
          className="w-[100%]"
          size="sm"
          isRequired
        >
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {t(`${item}`)}
            </SelectItem>
          ))}
        </Select>
        <Textarea
          name="message"
          value={messageInfo.message}
          onChange={(e) =>
            setMessageInfo({ ...messageInfo, message: e.target.value })
          }
          isRequired
          label={`${t("message")}`}
          placeholder={`${t("placeholder")}`}
        />
        <Button
          type="submit"
          className="text-lg"
          endContent={<RiMailSendLine />}
          color="primary"
          isLoading={loading}
        >
          {t("send")}
        </Button>
      </form>
    </div>
  );
};

export default Contact;
