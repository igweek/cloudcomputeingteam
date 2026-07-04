import React from "react";
import { Link } from "wouter";
import { CloudOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/grid-background";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden font-sans">
      <GridBackground />

      <div
        className="relative z-10 mx-4 flex w-full max-w-lg animate-in flex-col items-center text-center fade-in slide-in-from-bottom-5 duration-500"
      >
        <div className="mb-8 inline-flex p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <CloudOff className="h-16 w-16 text-blue-500" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 tracking-tight text-white">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-white mb-4">页面未找到</h2>
        
        <p className="text-slate-400 mb-10 leading-relaxed max-w-sm">
          抱歉，您访问的页面在云端网络拓扑中不存在。请检查路径或返回首页。
        </p>

        <Link href="/">
          <Button className="h-12 px-8 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors border-0">
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  );
}
