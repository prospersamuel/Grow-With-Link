import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import contactImage from "../../assets/undraw_contact-us_kcoa.svg";
import toast from 'react-hot-toast';

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

const sendEmail = (e) => {
  e.preventDefault();
  setLoading(true);

  const loadingToast = toast.loading("Sending message...");

  emailjs
    .sendForm(
      "service_fpdb9v1",      // your service ID
      "template_vqor67q",     // your template ID
      formRef.current,
      "oJAmWVw7zKEZLk5gI"     // your public key
    )
    .then(
      (result) => {
        toast.dismiss(loadingToast);
        toast.success("Message sent successfully!");
        setSent(true);
        setLoading(false);
        formRef.current.reset();
      },
      (error) => {
        toast.dismiss(loadingToast);
        toast.error("Failed to send. Please try again.");
        setLoading(false);
      }
    );
};

const input =[
    {type: 'text', name: 'user_name', placeholder: 'Your Name'},
    {type: 'email', name: 'user_email', placeholder: 'Your Email'}
]


  return (
    <section id="contact" className="min-h-screen py-24 bg-white dark:bg-slate-900 text-slate-800 dark:text-white px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >

        
           <div className="flex space-x-3 items-center mb-3">
          <div className="h-2 w-20 rounded-full bg-primary"></div>
          <h2 className="text-lg md:text-3xl font-bold uppercase">Get in Touch</h2>
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        </div>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            We'd love to hear from you. Whether you're a store owner, marketer, or just curious — drop us a message and we'll respond within 24 hours.
          </p>

          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
           {input.map((input, i)=>(
            <input 
            key={i}
            type={input.type} 
            className="bg-neutral-100 dark:bg-slate-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            name={input.name}
            placeholder={input.placeholder}
            required
            />
           ))}
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              className="bg-neutral-100 dark:bg-slate-700 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src={contactImage}
            alt="Contact Illustration"
            className="w-full max-w-md mx-auto drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
