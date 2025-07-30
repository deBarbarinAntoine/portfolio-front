"use client"

import Image from "next/image";
import {Author, IdentityCard} from "@/components/identity-card";
import {LanguageLevels} from "@/lib/interfaces";
import {MoveDown} from "lucide-react";
import {MouseEventHandler, useCallback, useEffect, useRef, useState} from "react";
import {useTheme} from "next-themes";
import {themes} from "@/lib/themes";

const author: Author = {
  name: 'Antoine de BARBARIN',
  email: 'amdebarbarin@gmail.com',
  birth_date: '06/01/1990',
  location: 'Aix-en-Provence',
  avatar_path: '/img/profile-pic-sm.jpg',
  cv_file_path: '/docs/cv.pdf',
  tags: [
    {
      id: 1,
      value: 'Cybersecurity'
    },
    {
      id: 2,
      value: 'IT Infrastructure'
    },
    {
      id: 3,
      value: 'Networking'
    },
    {
      id: 4,
      value: 'Web Development'
    }
  ],
  languages: [
    {
      id: 1,
      name: 'Spanish',
      level: LanguageLevels.C2,
    },
    {
      id: 2,
      name: 'Italian',
      level: LanguageLevels.C2,
    },
    {
      id: 3,
      name: 'English',
      level: LanguageLevels.C1,
    }
  ]
}

export default function Home() {
  const secondBlockRef = useRef<HTMLDivElement>(null);

  const handleDownArrow: MouseEventHandler = useCallback(() => {
    if (secondBlockRef.current) {
      secondBlockRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  }, []);

  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const secondBlockBackgroundImageURL =
      resolvedTheme === themes.dark
          ? '/img/coding-screen-img.png'
          : '/img/coding-screen-light.png';

  let secondBlockBackground = <div className="bg-base-100 absolute inset-0 z-0"></div>

  if (mounted) {
    secondBlockBackground = <Image
        src={secondBlockBackgroundImageURL}
        alt="Coding screen background"
        fill // The image will fill its parent container
        style={{ objectFit: 'cover' }} // Ensures the image covers the entire area
        className="absolute inset-0 z-0" // Stretches to fill and pushes the image to the back
    />;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen pt-14">
      <main className="flex flex-col gap-[32px] row-start-2 justify-center sm:items-start w-full">
        <div className="flex flex-col justify-around items-center w-full min-h-[calc(100dvh-72px)] gap-2 lg:gap-4 pb-12">
          <IdentityCard
              avatar_path={author.avatar_path}
              cv_file_path={author.cv_file_path}
              name={author.name}
              birth_date={author.birth_date}
              email={author.email}
              location={author.location}
              languages={author.languages}
              tags={author.tags} />
          <button
              onClick={handleDownArrow}
              className="btn btn-primary btn-2xl rounded-full h-12 p-2 aspect-square">
            <MoveDown size="calc(var(--spacing) * 8)" color="var(--color-base-300)" />
          </button>
        </div>
        <div ref={secondBlockRef} className="flex flex-col w-full min-h-[calc(100dvh-72px)] gap-2 lg:gap-4 pb-12">
          {/* A relative container to hold both the image and the hero */}
          <div className="relative h-full">
            {/* This is the optimized background image layer */}
            {secondBlockBackground}

            {/* The hero content and overlay go on top of the image */}
            <div className="hero h-full relative z-10">
              {/* Your overlay can be a regular div here, as it's on top of the image */}
              <div className="hero-overlay flex flex-col justify-between absolute inset-0">
                <div className="bg-base-100 pointer-events-none sticky top-0 flex h-16 [mask-image:linear-gradient(#000000,transparent)]"></div>
                <div className="bg-base-100 pointer-events-none sticky bottom-0 flex h-16 [mask-image:linear-gradient(transparent,#000000)]"></div>
              </div>
              {/* Your hero-content goes on top of the overlay */}
              <div className="hero-content flex-col lg:flex-row max-w-full">
                <div>
                  <h1 className="text-5xl font-bold">Box Office News!</h1>
                  <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
