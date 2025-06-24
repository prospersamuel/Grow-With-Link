import { motion } from "framer-motion";

export default function Policies() {

    const policies = [
        {title: '1. Data Collection', desc: 'We collect only the necessary data to provide and improve our services — such as your email, referral activity, and usage stats. Your data is never sold or shared withoutyour consent.'},

        {title: '2. Cookie Policy', desc: 'We use cookies to track referrals, optimize your experience, and ensure security. By using the site, you agree to our cookie practices.'},

        {title: '3. Usage Terms', desc: 'Any misuse of referral links, attempts to manipulate the system, or engage in spammy behavior will result in immediate suspension or ban.'},

        {title: '4. Account Deletion', desc: 'You may delete your account at any time from the settings page. All your data will be permanently removed from our system within 30 days.'},

        {title: '5. Updates', desc: 'Policies are subject to change. Users will be notified via email or app notifications if major updates occur.'}
    ]

  return (
    <section id="policies" className="min-h-screen py-24 bg-white dark:bg-slate-900 text-slate-800 dark:text-white px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-center uppercase"
        >
           <div className="flex space-x-3 items-center justify-center">
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        <h2 className="text-3xl mb-3 font-bold left-0 uppercase">
          Terms & Policies
          </h2>
          <div className="h-2 w-20 rounded-full bg-primary"></div>
        </div>
        <p className="text-slate-600 text-sm mb-12 dark:text-slate-400 max-w-xl mx-auto">
          Please read our terms and privacy policies carefully before using our platform.
        </p>
        </motion.h1>

        <div className="space-y-10">
          {/* Section 1 */}
          {policies.map((policy, i)=>(
          <motion.div
          key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-2">{policy.title}</h2>
            <p className="text-slate-600 dark:text-slate-400">
             {policy.desc}
            </p>
          </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
