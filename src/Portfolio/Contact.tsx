"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Loader2,
} from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(""), 5000);
    }, 1000);
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Animish2002",
      label: "GitHub",
      badge: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/animish-chopade",
      label: "LinkedIn",
      badge: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/animish06",
      label: "Twitter",
      badge: "Twitter",
    },
    {
      icon: Instagram,
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
      details: "Pune, Maharastra, India",
      action: null,
    },
  ];

  return (
    <div className="text-start lg:p-6 h-auto ">
      <span className="text-3xl font-semibold aboutMe">Contact</span>
      <div className="border-t border-4 border-yellow-600 w-full max-w-14 my-4 rounded-xl"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-zinc-900">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-zinc-900 border border-zinc-700">
            <CardHeader>
              <CardTitle className="text-2xl aboutMe text-zinc-50">
                Get In Touch
              </CardTitle>
              <CardDescription className="text-base text-zinc-50">
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
              <CardTitle className="aboutMe text-2xl text-zinc-50">
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
            <CardTitle className="text-2xl aboutMe text-zinc-50">Send Message</CardTitle>
            <CardDescription className="text-zinc-50">
              Fill out the form below and I&lsquo;ll get back to you as soon as
              possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitMessage && (
              <Alert className="mb-6 border-green-500/50 bg-green-500/10">
                <AlertDescription className="text-green-600 dark:text-green-400">
                  {submitMessage}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-50" htmlFor="name">Full Name</Label>
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
                  <Label className="text-zinc-50" htmlFor="email">Email Address</Label>
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
                <Label className="text-zinc-50" htmlFor="subject">Subject</Label>
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
                <Label className="text-zinc-50" htmlFor="message">Message</Label>
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
