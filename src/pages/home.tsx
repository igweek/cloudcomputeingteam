import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CloudEdge,
  HeroStack,
  IconChevron,
  IconClose,
  IconMail,
  IconMenu,
  IconPhone,
  IconPin,
  IconUp,
  IlluCloudNative,
  IlluDeploy,
  IlluDistributed,
  IlluFaq,
  IlluNetSec,
  IlluOps,
  IlluPlatform,
  IlluSecurityAuto,
  IlluSupport,
  LayerIcon,
  LogoMark,
  PartnerHub,
  Skyline,
  Spark,
} from "@/components/illustrations";
import { useToast } from "@/hooks/use-toast";

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
    art: <IlluCloudNative />,
  },
  {
    title: "云平台架构",
    text: "基于虚拟化与资源抽象技术，设计与部署企业级云平台基础设施。",
    art: <IlluPlatform />,
  },
  {
    title: "分布式系统",
    text: "理解分布式架构原理与云网络模型，支撑高并发与跨区域系统运行。",
    art: <IlluDistributed />,
  },
  {
    title: "自动化与安全",
    text: "建立自动化运维体系与安全治理机制，保障云环境持续稳定运行。",
    art: <IlluSecurityAuto />,
  },
];

/** 自下而上的六层，编号即学习顺序；首页的塔与这里一一对应。 */
const modules = [
  {
    id: "virtualization",
    name: "虚拟化技术",
    desc: "深入研究 Hypervisor、KVM、VMware 及高级虚拟机生命周期管理。",
    sub: "基础设施层",
    tools: ["Hypervisor", "KVM", "VMware"],
  },
  {
    id: "private-cloud",
    name: "私有云架构",
    desc: "使用 OpenStack 设计、部署并扩展高可用的私有云基础设施。",
    sub: "平台层",
    tools: ["OpenStack"],
  },
  {
    id: "network",
    name: "云网络技术",
    desc: "学习软件定义网络 SDN、网络功能虚拟化 NFV 及复杂的 VPC 配置。",
    sub: "网络层",
    tools: ["SDN", "NFV", "VPC"],
  },
  {
    id: "container",
    name: "容器编排",
    desc: "精通 Docker、Kubernetes 架构、Helm Charts 及自动化容器部署。",
    sub: "应用层",
    tools: ["Docker", "Kubernetes", "Helm"],
  },
  {
    id: "security",
    name: "云安全",
    desc: "实施稳健的 IAM、网络安全组、加密技术及云环境合规措施。",
    sub: "安全层",
    tools: ["IAM", "安全组", "加密", "合规"],
  },
  {
    id: "ops",
    name: "云运维与监控",
    desc: "使用 Prometheus、Grafana 及自动化脚本监控、管理并优化云服务。",
    sub: "运维层",
    tools: ["Prometheus", "Grafana", "自动化脚本"],
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
    art: <IlluOps />,
  },
  {
    role: "云服务部署方向",
    text: "围绕虚拟化、容器和云服务平台，完成应用部署、环境配置、服务发布和基础自动化脚本编写。",
    art: <IlluDeploy />,
  },
  {
    role: "网络与安全运维方向",
    text: "参与云网络配置、安全策略设置、账号权限管理和监控告警处理，保障基础设施稳定运行。",
    art: <IlluNetSec />,
  },
  {
    role: "系统集成与技术支持方向",
    text: "面向政企、通信、软件与智能物联网等行业场景，承担项目实施、设备调试和客户技术支持工作。",
    art: <IlluSupport />,
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

/** 实训控制台里的命令行内容，逐行出现。 */
const consoleLines: { cls: string; text: ReactNode }[] = [
  { cls: "c-cmd", text: "kubectl get nodes" },
  { cls: "c-head", text: "NAME        STATUS   ROLES" },
  { cls: "", text: <>{"master-01   "}<span className="c-ok">Ready</span>{"    control-plane"}</> },
  { cls: "", text: <>{"worker-01   "}<span className="c-ok">Ready</span>{"    worker"}</> },
  { cls: "", text: <>{"worker-02   "}<span className="c-ok">Ready</span>{"    worker"}</> },
  { cls: "c-cmd", text: "kubectl rollout status deploy/web" },
  { cls: "c-ok", text: 'deployment "web" successfully rolled out' },
  { cls: "c-cmd", text: "systemctl status prometheus" },
  { cls: "", text: <><span className="c-hot">●</span>{" active (running)"}</> },
];

/** 标题按语义短语分段，只允许在段与段之间换行，避免把"基础设施"这类词拆开。 */
function SectionTitle({ lines }: { lines: string[] }) {
  return (
    <h2 className="sec-title">
      {lines.map((line) => (
        <span key={line} className="phrase">
          {line}
        </span>
      ))}
    </h2>
  );
}

/** 元素第一次进入视口后返回 true，用于让控制台在看得见的时候才开始输出。 */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, seen] as const;
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const flashTimer = useRef<number>(0);
  const [consoleRef, consoleLive] = useInView<HTMLDivElement>();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);
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
      window.clearTimeout(flashTimer.current);
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

  /** 点击首页塔上的某一层：滚动到对应课程并让那一行闪一下。 */
  const selectLayer = (id: string) => {
    scrollTo(`layer-${id}`);
    window.clearTimeout(flashTimer.current);
    setFlashId(id);
    flashTimer.current = window.setTimeout(() => setFlashId(null), 2600);
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
    <div ref={pageRef} className="site">
      <div ref={progressRef} className="progress" aria-hidden="true" />

      <nav className={`nav ${isScrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__bar">
          <div data-nav-bar className="nav__row">
            <button className="brand" onClick={() => scrollTo("hero")} aria-label="回到首页">
              <LogoMark />
              <span className="brand__text">
                <span className="brand__name">云计算专业</span>
                <span className="brand__school">苏州高等职业技术学校</span>
              </span>
            </button>

            <div className="nav__links">
              {navItems.map((item) => (
                <button key={item.id} className="nav__link" onClick={() => scrollTo(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="nav__right">
              <button className="btn btn--ink btn--sm nav__cta" onClick={() => scrollTo("contact")}>
                联系我们
              </button>
              <button
                className="nav__toggle"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "关闭导航" : "打开导航"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <IconClose /> : <IconMenu />}
              </button>
            </div>
          </div>

          <div className="nav__panel" data-open={menuOpen} aria-hidden={!menuOpen}>
            <div className="nav__panel-inner">
              <div className="nav__panel-list">
                {[...navItems, { label: "联系我们", id: "contact" }].map((item) => (
                  <button
                    key={item.id}
                    className="nav__panel-link"
                    onClick={() => scrollTo(item.id)}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    {item.label}
                    <IconChevron />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section id="hero" className="hero">
          <Skyline opacity={0.72} />
          <div className="wrap">
            <div className="hero__grid">
              <div>
                <h1 className="hero__title">云计算专业</h1>
                <p className="hero__sub">智能时代的云端底座</p>
                <p className="hero__lead">构建面向未来的云原生技术体系</p>
                <div className="hero__cta">
                  <button className="btn btn--ink" onClick={() => scrollTo("contact")}>
                    联系我们
                  </button>
                  <button className="btn btn--line" onClick={() => scrollTo("position")}>
                    了解专业
                  </button>
                </div>
              </div>

              <div className="hero__art">
                <HeroStack layers={modules.map(({ id, name }) => ({ id, name }))} onSelect={selectLayer} />
              </div>
            </div>

            <dl className="hero__tools">
              {metrics.map((item) => (
                <div key={item.label} className="tool">
                  <dt className="tool__name">{item.value}</dt>
                  <dd className="tool__label">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="position" className="section">
          <div className="wrap split">
            <div>
              <SectionTitle lines={["构建面向未来的", "云原生技术体系"]} />
              <p className="sec-text">
                聚焦虚拟化、分布式架构与云原生技术体系，培养具备企业级云平台构建、自动化运维与安全治理能力的高水平技术人才。强调架构思维、系统稳定性与规模化部署能力，支撑现代数字化基础设施建设。
              </p>
            </div>

            <div className="focus-grid">
              {focusAreas.map((item) => (
                <article key={item.title} className="focus">
                  <div className="focus__art">{item.art}</div>
                  <div className="focus__body">
                    <h3 className="focus__title">{item.title}</h3>
                    <p className="focus__text">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculum" className="section section--white">
          <div className="wrap split">
            <div className="sticky">
              <SectionTitle lines={["掌握现代云架构与", "可扩展基础设施运维"]} />
              <p className="sec-text">
                课程覆盖虚拟化、私有云、云网络、容器编排、云安全、云运维与监控，帮助学生建立从基础设施到应用交付的完整技术视野。
              </p>
              <p className="hint">编号即学习顺序，由最底层的虚拟化到最上层的运维监控，与首页的分层图一一对应。</p>
            </div>

            <div className="layers">
              {modules.map((module, index) => (
                <article
                  key={module.id}
                  id={`layer-${module.id}`}
                  className="layer"
                  data-flash={flashId === module.id}
                >
                  <LayerIcon index={index} total={modules.length} />
                  <div>
                    <p className="layer__tag">
                      <span className="layer__no">第 {index + 1} 层</span>
                      <span className="layer__sub">{module.sub}</span>
                    </p>
                    <h3 className="layer__name">{module.name}</h3>
                    <p className="layer__desc">{module.desc}</p>
                    <ul className="chips" aria-label={`${module.name}涉及的技术`}>
                      {module.tools.map((tool) => (
                        <li key={tool} className="chip">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="practice" className="section section--navy on-dark">
          <CloudEdge fill="var(--navy)" />
          <div className="contact__bg">
            <Skyline opacity={0.04} />
          </div>
          <div className="wrap practice__grid" style={{ position: "relative" }}>
            <div>
              <SectionTitle lines={["在真实云平台与", "基础设施场景中训练"]} />
              <p className="sec-text">
                通过企业项目实践、联合技术交流与工程环境引入，使学生在真实云平台与基础设施场景中提升系统架构与运维能力。
              </p>
              <div className="pitems">
                {practiceProjects.map((project) => (
                  <article key={project.title} className="pitem">
                    <p className="pitem__label">{project.label}</p>
                    <h3 className="pitem__title">{project.title}</h3>
                    <p className="pitem__text">{project.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div
              ref={consoleRef}
              className={`console ${consoleLive ? "is-live" : ""}`}
              role="img"
              aria-label="实训环境示意：在终端中查看 Kubernetes 节点、发布应用，并用监控图表观察 CPU、内存和网络。"
            >
              <div className="console__bar" aria-hidden="true">
                <span className="console__dot" />
                <span className="console__dot" />
                <span className="console__dot" />
                <span className="console__title">cluster-lab</span>
              </div>
              <div className="console__body" aria-hidden="true">
                {consoleLines.map((line, index) => (
                  <span key={index} className={`c-line ${line.cls}`} style={{ "--n": index } as CSSProperties}>
                    {line.text}
                  </span>
                ))}
                <span className="c-line c-cmd" style={{ "--n": consoleLines.length } as CSSProperties}>
                  <span className="c-cursor" />
                </span>
              </div>
              <div className="console__metrics" aria-hidden="true">
                <div className="metric">
                  <p className="metric__name">CPU</p>
                  <Spark tone="blue" points={[12, 18, 15, 22, 19, 28, 24, 31, 27, 34]} />
                </div>
                <div className="metric">
                  <p className="metric__name">内存</p>
                  <Spark tone="blue" points={[20, 21, 23, 22, 25, 27, 26, 29, 30, 31]} />
                </div>
                <div className="metric">
                  <p className="metric__name">网络</p>
                  <Spark tone="amber" points={[8, 24, 12, 30, 10, 26, 14, 34, 18, 22]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="partners" className="section">
          <div className="wrap partners__grid">
            <div>
              <SectionTitle lines={["构建面向真实", "工程场景的实践体系"]} />
              <p className="sec-text">
                依托与中国电子科技集团公司第五十五研究所、中国电信、中国移动、海康威视等行业单位的合作基础，通过企业项目实践、联合技术交流与工程环境引入，帮助学生提升系统架构与运维能力。
              </p>
              <ul className="plist">
                {partners.map((partner) => (
                  <li key={partner.name} className="prow">
                    <span className="prow__name">{partner.name}</span>
                    <span className="prow__type">{partner.type}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PartnerHub />
          </div>
        </section>

        <section id="career" className="section section--white">
          <div className="wrap">
            <div className="career__head">
              <SectionTitle lines={["面向产业需求的", "多元就业方向"]} />
              <p className="sec-text">
                本专业以云平台运维、系统部署、网络安全与技术支持等岗位能力为培养重点。毕业生可面向互联网企业、软件与信息技术服务企业、通信运营商、系统集成单位以及各类企事业单位信息化部门，从事云平台运维、服务器管理、应用部署、网络配置和技术服务等工作。
              </p>
            </div>

            <div className="jobs">
              {careerPath.map((item) => (
                <article key={item.role} className="job">
                  <div className="job__art" aria-hidden="true">
                    {item.art}
                  </div>
                  <div className="job__body">
                    <h3 className="job__title">{item.role}</h3>
                    <p className="job__text">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="wrap faq-wrap">
            <div className="sticky">
              <SectionTitle lines={["答疑解惑"]} />
              <p className="sec-text">关于专业学习、就业方向与课程设置的详细解答。</p>
              <IlluFaq />
            </div>

            <Accordion type="single" collapsible defaultValue="item-0" className="faq-list">
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`item-${index}`} className="faq-item">
                  <AccordionTrigger className="faq-trigger">{item.q}</AccordionTrigger>
                  <AccordionContent className="faq-answer">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact" className="section section--navy contact on-dark">
          <CloudEdge fill="var(--navy)" />
          <div className="contact__bg">
            <Skyline opacity={0.04} />
          </div>
          <div className="wrap contact__grid">
            <div>
              <SectionTitle lines={["对专业感兴趣"]} />
              <p className="sec-text">欢迎联系我们，了解培养方向、课程内容、实践环境与报名信息。</p>
              <div className="contact__lines">
                <p className="cline">
                  <IconPin />
                  苏州市虎丘区塔园路 68 号苏州高等职业技术学校
                </p>
                <p className="cline">
                  <IconMail />
                  soscloud@hotmail.com
                </p>
                <p className="cline">
                  <IconPhone />
                  18018126668
                </p>
              </div>
            </div>

            <form onSubmit={onFormSubmit} className="form">
              <label className="field">
                姓名
                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder="姓名"
                  className="field__input"
                  value={formData.name}
                  onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                />
              </label>
              <label className="field">
                电话
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="电话"
                  className="field__input"
                  value={formData.phone}
                  onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                />
              </label>
              <label className="field field--wide">
                邮箱
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="邮箱"
                  className="field__input"
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                />
              </label>
              <label className="field field--wide">
                咨询内容
                <textarea
                  required
                  name="message"
                  placeholder="请简要描述您的问题..."
                  className="field__input field__input--area"
                  value={formData.message}
                  onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                />
              </label>
              <button type="submit" disabled={submitting} className="btn btn--blue field--wide">
                {submitting ? "发送中..." : "发送留言"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer on-dark">
        <div className="wrap footer__row">
          <span className="footer__name">云计算专业</span>
          <span>© 2024 云计算专业官网 保留所有权利</span>
          <button onClick={() => scrollTo("hero")} className="footer__top">
            返回顶部
            <IconUp />
          </button>
        </div>
      </footer>
    </div>
  );
}
