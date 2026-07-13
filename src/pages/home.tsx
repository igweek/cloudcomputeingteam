import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Atom,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  ChevronRight,
  Cloud,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  ServerCog,
  ShieldCheck,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SoftAurora from "@/components/soft-aurora";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "专业定位", id: "position" },
  { label: "课程体系", id: "curriculum" },
  { label: "校企合作", id: "partners" },
  { label: "就业前景", id: "career" },
  { label: "帮助", id: "faq" },
];

const metrics = [
  { value: "Linux", label: "系统运维基础" },
  { value: "DevOps", label: "自动化运维流程" },
  { value: "云安全", label: "安全治理体系" },
  { value: "OpenStack", label: "私有云平台" },
  { value: "Kubernetes", label: "容器编排能力" },
  { value: "云原生", label: "现代应用架构" },
];

const focusAreas = [
  {
    title: "云原生技术",
    text: "构建现代应用架构，支撑高可扩展与高可靠的运行环境。",
    icon: Cloud,
  },
  {
    title: "云平台架构",
    text: "基于虚拟化与资源抽象技术，设计与部署企业级云平台基础设施。",
    icon: ServerCog,
  },
  {
    title: "分布式系统",
    text: "理解分布式架构原理与云网络模型，支撑高并发与跨区域系统运行。",
    icon: Network,
  },
  {
    title: "自动化与安全",
    text: "建立自动化运维体系与安全治理机制，保障云环境持续稳定运行。",
    icon: ShieldCheck,
  },
];

const modules = [
  {
    icon: ServerCog,
    name: "虚拟化技术",
    desc: "深入研究 Hypervisor、KVM、VMware 及高级虚拟机生命周期管理。",
    sub: "基础设施层",
  },
  {
    icon: Cloud,
    name: "私有云架构",
    desc: "使用 OpenStack 设计、部署并扩展高可用的私有云基础设施。",
    sub: "平台层",
  },
  {
    icon: Network,
    name: "云网络技术",
    desc: "学习软件定义网络 SDN、网络功能虚拟化 NFV 及复杂的 VPC 配置。",
    sub: "网络层",
  },
  {
    icon: Layers3,
    name: "容器编排",
    desc: "精通 Docker、Kubernetes 架构、Helm Charts 及自动化容器部署。",
    sub: "应用层",
  },
  {
    icon: ShieldCheck,
    name: "云安全",
    desc: "实施稳健的 IAM、网络安全组、加密技术及云环境合规措施。",
    sub: "安全层",
  },
  {
    icon: BookOpenCheck,
    name: "云运维与监控",
    desc: "使用 Prometheus、Grafana 及自动化脚本监控、管理并优化云服务。",
    sub: "运维层",
  },
];

const practiceProjects = [
  {
    label: "企业项目实践",
    title: "真实工程场景训练",
    text: "通过企业项目实践，把课堂训练连接到云平台部署、业务上线、故障定位和运维优化等真实流程。",
  },
  {
    label: "联合技术交流",
    title: "接触产业技术标准",
    text: "依托行业单位技术交流，让学生理解通信运营商、科研院所和智能物联网企业对云平台能力的实际要求。",
  },
  {
    label: "工程环境引入",
    title: "提升系统架构与运维能力",
    text: "将真实云平台与基础设施场景引入实训，训练学生完成系统搭建、资源配置、监控告警和安全治理。",
  },
];

const careerPath = [
  {
    role: "云平台运维方向",
    text: "面向企业数据中心、云平台和服务器环境，参与系统巡检、资源管理、故障处理和基础运维工作。",
  },
  {
    role: "云服务部署方向",
    text: "围绕虚拟化、容器和云服务平台，完成应用部署、环境配置、服务发布和基础自动化脚本编写。",
  },
  {
    role: "网络与安全运维方向",
    text: "参与云网络配置、安全策略设置、账号权限管理和监控告警处理，保障基础设施稳定运行。",
  },
  {
    role: "系统集成与技术支持方向",
    text: "面向政企、通信、软件与智能物联网等行业场景，承担项目实施、设备调试和客户技术支持工作。",
  },
];

const partners = [
  { name: "中国电子科技集团公司", type: "科研院所" },
  { name: "中国电信", type: "通信运营商" },
  { name: "中国移动", type: "通信运营商" },
  { name: "海康威视", type: "智能物联网" },
];

