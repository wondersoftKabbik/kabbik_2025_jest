"use client";

import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";


const ContactUsModal = () => {
  return (
      <div
        className="profile_btn_gradients text-white rounded-2xl p-6 sm:p-8 shadow-lg 
                   flex flex-col gap-6 transition-all duration-300"
      >
        {/* Contact Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-wide">Get in Touch</h2>
          <p className="text-sm text-gray-200">
            We’d love to hear from you. Reach out anytime.
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-4 text-sm sm:text-base">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <Mail className="text-yellow-300 w-5 h-5 shrink-0" />
            <a href="mailto:support@wondersoftsolution.com" className="hover:underline">
              support@wondersoftsolution.com
            </a>
          </div>

          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <Phone className="text-green-300 w-5 h-5 shrink-0" />
            <a href="tel:+8801915225026" className="hover:underline">
              +8801915225026
            </a>
          </div>

          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <MapPin className="text-red-300 w-5 h-5 shrink-0" />
            <span>167-169 Great Portland street, 5th Floor,London,United Kingdom W1W PF</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-2" />

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          <a
            href="https://www.facebook.com/kabbikAudiobookOfficial"
            target="_blank"
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
          >
            <Facebook className="w-6 h-6 text-blue-300" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCuaKfe_NyVViSRTx25VhkWQ"
            target="_blank"
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
          >
            <Youtube className="w-6 h-6 text-red-300" />
          </a>
          <a
            href="https://www.linkedin.com/company/kabbikaudiobookofficial/"
            target="_blank"
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
          >
            <Linkedin className="w-6 h-6 text-sky-300" />
          </a>
        </div>
      </div>
  );
};

export default ContactUsModal;
