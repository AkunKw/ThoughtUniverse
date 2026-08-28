"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import styles from "./explore.module.css";

type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
  canvasScale?: number;
  motion: {
    x: number;
    y: number;
    rotation: number;
    duration: number;
    delay: number;
  };
};

const sidebarItems: SidebarItem[] = [
  {
    id: "explore",
    label: "Explore",
    icon: "/explore/icons/explore.png",
    active: true,
    motion: {
      x: 0.72,
      y: -0.54,
      rotation: 0.24,
      duration: 7.8,
      delay: -1.4,
    },
  },
  {
    id: "home",
    label: "Home",
    icon: "/explore/icons/home.png",
    motion: {
      x: -0.62,
      y: 0.78,
      rotation: -0.22,
      duration: 8.6,
      delay: -4.1,
    },
  },
  {
    id: "my-universe",
    label: "My Universe",
    icon: "/explore/icons/my-universe.png",
    canvasScale: 1.125,
    motion: {
      x: 0.84,
      y: 0.56,
      rotation: 0.2,
      duration: 9.2,
      delay: -6.3,
    },
  },
  {
    id: "chat",
    label: "Chat",
    icon: "/explore/icons/chat.png",
    motion: {
      x: -0.74,
      y: -0.62,
      rotation: 0.23,
      duration: 8.1,
      delay: -2.8,
    },
  },
  {
    id: "profile",
    label: "Profile",
    icon: "/explore/icons/profile.png",
    canvasScale: 1.125,
    motion: {
      x: 0.58,
      y: 0.82,
      rotation: -0.21,
      duration: 9.7,
      delay: -7.2,
    },
  },
];

export function Sidebar() {
  const handlePointerEnter = (
    event: ReactPointerEvent<HTMLSpanElement>,
  ) => {
    event.currentTarget.dataset.reacting = "true";
  };

  const handlePointerLeave = (
    event: ReactPointerEvent<HTMLSpanElement>,
  ) => {
    delete event.currentTarget.dataset.reacting;
  };

  return (
    <aside className={styles.sidebar} aria-label="Primary navigation">
      <nav className={styles.sidebarNav}>
        {sidebarItems.map((item) => (
          <span
            key={item.id}
            className={`${styles.sidebarItem} ${
              item.active ? styles.sidebarItemActive : ""
            }`}
            role="img"
            aria-label={item.label}
            data-icon={item.id}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            style={
              {
                "--sidebar-icon": `url("${item.icon}")`,
                "--sidebar-icon-scale": item.canvasScale ?? 1,
                "--sidebar-drift-x": item.motion.x + "px",
                "--sidebar-drift-y": item.motion.y + "px",
                "--sidebar-drift-rotation": item.motion.rotation + "deg",
                "--sidebar-motion-duration": item.motion.duration + "s",
                "--sidebar-motion-delay": item.motion.delay + "s",
              } as CSSProperties
            }
          >
            <Image
              className={styles.sidebarIcon}
              src={item.icon}
              alt=""
              width={48}
              height={48}
              priority={item.active}
              aria-hidden="true"
            />
          </span>
        ))}
      </nav>

      <button
        className={styles.proButton}
        type="button"
        aria-label="Pro subscription"
        disabled
      >
        Pro
      </button>
    </aside>
  );
}
