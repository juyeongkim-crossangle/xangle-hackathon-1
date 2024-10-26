import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import XButton from "@/components/common/XButton";

export default function About() {
    return (
        <div>
            <h1>About Page</h1>
            <XButton
                link="/about/xangle"
                theme="default"
                width={200}
                startIcon={<FaArrowLeft />}
                endIcon={<FaArrowRight />}
            >
                About Xangle
            </XButton>
        </div>
    );
}
