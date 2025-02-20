import { Html } from "@react-three/drei";

export default function LoadingSpinner() {
  return (
    <Html center>
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </Html>
  );
}
