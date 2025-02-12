'use client';

import Link from 'next/link';
import { BsGithub, BsTwitter, BsLinkedin } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';

export const Footer = () => {

    const websiteName = "Havent Decided"
  const currentYear = new Date().getFullYear();

  const footerSections = {
    product: {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'About', href: '/about' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    community: {
      title: 'Community',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Forum', href: '/forum' },
        { name: 'Discord', href: '/discord' },
        { name: 'GitHub', href: '/github' },
      ],
    },
  };

  return (
    <footer className="bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.08)] z-1 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* Replace with your logo */}
              <div className="w-8 h-8 bg-purple-500 rounded-lg" />
              <span className="text-white font-bold text-xl">{websiteName}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Empowering students to make informed decisions about their academic journey through 
              transparent unit ratings and reviews.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                <BsGithub className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                <BsTwitter className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                <BsLinkedin className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="text-white/40 hover:text-white/80 transition-colors"
              >
                <FaDiscord className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Footer Sections */}
          {Object.values(footerSections).map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white/90 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/40 text-sm">
              © {currentYear} ㅋㅋ. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-white/40 hover:text-white/60 text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};