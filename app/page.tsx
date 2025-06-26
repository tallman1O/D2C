"use client";
import Image from "next/image";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import { auth } from "@/configs/firebaseConfig";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";
import { Palette, Sparkles, Users, Zap, ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const features = [
    {
      icon: <Palette className="h-7 w-7 text-emerald-600" />,
      title: "Smart Design Analysis",
      description:
        "Our AI understands your wireframe structure, spacing, and visual hierarchy to generate pixel-perfect code.",
      gradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: <Zap className="h-7 w-7 text-amber-600" />,
      title: "Instant Code Generation",
      description:
        "Transform sketches into production-ready React, Vue, or HTML/CSS in seconds, not hours.",
      gradient: "from-amber-50 to-orange-50",
    },
    {
      icon: <Sparkles className="h-7 w-7 text-purple-600" />,
      title: "Multi-Model AI Power",
      description:
        "Choose from GPT-4, Claude, or Gemini - each optimized for different design patterns and complexities.",
      gradient: "from-purple-50 to-pink-50",
    },
    {
      icon: <Users className="h-7 w-7 text-indigo-600" />,
      title: "Team Collaboration",
      description:
        "Share designs, iterate together, and maintain consistent code standards across your entire team.",
      gradient: "from-indigo-50 to-blue-50",
    },
  ];
  // const user = auth?.currentUser;
  // console.log(user)
  const user = useAuthContext();
  console.log(user?.user);
  return (
    <div>
      <header className="flex  flex-wrap sm:justify-start  sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700">
        <nav
          className="relative  p- max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            {/* <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Brand</a> */}
            <div>
              {/* <button type="button" className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation"> */}
              <div className="flex items-center gap-2">
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px]"
                />
                <h2 className="font-bold text-lg">Design2Code</h2>
              </div>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
              {!user?.user?.email ? (
                <Authentication>
                  <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500">
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    Get Started
                  </div>
                </Authentication>
              ) : (
                <ProfileAvatar />
              )}
            </div>
          </div>
        </nav>
      </header>
      <div>
        <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
          {/* Hero Section */}
          <section className="container mx-auto px-6 pt-20 pb-10">
            <div className="flex flex-col-reverse md:flex-row items-center justify-center max-w-6xl mx-auto gap-10 md:gap-20 min-h-[500px]">
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6">
                <Badge className="mb-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-indigo-200/50 rounded-full px-4 py-2 text-sm font-medium">
                  ✨ Powered by GPT-4 Turbo & Claude 3
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent block">
                    Turn Wireframes
                  </span>
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                    Into Living Code
                  </span>
                </h1>
                <p className="text-lg md:text-2xl text-slate-600 max-w-xl leading-relaxed font-light">
                  Upload any design, add your requirements, pick your AI model.
                  Watch as your wireframes transform into production-ready code
                  in seconds.
                </p>
                <div className="w-full flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                  {user?.user?.email ? (
                    <Button
                      size="lg"
                      onClick={() => router.push("/dashboard")}
                      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                    >
                      Start Creating
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  ) : (
                    <Authentication>
                      <Button
                        size="lg"
                        onClick={() => router.push("/dashboard")}
                        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                      >
                        Start Creating
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </Authentication>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <Image
                  src={"/Wireframetocode.png"}
                  alt="Wireframe to Code"
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-contain drop-shadow-xl bg-white rounded-xl p-2"
                  priority
                />
              </div>
            </div>
          </section>
          {/* Trust Indicators below Hero */}
          <div className="container mx-auto px-6 pb-10">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-slate-500">
              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm">
                <Users className="h-6 w-6 text-indigo-500" />
                <span className="font-semibold text-lg">50K+ Creators</span>
              </div>
              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-sm">
                <Zap className="h-6 w-6 text-emerald-500" />
                <span className="font-semibold text-lg">
                  10M+ Lines Generated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-slate-900">
            Built for Modern Workflows
          </h2>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto font-light">
            Every feature designed to accelerate your design-to-code process
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-3xl group`}
            >
              <CardContent className="p-0">
                <div className="mb-6 p-4 bg-white/80 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
