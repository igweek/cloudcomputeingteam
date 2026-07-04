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
import Orb from "@/components/orb";
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
    role: "云支持工程师",
    years: "入门级 • 0-2 年",
    text: "提供一线/二线技术支持，处理云平台使用、服务器运行和基础网络问题。",
  },
  {
    role: "基础设施工程师",
    years: "中级 • 2-4 年",
    text: "设计并配置云资源，负责虚拟化平台、网络、存储和高可用基础设施。",
  },
  {
    role: "DevOps 工程师",
    years: "高级 • 4-6 年",
    text: "实施 CI/CD 与自动化流程，建设持续交付、监控告警和稳定性体系。",
  },
  {
    role: "云架构师",
    years: "专家级 • 6+ 年",
    text: "主导企业级云战略，规划系统架构、成本治理、安全体系和平台演进。",
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
    a: "随着企业数字化转型，大量业务系统正在向云平台迁移，对云计算技术人才的需求持续增长。互联网企业、通信运营商、金融机构以及各类企事业单位都需要云计算相关技术人员，因此整体就业前景较为广阔。",
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

      const heroOrb = root.querySelector<HTMLElement>("[data-hero-orb]");
      const heroText = root.querySelector<HTMLElement>("[data-hero-text]");
      const heroCta = root.querySelector<HTMLElement>("[data-hero-cta]");
      const siteNav = root.querySelector<HTMLElement>("[data-site-nav]");

      gsap.set(heroOrb, { autoAlpha: 0, scale: 0.76, filter: "blur(22px)" });
      gsap.set(heroText, {
        autoAlpha: 0,
        y: 34,
        scale: 0.965,
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
          heroOrb,
          { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.out" },
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
          className={`fixed inset-x-0 z-50 px-4 transition-all duration-300 ${
            isScrolled ? "top-2.5 md:top-3" : "top-4 md:top-7"
          }`}
        >
          <div
            className={`mx-auto max-w-[1120px] overflow-hidden rounded-[1.45rem] border transition duration-300 ${
              isScrolled
                ? "border-white/10 bg-[#18172f]/5 shadow-[0_8px_24px_rgba(9,8,35,0.08)] backdrop-blur-[3px] backdrop-saturate-125"
                : "border-[#7770bd]/20 bg-[#2a2558]/38 shadow-[0_12px_40px_rgba(17,16,43,0.16)] backdrop-blur-lg backdrop-saturate-150"
            }`}
          >
            <div
              data-nav-bar
              className={`flex items-center justify-between px-5 transition-all duration-300 md:px-7 ${
                isScrolled ? "h-[60px]" : "h-[72px]"
              }`}
            >
            <button
              className="group flex items-center gap-3 text-left"
              onClick={() => scrollTo("hero")}
              aria-label="回到首页"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]">
                <Atom className="h-4 w-4 text-white" strokeWidth={1.8} />
              </span>
              <span className="text-sm font-black tracking-[-0.02em] text-white">云计算专业</span>
            </button>

            <div className="hidden items-center gap-7 text-xs font-medium text-white/52 lg:flex">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="transition hover:text-white">
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                className="h-10 rounded-xl bg-white px-5 text-xs font-bold text-[#17152f] shadow-none hover:bg-white/88"
                onClick={() => scrollTo("contact")}
              >
                联系我们
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
              <button
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 lg:hidden"
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
          <section id="hero" className="relative min-h-[100svh] overflow-hidden">
            <div data-hero-orb className="absolute inset-0 z-0 will-change-transform" aria-hidden="true">
              <Orb
                hue={0}
                hoverIntensity={1.2}
                rotateOnHover
                forceHoverState={false}
                backgroundColor="#1f1e43"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[rgba(31,30,67,0.08)]" />

            <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1040px] flex-col items-center justify-center px-5 pb-24 pt-32 text-center md:px-8">
              <div data-hero-text className="flex flex-col items-center will-change-[transform,filter,opacity]">
                <h1 className="max-w-[880px] text-balance text-[clamp(2.4rem,5.1vw,4.6rem)] font-semibold leading-[1.05] tracking-[-0.05em]">
                  <span className="block pb-2">
                    <span className="block">
                      云计算专业
                    </span>
                  </span>
                  <span className="mt-3 block pb-2">
                    <span className="block text-[clamp(1.7rem,3.8vw,3.2rem)] leading-[1.1] text-white/90">
                      人工智能发展的重要基础设施
                    </span>
                  </span>
                </h1>
                <p className="mt-7 max-w-2xl text-sm leading-7 text-white/48 md:text-base">
                  构建面向未来的云原生技术体系
                </p>
              </div>
              <div data-hero-cta className="mt-8">
                <Button
                  onClick={() => scrollTo("contact")}
                  className="h-11 rounded-xl bg-white px-6 text-sm font-bold text-void shadow-none hover:bg-white/88"
                >
                  联系我们
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="absolute inset-x-5 bottom-5 z-10 mx-auto max-w-[1040px] rounded-2xl border border-white/10 bg-[#18172f]/5 py-5 shadow-[0_8px_24px_rgba(9,8,35,0.08)] backdrop-blur-[3px] backdrop-saturate-125">
              <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/26">
                云计算专业
              </p>
              <div className="mx-auto grid max-w-[1040px] grid-cols-2 gap-5 px-5 text-center sm:grid-cols-3 md:grid-cols-6 md:px-8">
                {metrics.map((item) => (
                  <span key={item.label} className="grid gap-1 transition hover:text-white">
                    <span className="text-xs font-semibold text-white/58 md:text-sm">{item.value}</span>
                    <span className="text-[10px] text-white/28">{item.label}</span>
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
                    src="/cloud-lab-hero.webp"
                    alt="云计算实训中心"
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
                title="就业面广发展空间大"
                text="随着云计算、大数据与人工智能技术的快速发展，越来越多的企业将业务系统部署到云平台，对云计算技术人才的需求持续增长。毕业生可在互联网企业、软件公司、金融机构、政府信息中心以及各类企事业单位从事云平台运维、云应用开发、系统部署与自动化运维等工作。"
                align="center"
              />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {careerPath.map((item) => (
                  <article
                    key={item.role}
                    data-stagger-item
                    className="rounded-[1.5rem] border border-[#7770bd]/22 bg-panel p-7 transition hover:border-orange/30 hover:bg-panel-hover"
                  >
                    <span className="text-4xl font-semibold tracking-[-0.055em] text-orange">{item.years}</span>
                    <h3 className="mt-12 text-xl font-black">{item.role}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/42">{item.text}</p>
                  </article>
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
