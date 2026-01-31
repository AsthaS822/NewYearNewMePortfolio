import { useState } from "react";
import "./contact.css";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
    const [active, setActive] = useState("email");

    return (
        <section className="contact-section" id="contact">
            <div className="contact-layout">
                {/* LEFT SIDE - Trigger List */}
                <div className="contact-left">
                    <span className="contact-eyebrow">Contact</span>
                    <h2>Let's Connect</h2>
                    <p>Have an idea, opportunity, or just want to say hi?</p>

                    <div className="contact-hover-list">
                        <button
                            onMouseEnter={() => setActive("email")}
                            className={active === "email" ? "btn-active" : ""}
                        >
                            Email
                        </button>
                        <button
                            onMouseEnter={() => setActive("linkedin")}
                            className={active === "linkedin" ? "btn-active" : ""}
                        >
                            LinkedIn
                        </button>
                        <button
                            onMouseEnter={() => setActive("github")}
                            className={active === "github" ? "btn-active" : ""}
                        >
                            GitHub
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE - Swapper */}
                <div className="contact-right">
                    <div className="contact-swapper">
                        {/* SHARED BACKGROUND VIDEO */}
                        <video autoPlay loop muted playsInline className="card-video-bg shared-video">
                            <source src="/assets/waterdrops.mp4" type="video/mp4" />
                        </video>

                        {/* EMAIL */}
                        <a
                            href="mailto:singhhhaaastha@gmail.com"
                            className={`contact-card email ${active === "email" ? "active" : ""}`}
                        >
                            <div className="contact-card-content">
                                <div className="icon-wrap">
                                    <Mail size={32} color="black" />
                                </div>
                                <h3>Email</h3>
                                <span className="contact-link-text">singhhhaaastha@gmail.com</span>
                            </div>
                        </a>

                        {/* LINKEDIN */}
                        <a
                            href="https://www.linkedin.com/in/astha-singh-a6128a228"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`contact-card linkedin ${active === "linkedin" ? "active" : ""}`}
                        >
                            <div className="contact-card-content">
                                <div className="icon-wrap">
                                    <Linkedin size={32} color="black" />
                                </div>
                                <h3>LinkedIn</h3>
                                <span className="contact-link-text">Connect professionally</span>
                            </div>
                        </a>

                        {/* GITHUB */}
                        <a
                            href="https://github.com/AsthaS822"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`contact-card github ${active === "github" ? "active" : ""}`}
                        >
                            <div className="contact-card-content">
                                <div className="icon-wrap">
                                    <Github size={32} color="black" />
                                </div>
                                <h3>GitHub</h3>
                                <span className="contact-link-text">View my projects</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
