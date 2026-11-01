import { Link } from "wouter";

import { CloudEdge, LogoMark, Skyline } from "@/components/illustrations";

export default function NotFound() {
  return (
    <div className="site nf">
      <div className="nf__sky">
        <Skyline opacity={0.8} />
      </div>
      <div className="nf__card">
        <LogoMark />
        <p className="nf__code">404</p>
        <h1 className="nf__title">页面未找到</h1>
        <p className="nf__text">抱歉，您访问的页面在云端网络拓扑中不存在。请检查路径或返回首页。</p>
        <Link href="/" className="btn btn--ink">
          返回首页
        </Link>
      </div>
      <div className="nf__ground">
        <CloudEdge fill="var(--navy)" />
      </div>
    </div>
  );
}
