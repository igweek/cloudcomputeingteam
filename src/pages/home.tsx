import { useEffect, useState, type FormEvent } from "react";
import type { Variants } from "framer-motion";
import { motion, MotionConfig, useScroll } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Layers3,
  Mail,
  MapPin,
  Network,
  Phone,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "专业定位", id: "position" },
  { label: "课程体系", id: "curriculum" },
  { label: "校企合作", id: "partners" },
  { label: "就业前景", id: "career" },
  { label: "帮助", id: "faq" },
];

const metrics = [
  { value: "云原生", label: "现代应用架构" },
  { value: "OpenStack", label: "私有云平台" },
  { value: "Kubernetes", label: "容器编排能力" },
  { value: "DevOps", label: "自动化运维流程" },
  { value: "云安全", label: "安全治理体系" },
  { value: "Linux", label: "系统运维基础" },
];

const focusAreas = [
  {
    title: "云原生技术",
    text: "构建容器化与微服务驱动的现代应用架构，支撑高可扩展与高可靠的运行环境。",
  },
  {
    title: "云平台架构",
    text: "基于虚拟化与资源抽象技术，设计与部署企业级云平台基础设施。",
  },
  {
    title: "分布式系统",
    text: "理解分布式架构原理与云网络模型，支撑高并发与跨区域系统运行。",
  },
  {
    title: "自动化与安全",
    text: "建立自动化运维体系与安全治理机制，保障云环境持续稳定运行。",
  },
];

