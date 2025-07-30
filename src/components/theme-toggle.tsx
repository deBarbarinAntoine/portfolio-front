"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export interface Themes {
    light: string;
    dark: string;
}

export function ThemeToggle({light, dark}: Themes) {

    const {setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect runs only on the client, so we can safely interact with the DOM/window here.
    // This helps prevent hydration mismatches, as `theme` might be `undefined` or `system` initially on the server.
    useEffect(() => {
        setMounted(true);
    }, []);

    // If the component is not yet mounted on the client, return null or a placeholder.
    // This prevents rendering the toggle before `next-themes` has determined the actual theme,
    // avoiding potential FOUC or hydration warnings.
    if (!mounted) {
        return null; // Or a simple spinner/placeholder like <div className="h-10 w-10"></div>
    }

    // Determine if the checkbox should be checked.
    // resolvedTheme will be 'light' or 'dark' (even if the user's preference is 'system').
    // We want the checkbox to be checked when the theme is 'dark'.
    const isChecked = resolvedTheme === dark;

    // Handle the change event of the checkbox
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // If the checkbox is checked, switch to dark; otherwise, switch to light.
        setTheme(e.target.checked ? dark : light);
    };

    return (
        <label className="swap swap-rotate">
            {/* The checkbox's 'checked' prop controls its state.
        'isChecked' will be true for dark mode, false for light mode.
        'onChange' updates the theme based on the checkbox's new state.
        We don't need 'value="synthwave"' here, as next-themes handles the theme attribute.
      */}
            <input
                type="checkbox"
                className="theme-controller"
                checked={isChecked}
                onChange={handleChange}
            />

            {/* Sun icon for light mode (swap-off) */}
            <svg
                className="swap-off h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon for dark mode (swap-on) */}
            <svg
                className="swap-on h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
        </label>
    );
}