import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Matter from "matter-js";

const skills = [
  { name: "React", level: 90 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "AI/ML", level: 70 },
  { name: "Three.js", level: 65 },
  { name: "Tailwind", level: 95 },
  { name: "PostgreSQL", level: 80 },
  { name: "TypeScript", level: 88 },
  { name: "Next.js", level: 85 },
  { name: "GSAP", level: 82 },
  { name: "Framer Motion", level: 90 }
];

export default function Scene05_SkillsSpiral() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [boxes, setBoxes] = useState<{ id: string; name: string; level: number; x: number; y: number; angle: number }[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    // Engine configuration
    const engine = Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 1 }, // Default gravity scale for visible motion
      positionIterations: 10,
      velocityIterations: 10
    });
    engineRef.current = engine;
    const world = engine.world;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    // Canvas setup
    render.canvas.style.pointerEvents = "auto";
    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.zIndex = "1";

    // Boundaries - Flush floor at bottom
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, {
      isStatic: true,
      label: "ground",
      friction: 0.8,
      render: { visible: false }
    });
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
    Composite.add(world, [ground, leftWall, rightWall]);

    // Skill Boxes with improved physics
    const skillBodies = skills.map((skill, i) => {
      const boxWidth = 160;
      const boxHeight = 80;
      // Stagger drop positions across the width
      const x = (width / 2) + (Math.random() - 0.5) * (width * 0.6);
      const y = -100 - (i * 100);

      const body = Bodies.rectangle(x, y, boxWidth, boxHeight, {
        chamfer: { radius: 0 },
        restitution: 0.7,      // 🔥 higher bounce
        friction: 0.05,
        frictionAir: 0.02,
        density: 0.002,        // 🔥 added mass
        inertia: Infinity,     // 🔥 prevents text from spinning
        slop: 0.5,             // stabilized overlap
        render: { visible: false }
      });

      (body as any).skillData = { id: `skill-${i}`, ...skill };
      return body;
    });

    Composite.add(world, skillBodies);

    // Mouse interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.9,      // 🔥 stronger grip
        damping: 0.05,       // 🔥 smoother release
        angularStiffness: 0, // 🔥 prevents weird spin lock
        render: { visible: false }
      } as any
    });

    // Disable mousewheel interference
    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      (mouseConstraint.mouse as any).mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      (mouseConstraint.mouse as any).mousewheel
    );

    Composite.add(world, mouseConstraint);

    // Collision Feedback - 🔥 Micro-recoil for life
    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        if ((bodyA as any).skillData || (bodyB as any).skillData) {
          Matter.Body.applyForce(
            bodyA,
            bodyA.position,
            { x: (Math.random() - 0.5) * 0.002, y: -0.002 }
          );
        }
      });
    });

    // Sync state with physics engine
    let frame = 0;
    Events.on(engine, "afterUpdate", () => {
      frame++;
      if (frame % 2 !== 0) return; // Throttle React updates

      const updatedBoxes = skillBodies.map(body => ({
        id: (body as any).skillData.id,
        name: (body as any).skillData.name,
        level: (body as any).skillData.level,
        x: Math.round(body.position.x),
        y: Math.round(body.position.y),
        angle: body.angle
      }));
      setBoxes(updatedBoxes);
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Grid-Snap positioning
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const boxWidth = 160;
        const boxHeight = 80;
        const gap = 20;
        const columns = Math.floor(width / (boxWidth + gap));

        skillBodies.forEach((body, i) => {
          const col = i % columns;
          const row = Math.floor(i / columns);

          const targetX = (width / 2) - ((columns * (boxWidth + gap)) / 2) + (col * (boxWidth + gap)) + (boxWidth / 2);
          const targetY = height - (row * (boxHeight + gap)) - (boxHeight / 2) - 100;

          Matter.Body.setPosition(body, { x: targetX, y: targetY });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngle(body, 0);
          Matter.Body.setAngularVelocity(body, 0);
        });

        // Only trigger once
        observer.unobserve(sceneRef.current!);
      }
    }, { threshold: 0.1 });

    observer.observe(sceneRef.current);

    const handleResize = () => {
      if (sceneRef.current) {
        const newWidth = sceneRef.current.clientWidth;
        const newHeight = sceneRef.current.clientHeight;
        render.canvas.width = newWidth;
        render.canvas.height = newHeight;
        Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
        Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center pt-20 pb-10 px-6">
      <div className="relative z-20 w-full max-w-7xl mx-auto pointer-events-none mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-7xl md:text-[10vw] font-black font-orbitron text-white tracking-tighter leading-[0.85] mb-4">
            SKILL<br />
            <span className="text-purple-500 uppercase opacity-80" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.7)' }}>Capabilities</span>
          </h2>
          <div className="h-1 w-48 bg-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }} />
        </motion.div>
      </div>

      <div
        ref={sceneRef}
        className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing scale-105"
        style={{ pointerEvents: "all" }} // 🔥 Explicitly allow all pointer events
      >
        <AnimatePresence>
          {boxes.map((box) => (
            <div
              key={box.id}
              className="absolute"
              style={{
                width: 160,
                height: 80,
                left: box.x,
                top: box.y,
                transform: `translate(-50%, -50%) rotate(${box.angle}rad)`,
                pointerEvents: "none"
              }}
            >
              <div className="w-full h-full bg-zinc-950/40 backdrop-blur-md border border-purple-500/30 flex flex-col items-center justify-center p-4 relative transition-shadow select-none" style={{ boxShadow: '0 0 20px rgba(123,63,242,0.1)' }}>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-500/50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-500/50" />

                <span className="text-[10px] font-mono text-purple-500 absolute top-2 right-2">
                  {box.level}%
                </span>

                <h3 className="text-sm font-orbitron text-white uppercase tracking-widest text-center">
                  {box.name}
                </h3>

                <div className="mt-2 w-full h-[1px] bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: `${box.level}%`, boxShadow: '0 0 10px #7B3FF2' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-orbitron text-purple-500/60 tracking-[0.5em] uppercase z-20 pointer-events-none animate-pulse text-center">
        DRAG_TO_INTERACT // GRAVITY_ENABLED // STACK_CORE
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(123,63,242,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(123,63,242,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
    </section>
  );
}
