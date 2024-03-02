"use client";

import { Button } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { CiBrightnessUp } from "react-icons/ci";
import { CiDark } from "react-icons/ci";


export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const changeTheme = ()=>{
    if(theme === 'dark'){
      setTheme('light')
    }else{
      setTheme('dark')
    }
  }

  if(!mounted) return null

  return (
    <div>
      <Button isIconOnly className="text-2xl bg-primary" onClick={changeTheme}>
        {theme === 'dark' && <CiBrightnessUp/>}
        {theme === 'light' && <CiDark/>}
      </Button>
    </div>
  )
};
