// // RocketFollower.tsx
// import { useEffect, useRef } from "react";
// import { motion, useMotionValue, useSpring } from "framer-motion";

// /**
//  * The rocket chases the mouse:
//  *  • x/y motion values are updated on every "mousemove"
//  *  • useSpring adds a natural ease‑out trailing effect
//  *  • rotate is derived from the delta to keep the nose pointed forward
//  */
// const RocketFollower: React.FC = () => {
//     const x = useMotionValue(0);
//     const y = useMotionValue(0);
//     const rotate = useMotionValue(0);

//     // Springs for buttery‑smooth motion
//     const springX = useSpring(x, { stiffness: 300, damping: 25 });
//     const springY = useSpring(y, { stiffness: 300, damping: 25 });
//     const springRotate = useSpring(rotate, { stiffness: 300, damping: 30 });

//     // Track previous position to compute heading
//     const prev = useRef({ x: 0, y: 0 });

//     useEffect(() => {
//         const handleMove = (e: MouseEvent) => {
//             const newX = e.clientX - 24; // centre the 48 px emoji
//             const newY = e.clientY - 24;

//             // Update position
//             x.set(newX);
//             y.set(newY);

//             // Compute rotation angle
//             const dx = newX - prev.current.x;
//             const dy = newY - prev.current.y;
//             if (dx !== 0 || dy !== 0) {
//                 const angle = Math.atan2(dy, dx) * (180 / Math.PI);
//                 rotate.set(angle);
//                 prev.current = { x: newX, y: newY };
//             }
//         };

//         window.addEventListener("mousemove", handleMove);
//         return () => window.removeEventListener("mousemove", handleMove);
//     }, [x, y, rotate]);

//     return (
//         <motion.div
//             className="fixed top-0 left-0 z-50 text-4xl sm:text-6xl pointer-events-none"
//             style={{ x: springX, y: springY, rotate: springRotate }}
//         >
//             🚀
//         </motion.div>
//     );
// };

// export default RocketFollower;
