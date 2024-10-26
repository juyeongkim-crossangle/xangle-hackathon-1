"use client"; // 서버 컴포넌트를 클라이언트 컴포넌트로 변환하는 역할
/*
1. router 사용(client):
const router = useRouter();
router.pathname을 사용하여 현재 페이지의 경로 추출

2. router 사용(server):
next/router는 클라이언트 컴포넌트에서만 사용할 수 있으며,
서버 컴포넌트에서는 next/navigation의 usePathname 훅을 사용하는 방식
*/


import XButton from "@/components/common/XButton";
import { usePathname } from "next/navigation";

export default function GlobalNavigationBar() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-2 py-4 px-2 border-b">
            <XButton
                link="/"
                theme={pathname === "/" ? "default" : "outlined"}
            > Home
            </XButton>
            <XButton
                link="/about"
                theme={pathname === "/about" ? "default" : "outlined"}
            > About
            </XButton>
            <XButton
                link="/products"
                theme={pathname === "/products" ? "default" : "outlined"}
            > Products
            </XButton>
        </nav>
    );
}
