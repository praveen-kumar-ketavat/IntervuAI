"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/components/FullScreenLoader";
import { Button } from "@/components/ui/button";

interface Props {
  href: string;
  label: string;
  loaderLabel?: string;
}

const InterviewFeedbackButton = ({ href, label, loaderLabel }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(href);
  };

  return (
    <>
      {loading && <FullScreenLoader loaderLabel={loaderLabel}/>}

      <Button className="btn-primary" onClick={handleClick}>
        {label}
      </Button>
    </>
  );
};

export default InterviewFeedbackButton;