const modules = [
  { icon: ServerCog, name: "虚拟化技术", desc: "深入研究 Hypervisor、KVM、VMware 及高级虚拟机生命周期管理。", sub: "基础设施层" },
  { icon: Cloud, name: "私有云架构", desc: "使用 OpenStack 设计、部署并扩展高可用的私有云基础设施。", sub: "平台层" },
  { icon: Network, name: "云网络技术", desc: "学习软件定义网络 SDN、网络功能虚拟化 NFV 及复杂的 VPC 配置。", sub: "网络层" },
  { icon: Layers3, name: "容器编排", desc: "精通 Docker、Kubernetes 架构、Helm Charts 及自动化容器部署。", sub: "应用层" },
  { icon: ShieldCheck, name: "云安全", desc: "实施稳健的 IAM、网络安全组、加密技术及云环境合规措施。", sub: "安全层" },
  { icon: BookOpenCheck, name: "云运维与监控", desc: "使用 Prometheus、Grafana 及自动化脚本监控、管理并优化云服务。", sub: "运维层" },
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
  { role: "云支持工程师", years: "入门级 • 0-2 年", text: "提供一线/二线技术支持，处理云平台使用、服务器运行和基础网络问题。" },
  { role: "基础设施工程师", years: "中级 • 2-4 年", text: "设计并配置云资源，负责虚拟化平台、网络、存储和高可用基础设施。" },
  { role: "DevOps 工程师", years: "高级 • 4-6 年", text: "实施 CI/CD 与自动化流程，建设持续交付、监控告警和稳定性体系。" },
  { role: "云架构师", years: "专家级 • 6+ 年", text: "主导企业级云战略，规划系统架构、成本治理、安全体系和平台演进。" },
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

function SectionIntro({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className={align === "center" ? "mx-auto mb-14 max-w-3xl text-center" : "mb-12 max-w-3xl"}
    >
      <motion.p variants={fadeUp} className="text-sm font-bold tracking-[0.22em] text-gold">
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className={`mt-4 text-balance text-3xl font-black leading-[1.16] md:text-5xl ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 max-w-2xl text-base leading-8 md:text-lg ${tone === "dark" ? "text-white/68" : "text-ink/62"}`}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function Home() {
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "提交失败");

      toast({
        title: "留言已发送",
        description: "感谢你的咨询，我们会尽快与你联系。",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "提交失败，请稍后重试";
      toast({ title: "发送失败", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <div className="min-h-screen bg-paper text-ink selection:bg-gold/25 selection:text-ink">
        <motion.div className="fixed left-0 top-0 z-[70] h-[3px] origin-left bg-gold" style={{ scaleX: scrollYProgress }} />

        <nav
          className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
            isScrolled ? "border-ink/10 bg-paper/90 shadow-sm backdrop-blur-xl" : "border-white/15 bg-navy/25 text-white backdrop-blur-md"
          }`}
        >
          <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 md:px-8">
            <button className="flex items-center gap-3 text-left" onClick={() => scrollTo("hero")} aria-label="回到首页">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  isScrolled ? "border-ink/15 bg-white text-navy" : "border-white/30 bg-white/10 text-white"
                }`}
              >
                <Cloud className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-base font-black leading-none">云计算专业</span>
                <span className={`mt-1 block text-[11px] font-bold tracking-[0.2em] ${isScrolled ? "text-ink/48" : "text-white/62"}`}>
                  CLOUD COMPUTING
                </span>
              </span>
            </button>

            <div className="hidden items-center gap-8 text-sm font-semibold lg:flex">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="transition hover:text-gold">
                  {item.label}
                </button>
              ))}
            </div>

            <Button
              className={`h-11 rounded-full px-5 font-bold shadow-none transition hover:-translate-y-0.5 ${
                isScrolled ? "bg-navy text-white hover:bg-navy/90" : "bg-white text-navy hover:bg-white/90"
              }`}
              onClick={() => scrollTo("contact")}
            >
              联系我们
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>

        <main>
          <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-navy text-white">
            <img src="/cloud-lab-hero.png" alt="现代云计算实训中心" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,27,45,0.94)_0%,rgba(9,27,45,0.78)_47%,rgba(9,27,45,0.34)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(199,151,74,0.28),transparent_32%)]" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy to-transparent" />

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1240px] flex-col justify-center px-5 pb-8 pt-28 md:px-8 lg:pb-10 lg:pt-28"
            >
              <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.95fr)_380px]">
                <div className="max-w-3xl">
                  <motion.p
                    variants={fadeUp}
                    className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.22em] text-white/78 backdrop-blur"
                  >
                    苏州高等职业技术学校
                  </motion.p>
                  <motion.h1 variants={fadeUp} className="mt-7 text-balance text-5xl font-black leading-[1.08] tracking-[-0.02em] md:text-7xl">
                    云计算专业
                  </motion.h1>
                  <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-balance text-xl font-semibold leading-9 text-white/90 md:text-2xl">
                    人工智能发展的重要基础设施
                  </motion.p>
                  <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-white/68">
                    构建面向未来的云原生技术体系，培养具备企业级云平台构建、自动化运维与安全治理能力的高水平技术人才。
                  </motion.p>
                  <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Button className="h-12 rounded-full bg-gold px-6 font-black text-navy shadow-none hover:bg-gold/90" onClick={() => scrollTo("curriculum")}>
                      查看课程体系
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 rounded-full border-white/30 bg-white/10 px-6 font-black text-white shadow-none backdrop-blur hover:bg-white/15"
                      onClick={() => scrollTo("contact")}
                    >
                      咨询报名
                    </Button>
                  </motion.div>
                </div>

                <motion.aside
                  variants={fadeUp}
                  className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
                >
                  <p className="text-sm font-bold tracking-[0.2em] text-white/62">PROGRAM FOCUS</p>
                  <div className="mt-7 space-y-5">
                    {focusAreas.map((item) => (
                      <div key={item.title} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span className="text-lg font-bold">{item.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 border-t border-white/14 pt-6 text-sm leading-7 text-white/66">
                    聚焦虚拟化、分布式架构与云原生技术体系，支撑现代数字化基础设施建设。
                  </div>
                </motion.aside>
              </div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid overflow-hidden rounded-[1.5rem] border border-white/14 bg-white/10 backdrop-blur md:grid-cols-3"
              >
                {metrics.map((item, index) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-end justify-between gap-5 border-white/12 px-6 py-5",
                      index > 0 && "border-t",
                      index < 3 && "md:border-t-0",
                      index >= 3 && "md:border-t",
                      index % 3 !== 0 && "md:border-l",
                    )}
                  >
                    <span className="text-3xl font-black leading-none md:text-4xl">{item.value}</span>
                    <span className="max-w-28 text-right text-sm font-semibold leading-5 text-white/68">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          <section id="position" className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-[1240px]">
              <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <SectionIntro
                  eyebrow="专业定位"
                  title="构建面向未来的云原生技术体系"
                  text="聚焦虚拟化、分布式架构与云原生技术体系，培养具备企业级云平台构建、自动化运维与安全治理能力的高水平技术人才。强调架构思维、系统稳定性与规模化部署能力，支撑现代数字化基础设施建设。"
                />

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-120px" }}
                  className="space-y-4"
                >
                  {focusAreas.map((item, index) => (
                    <motion.article
                      key={item.title}
                      variants={fadeUp}
                      className="group grid gap-5 rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 sm:grid-cols-[80px_1fr]"
                    >
                      <span className="text-4xl font-black leading-none text-gold/80">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="text-2xl font-black leading-snug text-ink">{item.title}</h3>
                        <p className="mt-3 text-base leading-8 text-ink/62">{item.text}</p>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          <section id="curriculum" className="bg-mist px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-[1240px]">
              <SectionIntro
                eyebrow="核心课程体系"
                title="掌握现代云架构与可扩展基础设施运维"
                text="课程覆盖虚拟化、私有云、云网络、容器编排、云安全、云运维与监控，帮助学生建立从基础设施到应用交付的完整技术视野。"
                align="center"
              />

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <motion.article
                      key={module.name}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: index * 0.05 }}
                      className="group rounded-[1.5rem] border border-ink/10 bg-paper p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-ink/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white transition group-hover:bg-gold group-hover:text-navy">
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <span className="rounded-full bg-gold/12 px-3 py-1 text-xs font-black text-gold">{module.sub}</span>
                      </div>
                      <h3 className="mt-8 text-2xl font-black leading-snug">{module.name}</h3>
                      <p className="mt-4 text-base leading-8 text-ink/62">{module.desc}</p>
                      <ChevronRight className="mt-6 h-5 w-5 text-ink/24 transition group-hover:translate-x-1 group-hover:text-gold" />
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="practice" className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-[1240px]">
              <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-navy p-8 text-white shadow-2xl shadow-ink/12"
                >
                  <img src="/cloud-lab-hero.png" alt="云计算实训空间" className="absolute inset-0 h-full w-full object-cover opacity-[0.42]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/72 to-navy/10" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <p className="text-sm font-bold tracking-[0.2em] text-gold">实践体系</p>
                      <h2 className="mt-5 text-balance text-4xl font-black leading-[1.14] md:text-5xl">
                        在真实云平台与基础设施场景中训练
                      </h2>
                    </div>
                    <div className="mt-10 rounded-[1.5rem] border border-white/14 bg-white/10 p-5 backdrop-blur">
                      <p className="text-sm leading-7 text-white/70">
                        通过企业项目实践、联合技术交流与工程环境引入，使学生在真实云平台与基础设施场景中提升系统架构与运维能力。
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-5">
                  {practiceProjects.map((project, index) => (
                    <motion.article
                      key={project.title}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-[1.5rem] border border-ink/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
                    >
                      <p className="text-sm font-black tracking-[0.16em] text-gold">{project.label}</p>
                      <h3 className="mt-4 text-2xl font-black leading-snug">{project.title}</h3>
                      <p className="mt-4 text-base leading-8 text-ink/62">{project.text}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="partners" className="px-5 py-20 md:px-8 md:py-24">
            <div className="mx-auto max-w-[1240px]">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <SectionIntro
                  eyebrow="校企合作"
                  title="构建面向真实工程场景的实践体系"
                  text="依托与中国电子科技集团公司第五十五研究所、中国电信、中国移动、海康威视等行业单位的合作基础，通过企业项目实践、联合技术交流与工程环境引入，帮助学生提升系统架构与运维能力。"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  {partners.map((partner) => (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-sm"
                    >
                      <Building2 className="h-6 w-6 text-gold" />
                      <p className="mt-8 text-2xl font-black">{partner.name}</p>
                      <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink/55">
                        <BadgeCheck className="h-4 w-4 text-sage" />
                        {partner.type}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="career" className="bg-navy px-5 py-20 text-white md:px-8 md:py-28">
            <div className="mx-auto max-w-[1240px]">
              <SectionIntro
                eyebrow="就业前景"
                title="就业面广发展空间大"
                text="随着云计算、大数据与人工智能技术的快速发展，越来越多的企业将业务系统部署到云平台，对云计算技术人才的需求持续增长。毕业生可在互联网企业、软件公司、金融机构、政府信息中心以及各类企事业单位从事云平台运维、云应用开发、系统部署与自动化运维等工作。"
                tone="dark"
              />

              <div className="grid gap-4 md:grid-cols-4">
                {careerPath.map((item, index) => (
                  <motion.article
                    key={item.role}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                  >
                    <span className="text-sm font-black text-gold">{item.years}</span>
                    <h3 className="mt-8 text-xl font-black leading-snug">{item.role}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/68">{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="bg-stone px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-[920px]">
              <SectionIntro
                eyebrow="常见问题"
                title="答疑解惑"
                text="关于专业学习、就业方向与课程设置的详细解答。"
                align="center"
              />
              <Accordion type="single" collapsible className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-paper px-5 shadow-sm">
                {faqs.map((item, index) => (
                  <AccordionItem key={item.q} value={`item-${index}`} className="border-ink/10">
                    <AccordionTrigger className="py-6 text-left text-lg font-black hover:no-underline">
                      <span className="mr-4 text-sm font-black text-gold">{String(index + 1).padStart(2, "0")}</span>
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-10 text-base leading-8 text-ink/62">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          <section id="contact" className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto grid max-w-[1240px] gap-8 overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-6 shadow-2xl shadow-ink/10 md:grid-cols-[0.86fr_1.14fr] md:p-10">
              <div className="rounded-[1.5rem] bg-navy p-7 text-white md:p-9">
                <p className="text-sm font-black tracking-[0.2em] text-gold">联系与咨询</p>
                <h2 className="mt-5 text-balance text-4xl font-black leading-[1.14] md:text-5xl">
                  对云计算专业课程感兴趣
                </h2>
                <p className="mt-5 text-base leading-8 text-white/66">
                  欢迎联系我们，了解培养方向、课程内容、实践环境与报名信息。
                </p>

                <div className="mt-10 space-y-4 text-base text-white/72">
                  <p className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                    苏州市虎丘区塔园路 68 号苏州高等职业技术学校
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gold" />
                    soscloud@hotmail.com
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold" />
                    18018126668
                  </p>
                </div>
              </div>

              <form onSubmit={onFormSubmit} className="grid gap-4 md:grid-cols-2">
                <Input
                  required
                  placeholder="姓名"
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  className="h-12 rounded-full border-ink/12 bg-paper px-5 text-base shadow-none"
                />
                <Input
                  required
                  type="tel"
                  placeholder="电话"
                  value={formData.phone}
                  onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                  className="h-12 rounded-full border-ink/12 bg-paper px-5 text-base shadow-none"
                />
                <Input
                  required
                  type="email"
                  placeholder="邮箱"
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  className="h-12 rounded-full border-ink/12 bg-paper px-5 text-base shadow-none md:col-span-2"
                />
                <Textarea
                  required
                  placeholder="请简要描述您的问题..."
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  className="min-h-36 resize-none rounded-[1.5rem] border-ink/12 bg-paper p-5 text-base shadow-none md:col-span-2"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-full bg-gold px-6 font-black text-navy shadow-none hover:bg-gold/90 md:col-span-2"
                >
                  {submitting ? "发送中..." : "发送留言"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </section>
        </main>

        <footer className="border-t border-ink/10 bg-paper px-5 py-8 text-sm text-ink/50 md:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span className="font-bold text-ink/70">云计算专业</span>
            <span>© 2024 云计算专业官网 保留所有权利</span>
            <button onClick={() => scrollTo("hero")} className="text-left font-bold transition hover:text-ink">
              返回顶部
            </button>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
