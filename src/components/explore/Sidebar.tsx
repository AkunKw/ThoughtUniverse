import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./explore.module.css";

type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
  canvasScale?: number;
};

const sidebarItems: SidebarItem[] = [
  {
    id: "explore",
    label: "Explore",
    icon: "/explore/icons/explore.png",
    active: true,
  },
  { id: "home", label: "Home", icon: "/explore/icons/home.png" },
  {
    id: "my-universe",
    label: "My Universe",
    icon: "/explore/icons/my-universe.png",
    canvasScale: 1.125,
  },
  { id: "chat", label: "Chat", icon: "/explore/icons/chat.png" },
  {
    id: "profile",
    label: "Profile",
    icon: "/explore/icons/profile.png",
    canvasScale: 1.125,
  },
];

export function Sidebar() {
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
            style={
              {
                "--sidebar-icon": `url("${item.icon}")`,
                "--sidebar-icon-scale": item.canvasScale ?? 1,
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
