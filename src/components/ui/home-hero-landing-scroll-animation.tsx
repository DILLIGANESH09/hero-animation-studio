import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

interface AnimationOrderItem {
  segment: HTMLElement;
  originalIndex: number;
}

const HomeHeroLandingScrollAnimation: React.FC = () => {
  const animatedIconsRef = useRef<HTMLDivElement | null>(null);
  const heroHeaderRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const iconElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textSegmentsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const placeholdersRef = useRef<(HTMLDivElement | null)[]>([]);
  const duplicateIconsRef = useRef<HTMLElement[] | null>(null);
  const textAnimationOrderRef = useRef<AnimationOrderItem[]>([]);

  const serviceImages: string[] = [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
  ];

  useEffect(() => {
    const textSegments = textSegmentsRef.current;
    const animationOrder: AnimationOrderItem[] = [];

    textSegments.forEach((segment, index) => {
      if (segment) animationOrder.push({ segment, originalIndex: index });
    });

    for (let i = animationOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = animationOrder[i]!;
      animationOrder[i] = animationOrder[j]!;
      animationOrder[j] = tmp;
    }


    textAnimationOrderRef.current = animationOrder;

    const isMobile = window.innerWidth < 1000;
    const headerIconSize = isMobile ? 35 : 60;
    const currentIconSize = iconElementsRef.current[0]?.getBoundingClientRect().width || 1;
    const exactScale = headerIconSize / currentIconSize;

    const trigger = ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        textSegments.forEach((segment) => {
          if (segment) gsap.set(segment, { opacity: 0 });
        });

        if (progress < 0.3) {
          const moveProgress = progress / 0.3;
          const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

          if (progress < 0.15) {
            const headerProgress = progress / 0.15;
            gsap.set(heroHeaderRef.current, {
              transform: `translateY(${-50 * headerProgress}px)`,
              opacity: 1 - headerProgress,
            });
          } else {
            gsap.set(heroHeaderRef.current, { transform: "translateY(-50px)", opacity: 0 });
          }

          if (duplicateIconsRef.current) {
            duplicateIconsRef.current.forEach((d) => d.parentNode?.removeChild(d));
            duplicateIconsRef.current = null;
          }

          gsap.set(animatedIconsRef.current, { x: 0, y: containerMoveY, scale: 1, opacity: 1 });

          iconElementsRef.current.forEach((icon, index) => {
            if (icon) {
              const staggerDelay = index * 0.1;
              const iconProgress = gsap.utils.mapRange(
                staggerDelay,
                staggerDelay + 0.5,
                0,
                1,
                moveProgress,
              );
              const clamped = Math.max(0, Math.min(1, iconProgress));
              gsap.set(icon, { x: 0, y: -containerMoveY * (1 - clamped) });
            }
          });
        } else if (progress < 0.6) {
          const scaleProgress = (progress - 0.3) / 0.3;

          gsap.set(heroHeaderRef.current, { transform: "translateY(-50px)", opacity: 0 });

          if (duplicateIconsRef.current) {
            duplicateIconsRef.current.forEach((d) => d.parentNode?.removeChild(d));
            duplicateIconsRef.current = null;
          }

          const containerRect = animatedIconsRef.current!.getBoundingClientRect();
          const deltaX =
            (window.innerWidth / 2 - (containerRect.left + containerRect.width / 2)) * scaleProgress;
          const deltaY =
            (window.innerHeight / 2 - (containerRect.top + containerRect.height / 2)) *
            scaleProgress;

          gsap.set(animatedIconsRef.current, {
            x: deltaX,
            y: -window.innerHeight * 0.3 + deltaY,
            scale: 1 + (exactScale - 1) * scaleProgress,
            opacity: 1,
          });

          iconElementsRef.current.forEach((icon) => {
            if (icon) gsap.set(icon, { x: 0, y: 0 });
          });
        } else if (progress < 0.75) {
          const moveProgress = (progress - 0.6) / 0.15;

          gsap.set(heroHeaderRef.current, { transform: "translateY(-50px)", opacity: 0 });

          const containerRect = animatedIconsRef.current!.getBoundingClientRect();
          const deltaX = window.innerWidth / 2 - (containerRect.left + containerRect.width / 2);
          const deltaY = window.innerHeight / 2 - (containerRect.top + containerRect.height / 2);

          gsap.set(animatedIconsRef.current, {
            x: deltaX,
            y: -window.innerHeight * 0.3 + deltaY,
            scale: exactScale,
            opacity: 0,
          });

          iconElementsRef.current.forEach((icon) => {
            if (icon) gsap.set(icon, { x: 0, y: 0 });
          });

          if (!duplicateIconsRef.current) {
            duplicateIconsRef.current = [];
            iconElementsRef.current.forEach((icon) => {
              if (icon) {
                const duplicate = icon.cloneNode(true) as HTMLElement;
                duplicate.className = "duplicate-icon rounded-sm overflow-hidden";
                Object.assign(duplicate.style, {
                  position: "absolute",
                  width: headerIconSize + "px",
                  height: headerIconSize + "px",
                  zIndex: "50",
                });
                document.body.appendChild(duplicate);
                duplicateIconsRef.current!.push(duplicate);
              }
            });
          }

          duplicateIconsRef.current?.forEach((duplicate, index) => {
            if (index < placeholdersRef.current.length) {
              const iconRect = iconElementsRef.current[index]!.getBoundingClientRect();
              const startPageX = iconRect.left + iconRect.width / 2 + window.pageXOffset;
              const startPageY = iconRect.top + iconRect.height / 2 + window.pageYOffset;

              const targetRect = placeholdersRef.current[index]!.getBoundingClientRect();
              const targetPageX = targetRect.left + targetRect.width / 2 + window.pageXOffset;
              const targetPageY = targetRect.top + targetRect.height / 2 + window.pageYOffset;

              const moveX = targetPageX - startPageX;
              const moveY = targetPageY - startPageY;

              let currentX = 0;
              const currentY = moveProgress < 0.5 ? moveY * (moveProgress / 0.5) : moveY;
              if (moveProgress >= 0.5) currentX = moveX * ((moveProgress - 0.5) / 0.5);

              duplicate.style.left = startPageX + currentX - headerIconSize / 2 + "px";
              duplicate.style.top = startPageY + currentY - headerIconSize / 2 + "px";
              duplicate.style.opacity = "1";
              duplicate.style.display = "flex";
            }
          });
        } else {
          gsap.set(heroHeaderRef.current, { transform: "translateY(-100px)", opacity: 0 });
          gsap.set(animatedIconsRef.current, { opacity: 0 });

          duplicateIconsRef.current?.forEach((duplicate, index) => {
            if (index < placeholdersRef.current.length) {
              const targetRect = placeholdersRef.current[index]!.getBoundingClientRect();
              const targetPageX = targetRect.left + targetRect.width / 2 + window.pageXOffset;
              const targetPageY = targetRect.top + targetRect.height / 2 + window.pageYOffset;
              duplicate.style.left = targetPageX - headerIconSize / 2 + "px";
              duplicate.style.top = targetPageY - headerIconSize / 2 + "px";
              duplicate.style.opacity = "1";
              duplicate.style.display = "flex";
            }
          });

          textAnimationOrderRef.current.forEach((item, randomIndex) => {
            const segStart = 0.75 + randomIndex * 0.03;
            const segProgress = gsap.utils.mapRange(segStart, segStart + 0.015, 0, 1, progress);
            gsap.set(item.segment, { opacity: Math.max(0, Math.min(1, segProgress)) });
          });
        }
      },
    });

    return () => {
      trigger.kill();
      duplicateIconsRef.current?.forEach((d) => d.parentNode?.removeChild(d));
      duplicateIconsRef.current = null;
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-background">
      <section
        ref={heroSectionRef}
        className="hero relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-foreground md:px-6"
      >
        <div
          ref={heroHeaderRef}
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{ zIndex: 0 }}
        >
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            loop
            speed={1200}
            className="hero-bg-swiper"
          >
            {serviceImages.map((src, i) => (
              <SwiperSlide key={i} style={{ position: "relative", overflow: "hidden" }}>
                <img
                  src={src}
                  alt={`Studio work ${i + 1}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="hero-slide-veil" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          ref={animatedIconsRef}
          className="animated-icons fixed bottom-10 left-1/2 z-2 flex w-[90%] -translate-x-1/2 items-center gap-1 will-change-transform md:left-24 md:w-[80%] md:translate-x-0"
        >
          {serviceImages.map((src, index) => (
            <div
              key={index}
              ref={(el) => {
                iconElementsRef.current[index] = el;
              }}
              className="animated-icon aspect-square flex-1 overflow-hidden rounded-sm bg-muted will-change-transform"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <h1 className="animated-text relative z-10 max-w-[90vw] text-center text-[clamp(1.4rem,5vw,4.5rem)] leading-[1.3] font-medium text-foreground md:max-w-[85vw] md:leading-[1.2]">
          <span
            ref={(el) => {
              textSegmentsRef.current[0] = el;
            }}
            className="text-segment opacity-0"
          >
            I design interfaces
          </span>
          <div
            ref={(el) => {
              placeholdersRef.current[0] = el;
            }}
            className="placeholder-icon invisible mx-1 inline-block h-8 w-8 align-middle will-change-transform md:-mt-1.5 md:h-16 md:w-16"
          />

          <span
            ref={(el) => {
              textSegmentsRef.current[1] = el;
            }}
            className="text-segment opacity-0"
          >
            and build them
          </span>
          <div
            ref={(el) => {
              placeholdersRef.current[1] = el;
            }}
            className="placeholder-icon invisible mx-1 inline-block h-8 w-8 align-middle will-change-transform md:-mt-1.5 md:h-16 md:w-16"
          />

          <span
            ref={(el) => {
              textSegmentsRef.current[2] = el;
            }}
            className="text-segment opacity-0"
          >
            line by line,
          </span>
          <div
            ref={(el) => {
              placeholdersRef.current[2] = el;
            }}
            className="placeholder-icon invisible mx-1 inline-block h-8 w-8 align-middle will-change-transform md:-mt-1.5 md:h-16 md:w-16"
          />

          <span
            ref={(el) => {
              textSegmentsRef.current[3] = el;
            }}
            className="text-segment opacity-0"
          >
            until the product
          </span>
          <div
            ref={(el) => {
              placeholdersRef.current[3] = el;
            }}
            className="placeholder-icon invisible mx-1 inline-block h-8 w-8 align-middle will-change-transform md:-mt-1.5 md:h-16 md:w-16"
          />

          <span
            ref={(el) => {
              textSegmentsRef.current[4] = el;
            }}
            className="text-segment opacity-0"
          >
            feels
            <div
              ref={(el) => {
                placeholdersRef.current[4] = el;
              }}
              className="placeholder-icon invisible mx-1 inline-block h-8 w-8 align-middle will-change-transform md:-mt-1.5 md:h-16 md:w-16"
            />
            inevitable.
          </span>
        </h1>
      </section>
    </div>
  );
};

export default HomeHeroLandingScrollAnimation;
