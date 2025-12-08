"use client";

import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Password = ({ ...field }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          className="pr-9"
          autoComplete="current-password"
          {...field}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          <span className="sr-only">
            {isVisible ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Password;
