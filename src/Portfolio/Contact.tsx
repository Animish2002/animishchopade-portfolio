"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
  Loader2,
} from "lucide-react";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FlipText } from "@/components/ui/flip-text";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const response = await fetch(`${formspreeEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitMessage(""), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitError(
        "Sorry, there was an error sending your message. Please try again."
      );
      setTimeout(() => setSubmitError(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: GitHubIcon,
      href: "https://github.com/Animish2002",
      label: "GitHub",
      badge: "GitHub",
    },
    {
      icon: LinkedInIcon,
      href: "https://www.linkedin.com/in/animish-chopade",
      label: "LinkedIn",
      badge: "LinkedIn",
    },
    {
      icon: XIcon,
      href: "https://x.com/animish06",
      label: "Twitter",
      badge: "Twitter",
    },
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/animish_06/",
      label: "Instagram",
      badge: "Instagram",
    },

    {
      icon: Globe,
      href: "https://animishchopade.in/",
      label: "Website",
      badge: "Portfolio",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "animishchopade123@gmail.com",
      action: "mailto:animishchopade123@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 - 9158067574",
      action: "tel:+919158067574",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Pune, Maharashtra, India",
      action: null,
    },
  ];

  return (
    <div className="text-start lg:p-6 h-auto ">
      <span className="lg:text-3xl text-xl font-semibold aboutMe">
      
        <FlipText className="aboutMe -tracking-widest ">Contact</FlipText>
      </span>
      <div className="border-t border-4 border-yellow-600 w-full max-w-14 my-4 rounded-xl"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-zinc-900">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-zinc-900 border border-zinc-700">
            <CardHeader>
              <CardTitle className="text-xl aboutMe text-zinc-50">
                Get In Touch
              </CardTitle>
              <CardDescription className="text-sm text-zinc-50">
                I&lsquo;m always interested in new opportunities and interesting
                projects. Whether you have a question or just want to say hello,
                feel free to reach out!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors border-zinc-700"
                >
                  <div className="flex-shrink-0">
                    <info.icon className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-zinc-50">{info.title}</p>
                    {info.action ? (
                      <a
                        href={info.action}
                        className="text-muted-foreground hover:text-foreground transition-colors lg:text-[16px] text-sm"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border border-zinc-700">
            <CardHeader>
              <CardTitle className="aboutMe text-xl text-zinc-50">
                Follow Me
              </CardTitle>
              <CardDescription className="text-sm text-zinc-50">
                Connect with me on social media and check out my work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent/50 transition-all duration-300 hover:scale-105 bg-zinc-900"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5  text-yellow-500" />
                      <Badge
                        variant="secondary"
                        className="text-xs border text-yellow-500 hover:shadow-lg shadow-yellow-500/50 bg-zinc-900"
                      >
                        {social.badge}
                      </Badge>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-zinc-900 border border-zinc-700">
          <CardHeader>
            <CardTitle className="text-xl aboutMe text-zinc-50">
              Send Message
            </CardTitle>
            <CardDescription className="text-zinc-50">
              Fill out the form below and I&lsquo;ll get back to you as soon as
              possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitMessage && (
              <div className="mb-6 p-4 border border-green-500/50 bg-green-500/10 rounded-lg">
                <p className="text-green-400">{submitMessage}</p>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 rounded-lg">
                <p className="text-red-400">{submitError}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-50" htmlFor="name">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-50" htmlFor="email">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-50" htmlFor="subject">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-50" htmlFor="message">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or just say hello!"
                  rows={6}
                  required
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
