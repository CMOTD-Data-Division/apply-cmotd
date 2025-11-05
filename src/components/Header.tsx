import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Header() {
return (
        <div className="sticky top-0 w-full bg-inherit border border-bottom-2 border-blue-300 shadow-sm mb-12 max-h-20 z-50 flex items-center justify-between">
            <div className="w-full mx-auto py-3 px-4 flex items-center justify-between h-full">
              <div className="flex items-center gap-2 h-full">
                <Link href="/" className="rounded-full flex justify-center relative">
                  <Image src="/full_logo-1.svg" alt="CMOTD" height={500} width={300} className="hidden md:inline-flex"/>
                  <Image src="/Logo.png" alt="CMOTD" height={500} width={300} className="-ml-6 md:hidden w-24 object-cover"/>
                </Link>
                <span className="font-semibold text-primary uppercase text-xl hidden md:inline-block"></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Link href="mailto:info@cmotd.org" className="inline-flex items-center gap-2 text-primary hover:opacity-90">
                  <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  <span>info@cmotd.org</span>
                </Link>
              </div>
            </div>
        </div>
)
}

export default Header;