const faqs = [
  {
    q: "学习云计算需要会编程吗？",
    a: "需要具备一定的编程基础，但不需要成为软件开发专家。云计算更侧重系统管理与自动化运维，常用语言包括 Python 和 Shell，用于编写自动化脚本、管理服务器和部署应用。",
  },
  {
    q: "学习云计算对数学要求高吗？",
    a: "云计算专业对数学的要求不像人工智能或数据科学那样高。一般需要具备基础的数学能力，例如逻辑思维和简单的数据计算，更重要的是对计算机技术和网络系统的理解能力。",
  },
  {
    q: "没有计算机基础可以学习吗？",
    a: "可以。课程通常会从基础知识开始，例如计算机网络、Linux 系统以及服务器管理等。只要具备学习兴趣并愿意进行实践训练，大多数学生都可以逐步掌握相关技术。",
  },
  {
    q: "云计算和人工智能有什么关系？",
    a: "云计算为人工智能提供计算资源和数据处理平台。许多人工智能模型的训练与部署都依赖云平台完成，因此云计算是人工智能发展的重要基础设施之一。",
  },
  {
    q: "云计算专业主要学习什么内容？",
    a: "云计算专业主要学习计算机系统和云平台相关技术，包括 Linux 操作系统、计算机网络、虚拟化技术、容器技术、云平台部署、自动化运维以及云安全等内容。通过系统学习，学生可以掌握现代互联网基础设施的构建与运维能力。",
  },
  {
    q: "学习过程中需要做很多实验吗？",
    a: "需要。云计算是一门实践性很强的专业，学生会通过搭建服务器、部署云平台、配置网络环境以及构建容器集群等实验来掌握技术。这些实践经验对于未来就业非常重要。",
  },
  {
    q: "云计算专业就业前景怎么样？",
    a: "随着企业信息化和云平台建设的持续推进，服务器管理、云平台运维、系统部署、网络配置和技术支持等岗位对实践型技术人才有稳定需求。学生毕业后可结合自身能力和岗位要求，在软件与信息技术服务企业、通信运营商、系统集成单位及企事业单位信息化部门发展。",
  },
  {
    q: "云计算和软件工程有什么区别？",
    a: "软件工程主要侧重软件开发，例如应用程序设计与系统开发；而云计算更关注服务器、网络、云平台和系统运维等基础设施。简单来说，软件工程更偏向开发软件，而云计算更偏向构建和管理运行平台。",
  },
];

