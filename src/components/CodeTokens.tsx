import type { ReactNode } from 'react';

export const Keyword = ({ children }: { children: ReactNode }) => <span className="text-[#c586c0]">{children}</span>;
export const Variable = ({ children }: { children: ReactNode }) => <span className="text-[#9cdcfe]">{children}</span>;
export const Property = ({ children }: { children: ReactNode }) => <span className="text-[#9cdcfe]">{children}</span>;
export const Str = ({ children }: { children: ReactNode }) => <span className="text-[#ce9178]">{children}</span>;
export const Comment = ({ children }: { children: ReactNode }) => <span className="text-vsc-comment italic">{children}</span>;
export const NumberToken = ({ children }: { children: ReactNode }) => <span className="text-[#b5cea8]">{children}</span>;
export const Fn = ({ children }: { children: ReactNode }) => <span className="text-[#dcdcaa]">{children}</span>;
export const TypeToken = ({ children }: { children: ReactNode }) => <span className="text-[#4ec9b0]">{children}</span>;
