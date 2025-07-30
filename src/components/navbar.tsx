"use client"

import {Themes, ThemeToggle} from "@/components/theme-toggle";
import {ReactElement, useCallback, useEffect, useRef} from "react";

export interface NavbarItem {
    id?: string | number;
    title: string;
    link: string;
    subItems?: NavbarItem[];
}

export interface NavbarButton {
    id?: string | number;
    title?: string;
    link: string;
    icon?: ReactElement;
}

export interface NavbarProps {
    navbarItems: NavbarItem[];
    navbarButtons: NavbarButton[];
    title: string;
    link: string;
    themes: Themes;
}

export default function Navbar({ themes, navbarItems, navbarButtons, title, link }: NavbarProps) {

    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearchShortcut = useCallback((event: KeyboardEvent) => {

        // Check for Ctrl (or Command on Mac) + K
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();

            // Focus the input if the ref exists
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }
    }, []);

    useEffect(() => {
        // Add the event listener when the component mounts
        window.addEventListener('keydown', handleSearchShortcut);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleSearchShortcut);
        };
    }, [handleSearchShortcut]);

    return (
        <>
            <div className="fixed z-50 navbar bg-base-100 shadow-sm px-5 md:px-12">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navbarItems.map((item) => (
                                <DropdownItem
                                    key={item.id}
                                    title={item.title}
                                    link={item.link}
                                    subItems={item.subItems} />
                            ))}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-2xl" href={link}>{title}</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navbarItems.map((item) => (
                            <MenuItem
                                key={item.id}
                                title={item.title}
                                link={item.link}
                                subItems={item.subItems} />
                        ))}
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    <form action="#" className="hidden md:flex">
                        <label className="input input-bordered w-32 md:w-auto text-lg">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="text" placeholder="Search" ref={searchInputRef} />
                            <kbd className="kbd kbd-md hidden xl:block">Ctrl</kbd>
                            <kbd className="kbd kbd-md hidden xl:block">K</kbd>
                        </label>
                        </form>
                    {navbarButtons.map((button) => (
                        <a key={button.id} className="hidden md:flex btn btn-secondary rounded text-lg" href={button.link}>
                            {button.icon}
                            {button.title}
                        </a>
                    ))}
                    <ThemeToggle light={themes.light} dark={themes.dark}/>
                </div>
            </div>
        </>
    );
}

function DropdownItem({title, link, subItems}: NavbarItem) {
    if (!subItems) {
        return(
            <li><a href={link} className="text-lg">{title}</a></li>
        );
    }
    return (
        <li>
            <a href={link} className="text-lg">{title}</a>
            <ul className="p-2">
                {subItems.map((child) => (
                    <DropdownItem
                        key={child.id}
                        title={child.title}
                        link={child.link}
                        subItems={child.subItems}/>
                ))}
            </ul>
        </li>
    )
}

function MenuItem({title, link, subItems}: NavbarItem) {
    if (!subItems) {
        return(
            <li><a href={link} className="text-lg">{title}</a></li>
        );
    }
    return (
        <li>
            <details>
                <summary className="text-lg">{title}</summary>
                <ul className="p-2">
                    {subItems.map((child) => (
                        <MenuItem
                            key={child.id}
                            title={child.title}
                            link={child.link}
                            subItems={child.subItems}/>
                    ))}
                </ul>
            </details>
        </li>
    )
}
