import { mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons";

const ICON_VARIANTS = [
  "original",
  "plain",
  "original-wordmark",
  "plain-wordmark",
];

const normalizeTechName = (tech: string) => {
  const key = tech
    .toLowerCase()
    .replace(/\.js$/, "")
    .replace(/\s+/g, "")
    .replace("+", "plus")
    .replace("#", "sharp");

  return mappings[key as keyof typeof mappings] ?? key;
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  return Promise.all(
    techArray.map(async (tech) => {
      const normalized = normalizeTechName(tech);

      for (const variant of ICON_VARIANTS) {
        const url = `${techIconBaseURL}/${normalized}/${normalized}-${variant}.svg`;
        if (await checkIconExists(url)) {
          return { tech, url };
        }
      }

      return { tech, url: "/tech.svg" };
    }),
  );
};

// export const getRandomInterviewCover = () => {
//   const randomIndex = Math.floor(Math.random() * interviewCovers.length);
//   return `/covers${interviewCovers[randomIndex]}`;
// };

