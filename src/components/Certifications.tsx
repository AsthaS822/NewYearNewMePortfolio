"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./certifications.css";

const certifications = [
    { id: "01", title: "AI Foundations Associate", issuer: "Oracle University", date: "2025", img: "/certs/oracle.png" },
    { id: "02", title: "Rebranding Challenge", issuer: "Masters Union", date: "2024", img: "/certs/master union.png" },
    { id: "03", title: "Gen AI - SAWIT.AI", issuer: "GUVI (HCL TECH)", date: "2024", img: "/certs/guvi.png" },
    { id: "04", title: "Prompt Engineering", issuer: "MLH Global Hack Week (Wilco)", date: "2026", img: "/certs/wilcomlhcertficate.png" }
];

export default function Certifications() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section id="certifications" ref={containerRef} className="cert-section">
            <div className="cert-sticky-wrapper">
                {/* HEADINGS */}
                <div className="cert-header-block">
                    <span className="cert-eyebrow">MILESTONES</span>
                    <h2 className="cert-main-title">ACHIEVEMENTS</h2>
                </div>

                {/* BACKGROUND TITLE: Ensures "CERTIFICATION" is visible enough */}
                <div className="cert-bg-title-container">
                    <img
                        src="/certs/certficationimage.png"
                        alt="Certification Title Background"
                        className="cert-bg-title-img"
                    />
                </div>

                <div className="cert-main-content">
                    {/* LEFT: Swapping Text Descriptions */}
                    <div className="cert-text-area">
                        {certifications.map((cert, i) => (
                            <DescriptionBlock key={i} cert={cert} index={i} total={certifications.length} progress={scrollYProgress} />
                        ))}
                    </div>

                    {/* RIGHT: Swapping 3D Cards */}
                    <div className="cert-visual-area">
                        {certifications.map((cert, i) => (
                            <CertCard3D key={i} cert={cert} index={i} total={certifications.length} progress={scrollYProgress} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function DescriptionBlock({ cert, index, total, progress }: any) {
    const step = 1 / total;
    const opacity = useTransform(progress, [index * step, index * step + step * 0.4, (index + 1) * step], [0, 1, 0]);
    const y = useTransform(progress, [index * step, index * step + step * 0.4, (index + 1) * step], [20, 0, -20]);

    return (
        <motion.div style={{ opacity, y }} className="cert-text-block">
            <span className="cert-label">CERTIFICATE — {cert.id}</span>
            <h3 className="cert-name">{cert.title}</h3>
            <p className="cert-meta">{cert.issuer} // {cert.date}</p>
        </motion.div>
    );
}

function CertCard3D({ cert, index, total, progress }: any) {
    const step = 1 / total;
    const start = index * step;
    const end = (index + 1) * step;

    // 3D Motion Logic mimicking the video
    const opacity = useTransform(progress, [start, start + step * 0.2, end - step * 0.2, end], [0, 1, 1, 0]);
    const rotateY = useTransform(progress, [start, end], [-30, 10]);
    const scale = useTransform(progress, [start, start + step * 0.5], [0.8, 1]);
    const x = useTransform(progress, [start, end], [50, -20]);

    return (
        <motion.div
            className="cert-card-3d"
            style={{ opacity, rotateY, scale, x, zIndex: total - index }}
        >
            <div className="cert-card-inner">
                <img src={cert.img} alt={cert.title} className="cert-img" />
            </div>
        </motion.div>
    );
}