function SectionHeading({
  englishTitle,
  eyebrow,
  title,
  text,
  align = "left",
}: {
  englishTitle: string;
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto mb-12 text-center" : "mb-10"}>
      <div className="overflow-hidden">
        <p
          data-section-display
          aria-hidden="true"
          className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange/75 will-change-transform"
        >
          {englishTitle}
        </p>
      </div>
      <div data-heading-copy className={align === "center" ? "mx-auto mt-3 max-w-3xl" : "mt-3 max-w-3xl"}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange">{eyebrow}</p>
        <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.05] tracking-[-0.045em] text-white md:text-5xl">
          {title}
        </h2>
      {text && (
        <p className={`mt-5 max-w-2xl text-base leading-8 text-white/48 md:text-lg ${align === "center" ? "mx-auto" : ""}`}>
          {text}
        </p>
      )}
      </div>
    </div>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let animationFrame = 0;

    const updateScrollState = () => {
      animationFrame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      setIsScrolled(window.scrollY > 28);
    };

    const handleScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let refreshFrame = 0;

    const context = gsap.context(() => {
      if (reducedMotion) {
        return;
      }

      const heroAurora = root.querySelector<HTMLElement>("[data-hero-aurora]");
      const heroText = root.querySelector<HTMLElement>("[data-hero-text]");
      const heroCta = root.querySelector<HTMLElement>("[data-hero-cta]");
      const siteNav = root.querySelector<HTMLElement>("[data-site-nav]");

      gsap.set(heroAurora, { autoAlpha: 0, scale: 1.03, filter: "blur(14px)" });
      gsap.set(heroText, {
        autoAlpha: 0,
        y: 38,
        scale: 0.975,
        filter: "blur(14px)",
        transformOrigin: "50% 60%",
      });
      gsap.set(heroCta, { autoAlpha: 0, y: 18 });
      gsap.set(siteNav, { autoAlpha: 0, y: -30 });

      const openingTimeline = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      openingTimeline
        .to(
          heroAurora,
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.85, ease: "expo.out" },
          0,
        )
        .to(
          heroText,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "expo.out",
          },
          0.22,
        )
        .to(siteNav, { autoAlpha: 1, y: 0, duration: 1.05, ease: "expo.out" }, 0.1)
        .to(heroCta, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, 0.72);

      gsap.utils.toArray<HTMLElement>("[data-motion-section]", root).forEach((section) => {
        const displayTitle = section.querySelector<HTMLElement>("[data-section-display]");
        const headingCopy = section.querySelector<HTMLElement>("[data-heading-copy]");
        const staggerItems = section.querySelectorAll<HTMLElement>("[data-stagger-item]");
        const revealMedia = section.querySelectorAll<HTMLElement>("[data-reveal-media]");

        const sectionTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            once: true,
          },
        });

        if (displayTitle) {
          sectionTimeline.fromTo(
            displayTitle,
            { autoAlpha: 0, yPercent: 82, scaleX: 0.74, transformOrigin: "0% 50%" },
            { autoAlpha: 1, yPercent: 0, scaleX: 1, duration: 1.35, ease: "expo.out" },
          );
        }

        if (headingCopy) {
          sectionTimeline.fromTo(
            headingCopy,
            { autoAlpha: 0, y: 54 },
            { autoAlpha: 1, y: 0, duration: 1.05, ease: "power3.out" },
            displayTitle ? "-=0.72" : 0,
          );
        }

        if (revealMedia.length) {
          sectionTimeline.fromTo(
            revealMedia,
            { clipPath: "inset(0 0 100% 0)", scale: 1.04 },
            {
              clipPath: "inset(0 0 0% 0)",
              scale: 1,
              duration: 1.45,
              stagger: 0.12,
              ease: "expo.inOut",
            },
            "-=0.55",
          );
        }

        if (staggerItems.length) {
          sectionTimeline.fromTo(
            staggerItems,
            { autoAlpha: 0, y: 76, rotateX: 7, scale: 0.965, transformOrigin: "50% 100%" },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.08,
              stagger: 0.11,
              ease: "power3.out",
            },
            "-=0.72",
          );
        }

        section.querySelectorAll<HTMLElement>("[data-parallax-image]").forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        });
      });
    }, root);

    refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    const navBar = pageRef.current?.querySelector<HTMLElement>("[data-nav-bar]");
    const navBottom = navBar?.getBoundingClientRect().bottom ?? 104;
    const safeOffset = navBottom + 24;

    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - safeOffset,
      behavior: "smooth",
    });
  };

  const onFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "提交失败");

      toast({ title: "留言已发送", description: "感谢你的咨询，我们会尽快与你联系。" });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "提交失败，请稍后重试";
      toast({ title: "发送失败", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-void text-white selection:bg-orange selection:text-void">
        <div
          ref={progressRef}
          className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left scale-x-0 bg-orange will-change-transform"
          aria-hidden="true"
        />

        <nav
          data-site-nav
          className={`fixed inset-x-0 z-50 px-4 transition-all duration-300 md:px-8 ${
            isScrolled ? "top-2.5 md:top-4" : "top-4 md:top-7"
          }`}
        >
          <div
            className={`mx-auto max-w-[1120px] overflow-hidden rounded-[1.35rem] border transition duration-300 ${
              isScrolled
                ? "border-white/10 bg-[#100e16]/42 shadow-[0_12px_42px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-125"
                : "border-white/12 bg-[#17131e]/72 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl backdrop-saturate-150"
            }`}
          >
            <div
              data-nav-bar
              className={`flex items-center justify-between px-4 transition-all duration-300 md:px-6 ${
                isScrolled ? "h-[54px] md:h-[62px]" : "h-[58px] md:h-[70px]"
              }`}
            >
            <button
              className="group flex min-w-0 items-center gap-2.5 text-left md:gap-3"
              onClick={() => scrollTo("hero")}
              aria-label="回到首页"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.035] md:h-9 md:w-9">
                <Atom className="h-4 w-4 text-white" strokeWidth={1.8} />
              </span>
              <span className="truncate text-sm font-black tracking-[-0.02em] text-white md:text-base">云计算专业</span>
            </button>

            <div className="hidden items-center gap-8 text-sm font-semibold text-white/42 lg:flex">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="transition hover:text-white">
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                className="hidden h-10 rounded-xl bg-white px-5 text-xs font-bold text-[#16121d] shadow-none hover:bg-white/88 sm:inline-flex md:h-11 md:px-6"
                onClick={() => scrollTo("contact")}
              >
                联系我们
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
              <button
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "关闭导航" : "打开导航"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
            </div>

            <div
              aria-hidden={!menuOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
                menuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="border-t border-white/10 bg-[#18172f]/24 px-5 py-4 backdrop-blur-lg backdrop-saturate-150">
                  <div className="mx-auto grid gap-1">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        tabIndex={menuOpen ? 0 : -1}
                        className="flex min-h-12 items-center justify-between border-b border-white/8 text-left text-sm text-white/70"
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4 text-orange" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative z-10">
          <section
            id="hero"
            className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(96,89,190,0.24),transparent_34%),radial-gradient(circle_at_50%_74%,rgba(55,132,203,0.12),transparent_35%),linear-gradient(180deg,#252252_0%,#1f1e43_48%,#24214b_100%)] pb-8 sm:pb-0"
          >
            <div
              data-hero-aurora
              className="pointer-events-none absolute inset-0 z-0 will-change-[transform,filter,opacity]"
              aria-hidden="true"
            >
              <SoftAurora
                speed={0.42}
                scale={1.55}
                brightness={0.78}
                color1="#6ea8ff"
                color2="#ff79d8"
                noiseFrequency={1.55}
                noiseAmplitude={0.82}
                bandHeight={0.47}
                bandSpread={1.05}
                octaveDecay={0.16}
                layerOffset={0.42}
                colorSpeed={0.42}
                enableMouseInteraction={false}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_52%,rgba(255,255,255,0.045),transparent_30%),linear-gradient(180deg,rgba(31,30,67,0.28)_0%,rgba(31,30,67,0.02)_46%,rgba(36,33,75,0.7)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-[#1f1e43] via-[#1f1e43]/76 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-56 bg-gradient-to-t from-[#24214b] via-[#24214b]/72 to-transparent" />

            <div className="relative z-10 mx-auto flex min-h-[calc(100svh-150px)] max-w-[1080px] flex-col items-center justify-center px-5 pb-10 pt-32 text-center sm:min-h-[100svh] sm:pb-44 sm:pt-36 md:px-8">
              <div data-hero-text className="flex flex-col items-center will-change-[transform,filter,opacity]">
                <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/12 bg-[#15111d]/54 p-1.5 pr-5 text-sm font-bold text-white/48 shadow-[0_10px_36px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                  <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-black text-[#17131e]">NEW</span>
                  <span className="hidden sm:inline">云计算专业</span>
                  <span className="text-white/35 sm:hidden">专业介绍</span>
                </div>
                <h1 className="max-w-[960px] text-balance text-[clamp(2.55rem,6.2vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.058em] text-white">
                  <span className="block">云计算专业</span>
                  <span className="mt-3 block text-[clamp(1.85rem,4.6vw,4.35rem)] text-white/92">
                    智能时代的云端底座
                  </span>
                </h1>
                <p className="mt-7 max-w-2xl text-balance text-base leading-7 text-white/48 md:text-lg md:leading-8">
                  构建面向未来的云原生技术体系
                </p>
              </div>
              <div data-hero-cta className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  onClick={() => scrollTo("contact")}
                  className="h-12 rounded-xl bg-white px-7 text-sm font-black text-[#17131e] shadow-[0_16px_44px_rgba(255,255,255,0.12)] hover:bg-white/88"
                >
                  联系我们
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollTo("position")}
                  className="h-12 rounded-xl border-white/12 bg-[#15111d]/42 px-7 text-sm font-bold text-white/54 shadow-none backdrop-blur-xl hover:bg-white/8 hover:text-white"
                >
                  了解专业
                </Button>
              </div>
            </div>

            <div className="relative z-10 mx-4 -mt-2 max-w-[1040px] rounded-2xl border border-white/10 bg-[#15111d]/30 py-3 shadow-[0_14px_48px_rgba(0,0,0,0.16)] backdrop-blur-xl backdrop-saturate-125 sm:absolute sm:inset-x-5 sm:bottom-5 sm:mx-auto sm:mt-0 sm:py-5">
              <p className="mb-3 text-center text-[9px] font-bold uppercase tracking-[0.22em] text-white/26 sm:mb-5 sm:text-[10px]">
                云计算专业
              </p>
              <div className="mx-auto grid max-w-[1040px] grid-cols-3 gap-x-3 gap-y-2 px-3 text-center sm:gap-5 sm:px-5 md:grid-cols-6 md:px-8">
                {metrics.map((item) => (
                  <span key={item.label} className="grid gap-0.5 transition hover:text-white sm:gap-1">
                    <span className="text-[11px] font-semibold text-white/58 md:text-sm">{item.value}</span>
                    <span className="text-[9px] leading-tight text-white/28 sm:text-[10px]">{item.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section
            id="position"
            data-motion-section
            className="border-b border-white/8 px-5 py-20 md:px-8 md:py-24"
          >
            <div className="mx-auto max-w-[1240px]">
              <SectionHeading
                englishTitle="Positioning"
                eyebrow="专业定位"
                title="构建面向未来的云原生技术体系"
                text="聚焦虚拟化、分布式架构与云原生技术体系，培养具备企业级云平台构建、自动化运维与安全治理能力的高水平技术人才。强调架构思维、系统稳定性与规模化部署能力，支撑现代数字化基础设施建设。"
                align="center"
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {focusAreas.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      data-stagger-item
                      className="group rounded-[1.6rem] border border-[#7770bd]/22 bg-panel p-6 transition hover:border-orange/30 hover:bg-panel-hover md:p-7"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange/20 bg-orange/8 text-orange">
                          <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                        </span>
                        <span className="text-xs font-bold text-white/18">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-12 text-xl font-bold tracking-[-0.035em]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/42">{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            id="curriculum"
            data-motion-section
            className="border-b border-white/8 px-5 py-20 md:px-8 md:py-24"
          >
            <div className="mx-auto max-w-[1240px]">
              <SectionHeading
                englishTitle="Curriculum"
                eyebrow="核心课程体系"
                title="掌握现代云架构与可扩展基础设施运维"
                text="课程覆盖虚拟化、私有云、云网络、容器编排、云安全、云运维与监控，帮助学生建立从基础设施到应用交付的完整技术视野。"
              />

              <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <article
                      key={module.name}
                      data-stagger-item
                      className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[#7770bd]/22 bg-panel p-5 transition duration-300 hover:-translate-y-1 hover:border-orange/30 hover:bg-panel-hover md:p-6"
                    >
                      <div className="flex items-start justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-orange">
                          <Icon className="h-5 w-5" strokeWidth={1.7} />
                        </span>
                        <span className="rounded-full border border-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/32">
                          {module.sub}
                        </span>
                      </div>
                      <div className="mt-7 pr-7">
                        <h3 className="text-xl font-bold tracking-[-0.04em] md:text-2xl">{module.name}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/42">{module.desc}</p>
                      </div>
                      <ChevronRight className="absolute bottom-6 right-6 h-5 w-5 text-white/18 transition group-hover:translate-x-1 group-hover:text-orange" />
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            id="practice"
            data-motion-section
            className="border-b border-white/8 bg-[#24214b] px-5 py-20 md:px-8 md:py-24"
          >
            <div className="mx-auto max-w-[1240px]">
              <div className="mb-6 overflow-hidden">
                <p
                  data-section-display
                  aria-hidden="true"
                  className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange/75 will-change-transform"
                >
                  Practice
                </p>
              </div>
              <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div
                  data-reveal-media
                  className="relative min-h-[520px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-panel"
                >
                  <img
                    data-parallax-image
                    src="/cloud-infrastructure-digital-twin.webp"
                    alt="云基础设施数字孪生空间"
                    loading="lazy"
                    decoding="async"
                    className="absolute -top-[5%] left-0 h-[110%] w-full object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-void/35" />
                  <div className="absolute inset-x-5 bottom-5 rounded-[1.4rem] border border-white/12 bg-void/78 p-6 backdrop-blur-md">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-orange">实践体系</p>
                    <p className="mt-3 text-xl font-black tracking-[-0.035em]">
                      在真实云平台与基础设施场景中训练
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/48">
                      通过企业项目实践、联合技术交流与工程环境引入，使学生在真实云平台与基础设施场景中提升系统架构与运维能力。
                    </p>
                  </div>
                </div>

                <div>
                  <div className="divide-y divide-white/8 border-y border-white/8">
                    {practiceProjects.map((project, index) => (
                      <article
                        key={project.title}
                        data-stagger-item
                        className="group grid gap-3 py-6 sm:grid-cols-[130px_1fr] sm:gap-6"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange">{project.label}</p>
                        <div>
                          <h3 className="text-xl font-black tracking-[-0.035em]">{project.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-white/42">{project.text}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="partners"
            data-motion-section
            className="border-b border-white/8 px-5 py-20 md:px-8 md:py-24"
          >
            <div className="mx-auto max-w-[1240px]">
              <div className="mb-5 overflow-hidden">
                <p
                  data-section-display
                  aria-hidden="true"
                  className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange/75 will-change-transform"
                >
                  Partners
                </p>
              </div>
              <div data-heading-copy className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-orange">校企合作</p>
                  <h2 className="mt-4 whitespace-nowrap text-[clamp(1.25rem,3vw,3rem)] font-black leading-[0.98] tracking-[-0.06em]">
                    构建面向真实工程场景的实践体系
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-7 text-white/42">
                  依托与中国电子科技集团公司第五十五研究所、中国电信、中国移动、海康威视等行业单位的合作基础，通过企业项目实践、联合技术交流与工程环境引入，帮助学生提升系统架构与运维能力。
                </p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                {partners.map((partner) => (
                  <div key={partner.name} data-stagger-item className="bg-panel p-6">
                    <Building2 className="h-5 w-5 text-orange" strokeWidth={1.7} />
                    <p className="mt-12 min-h-12 text-lg font-black leading-6">{partner.name}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs text-white/35">
                      <BadgeCheck className="h-3.5 w-3.5 text-orange" />
                      {partner.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="career"
            data-motion-section
            className="border-b border-white/8 px-5 py-20 md:px-8 md:py-24"
          >
            <div className="mx-auto max-w-[1240px]">
              <SectionHeading
                englishTitle="Career"
                eyebrow="就业前景"
                title="面向产业需求的多元就业方向"
                text="本专业以云平台运维、系统部署、网络安全与技术支持等岗位能力为培养重点。毕业生可面向互联网企业、软件与信息技术服务企业、通信运营商、系统集成单位以及各类企事业单位信息化部门，从事云平台运维、服务器管理、应用部署、网络配置和技术服务等工作。"
                align="center"
              />

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {careerPath.map((item) => (
                  <div key={item.role} data-stagger-item className="[perspective:900px]">
                    <article
                      onPointerEnter={(event) => {
                        event.currentTarget.style.setProperty("--lift", "-8px");
                      }}
                      onPointerMove={(event) => {
                        const card = event.currentTarget;
                        const rect = card.getBoundingClientRect();
                        const pointerX = (event.clientX - rect.left) / rect.width - 0.5;
                        const pointerY = (event.clientY - rect.top) / rect.height - 0.5;

                        card.style.setProperty("--tilt-y", `${pointerX * 9}deg`);
                        card.style.setProperty("--tilt-x", `${pointerY * -8}deg`);
                      }}
                      onPointerLeave={(event) => {
                        const card = event.currentTarget;

                        card.style.setProperty("--lift", "0px");
                        card.style.setProperty("--tilt-x", "0deg");
                        card.style.setProperty("--tilt-y", "0deg");
                      }}
                      className="min-h-[220px] rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out will-change-transform hover:border-orange/28 hover:bg-white/[0.055] hover:shadow-[0_22px_70px_rgba(7,6,30,0.18)]"
                      style={{
                        transform:
                          "translate3d(0,var(--lift,0px),0) rotateX(var(--tilt-x,0deg)) rotateY(var(--tilt-y,0deg))",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <h3 className="text-xl font-black tracking-[-0.025em] text-white">{item.role}</h3>
                      <p className="mt-5 text-sm leading-7 text-white/50">{item.text}</p>
                    </article>
                  </div>
                ))}
              </div>

            </div>
          </section>

          <section
            id="faq"
            data-motion-section
            className="border-b border-white/8 px-5 py-20 md:px-8 md:py-24"
          >
            <div className="mx-auto max-w-[900px]">
              <SectionHeading
                englishTitle="Questions"
                eyebrow="常见问题"
                title="答疑解惑"
                text="关于专业学习、就业方向与课程设置的详细解答。"
                align="center"
              />
              <Accordion type="single" collapsible className="border-y border-white/10">
                {faqs.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`item-${index}`}
                    data-stagger-item
                    className="border-white/10"
                  >
                    <AccordionTrigger className="py-6 text-left text-base font-black text-white hover:no-underline md:text-lg">
                      <span className="mr-4 text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span>
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-7 pl-10 text-sm leading-7 text-white/45">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section id="contact" data-motion-section className="px-5 py-20 md:px-8 md:py-24">
            <div className="mx-auto mb-6 max-w-[1240px] overflow-hidden">
              <p
                data-section-display
                aria-hidden="true"
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange/75 will-change-transform"
              >
                Contact
              </p>
            </div>
            <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[2rem] border border-orange/20 bg-panel/90 backdrop-blur">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div
                  data-heading-copy
                  className="relative overflow-hidden border-b border-white/8 p-7 md:p-10 lg:border-b-0 lg:border-r"
                >
                  <div className="absolute inset-0 bg-void/32" />
                  <div className="relative z-10">
                    <p className="text-xs font-bold tracking-[0.2em] text-orange">联系与咨询</p>
                    <h2 className="mt-5 whitespace-nowrap text-4xl font-black leading-[0.98] tracking-[-0.06em] md:text-6xl">
                      对专业感兴趣
                    </h2>
                    <p className="mt-6 max-w-md text-sm leading-7 text-white/48">
                      欢迎联系我们，了解培养方向、课程内容、实践环境与报名信息。
                    </p>
                    <div className="mt-12 space-y-5 text-sm text-white/55">
                      <p className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                        苏州市虎丘区塔园路 68 号苏州高等职业技术学校
                      </p>
                      <p className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-orange" />
                        soscloud@hotmail.com
                      </p>
                      <p className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-orange" />
                        18018126668
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  data-stagger-item
                  onSubmit={onFormSubmit}
                  className="grid gap-4 p-7 md:grid-cols-2 md:p-10"
                >
                  <label className="grid gap-2 text-xs font-medium text-white/48">
                    姓名
                    <Input
                      required
                      placeholder="姓名"
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      className="h-12 rounded-xl border-white/10 bg-white/[0.04] px-4 text-sm text-white shadow-none placeholder:text-white/20 focus-visible:ring-orange"
                    />
                  </label>
                  <label className="grid gap-2 text-xs font-medium text-white/48">
                    电话
                    <Input
                      required
                      type="tel"
                      placeholder="电话"
                      value={formData.phone}
                      onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                      className="h-12 rounded-xl border-white/10 bg-white/[0.04] px-4 text-sm text-white shadow-none placeholder:text-white/20 focus-visible:ring-orange"
                    />
                  </label>
                  <label className="grid gap-2 text-xs font-medium text-white/48 md:col-span-2">
                    邮箱
                    <Input
                      required
                      type="email"
                      placeholder="邮箱"
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      className="h-12 rounded-xl border-white/10 bg-white/[0.04] px-4 text-sm text-white shadow-none placeholder:text-white/20 focus-visible:ring-orange"
                    />
                  </label>
                  <label className="grid gap-2 text-xs font-medium text-white/48 md:col-span-2">
                    咨询内容
                    <Textarea
                      required
                      placeholder="请简要描述您的问题..."
                      value={formData.message}
                      onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                      className="min-h-36 resize-none rounded-xl border-white/10 bg-white/[0.04] p-4 text-sm text-white shadow-none placeholder:text-white/20 focus-visible:ring-orange"
                    />
                  </label>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 h-12 rounded-xl bg-white px-6 font-bold text-[#17152f] shadow-none hover:bg-white/88 md:col-span-2"
                  >
                    {submitting ? "发送中..." : "发送留言"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t border-white/8 px-5 py-8 text-xs text-white/30 md:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-bold text-white/70">云计算专业</span>
            <span>© 2024 云计算专业官网 保留所有权利</span>
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 text-left transition hover:text-white">
              返回顶部
              <ArrowRight className="h-3.5 w-3.5 -rotate-90" />
            </button>
          </div>
        </footer>
      </div>
  );
}
