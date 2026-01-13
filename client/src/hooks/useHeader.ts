import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import { useLocation } from "react-router-dom";

export const useHeader = () => {
    const location = useLocation();
    const isProducts = location.pathname.startsWith("/catalogo/");
    const [showDesktopProducts, setShowDesktopProducts] = useState(false);
    const [showMobileProducts, setShowMobileProducts] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null);
    const modalResponsiveRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const { user, getCart, cart, guestCart } = useAppStore()

    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                setShowDesktopProducts(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!menuVisible) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (
                modalResponsiveRef.current &&
                !modalResponsiveRef.current.contains(target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(target)
            ) {
                setMenuVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuVisible]);

    useEffect(() => {
        if (!menuVisible) {
            setShowMobileProducts(false);
        }
    }, [menuVisible]);

    useEffect(() => {
        setMenuVisible(false);
    }, [location]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const numFavoritesProducts = user?.favorites?.length ?? 0
    const numCartProducts = cart?.items.length ?? guestCart?.items.length ?? 0

    return {
        user,
        isProducts,
        menuVisible,
        showDesktopProducts,
        showMobileProducts,
        searchOpen,
        numFavoritesProducts,
        numCartProducts,
        refs: {
            modalRef,
            modalResponsiveRef,
            hamburgerRef,
        },
        actions: {
            toggleMenu,
            setShowDesktopProducts,
            setShowMobileProducts,
            setMenuVisible,
            setSearchOpen
        },
    }
}
