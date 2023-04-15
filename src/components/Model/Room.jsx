import Spline from "@splinetool/react-spline";
import { Suspense } from "react";

export default function Room() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Spline scene="https://prod.spline.design/IfbotJ6zeUqX01D6/scene.splinecode" />
        </Suspense>
    );
}
