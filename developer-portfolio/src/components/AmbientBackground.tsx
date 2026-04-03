import { motion, useReducedMotion } from "framer-motion";

const blobs = [
  {
    className:
      "left-[-8rem] top-16 h-72 w-72 bg-[radial-gradient(circle,rgba(124,156,255,0.24)_0%,rgba(124,156,255,0.08)_45%,transparent_72%)] dark:bg-[radial-gradient(circle,rgba(124,156,255,0.2)_0%,rgba(124,156,255,0.08)_45%,transparent_72%)]",
    animate: {
      x: [0, 70, 18, 0],
      y: [0, 34, 78, 0],
      scale: [1, 1.08, 0.96, 1]
    },
    duration: 18
  },
  {
    className:
      "right-[-6rem] top-[22rem] h-80 w-80 bg-[radial-gradient(circle,rgba(61,217,183,0.2)_0%,rgba(61,217,183,0.07)_48%,transparent_74%)] dark:bg-[radial-gradient(circle,rgba(61,217,183,0.16)_0%,rgba(61,217,183,0.06)_48%,transparent_74%)]",
    animate: {
      x: [0, -44, -12, 0],
      y: [0, -36, 40, 0],
      scale: [1, 0.95, 1.06, 1]
    },
    duration: 22
  },
  {
    className:
      "left-[20%] top-[58rem] h-64 w-64 bg-[radial-gradient(circle,rgba(236,72,153,0.18)_0%,rgba(236,72,153,0.06)_48%,transparent_74%)] dark:bg-[radial-gradient(circle,rgba(236,72,153,0.14)_0%,rgba(236,72,153,0.05)_48%,transparent_74%)]",
    animate: {
      x: [0, 52, 8, 0],
      y: [0, -28, 34, 0],
      scale: [1, 1.05, 0.94, 1]
    },
    duration: 20
  }
];

export function AmbientBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
