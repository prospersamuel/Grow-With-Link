import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { useApp } from "../../context/Appcontext";



export default function Footer() {

const {openLogin} = useApp()

  const socials = [
    {icon: <FaFacebookF />, link: 'https://www.facebook.com/' },
    {icon: <FaInstagram />, link: 'https://www.instagram.com/' },
  ]

  const footerLinks = [
    {name: 'Features', link: '#features'},
    {name: 'How It Works', link: '#howitworks'},
    {name: 'FAQ', link: '#faq'},
    {name: 'Pricing', link: '#pricing'},
    {name: 'Contact Us', link: '#contact'},
    {name: 'Policies', link: '#policies'},
  ]


  return (
    <footer className="px-6 py-12 bg-neutral-50 dark:bg-slate-950 border-t border-neutral-300 dark:border-slate-800 text-sm text-neutral-700 dark:text-neutral-400 font-semibold">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Left */}
        <div>
           <a href="/" className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          GrowWith<span className="text-primary">Link</span>
        </a>
          <p className="max-w-xs leading-relaxed">
            Helping you grow with every click. Track referrals and reward
            performance instantly.
          </p>
          <div className="flex space-x-4 mt-4">
           {
            socials.map((social, i) => (
              <a 
              key={i}
              className='hover:text-primary transition'
              target="_blank"
              href={social.link}>{social.icon}</a>
            ))
           }
          </div>
        </div>

        {/* Right */}
        <div className="flex space-x-16 items-end">
          <div>
          <h4 className="text-lg font-bold mb-3 text-neutral-900 dark:text-white">
            Quick Links
          </h4>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-3">
            {footerLinks.map((links, i)=>(
              <li key={i}>
                <a 
                className="hover:text-primary"
                href={links.link}>
                  {links.name}
                </a>
              </li>
            ))}
          </ul>
          </div>
        <button
            onClick={openLogin}
            className="bg-primary text-white px-4 py-2 rounded-xl font-semibold shadow hover:shadow-md transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center border-t pt-6 border-neutral-300 dark:border-slate-800 text-neutral-600 dark:text-neutral-500">
        <p className="text-sm font-semibold">
          &copy; {new Date().getFullYear()}  GrowWithLink. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
