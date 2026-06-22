import Link from "next/link";
export default function Header(){
    return(
        <header className="border-b">
            <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between item-center">
                {/*logo*/}
                <Link href="/" className="text-2xl font-bold">
                    The Echo                
                </Link>
                {/*Navigation*/}
                <nav className="flex gap-6 text-sm">
                    <Link href="/">Home</Link>
                    <Link href="/articles">Articles</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </nav>
            </div>
        </header>
    );
}